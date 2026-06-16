// Mock data types and data for the Numeris reconciliation dashboard
// These types mirror what the backend API will eventually provide.

export type ReconciliationStatus = 'matched' | 'pending' | 'discrepancy';

export interface LineItem {
  id: string;
  type: 'order' | 'refund' | 'fee' | 'adjustment';
  description: string;
  amount: number;
  date: string;
}

export interface PayoutRecord {
  id: string;
  platform: 'Shopify' | 'Amazon' | 'Stripe' | 'PayPal';
  payoutId: string;
  platformDate: string;
  bankDate: string | null;
  grossAmount: number;
  platformFees: number;
  adjustments: number;
  netAmount: number;
  bankAmount: number | null;
  status: ReconciliationStatus;
  confidenceScore: number;
  lineItems: LineItem[];
}

export interface SummaryMetrics {
  totalReconciled: number;
  totalPending: number;
  totalDiscrepancies: number;
  totalPayoutsThisMonth: number;
}

export const summaryMetrics: SummaryMetrics = {
  totalReconciled: 284750.32,
  totalPending: 45620.00,
  totalDiscrepancies: 12340.55,
  totalPayoutsThisMonth: 342710.87,
};

export const payouts: PayoutRecord[] = [
  {
    id: 'pay-001',
    platform: 'Shopify',
    payoutId: 'PO-2024-03-15-001',
    platformDate: '2024-03-15',
    bankDate: '2024-03-17',
    grossAmount: 23450.00,
    platformFees: 1023.40,
    adjustments: -450.00,
    netAmount: 21976.60,
    bankAmount: 21976.60,
    status: 'matched',
    confidenceScore: 100,
    lineItems: [
      { id: 'li-001', type: 'order', description: 'Order #1042 - Premium Hoodie x3', amount: 8750.00, date: '2024-03-14' },
      { id: 'li-002', type: 'order', description: 'Order #1043 - Running Shoes x2', amount: 4200.00, date: '2024-03-14' },
      { id: 'li-003', type: 'order', description: 'Order #1045 - Yoga Mat Bundle', amount: 6500.00, date: '2024-03-14' },
      { id: 'li-004', type: 'order', description: 'Order #1046 - Water Bottle Set', amount: 4000.00, date: '2024-03-15' },
      { id: 'li-005', type: 'refund', description: 'Refund - Order #1044 (Damaged)', amount: -450.00, date: '2024-03-15' },
      { id: 'li-006', type: 'fee', description: 'Shopify Transaction Fees (2.9% + 30¢)', amount: -640.50, date: '2024-03-15' },
      { id: 'li-007', type: 'fee', description: 'Shopify Subscription Fee', amount: -382.90, date: '2024-03-15' },
    ],
  },
  {
    id: 'pay-002',
    platform: 'Amazon',
    payoutId: 'SETTLEMENT-AMZ-2024-03-12',
    platformDate: '2024-03-12',
    bankDate: '2024-03-14',
    grossAmount: 45230.00,
    platformFees: 8245.00,
    adjustments: -1200.00,
    netAmount: 35785.00,
    bankAmount: 35785.00,
    status: 'matched',
    confidenceScore: 100,
    lineItems: [
      { id: 'li-008', type: 'order', description: 'FBA Sale - Electronics Bundle x5', amount: 18750.00, date: '2024-03-10' },
      { id: 'li-009', type: 'order', description: 'FBA Sale - Kitchen Set x8', amount: 12500.00, date: '2024-03-10' },
      { id: 'li-010', type: 'order', description: 'FBM Sale - Home Decor x12', amount: 13980.00, date: '2024-03-11' },
      { id: 'li-011', type: 'fee', description: 'Amazon Referral Fees (15%)', amount: -6784.50, date: '2024-03-12' },
      { id: 'li-012', type: 'fee', description: 'FBA Fulfillment Fees', amount: -1460.50, date: '2024-03-12' },
      { id: 'li-013', type: 'refund', description: 'Refund - Order #AMZ-887 (Wrong item)', amount: -1200.00, date: '2024-03-11' },
    ],
  },
  {
    id: 'pay-003',
    platform: 'Shopify',
    payoutId: 'PO-2024-03-18-002',
    platformDate: '2024-03-18',
    bankDate: null,
    grossAmount: 18200.00,
    platformFees: 789.00,
    adjustments: 0,
    netAmount: 17411.00,
    bankAmount: null,
    status: 'pending',
    confidenceScore: 85,
    lineItems: [
      { id: 'li-014', type: 'order', description: 'Order #1050 - Winter Jacket x4', amount: 9600.00, date: '2024-03-17' },
      { id: 'li-015', type: 'order', description: 'Order #1051 - Knit Beanie x10', amount: 4600.00, date: '2024-03-17' },
      { id: 'li-016', type: 'order', description: 'Order #1052 - Scarf Set x5', amount: 4000.00, date: '2024-03-18' },
      { id: 'li-017', type: 'fee', description: 'Shopify Transaction Fees (2.9% + 30¢)', amount: -527.80, date: '2024-03-18' },
      { id: 'li-018', type: 'fee', description: 'Shopify Payment Processing', amount: -261.20, date: '2024-03-18' },
    ],
  },
  {
    id: 'pay-004',
    platform: 'Stripe',
    payoutId: 'STRIPE-PO-2024-03-10',
    platformDate: '2024-03-10',
    bankDate: '2024-03-13',
    grossAmount: 12850.00,
    platformFees: 498.00,
    adjustments: -150.00,
    netAmount: 12202.00,
    bankAmount: 12450.00,
    status: 'discrepancy',
    confidenceScore: 60,
    lineItems: [
      { id: 'li-019', type: 'order', description: 'DTC Order - Subscription Box x20', amount: 8650.00, date: '2024-03-09' },
      { id: 'li-020', type: 'order', description: 'DTC Order - Sample Pack x15', amount: 4200.00, date: '2024-03-10' },
      { id: 'li-021', type: 'refund', description: 'Refund - Subscription #SUB-445', amount: -150.00, date: '2024-03-09' },
      { id: 'li-022', type: 'fee', description: 'Stripe Processing Fees (2.9% + 30¢)', amount: -372.65, date: '2024-03-10' },
      { id: 'li-023', type: 'fee', description: 'Stripe Monthly Platform Fee', amount: -125.35, date: '2024-03-10' },
    ],
  },
  {
    id: 'pay-005',
    platform: 'PayPal',
    payoutId: 'PP-SETTLEMENT-2024-03-08',
    platformDate: '2024-03-08',
    bankDate: '2024-03-11',
    grossAmount: 8900.00,
    platformFees: 356.00,
    adjustments: 0,
    netAmount: 8544.00,
    bankAmount: 8544.00,
    status: 'matched',
    confidenceScore: 100,
    lineItems: [
      { id: 'li-024', type: 'order', description: 'eBay Sale - Vintage Lamp x2', amount: 3400.00, date: '2024-03-07' },
      { id: 'li-025', type: 'order', description: 'eBay Sale - Art Print x8', amount: 5500.00, date: '2024-03-08' },
      { id: 'li-026', type: 'fee', description: 'PayPal Transaction Fees (4% + 30¢)",', amount: -356.00, date: '2024-03-08' },
    ],
  },
  {
    id: 'pay-006',
    platform: 'Amazon',
    payoutId: 'SETTLEMENT-AMZ-2024-03-19',
    platformDate: '2024-03-19',
    bankDate: null,
    grossAmount: 32150.00,
    platformFees: 5670.00,
    adjustments: -890.00,
    netAmount: 25590.00,
    bankAmount: null,
    status: 'pending',
    confidenceScore: 90,
    lineItems: [
      { id: 'li-027', type: 'order', description: 'FBA Sale - Fitness Equipment x6', amount: 16750.00, date: '2024-03-18' },
      { id: 'li-028', type: 'order', description: 'FBA Sale - Supplements Bundle x15', amount: 12400.00, date: '2024-03-18' },
      { id: 'li-029', type: 'order', description: 'FBA Sale - Yoga Accessories x20', amount: 3000.00, date: '2024-03-19' },
      { id: 'li-030', type: 'fee', description: 'Amazon Referral Fees (15%)', amount: -4822.50, date: '2024-03-19' },
      { id: 'li-031', type: 'fee', description: 'FBA Fulfillment Fees', amount: -847.50, date: '2024-03-19' },
      { id: 'li-032', type: 'refund', description: 'Refund - Order #AMZ-891 (Defective)', amount: -890.00, date: '2024-03-18' },
    ],
  },
  {
    id: 'pay-007',
    platform: 'Shopify',
    payoutId: 'PO-2024-03-05-003',
    platformDate: '2024-03-05',
    bankDate: '2024-03-07',
    grossAmount: 34500.00,
    platformFees: 1450.00,
    adjustments: -2300.00,
    netAmount: 30750.00,
    bankAmount: 30150.00,
    status: 'discrepancy',
    confidenceScore: 45,
    lineItems: [
      { id: 'li-033', type: 'order', description: 'Order #1030 - Designer Shoes x6', amount: 14400.00, date: '2024-03-04' },
      { id: 'li-034', type: 'order', description: 'Order #1031 - Leather Bag x4', amount: 12400.00, date: '2024-03-04' },
      { id: 'li-035', type: 'order', description: 'Order #1033 - Wallet Set x8', amount: 7700.00, date: '2024-03-05' },
      { id: 'li-036', type: 'refund', description: 'Refund - Order #1029 (Return)', amount: -1500.00, date: '2024-03-04' },
      { id: 'li-037', type: 'adjustment', description: 'Chargeback - Order #1028', amount: -800.00, date: '2024-03-04' },
      { id: 'li-038', type: 'fee', description: 'Shopify Transaction Fees (2.9% + 30¢)', amount: -1000.50, date: '2024-03-05' },
      { id: 'li-039', type: 'fee', description: 'Shopify Payment Processing', amount: -449.50, date: '2024-03-05' },
    ],
  },
];

