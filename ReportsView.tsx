'use client';

import { useState } from 'react';
import {
  FileText, Download, Calendar, ChevronDown, Search, BarChart3, RefreshCw, CheckCircle2,
  AlertTriangle, TrendingUp, DollarSign, Package, Eye, FileDown, Printer,
} from 'lucide-react';
import { monthlyProfitData, platformBreakdown, payouts } from '@/data/mockData';

type ReportType = 'profitability' | 'reconciliation' | 'inventory';

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(v);

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// Mock inventory data
const mockInventory = [
  { sku: 'HD-RED-001', name: 'Premium Hoodie - Red', sold: 342, price: 59.99, cost: 18.50, stock: 125, allocation: 3200 },
  { sku: 'RS-BLK-002', name: 'Running Shoes - Black', sold: 215, price: 89.99, cost: 32.00, stock: 78, allocation: 4500 },
  { sku: 'YM-BND-003', name: 'Yoga Mat Bundle', sold: 189, price: 45.00, cost: 12.75, stock: 210, allocation: 2800 },
  { sku: 'WB-SET-004', name: 'Water Bottle Set', sold: 520, price: 24.99, cost: 6.80, stock: 340, allocation: 1800 },
  { sku: 'JK-WHT-005', name: 'Winter Jacket - White', sold: 98, price: 149.99, cost: 55.00, stock: 45, allocation: 3200 },
];

const reportDescriptions: Record<ReportType, string> = {
  profitability: 'View monthly profit and loss statements with revenue, COGS, expenses breakdowns.',
  reconciliation: 'Audit payout records against bank deposits to verify every dollar is accounted for.',
  inventory: 'Track product-level profitability, landed costs, and current inventory asset values.',
};

