// API client for Numeris backend at http://0.0.0.0:3000/api/v1
// Falls back to mock data when backend is unavailable

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      ...options,
    });
    if (!res.ok) throw new ApiError(res.status, `API error: ${res.status} ${res.statusText}`);
    return await res.json() as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    console.warn(`[API] Backend unavailable for ${path}, falling back to mock data`);
    return null;
  }
}

// ─── Health Check ────────────────────────────────────────────────────────

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Sales Records ───────────────────────────────────────────────────────

export async function fetchSalesSummary(params?: {
  merchant_id?: string;
  start_date?: string;
  end_date?: string;
}): Promise<any | null> {
  const q = new URLSearchParams();
  if (params?.merchant_id) q.set('merchant_id', params.merchant_id);
  if (params?.start_date) q.set('start_date', params.start_date);
  if (params?.end_date) q.set('end_date', params.end_date);
  const query = q.toString();
  return apiFetch<any>(`/sales/summary${query ? `?${query}` : ''}`);
}

export async function fetchSalesRecords(params?: {
  merchant_id?: string;
  platform?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}): Promise<any[] | null> {
  const q = new URLSearchParams();
  if (params?.merchant_id) q.set('merchant_id', params.merchant_id);
  if (params?.platform) q.set('platform', params.platform);
  if (params?.start_date) q.set('start_date', params.start_date);
  if (params?.end_date) q.set('end_date', params.end_date);
  if (params?.limit) q.set('limit', String(params.limit));
  if (params?.offset) q.set('offset', String(params.offset));
  const query = q.toString();
  return apiFetch<any[]>(`/sales${query ? `?${query}` : ''}`);
}

// ─── Marketing Records ───────────────────────────────────────────────────

export async function fetchMarketingRecords(params?: {
  merchant_id?: string;
  platform?: string;
  start_date?: string;
  end_date?: string;
}): Promise<any[] | null> {
  const q = new URLSearchParams();
  if (params?.merchant_id) q.set('merchant_id', params.merchant_id);
  if (params?.platform) q.set('platform', params.platform);
  if (params?.start_date) q.set('start_date', params.start_date);
  if (params?.end_date) q.set('end_date', params.end_date);
  const query = q.toString();
  return apiFetch<any[]>(`/marketing${query ? `?${query}` : ''}`);
}

// ─── Merchants ───────────────────────────────────────────────────────────

export async function fetchMerchants(): Promise<any[] | null> {
  return apiFetch<any[]>('/merchants');
}

// ─── Stores ──────────────────────────────────────────────────────────────

export async function fetchStores(merchantId?: string): Promise<any[] | null> {
  const q = merchantId ? `?merchant_id=${merchantId}` : '';
  return apiFetch<any[]>(`/stores${q}`);
}

// ─── Ad Accounts ─────────────────────────────────────────────────────────

export async function fetchAdAccounts(merchantId?: string): Promise<any[] | null> {
  const q = merchantId ? `?merchant_id=${merchantId}` : '';
  return apiFetch<any[]>(`/ads${q}`);
}