export const platformColors: Record<string, string> = {
  Shopify: '#96BF47',
  Amazon: '#FF9900',
  Stripe: '#635BFF',
  PayPal: '#0070BA',
};

// ─── Profit Analytics Data ────────────────────────────────────────────────
// Following the Unified Sales Record schema from requirements.md

export interface MonthlyProfit {
  month: string;
  label: string;
  grossSales: number;
  discounts: number;
  shippingIncome: number;
  taxCollected: number;
  platformFees: number;
  cogs: number;
  netRevenue: number;
  orders: number;
}

export const monthlyProfitData: MonthlyProfit[] = [
  { month: '2024-01', label: 'Jan', grossSales: 189500, discounts: 12300, shippingIncome: 8900, taxCollected: 16100, platformFees: 28425, cogs: 85300, netRevenue: 63475, orders: 1250 },
  { month: '2024-02', label: 'Feb', grossSales: 212300, discounts: 14500, shippingIncome: 9500, taxCollected: 18050, platformFees: 31845, cogs: 95500, netRevenue: 70355, orders: 1420 },
  { month: '2024-03', label: 'Mar', grossSales: 245800, discounts: 16200, shippingIncome: 11200, taxCollected: 20890, platformFees: 36870, cogs: 110600, netRevenue: 82130, orders: 1650 },
  { month: '2024-04', label: 'Apr', grossSales: 228400, discounts: 15100, shippingIncome: 10200, taxCollected: 19415, platformFees: 34260, cogs: 102800, netRevenue: 76140, orders: 1530 },
  { month: '2024-05', label: 'May', grossSales: 261200, discounts: 17800, shippingIncome: 11800, taxCollected: 22200, platformFees: 39180, cogs: 117500, netRevenue: 86720, orders: 1740 },
  { month: '2024-06', label: 'Jun', grossSales: 289600, discounts: 20100, shippingIncome: 13100, taxCollected: 24615, platformFees: 43440, cogs: 130300, netRevenue: 95760, orders: 1920 },
  { month: '2024-07', label: 'Jul', grossSales: 312400, discounts: 21500, shippingIncome: 14200, taxCollected: 26555, platformFees: 46860, cogs: 140600, netRevenue: 103440, orders: 2080 },
  { month: '2024-08', label: 'Aug', grossSales: 305800, discounts: 20800, shippingIncome: 13800, taxCollected: 25995, platformFees: 45870, cogs: 137600, netRevenue: 101530, orders: 2040 },
  { month: '2024-09', label: 'Sep', grossSales: 334200, discounts: 23200, shippingIncome: 15100, taxCollected: 28405, platformFees: 50130, cogs: 150400, netRevenue: 110470, orders: 2230 },
  { month: '2024-10', label: 'Oct', grossSales: 358900, discounts: 25600, shippingIncome: 16200, taxCollected: 30505, platformFees: 53835, cogs: 161500, netRevenue: 118565, orders: 2390 },
  { month: '2024-11', label: 'Nov', grossSales: 412500, discounts: 31200, shippingIncome: 18500, taxCollected: 35060, platformFees: 61875, cogs: 185600, netRevenue: 134825, orders: 2750 },
  { month: '2024-12', label: 'Dec', grossSales: 485600, discounts: 38900, shippingIncome: 21500, taxCollected: 41275, platformFees: 72840, cogs: 218500, netRevenue: 155360, orders: 3240 },
];

