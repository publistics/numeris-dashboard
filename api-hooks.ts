// Data hooks that try the backend API first, then fallback to mock data
// Uses native fetch with SWR for caching and revalidation

import useSWR from 'swr';
import { API_BASE, ApiError } from './api-client';
import {
  summaryMetrics as mockSummary,
  payouts as mockPayouts,
  monthlyProfitData as mockMonthlyProfit,
  platformBreakdown as mockPlatformBreakdown,
  adSpendDaily as mockAdSpendDaily,
  campaignSummaries as mockCampaignSummaries,
} from '@/data/mockData';

// Default fetcher — returns null on failure so we can fallback to mock
const fetcher = async (url: string) => {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new ApiError(res.status, `API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    // Backend unavailable — return null so useSWR falls back
    return null;
  }
};

// ─── Summary / Dashboard Metrics ─────────────────────────────────────────

export function useSummaryMetrics(merchantId?: string) {
  const q = merchantId ? `?merchant_id=${merchantId}` : '';
  const { data, error, isLoading } = useSWR(
    `/sales/summary${q}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 30000, fallbackData: null }
  );
  return {
    data: data ?? mockSummary,
    isLoading,
    isError: !!error,
    isLive: data !== null,
  };
}

// ─── Payouts / Reconciliation ────────────────────────────────────────────

export function usePayouts(params?: {
  platform?: string;
  start_date?: string;
  end_date?: string;
}) {
  const q = new URLSearchParams();
  if (params?.platform) q.set('platform', params.platform);
  if (params?.start_date) q.set('start_date', params.start_date);
  if (params?.end_date) q.set('end_date', params.end_date);
  const query = q.toString();

  const { data, error, isLoading } = useSWR(
    `/sales${query ? `?${query}` : ''}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 30000, fallbackData: null }
  );

  return {
    data: data ?? mockPayouts,
    isLoading,
    isError: !!error,
    isLive: data !== null,
  };
}

// ─── Profit Analytics ────────────────────────────────────────────────────

export function useMonthlyProfit(merchantId?: string) {
  const q = merchantId ? `?merchant_id=${merchantId}` : '';
  const { data, error, isLoading } = useSWR(
    `/sales/summary?group_by=month${q}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000, fallbackData: null }
  );

  return {
    data: data ?? { monthly: mockMonthlyProfit, platforms: mockPlatformBreakdown },
    isLoading,
    isError: !!error,
    isLive: data !== null,
  };
}

// ─── Ad Spend ────────────────────────────────────────────────────────────

import type { AdSpendDaily, CampaignSummary } from '@/data/mockData';

export function useAdSpend(params?: {
  platform?: string;
  start_date?: string;
  end_date?: string;
}): {
  daily: AdSpendDaily[];
  campaigns: CampaignSummary[];
  data: any;
  isLoading: boolean;
  isError: boolean;
  isLive: boolean;
} {
  const q = new URLSearchParams();
  if (params?.platform) q.set('platform', params.platform);
  if (params?.start_date) q.set('start_date', params.start_date);
  if (params?.end_date) q.set('end_date', params.end_date);
  const query = q.toString();

  const { data, error, isLoading } = useSWR(
    `/marketing${query ? `?${query}` : ''}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000, fallbackData: null }
  );

  return {
    daily: (data?.daily ?? mockAdSpendDaily) as AdSpendDaily[],
    campaigns: (data?.campaigns ?? mockCampaignSummaries) as CampaignSummary[],
    data,
    isLoading,
    isError: !!error,
    isLive: data !== null,
  };
}

// ─── Connection Status ───────────────────────────────────────────────────

import type { InventorySku, InboundShipment } from '@/data/mockData';
import { inventorySkus as mockInventory, inboundShipments as mockInbound } from '@/data/mockData';

export function useInventory(params?: {
  warehouse?: string;
}): {
  skus: InventorySku[];
  inbound: InboundShipment[];
  isLoading: boolean;
  isLive: boolean;
} {
  const q = params?.warehouse ? `?warehouse=${params.warehouse}` : '';
  const { data, isLoading } = useSWR(
    `/inventory${q}`,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000, fallbackData: null }
  );
  return {
    skus: (data?.skus ?? mockInventory) as InventorySku[],
    inbound: (data?.inbound ?? mockInbound) as InboundShipment[],
    isLoading,
    isLive: data !== null,
  };
}

export function useApiStatus() {
  const { data, error } = useSWR(
    '/health',
    async () => {
      try {
        const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
        return res.ok;
      } catch { return false; }
    },
    { revalidateOnFocus: false, revalidateInterval: 60000 }
  );
  return { isConnected: data === true, isError: !!error };
}

// ─── Expenses ────────────────────────────────────────────────────────────

import type { ExpenseRecord, ExpenseCategorySummary } from '@/data/mockData';
import { mockExpenses, getExpenseCategorySummary } from '@/data/mockData';

export function useExpenses(): {
  expenses: ExpenseRecord[];
  summary: ExpenseCategorySummary[];
  isLoading: boolean;
  isLive: boolean;
} {
  const { data, isLoading } = useSWR(
    '/expenses',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 30000, fallbackData: null }
  );
  return {
    expenses: (data?.transactions ?? mockExpenses) as ExpenseRecord[],
    summary: (data?.summary ?? getExpenseCategorySummary()) as ExpenseCategorySummary[],
    isLoading,
    isLive: data !== null,
  };
}