export default function ReportsView() {
  const [reportType, setReportType] = useState<ReportType>('profitability');
  const [selectedMonth, setSelectedMonth] = useState('2024-12');
  const [previewMode, setPreviewMode] = useState(true);
  const [copied, setCopied] = useState(false);

  const months = monthlyProfitData.map(m => ({ value: m.month, label: `${m.label} 2024` }));
  const currentMonthData = monthlyProfitData.find(m => m.month === selectedMonth) || monthlyProfitData[monthlyProfitData.length - 1];

  const totalAdSpend = 42150;
  const totalOpEx = 12340;
  const grossProfit = currentMonthData.netRevenue + currentMonthData.platformFees + currentMonthData.cogs;
  const netProfit = currentMonthData.netRevenue - totalAdSpend - totalOpEx;

  const handleCopyCSV = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-wrap items-center gap-4">
          {/* Report Type Selector */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1.5">Report Type</label>
            <div className="flex gap-2">
              {(['profitability', 'reconciliation', 'inventory'] as ReportType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setReportType(type)}
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    reportType === type
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type === 'profitability' ? 'Monthly P&L' : type === 'reconciliation' ? 'Reconciliation Audit' : 'Inventory / COGS'}
                </button>
              ))}
            </div>
          </div>

          {/* Month Selector */}
          {reportType !== 'reconciliation' && (
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1.5">Period</label>
              <select
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
              >
                {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
          )}

          {/* Preview Toggle */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1.5">&nbsp;</label>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                previewMode ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-600'
              }`}
            >
              <Eye size={16} />
              {previewMode ? 'Preview On' : 'Preview Off'}
            </button>
          </div>

          {/* Export */}
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-500 mb-1.5">&nbsp;</label>
            <button
              onClick={handleCopyCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              {copied ? <CheckCircle2 size={16} /> : <Download size={16} />}
              {copied ? 'Copied!' : 'Export CSV'}
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-3">{reportDescriptions[reportType]}</p>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Report Header */}
        <div className="px-8 py-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {reportType === 'profitability' && 'Monthly Profitability Report'}
                {reportType === 'reconciliation' && 'Reconciliation Audit Log'}
                {reportType === 'inventory' && 'Inventory & SKU Profitability Report'}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                <Calendar size={14} className="inline mr-1" />
                {reportType === 'reconciliation' ? 'March 2024' : months.find(m => m.value === selectedMonth)?.label || 'December 2024'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Printer size={16} /> Print
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <FileDown size={16} /> Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="px-8 py-6">
          {reportType === 'profitability' && (
            <div className="space-y-8">
              {/* Financial Summary */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">1. Financial Summary</h3>
                <div className="bg-slate-50 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm text-slate-700">Gross Sales</td>
                        <td className="px-6 py-3 text-sm text-right font-medium text-slate-900">{formatCurrency(currentMonthData.grossSales)}</td>
                      </tr>
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm text-slate-500">Discounts</td>
                        <td className="px-6 py-3 text-sm text-right text-red-600">({formatCurrency(currentMonthData.discounts)})</td>
                      </tr>
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm text-slate-500">Returns & Refunds</td>
                        <td className="px-6 py-3 text-sm text-right text-red-600">({formatCurrency(currentMonthData.grossSales - currentMonthData.netRevenue - currentMonthData.platformFees - currentMonthData.cogs)})</td>
                      </tr>
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm text-slate-500">Shipping Income</td>
                        <td className="px-6 py-3 text-sm text-right text-emerald-600">{formatCurrency(currentMonthData.shippingIncome)}</td>
                      </tr>
                      <tr className="border-t-2 border-slate-300">
                        <td className="px-6 py-3 text-sm font-semibold text-slate-900">Net Sales</td>
                        <td className="px-6 py-3 text-sm font-bold text-right text-slate-900">{formatCurrency(currentMonthData.grossSales - currentMonthData.discounts)}</td>
                      </tr>
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm text-slate-500">COGS</td>
                        <td className="px-6 py-3 text-sm text-right text-red-600">({formatCurrency(currentMonthData.cogs)})</td>
                      </tr>
                      <tr className="border-t-2 border-emerald-200 bg-emerald-50/50">
                        <td className="px-6 py-3 text-sm font-semibold text-emerald-800">Gross Profit</td>
                        <td className="px-6 py-3 text-sm font-bold text-right text-emerald-700">{formatCurrency(grossProfit)}</td>
                      </tr>
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm text-slate-500">Gross Margin %</td>
                        <td className="px-6 py-3 text-sm text-right font-medium text-slate-700">{((grossProfit / currentMonthData.grossSales) * 100).toFixed(1)}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Expenses */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">2. Expenses</h3>
                <div className="bg-slate-50 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm font-medium text-slate-700">Platform Fees</td>
                        <td className="px-6 py-3 text-sm text-right text-red-600">({formatCurrency(currentMonthData.platformFees)})</td>
                      </tr>
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm font-medium text-slate-700">Ad Spend (Total)</td>
                        <td className="px-6 py-3 text-sm text-right text-red-600">({formatCurrency(totalAdSpend)})</td>
                      </tr>
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm text-slate-500 pl-10">Meta Ads</td>
                        <td className="px-6 py-3 text-sm text-right text-slate-600">({formatCurrency(18200)})</td>
                      </tr>
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm text-slate-500 pl-10">Google Ads</td>
                        <td className="px-6 py-3 text-sm text-right text-slate-600">({formatCurrency(15650)})</td>
                      </tr>
                      <tr className="hover:bg-slate-100/50">
                        <td className="px-6 py-3 text-sm text-slate-500 pl-10">TikTok Ads</td>
                        <td className="px-6 py-3 text-sm text-right text-slate-600">({formatCurrency(8300)})</td>
                      </tr>
                      <tr className="border-t-2 border-slate-300">
                        <td className="px-6 py-3 text-sm font-semibold text-slate-900">Net Profit</td>
                        <td className="px-6 py-3 text-sm font-bold text-right text-slate-900">{formatCurrency(netProfit)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">ROAS</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">3.8x</p>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '76%' }} />
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Contribution Margin</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{((grossProfit / currentMonthData.grossSales) * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Customer Acquisition Cost</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">$18.42</p>
                </div>
              </div>
            </div>
          )}

          {reportType === 'reconciliation' && (
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Payout ID</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Bank Amount</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Order Total</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Fees</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Refunds</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Expected</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Difference</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payouts.map(p => {
                      const diff = p.bankAmount !== null ? +(p.bankAmount - p.netAmount).toFixed(2) : null;
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-sm text-slate-900">{p.payoutId}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{formatDate(p.platformDate)}</td>
                          <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">{p.bankAmount ? formatCurrency(p.bankAmount) : '—'}</td>
                          <td className="px-4 py-3 text-right text-sm text-slate-700">{formatCurrency(p.grossAmount)}</td>
                          <td className="px-4 py-3 text-right text-sm text-red-600">({formatCurrency(p.platformFees)})</td>
                          <td className="px-4 py-3 text-right text-sm text-red-600">({formatCurrency(Math.abs(p.adjustments))})</td>
                          <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">{formatCurrency(p.netAmount)}</td>
                          <td className={`px-4 py-3 text-right text-sm font-medium ${
                            diff === null ? 'text-slate-400' : diff === 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            {diff !== null ? (diff === 0 ? '$0.00' : formatCurrency(diff)) : '—'}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                              p.status === 'matched' ? 'bg-emerald-50 text-emerald-700' :
                              p.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                            }`}>
                              {p.status === 'matched' ? <CheckCircle2 size={12} /> :
                               p.status === 'pending' ? <RefreshCw size={12} /> : <AlertTriangle size={12} />}
                              {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {reportType === 'inventory' && (
            <div className="space-y-6">
              {/* Portfolio Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Inventory Value</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{formatCurrency(mockInventory.reduce((s, i) => s + i.stock * i.cost, 0))}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Avg. Gross Margin</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{((mockInventory.reduce((s, i) => s + (i.price - i.cost), 0) / mockInventory.reduce((s, i) => s + i.price, 0)) * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Units Sold</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{mockInventory.reduce((s, i) => s + i.sold, 0).toLocaleString()}</p>
                </div>
              </div>

              {/* SKU Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">SKU</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Product</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Units Sold</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Avg Price</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Landed Cost</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Gross Margin</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Net Profit (Est)</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Stock</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Asset Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockInventory.map(item => {
                      const margin = ((item.price - item.cost) / item.price * 100).toFixed(1);
                      const netProfit = (item.price - item.cost) * item.sold - item.allocation;
                      return (
                        <tr key={item.sku} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-sm text-slate-700">{item.sku}</td>
                          <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.name}</td>
                          <td className="px-4 py-3 text-right text-sm text-slate-700">{item.sold}</td>
                          <td className="px-4 py-3 text-right text-sm text-slate-700">{formatCurrency(item.price)}</td>
                          <td className="px-4 py-3 text-right text-sm text-slate-700">{formatCurrency(item.cost)}</td>
                          <td className="px-4 py-3 text-right">
                            <span className={`text-sm font-medium ${parseFloat(margin) >= 50 ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {margin}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`text-sm font-medium ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                              {formatCurrency(netProfit)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-slate-700">{item.stock}</td>
                          <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">
                            {formatCurrency(item.stock * item.cost)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Report Footer */}
        <div className="px-8 py-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-400">
          <span>Generated {new Date().toLocaleString()} • Data from Numeris Unified Database</span>
          <span className="font-medium text-slate-500">Valuation Method: Average Cost</span>
        </div>
      </div>
    </div>
  );
}