export interface PlatformBreakdown {
  platform: string;
  revenue: number;
  fees: number;
  cogs: number;
  netProfit: number;
  orders: number;
}

export const platformBreakdown: PlatformBreakdown[] = [
  { platform: 'Shopify', revenue: 1425800, fees: 213870, cogs: 641600, netProfit: 570330, orders: 9510 },
  { platform: 'Amazon', revenue: 1214600, fees: 242920, cogs: 546600, netProfit: 425080, orders: 7280 },
  { platform: 'Stripe', revenue: 523400, fees: 78510, cogs: 235500, netProfit: 209390, orders: 3490 },
  { platform: 'PayPal', revenue: 202300, fees: 8092, cogs: 91000, netProfit: 103208, orders: 1430 },
];

// ─── Ad Spend Data ────────────────────────────────────────────────────────
// Following the Unified Marketing Record schema from requirements.md

export interface AdSpendDaily {
  date: string;
  label: string;
  metaSpend: number;
  googleSpend: number;
  tiktokSpend: number;
  metaSales: number;
  googleSales: number;
  tiktokSales: number;
}

export const adSpendDaily: AdSpendDaily[] = [
  { date: '2024-03-01', label: 'Mar 1', metaSpend: 1250, googleSpend: 890, tiktokSpend: 340, metaSales: 5250, googleSales: 3560, tiktokSales: 1020 },
  { date: '2024-03-02', label: 'Mar 2', metaSpend: 1180, googleSpend: 920, tiktokSpend: 380, metaSales: 4720, googleSales: 4040, tiktokSales: 1140 },
  { date: '2024-03-03', label: 'Mar 3', metaSpend: 1050, googleSpend: 780, tiktokSpend: 290, metaSales: 4200, googleSales: 3120, tiktokSales: 870 },
  { date: '2024-03-04', label: 'Mar 4', metaSpend: 1420, googleSpend: 1100, tiktokSpend: 410, metaSales: 6100, googleSales: 4620, tiktokSales: 1350 },
  { date: '2024-03-05', label: 'Mar 5', metaSpend: 1350, googleSpend: 1050, tiktokSpend: 390, metaSales: 5670, googleSales: 4410, tiktokSales: 1280 },
  { date: '2024-03-06', label: 'Mar 6', metaSpend: 1280, googleSpend: 980, tiktokSpend: 360, metaSales: 5120, googleSales: 3920, tiktokSales: 1080 },
  { date: '2024-03-07', label: 'Mar 7', metaSpend: 1520, googleSpend: 1150, tiktokSpend: 440, metaSales: 6850, googleSales: 4830, tiktokSales: 1450 },
  { date: '2024-03-08', label: 'Mar 8', metaSpend: 1650, googleSpend: 1250, tiktokSpend: 470, metaSales: 7100, googleSales: 5250, tiktokSales: 1550 },
  { date: '2024-03-09', label: 'Mar 9', metaSpend: 1450, googleSpend: 1080, tiktokSpend: 420, metaSales: 6090, googleSales: 4320, tiktokSales: 1380 },
  { date: '2024-03-10', label: 'Mar 10', metaSpend: 1380, googleSpend: 1020, tiktokSpend: 400, metaSales: 5790, googleSales: 4280, tiktokSales: 1320 },
  { date: '2024-03-11', label: 'Mar 11', metaSpend: 1600, googleSpend: 1180, tiktokSpend: 450, metaSales: 7040, googleSales: 4950, tiktokSales: 1490 },
  { date: '2024-03-12', label: 'Mar 12', metaSpend: 1720, googleSpend: 1300, tiktokSpend: 490, metaSales: 7560, googleSales: 5460, tiktokSales: 1620 },
  { date: '2024-03-13', label: 'Mar 13', metaSpend: 1680, googleSpend: 1240, tiktokSpend: 480, metaSales: 7220, googleSales: 5200, tiktokSales: 1580 },
  { date: '2024-03-14', label: 'Mar 14', metaSpend: 1550, googleSpend: 1150, tiktokSpend: 430, metaSales: 6510, googleSales: 4830, tiktokSales: 1420 },
  { date: '2024-03-15', label: 'Mar 15', metaSpend: 1820, googleSpend: 1380, tiktokSpend: 520, metaSales: 8190, googleSales: 6070, tiktokSales: 1820 },
];

export interface CampaignSummary {
  id: string;
  name: string;
  platform: 'Meta' | 'Google' | 'TikTok';
  status: 'active' | 'paused';
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  attributedSales: number;
  roas: number;
  cpc: number;
  ctr: number;
}

