// Apex Gear — Demo-specific mock data for the Numeris demo
// This data overrides the generic mock data when in demo mode.

import { monthlyProfitData, payouts, inventorySkus, inboundShipments, mockExpenses, getExpenseCategorySummary } from './mockData';

// ─── Apex Gear Branding ──────────────────────────────────────────────────

export const apexGearBrand = {
  name: 'Apex Gear',
  tagline: 'Premium Outdoor Equipment',
  email: 'alex@apexgear.com',
  url: 'apexgear.com',
  logo: 'AG',
  color: 'from-indigo-500 to-purple-600',
  user: { name: 'Alex Kim', initials: 'AK', role: 'Founder' },
};

// ─── Apex Gear Platform Connection Status ────────────────────────────────

export const apexGearConnections = [
  { name: 'Shopify', icon: 'ShoppingBag', connected: true, status: 'Live', label: 'Apex Gear Store' },
  { name: 'Amazon SP-API', icon: 'ShoppingBag', connected: true, status: 'Live', label: 'Amazon FBA' },
  { name: 'Meta Ads', icon: 'TrendingUp', connected: true, status: 'Live', label: 'Facebook & Instagram' },
  { name: 'Google Ads', icon: 'TrendingUp', connected: true, status: 'Live', label: 'Search & Shopping' },
  { name: 'Bank (Plaid)', icon: 'Landmark', connected: true, status: 'Synced', label: 'Chase Business' },
  { name: 'TikTok Ads', icon: 'TrendingUp', connected: false, status: 'Available', label: 'Not connected' },
];

// ─── Apex Gear Financial Summary ─────────────────────────────────────────

// The narrative says: Shopify says $50K, Numeris says $32.4K true net profit
export const apexGearSummary = {
  totalReconciled: 284750.32,
  totalPending: 45620.00,
  totalDiscrepancies: 12340.55,
  totalPayoutsThisMonth: 342710.87,
  shopifyProfit: 50000,
  trueNetProfit: 32400,
  monthlyRevenue: 245800,
  monthlyCOGS: 110600,
  monthlyFees: 36870,
  monthlyAdSpend: 42150,
};

// ─── Apex Gear Demo Narrative Events ─────────────────────────────────────

export const apexMagicMoments = [
  {
    id: 'profit-reveal',
    title: 'The Profit Reveal',
    description: 'Shopify says $50,000 in profit. Numeris shows the true number: $32,400 — automatically accounting for Amazon FBA fees, blended ad spend, and multi-currency reconciliation.',
    icon: 'TrendingUp',
  },
  {
    id: 'inventory-alert',
    title: 'Inventory Health Alert',
    description: '"Apex Peak Tent (Blue)" — your Class A bestseller — will stock out in 12 days. Lead time is 45 days. You\'re already in a 33-day stockout window.',
    icon: 'Package',
  },
  {
    id: 'scenario-sim',
    title: 'Scenario Simulator',
    description: 'Increasing Meta Ads by 30% would lift revenue 22% but trigger a cash crunch by August 15th. The Peak Tent stockout accelerates to just 5 days.',
    icon: 'TrendingUp',
  },
];

// ─── Apex Gear Inventory Spotlight ───────────────────────────────────────

export const apexGearInventorySpotlight = {
  peakTent: {
    name: 'Apex Peak Tent (Blue)',
    sku: 'APT-BLU-001',
    class: 'A',
    daysOfSupply: 12,
    leadTimeDays: 45,
    stockoutWindowDays: 33,
    revenueRank: 2,
  },
};

// ─── Apex Gear Cash Flow ─────────────────────────────────────────────────

// Generate apex-specific cash flow starting balance
export const apexCashFlow = {
  startingBalance: 87500,
  dailyRevenue: 8200,
  dailyAdSpend: 1400,
  dailyOpEx: 450,
  dailyCOGS: 3400,
};

// Re-export all generic mock data as the fallback — 
// the demo mode uses the same data structures but with the Apex Gear brand context
export default {
  apexGearBrand,
  apexGearConnections,
  apexGearSummary,
  apexMagicMoments,
  apexGearInventorySpotlight,
  apexCashFlow,
};