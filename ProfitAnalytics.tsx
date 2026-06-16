'use client';

import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts';
import {
  TrendingUp, DollarSign, Percent, Layers, Wifi, WifiOff,
} from 'lucide-react';
import { useMonthlyProfit } from '@/lib/api-hooks';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

const formatCurrencyShort = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-4 text-sm">
        <p className="font-semibold text-slate-900 mb-2">{label}</p>
        {payload.map((entry: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 py-0.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-medium text-slate-900">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-4 text-sm">
        <p className="font-semibold text-slate-900 mb-1">{d.platform}</p>
        <p className="text-slate-600">Net Profit: <span className="font-medium text-slate-900">{formatCurrency(d.netProfit)}</span></p>
        <p className="text-slate-600">Revenue: <span className="font-medium text-slate-900">{formatCurrency(d.revenue)}</span></p>
      </div>
    );
  }
  return null;
};

export default function ProfitAnalytics() {
  const { data: profitData, isLoading, isLive } = useMonthlyProfit();
  const monthlyProfitData = profitData?.monthly ?? profitData as any;
  const platformBreakdown = profitData?.platforms ?? [];

  const [chartMetric, setChartMetric] = useState<'netRevenue' | 'grossSales' | 'platformFees' | 'cogs'>('netRevenue');

  const latestMonth = monthlyProfitData[monthlyProfitData.length - 1];
  const prevMonth = monthlyProfitData[monthlyProfitData.length - 2];
  const revenueGrowth = ((latestMonth.netRevenue - prevMonth.netRevenue) / prevMonth.netRevenue * 100).toFixed(1);
  const totalRevenue = monthlyProfitData.reduce((sum: number, m: any) => sum + m.netRevenue, 0);
  const totalFees = monthlyProfitData.reduce((sum: number, m: any) => sum + m.platformFees, 0);
  const avgMargin = (monthlyProfitData.reduce((sum: number, m: any) => sum + (m.netRevenue / m.grossSales), 0) / monthlyProfitData.length * 100).toFixed(1);

  const metricConfig: Record<string, { label: string; color: string; areaColor: string }> = {
    netRevenue: { label: 'Net Profit', color: '#10b981', areaColor: '#10b981' },
    grossSales: { label: 'Gross Revenue', color: '#6366f1', areaColor: '#6366f1' },
    platformFees: { label: 'Platform Fees', color: '#f59e0b', areaColor: '#f59e0b' },
    cogs: { label: 'COGS', color: '#ef4444', areaColor: '#ef4444' },
  };

  const mc = metricConfig[chartMetric];

  // Build stacked bar data
  const stackedData = monthlyProfitData.map((m: any) => ({
    label: m.label,
    'Net Profit': m.netRevenue,
    'Platform Fees': m.platformFees,
    'COGS': m.cogs,
  }));

  return (
    <div className="space-y-6">
      {/* Live status badge */}
      <div className="flex items-center justify-end">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          isLive
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-amber-50 text-amber-700'
        }`}>
          {isLive ? <Wifi size={12} /> : <WifiOff size={12} />}
          {isLive ? 'Live Data' : 'Demo Data'}
        </span>
      </div>
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-emerald-100">
              <TrendingUp size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Net Profit (Dec)</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(latestMonth.netRevenue)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={14} className={parseFloat(revenueGrowth) >= 0 ? 'text-emerald-500' : 'text-red-500'} />
            <span className={`text-xs font-medium ${parseFloat(revenueGrowth) >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {revenueGrowth}% vs Nov
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-blue-100">
              <DollarSign size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">YTD Net Revenue</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs text-slate-400 mt-1">{monthlyProfitData.length} months tracked</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-amber-100">
              <Percent size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Avg. Net Margin</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{avgMargin}%</p>
          <p className="text-xs text-slate-400 mt-1">After fees & COGS</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-red-100">
              <Layers size={18} className="text-red-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Fees Paid</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalFees)}</p>
          <p className="text-xs text-slate-400 mt-1">Platform + Transaction fees (YTD)</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900">Revenue & Cost Trends</h3>
            <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
              {Object.entries(metricConfig).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setChartMetric(key as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    chartMetric === key
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyProfitData}>
                <defs>
                  <linearGradient id={`grad-${chartMetric}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={mc.areaColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={mc.areaColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <YAxis tickFormatter={formatCurrencyShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey={chartMetric} name={mc.label} stroke={mc.color} fill={`url(#grad-${chartMetric})`} strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stacked Revenue Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-6">Revenue Breakdown (Stacked)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stackedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <YAxis tickFormatter={formatCurrencyShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                />
                <Bar dataKey="COGS" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} name="COGS" />
                <Bar dataKey="Platform Fees" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} name="Platform Fees" />
                <Bar dataKey="Net Profit" stackId="a" fill="#10b981" radius={[2, 2, 0, 0]} name="Net Profit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-6">Profit by Platform</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 pb-3">Platform</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 pb-3">Revenue</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 pb-3">Fees</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 pb-3">COGS</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 pb-3">Net Profit</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 pb-3">Margin</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-slate-500 pb-3">Orders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {platformBreakdown.map((p) => {
                const margin = (p.netProfit / p.revenue * 100).toFixed(1);
                return (
                  <tr key={p.platform} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 pr-4">
                      <span className="text-sm font-medium text-slate-900">{p.platform}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="text-sm text-slate-700">{formatCurrency(p.revenue)}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="text-sm text-red-600">-{formatCurrency(p.fees)}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="text-sm text-amber-600">-{formatCurrency(p.cogs)}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="text-sm font-semibold text-emerald-600">{formatCurrency(p.netProfit)}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(parseFloat(margin), 60)}%` }} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{margin}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="text-sm text-slate-600">{p.orders.toLocaleString()}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Month-over-Month Revenue Line Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-2">Gross Sales vs Net Profit</h3>
        <p className="text-xs text-slate-400 mb-6">Compare top-line revenue with actual net profit after all deductions</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyProfitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
              <YAxis tickFormatter={formatCurrencyShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
              <Line type="monotone" dataKey="grossSales" name="Gross Sales" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="netRevenue" name="Net Profit" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}