export const campaignSummaries: CampaignSummary[] = [
  { id: 'camp-001', name: 'Retargeting - Warm Audiences', platform: 'Meta', status: 'active', spend: 8450, impressions: 285000, clicks: 8550, conversions: 425, attributedSales: 42350, roas: 5.01, cpc: 0.99, ctr: 3.0 },
  { id: 'camp-002', name: 'Prospecting - Lookalike 1%', platform: 'Meta', status: 'active', spend: 6200, impressions: 420000, clicks: 4200, conversions: 210, attributedSales: 21500, roas: 3.47, cpc: 1.48, ctr: 1.0 },
  { id: 'camp-003', name: 'Brand Awareness - Video', platform: 'Meta', status: 'paused', spend: 3800, impressions: 650000, clicks: 1900, conversions: 85, attributedSales: 7200, roas: 1.89, cpc: 2.00, ctr: 0.3 },
  { id: 'camp-004', name: 'Search - Brand Terms', platform: 'Google', status: 'active', spend: 5400, impressions: 182000, clicks: 9100, conversions: 380, attributedSales: 32100, roas: 5.94, cpc: 0.59, ctr: 5.0 },
  { id: 'camp-005', name: 'Shopping - Product Feed', platform: 'Google', status: 'active', spend: 7200, impressions: 145000, clicks: 5800, conversions: 290, attributedSales: 28900, roas: 4.01, cpc: 1.24, ctr: 4.0 },
  { id: 'camp-006', name: 'Performance Max', platform: 'Google', status: 'active', spend: 4500, impressions: 310000, clicks: 3600, conversions: 175, attributedSales: 15350, roas: 3.41, cpc: 1.25, ctr: 1.2 },
  { id: 'camp-007', name: 'TikTok - Viral Content', platform: 'TikTok', status: 'active', spend: 2800, impressions: 520000, clicks: 5200, conversions: 145, attributedSales: 8500, roas: 3.04, cpc: 0.54, ctr: 1.0 },
  { id: 'camp-008', name: 'TikTok - Promo Offers', platform: 'TikTok', status: 'active', spend: 2150, impressions: 380000, clicks: 3800, conversions: 98, attributedSales: 5800, roas: 2.70, cpc: 0.57, ctr: 1.0 },
];

export const adPlatformColors: Record<string, string> = {
  Meta: '#1877F2',
  Google: '#4285F4',
  TikTok: '#EE1D52',
};

// ─── Inventory / Warehouse Data ──────────────────────────────────────────

export type WarehouseType = 'fba' | '3pl' | 'in-house';
export type InventoryClass = 'A' | 'B' | 'C';
export type DosStatus = 'critical' | 'low' | 'healthy' | 'overstock';

export interface InventorySku {
  id: string;
  sku: string;
  productName: string;
  class: InventoryClass;
  warehouse: WarehouseType;
  onHand: number;
  available: number;
  inTransit: number;
  reserved: number;
  damaged: number;
  averageDailySales: number;
  daysOfSupply: number;
  dosStatus: DosStatus;
  leadTimeDays: number;
  safetyStockDays: number;
  restockRecommended: number;
  unitCost: number;
  unitPrice: number;
  supplier: string;
  moq: number;
  casePack: number;
}

export const inventorySkus: InventorySku[] = [
  { id: 'inv-001', sku: 'HD-RED-001', productName: 'Premium Hoodie - Red', class: 'A', warehouse: '3pl', onHand: 125, available: 118, inTransit: 200, reserved: 7, damaged: 2, averageDailySales: 11.4, daysOfSupply: 10.4, dosStatus: 'low', leadTimeDays: 14, safetyStockDays: 7, restockRecommended: 132, unitCost: 18.50, unitPrice: 59.99, supplier: 'ApparelPro Co.', moq: 50, casePack: 25 },
  { id: 'inv-002', sku: 'HD-RED-001', productName: 'Premium Hoodie - Red', class: 'A', warehouse: 'fba', onHand: 340, available: 310, inTransit: 0, reserved: 30, damaged: 5, averageDailySales: 8.2, daysOfSupply: 37.8, dosStatus: 'healthy', leadTimeDays: 10, safetyStockDays: 5, restockRecommended: 0, unitCost: 18.50, unitPrice: 59.99, supplier: 'ApparelPro Co.', moq: 50, casePack: 25 },
  { id: 'inv-003', sku: 'RS-BLK-002', productName: 'Running Shoes - Black', class: 'A', warehouse: 'fba', onHand: 78, available: 72, inTransit: 150, reserved: 6, damaged: 1, averageDailySales: 7.2, daysOfSupply: 10.0, dosStatus: 'low', leadTimeDays: 21, safetyStockDays: 10, restockRecommended: 151, unitCost: 32.00, unitPrice: 89.99, supplier: 'SoleSource Inc.', moq: 100, casePack: 12 },
  { id: 'inv-004', sku: 'YM-BND-003', productName: 'Yoga Mat Bundle', class: 'B', warehouse: '3pl', onHand: 210, available: 195, inTransit: 0, reserved: 15, damaged: 0, averageDailySales: 6.3, daysOfSupply: 31.0, dosStatus: 'healthy', leadTimeDays: 10, safetyStockDays: 5, restockRecommended: 0, unitCost: 12.75, unitPrice: 45.00, supplier: 'Wellness Wholesale', moq: 200, casePack: 50 },
  { id: 'inv-005', sku: 'WB-SET-004', productName: 'Water Bottle Set', class: 'B', warehouse: '3pl', onHand: 340, available: 325, inTransit: 500, reserved: 15, damaged: 3, averageDailySales: 17.3, daysOfSupply: 18.8, dosStatus: 'healthy', leadTimeDays: 7, safetyStockDays: 3, restockRecommended: 0, unitCost: 6.80, unitPrice: 24.99, supplier: 'EcoGoods Ltd.', moq: 500, casePack: 100 },
  { id: 'inv-006', sku: 'JK-WHT-005', productName: 'Winter Jacket - White', class: 'A', warehouse: 'fba', onHand: 45, available: 40, inTransit: 0, reserved: 5, damaged: 0, averageDailySales: 3.3, daysOfSupply: 12.1, dosStatus: 'low', leadTimeDays: 30, safetyStockDays: 14, restockRecommended: 145, unitCost: 55.00, unitPrice: 149.99, supplier: 'Outerwear Direct', moq: 100, casePack: 20 },
  { id: 'inv-007', sku: 'CP-MUG-006', productName: 'Ceramic Coffee Mug', class: 'C', warehouse: 'in-house', onHand: 890, available: 870, inTransit: 0, reserved: 20, damaged: 8, averageDailySales: 12.1, daysOfSupply: 71.9, dosStatus: 'overstock', leadTimeDays: 5, safetyStockDays: 3, restockRecommended: 0, unitCost: 3.20, unitPrice: 14.99, supplier: 'Ceramic Works', moq: 1000, casePack: 48 },
  { id: 'inv-008', sku: 'SS-TOTE-007', productName: 'Canvas Shopping Tote', class: 'C', warehouse: '3pl', onHand: 560, available: 540, inTransit: 0, reserved: 20, damaged: 5, averageDailySales: 5.8, daysOfSupply: 93.1, dosStatus: 'overstock', leadTimeDays: 7, safetyStockDays: 3, restockRecommended: 0, unitCost: 4.50, unitPrice: 19.99, supplier: 'BagMakers Inc.', moq: 500, casePack: 50 },
  { id: 'inv-009', sku: 'FT-BAND-008', productName: 'Fitness Resistance Bands', class: 'C', warehouse: 'fba', onHand: 12, available: 10, inTransit: 0, reserved: 2, damaged: 0, averageDailySales: 4.8, daysOfSupply: 2.1, dosStatus: 'critical', leadTimeDays: 10, safetyStockDays: 5, restockRecommended: 67, unitCost: 2.90, unitPrice: 12.99, supplier: 'FitGear Supply', moq: 100, casePack: 25 },
  { id: 'inv-010', sku: 'FB-SUP-009', productName: 'FBA Bundle - Supplements', class: 'A', warehouse: 'fba', onHand: 520, available: 480, inTransit: 300, reserved: 40, damaged: 5, averageDailySales: 22.5, daysOfSupply: 21.3, dosStatus: 'healthy', leadTimeDays: 14, safetyStockDays: 7, restockRecommended: 0, unitCost: 15.00, unitPrice: 39.99, supplier: 'NutraMax', moq: 200, casePack: 50 },
  { id: 'inv-011', sku: 'ECO-BAG-010', productName: 'Eco-Friendly Shopping Bag', class: 'C', warehouse: 'in-house', onHand: 6, available: 4, inTransit: 100, reserved: 2, damaged: 0, averageDailySales: 2.1, daysOfSupply: 1.9, dosStatus: 'critical', leadTimeDays: 14, safetyStockDays: 7, restockRecommended: 32, unitCost: 1.80, unitPrice: 8.99, supplier: 'EcoGoods Ltd.', moq: 200, casePack: 100 },
  { id: 'inv-012', sku: 'DT-SUB-011', productName: 'DTC Subscription Box', class: 'A', warehouse: '3pl', onHand: 0, available: 0, inTransit: 600, reserved: 0, damaged: 0, averageDailySales: 28.5, daysOfSupply: 0, dosStatus: 'critical', leadTimeDays: 7, safetyStockDays: 3, restockRecommended: 200, unitCost: 22.00, unitPrice: 49.99, supplier: 'BoxCo Logistics', moq: 500, casePack: 50 },
];

export interface InboundShipment {
  id: string;
  sku: string;
  productName: string;
  warehouse: WarehouseType;
  quantity: number;
  expectedDate: string;
  status: 'in-transit' | 'processing' | 'delayed';
  supplier: string;
  etaDays: number;
}

export const inboundShipments: InboundShipment[] = [
  { id: 'po-001', sku: 'HD-RED-001', productName: 'Premium Hoodie - Red', warehouse: '3pl', quantity: 200, expectedDate: '2024-04-05', status: 'in-transit', supplier: 'ApparelPro Co.', etaDays: 5 },
  { id: 'po-002', sku: 'RS-BLK-002', productName: 'Running Shoes - Black', warehouse: 'fba', quantity: 150, expectedDate: '2024-04-12', status: 'in-transit', supplier: 'SoleSource Inc.', etaDays: 12 },
  { id: 'po-003', sku: 'WB-SET-004', productName: 'Water Bottle Set', warehouse: '3pl', quantity: 500, expectedDate: '2024-04-08', status: 'processing', supplier: 'EcoGoods Ltd.', etaDays: 8 },
  { id: 'po-004', sku: 'ECO-BAG-010', productName: 'Eco-Friendly Shopping Bag', warehouse: 'in-house', quantity: 100, expectedDate: '2024-04-15', status: 'delayed', supplier: 'EcoGoods Ltd.', etaDays: 15 },
  { id: 'po-005', sku: 'DT-SUB-011', productName: 'DTC Subscription Box', warehouse: '3pl', quantity: 600, expectedDate: '2024-04-03', status: 'processing', supplier: 'BoxCo Logistics', etaDays: 3 },
];

// ─── Expense Management Data ─────────────────────────────────────────────

export type ExpenseStatus = 'pending' | 'categorized' | 'ignored';
export type ExpenseCategory = 'Marketing' | 'Software & SaaS' | 'Shipping' | 'Payroll' | 'Rent & Facilities' | 'Bank Fees' | 'Utilities' | 'Office Supplies' | 'Travel' | 'Professional Services' | 'Taxes' | 'Other';

export interface ExpenseRecord {
  id: string;
  date: string;
  description: string;
  category: ExpenseCategory | null;
  subCategory: string | null;
  grossAmount: number;
  currency: string;
  baseCurrencyAmount: number;
  fxRate: number;
  status: ExpenseStatus;
  bankName: string;
}

export interface ExpenseCategorySummary {
  category: ExpenseCategory;
  total: number;
  count: number;
  percentage: number;
  color: string;
}

export const expenseCategories: ExpenseCategory[] = [
  'Marketing', 'Software & SaaS', 'Shipping', 'Payroll', 'Rent & Facilities',
  'Bank Fees', 'Utilities', 'Office Supplies', 'Travel', 'Professional Services', 'Taxes', 'Other',
];

const categoryColors: Record<string, string> = {
  Marketing: '#f59e0b',
  'Software & SaaS': '#6366f1',
  Shipping: '#06b6d4',
  Payroll: '#10b981',
  'Rent & Facilities': '#ef4444',
  'Bank Fees': '#8b5cf6',
  Utilities: '#f97316',
  'Office Supplies': '#14b8a6',
  Travel: '#ec4899',
  'Professional Services': '#0ea5e9',
  Taxes: '#dc2626',
  Other: '#94a3b8',
};

export const mockExpenses: ExpenseRecord[] = [
  { id: 'exp-001', date: '2024-03-01', description: 'SHOPIFY SUBSCRIPTION - MARCH', category: 'Software & SaaS', subCategory: 'E-commerce Platform', grossAmount: 79.00, currency: 'USD', baseCurrencyAmount: 79.00, fxRate: 1.0, status: 'categorized', bankName: 'Chase Business' },
  { id: 'exp-002', date: '2024-03-01', description: 'GOOGLE *ADS 123-456-7890', category: 'Marketing', subCategory: 'Search Ads', grossAmount: 1250.00, currency: 'USD', baseCurrencyAmount: 1250.00, fxRate: 1.0, status: 'categorized', bankName: 'Chase Business' },
  { id: 'exp-003', date: '2024-03-02', description: 'FACEBOOK ADS *META PLATFORMS', category: 'Marketing', subCategory: 'Social Media Ads', grossAmount: 1850.00, currency: 'USD', baseCurrencyAmount: 1850.00, fxRate: 1.0, status: 'categorized', bankName: 'Chase Business' },
  { id: 'exp-004', date: '2024-03-03', description: 'SHIPPO SHIPPING - LABEL #12345', category: 'Shipping', subCategory: 'Logistics & Fulfillment', grossAmount: 342.50, currency: 'USD', baseCurrencyAmount: 342.50, fxRate: 1.0, status: 'categorized', bankName: 'Chase Business' },
  { id: 'exp-005', date: '2024-03-05', description: 'KLAVIYO MONTHLY SUBSCRIPTION', category: 'Software & SaaS', subCategory: 'Email Marketing', grossAmount: 150.00, currency: 'USD', baseCurrencyAmount: 150.00, fxRate: 1.0, status: 'categorized', bankName: 'Chase Business' },
  { id: 'exp-006', date: '2024-03-05', description: 'GUSTO PAYROLL - PERIOD ENDING 3/1', category: 'Payroll', subCategory: 'Salaries & Wages', grossAmount: 5200.00, currency: 'USD', baseCurrencyAmount: 5200.00, fxRate: 1.0, status: 'categorized', bankName: 'Chase Business' },
  { id: 'exp-007', date: '2024-03-07', description: 'WAREHOUSE RENT - MARCH', category: 'Rent & Facilities', subCategory: null, grossAmount: 2800.00, currency: 'USD', baseCurrencyAmount: 2800.00, fxRate: 1.0, status: 'categorized', bankName: 'Chase Business' },
  { id: 'exp-008', date: '2024-03-08', description: 'TRANSFERWISE EUR->USD CONV', category: 'Bank Fees', subCategory: 'Currency Conversion', grossAmount: 45.00, currency: 'USD', baseCurrencyAmount: 45.00, fxRate: 1.0, status: 'categorized', bankName: 'Chase Business' },
  { id: 'exp-009', date: '2024-03-10', description: 'AMAZON SELLER FEES - MARCH', category: 'Marketing', subCategory: 'Marketplace Ads', grossAmount: 450.00, currency: 'USD', baseCurrencyAmount: 450.00, fxRate: 1.0, status: 'categorized', bankName: 'Chase Business' },
  { id: 'exp-010', date: '2024-03-12', description: 'PIRATE SHIP - LABEL PKG-123', category: 'Shipping', subCategory: 'Logistics & Fulfillment', grossAmount: 28.75, currency: 'USD', baseCurrencyAmount: 28.75, fxRate: 1.0, status: 'categorized', bankName: 'Chase Business' },
  { id: 'exp-011', date: '2024-03-15', description: 'WALMART BUSINESS PURCHASE', category: null, subCategory: null, grossAmount: 156.32, currency: 'USD', baseCurrencyAmount: 156.32, fxRate: 1.0, status: 'pending', bankName: 'Chase Business' },
  { id: 'exp-012', date: '2024-03-16', description: 'LOCAL PRINTER CO - INVOICE 889', category: null, subCategory: null, grossAmount: 320.00, currency: 'USD', baseCurrencyAmount: 320.00, fxRate: 1.0, status: 'pending', bankName: 'Chase Business' },
  { id: 'exp-013', date: '2024-03-18', description: 'STAPLES OFFICE SUPPLIES', category: 'Office Supplies', subCategory: null, grossAmount: 89.50, currency: 'USD', baseCurrencyAmount: 89.50, fxRate: 1.0, status: 'pending', bankName: 'Chase Business' },
  { id: 'exp-014', date: '2024-03-20', description: 'ACCOUNTING FIRM - MONTHLY RETAINER', category: null, subCategory: null, grossAmount: 500.00, currency: 'USD', baseCurrencyAmount: 500.00, fxRate: 1.0, status: 'pending', bankName: 'BofA Business' },
  { id: 'exp-015', date: '2024-03-22', description: 'AMAZON AWS - CLOUD HOSTING', category: null, subCategory: null, grossAmount: 234.80, currency: 'USD', baseCurrencyAmount: 234.80, fxRate: 1.0, status: 'pending', bankName: 'BofA Business' },
  { id: 'exp-016', date: '2024-03-25', description: 'CITY ELECTRIC BILL - MARCH', category: 'Utilities', subCategory: null, grossAmount: 412.00, currency: 'USD', baseCurrencyAmount: 412.00, fxRate: 1.0, status: 'pending', bankName: 'BofA Business' },
  { id: 'exp-017', date: '2024-03-28', description: 'TIKTOK ADS MANAGER', category: null, subCategory: null, grossAmount: 830.00, currency: 'USD', baseCurrencyAmount: 830.00, fxRate: 1.0, status: 'pending', bankName: 'BofA Business' },
  { id: 'exp-018', date: '2024-03-30', description: 'QUICKBOOKS SUBSCRIPTION', category: null, subCategory: null, grossAmount: 85.00, currency: 'USD', baseCurrencyAmount: 85.00, fxRate: 1.0, status: 'pending', bankName: 'BofA Business' },
];

export function getExpenseCategorySummary(): ExpenseCategorySummary[] {
  const categorized = mockExpenses.filter(e => e.status === 'categorized' && e.category);
  const total = categorized.reduce((s, e) => s + e.baseCurrencyAmount, 0);
  const grouped: Record<string, { total: number; count: number }> = {};
  categorized.forEach(e => {
    const cat = e.category!;
    if (!grouped[cat]) grouped[cat] = { total: 0, count: 0 };
    grouped[cat].total += e.baseCurrencyAmount;
    grouped[cat].count += 1;
  });
  return Object.entries(grouped).map(([category, data]) => ({
    category: category as ExpenseCategory,
    total: data.total,
    count: data.count,
    percentage: Math.round((data.total / total) * 100),
    color: categoryColors[category] || '#94a3b8',
  })).sort((a, b) => b.total - a.total);
}

// ─── Sales Tax Nexus Data ────────────────────────────────────────────────

export type NexusStatus = 'safe' | 'warning' | 'nexus_reached' | 'no_tax';

export interface StateNexus {
  stateCode: string;
  stateName: string;
  thresholdRevenue: number;
  thresholdTransactions: number | null;
  currentRevenue: number;
  currentTransactions: number;
  revenuePct: number;
  transactionPct: number | null;
  status: NexusStatus;
  category: 'standard' | 'revenue_only' | 'high' | 'complex' | 'no_tax';
}

export const stateNexusData: StateNexus[] = [
  { stateCode: 'CA', stateName: 'California', thresholdRevenue: 500000, thresholdTransactions: null, currentRevenue: 342500, currentTransactions: 2450, revenuePct: 68.5, transactionPct: null, status: 'safe', category: 'high' },
  { stateCode: 'TX', stateName: 'Texas', thresholdRevenue: 500000, thresholdTransactions: null, currentRevenue: 489000, currentTransactions: 3200, revenuePct: 97.8, transactionPct: null, status: 'warning', category: 'high' },
  { stateCode: 'NY', stateName: 'New York', thresholdRevenue: 500000, thresholdTransactions: 100, currentRevenue: 312000, currentTransactions: 1800, revenuePct: 62.4, transactionPct: 1800, status: 'safe', category: 'complex' },
  { stateCode: 'FL', stateName: 'Florida', thresholdRevenue: 100000, thresholdTransactions: null, currentRevenue: 145000, currentTransactions: 980, revenuePct: 145, transactionPct: null, status: 'nexus_reached', category: 'revenue_only' },
  { stateCode: 'IL', stateName: 'Illinois', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 132000, currentTransactions: 890, revenuePct: 132, transactionPct: 445, status: 'nexus_reached', category: 'standard' },
  { stateCode: 'GA', stateName: 'Georgia', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 98000, currentTransactions: 650, revenuePct: 98, transactionPct: 325, status: 'warning', category: 'standard' },
  { stateCode: 'WA', stateName: 'Washington', thresholdRevenue: 100000, thresholdTransactions: null, currentRevenue: 165000, currentTransactions: 1100, revenuePct: 165, transactionPct: null, status: 'nexus_reached', category: 'revenue_only' },
  { stateCode: 'AZ', stateName: 'Arizona', thresholdRevenue: 100000, thresholdTransactions: null, currentRevenue: 62000, currentTransactions: 410, revenuePct: 62, transactionPct: null, status: 'safe', category: 'revenue_only' },
  { stateCode: 'CO', stateName: 'Colorado', thresholdRevenue: 100000, thresholdTransactions: null, currentRevenue: 85000, currentTransactions: 560, revenuePct: 85, transactionPct: null, status: 'warning', category: 'revenue_only' },
  { stateCode: 'NJ', stateName: 'New Jersey', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 120000, currentTransactions: 780, revenuePct: 120, transactionPct: 390, status: 'nexus_reached', category: 'standard' },
  { stateCode: 'PA', stateName: 'Pennsylvania', thresholdRevenue: 100000, thresholdTransactions: null, currentRevenue: 44000, currentTransactions: 290, revenuePct: 44, transactionPct: null, status: 'safe', category: 'revenue_only' },
  { stateCode: 'OH', stateName: 'Ohio', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 76000, currentTransactions: 510, revenuePct: 76, transactionPct: 255, status: 'safe', category: 'standard' },
  { stateCode: 'MI', stateName: 'Michigan', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 95000, currentTransactions: 630, revenuePct: 95, transactionPct: 315, status: 'warning', category: 'standard' },
  { stateCode: 'NC', stateName: 'North Carolina', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 81000, currentTransactions: 540, revenuePct: 81, transactionPct: 270, status: 'warning', category: 'standard' },
  { stateCode: 'TN', stateName: 'Tennessee', thresholdRevenue: 100000, thresholdTransactions: null, currentRevenue: 58000, currentTransactions: 380, revenuePct: 58, transactionPct: null, status: 'safe', category: 'revenue_only' },
  { stateCode: 'VA', stateName: 'Virginia', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 67000, currentTransactions: 450, revenuePct: 67, transactionPct: 225, status: 'safe', category: 'standard' },
  { stateCode: 'IN', stateName: 'Indiana', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 41000, currentTransactions: 270, revenuePct: 41, transactionPct: 135, status: 'safe', category: 'standard' },
  { stateCode: 'MA', stateName: 'Massachusetts', thresholdRevenue: 100000, thresholdTransactions: null, currentRevenue: 112000, currentTransactions: 740, revenuePct: 112, transactionPct: null, status: 'nexus_reached', category: 'revenue_only' },
  { stateCode: 'WI', stateName: 'Wisconsin', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 35000, currentTransactions: 230, revenuePct: 35, transactionPct: 115, status: 'safe', category: 'standard' },
  { stateCode: 'MN', stateName: 'Minnesota', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 92000, currentTransactions: 610, revenuePct: 92, transactionPct: 305, status: 'warning', category: 'standard' },
  { stateCode: 'MO', stateName: 'Missouri', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 28000, currentTransactions: 180, revenuePct: 28, transactionPct: 90, status: 'safe', category: 'standard' },
  { stateCode: 'MD', stateName: 'Maryland', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 53000, currentTransactions: 350, revenuePct: 53, transactionPct: 175, status: 'safe', category: 'standard' },
  { stateCode: 'SC', stateName: 'South Carolina', thresholdRevenue: 100000, thresholdTransactions: null, currentRevenue: 22000, currentTransactions: 140, revenuePct: 22, transactionPct: null, status: 'safe', category: 'revenue_only' },
  { stateCode: 'AL', stateName: 'Alabama', thresholdRevenue: 100000, thresholdTransactions: null, currentRevenue: 18000, currentTransactions: 120, revenuePct: 18, transactionPct: null, status: 'safe', category: 'revenue_only' },
  { stateCode: 'KY', stateName: 'Kentucky', thresholdRevenue: 100000, thresholdTransactions: 200, currentRevenue: 15000, currentTransactions: 100, revenuePct: 15, transactionPct: 50, status: 'safe', category: 'standard' },
  { stateCode: 'OR', stateName: 'Oregon', thresholdRevenue: 0, thresholdTransactions: 0, currentRevenue: 0, currentTransactions: 0, revenuePct: 0, transactionPct: 0, status: 'no_tax', category: 'no_tax' },
  { stateCode: 'AK', stateName: 'Alaska', thresholdRevenue: 0, thresholdTransactions: 0, currentRevenue: 0, currentTransactions: 0, revenuePct: 0, transactionPct: 0, status: 'no_tax', category: 'no_tax' },
  { stateCode: 'DE', stateName: 'Delaware', thresholdRevenue: 0, thresholdTransactions: 0, currentRevenue: 0, currentTransactions: 0, revenuePct: 0, transactionPct: 0, status: 'no_tax', category: 'no_tax' },
  { stateCode: 'MT', stateName: 'Montana', thresholdRevenue: 0, thresholdTransactions: 0, currentRevenue: 0, currentTransactions: 0, revenuePct: 0, transactionPct: 0, status: 'no_tax', category: 'no_tax' },
  { stateCode: 'NH', stateName: 'New Hampshire', thresholdRevenue: 0, thresholdTransactions: 0, currentRevenue: 0, currentTransactions: 0, revenuePct: 0, transactionPct: 0, status: 'no_tax', category: 'no_tax' },
];

// ─── Cash Flow Simulation Data ───────────────────────────────────────────

export interface CashFlowDay {
  day: number;
  date: string;
  label: string;
  projectedBalance: number;
  confidenceLow: number;
  confidenceHigh: number;
  events: CashFlowEvent[];
}

export interface CashFlowEvent {
  type: 'stockout' | 'reorder' | 'payout' | 'runway_end';
  label: string;
  amount?: number;
}

export interface ScenarioParams {
  adSpendAdjustPct: number;
  expectedRoas: number;
  leadTimeBufferDays: number;
}

export function generateCashFlowData(params: ScenarioParams): { days: CashFlowDay[]; confidenceScore: number; currentBalance: number } {
  const days: CashFlowDay[] = [];
  const currentBalance = 87500;
  const baseDailyRevenue = 8200;
  const baseDailyAdSpend = 1400;
  const baseDailyOpEx = 450;
  const baseDailyCOGS = 3400;

  const adMultiplier = 1 + (params.adSpendAdjustPct / 100);
  const dailyAdSpend = baseDailyAdSpend * adMultiplier;
  const dailyRevenue = baseDailyRevenue * adMultiplier * (params.expectedRoas / 3.8);
  const dailyCOGS = baseDailyCOGS * adMultiplier * 0.7;

  let balance = currentBalance;

  for (let d = 0; d < 90; d++) {
    const date = new Date(2024, 3, 1 + d);
    const dateStr = date.toISOString().split('T')[0];
    const events: CashFlowEvent[] = [];

    // Daily inflows/outflows
    balance += dailyRevenue - dailyCOGS - dailyAdSpend - baseDailyOpEx;

    // Bi-weekly Amazon payout (days 7, 21, 35, 49, 63, 77)
    if (d > 0 && d % 14 === 7) {
      const payout = Math.round(dailyRevenue * 7 * 0.85);
      balance += payout;
      events.push({ type: 'payout', label: `Amazon Payout ~${(payout / 1000).toFixed(0)}K`, amount: payout });
    }

    // Reorder points (days 15, 45, 72)
    if (d === 15) {
      const cost = 28500 + (params.leadTimeBufferDays * 500);
      balance -= cost;
      events.push({ type: 'reorder', label: `Inventory Reorder ${(cost / 1000).toFixed(0)}K`, amount: cost });
    }
    if (d === 45) { balance -= 32000; events.push({ type: 'reorder', label: 'Inventory Reorder $32K', amount: 32000 }); }
    if (d === 72) { balance -= 38000; events.push({ type: 'reorder', label: 'Inventory Reorder $38K', amount: 38000 }); }

    // Stockout events
    if (d === 28) events.push({ type: 'stockout', label: 'Predicted Stockout - Bestseller SKU' });
    if (d === 62) events.push({ type: 'stockout', label: 'Predicted Stockout - Seasonal Item' });

    // Runway end
    if (balance <= 0 && events.length === 0) {
      events.push({ type: 'runway_end', label: 'Cash Runway End — Balance $0' });
    }

    balance = Math.round(balance);

    const variance = 1 + (params.expectedRoas / 5) * (1 - params.adSpendAdjustPct / 100) * 0.15;
    const ciBand = Math.round(Math.abs(balance) * variance * 0.15);

    days.push({
      day: d,
      date: dateStr,
      label: d % 15 === 0 ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
      projectedBalance: Math.max(balance, -50000),
      confidenceLow: Math.max(balance - ciBand, -60000),
      confidenceHigh: balance + ciBand,
      events,
    });
  }

  // Confidence score based on data quality
  const confidenceScore = Math.round(
    85
    - Math.max(0, (params.adSpendAdjustPct - 10) * 0.5)
    - Math.max(0, (4 - params.expectedRoas) * 5)
    - params.leadTimeBufferDays * 0.5
  );

  return { days, confidenceScore: Math.max(10, Math.min(99, confidenceScore)), currentBalance };
}

export const defaultScenarioParams: ScenarioParams = {
  adSpendAdjustPct: 0,
  expectedRoas: 3.8,
  leadTimeBufferDays: 0,
};
