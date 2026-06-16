'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area,
} from 'recharts';
import {
  TrendingUp, MousePointer, Target, DollarSign, Play, Pause, Wifi, WifiOff,
} from 'lucide-react';
import { adPlatformColors, type CampaignSummary, type AdSpendDaily } from '@/data/mockData';
import { useAdSpend } from '@/lib/api-hooks';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

const formatCurrencyShort = (value: number) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const formatNumber = (value: number) => value.toLocaleString();

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

export default function AdSpendView() {
  const { daily: adSpendDaily, campaigns: campaignSummaries, isLoading, isLive } = useAdSpend();
  const [metricView, setMetricView] = useState<'spend' | 'roas'>('spend');

  // Aggregate platform totals
  const platformTotals = campaignSummaries.reduce((acc: Record<string, { spend: number; sales: number; impressions: number; clicks: number; conversions: number }>, camp: CampaignSummary) => {
    if (!acc[camp.platform]) acc[camp.platform] = { spend: 0, sales: 0, impressions: 0, clicks: 0, conversions: 0 };
    acc[camp.platform].spend += camp.spend;
    acc[camp.platform].sales += camp.attributedSales;
    acc[camp.platform].impressions += camp.impressions;
    acc[camp.platform].clicks += camp.clicks;
    acc[camp.platform].conversions += camp.conversions;
    return acc;
  }, {} as Record<string, { spend: number; sales: number; impressions: number; clicks: number; conversions: number }>);

  const platformChartData = (Object.entries(platformTotals) as [string, { spend: number; sales: number; impressions: number; clicks: number; conversions: number }][]).map(([platform, data]) => ({
    platform,
    spend: data.spend,
    sales: data.sales,
    roas: +(data.sales / data.spend).toFixed(2),
    impressions: data.impressions,
    clicks: data.clicks,
  }));

  // Daily aggregated data
  const dailyData: { label: string; totalSpend: number; totalSales: number; roas: number }[] = adSpendDaily.map((d: AdSpendDaily) => ({
    label: d.label,
    totalSpend: d.metaSpend + d.googleSpend + d.tiktokSpend,
    totalSales: d.metaSales + d.googleSales + d.tiktokSales,
    roas: +((d.metaSales + d.googleSales + d.tiktokSales) / (d.metaSpend + d.googleSpend + d.tiktokSpend)).toFixed(2),
  }));

  const totalSpend = campaignSummaries.reduce((s: number, c: CampaignSummary) => s + c.spend, 0);
  const totalSales = campaignSummaries.reduce((s: number, c: CampaignSummary) => s + c.attributedSales, 0);
  const overallRoas = (totalSales / totalSpend).toFixed(2);
  const totalImpressions = campaignSummaries.reduce((s: number, c: CampaignSummary) => s + c.impressions, 0);
  const totalClicks = campaignSummaries.reduce((s: number, c: CampaignSummary) => s + c.clicks, 0);
  const avgCpc = totalSpend / totalClicks;

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-red-100">
              <DollarSign size={18} className="text-red-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Ad Spend</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalSpend)}</p>
          <p className="text-xs text-slate-400 mt-1">Across all platforms (MTD)</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-emerald-100">
              <TrendingUp size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Attributed Sales</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalSales)}</p>
          <p className="text-xs text-slate-400 mt-1">Platform-attributed revenue</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-blue-100">
              <Target size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Blended ROAS</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{overallRoas}x</p>
          <p className="text-xs text-slate-400 mt-1">Return on ad spend</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-purple-100">
              <MousePointer size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Avg. CPC</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(avgCpc)}</p>
          <p className="text-xs text-slate-400 mt-1">{formatNumber(totalClicks)} total clicks</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily spend/sales trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-semibold text-slate-900">Daily Ad Performance</h3>
            <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
              <button
                onClick={() => setMetricView('spend')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  metricView === 'spend' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Spend vs Sales
              </button>
              <button
                onClick={() => setMetricView('roas')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  metricView === 'roas' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                ROAS Trend
              </button>
            </div>
          </div>

          {metricView === 'spend' ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adSpendDaily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} interval={1} />
                  <YAxis tickFormatter={formatCurrencyShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                  <Bar dataKey="metaSpend" name="Meta" stackId="a" fill={adPlatformColors.Meta} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="googleSpend" name="Google" stackId="a" fill={adPlatformColors.Google} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="tiktokSpend" name="TikTok" stackId="a" fill={adPlatformColors.TikTok} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} interval={1} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} domain={[0, 6]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                  <Line type="monotone" dataKey="roas" name="Blended ROAS" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Platform comparison */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-6">Platform Comparison</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tickFormatter={formatCurrencyShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <YAxis type="category" dataKey="platform" tick={{ fontSize: 13, fill: '#64748b' }} axisLine={false} tickLine={false} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                <Bar dataKey="spend" name="Ad Spend" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                <Bar dataKey="sales" name="Attributed Sales" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Campaign Performance</h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span>Paused</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Campaign</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Spend</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Impressions</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Clicks</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Sales</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">ROAS</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">CPC</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {campaignSummaries.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: adPlatformColors[camp.platform] }}
                      />
                      <span className="text-sm font-medium text-slate-900">{camp.name}</span>
                      <span className="text-xs text-slate-400 font-mono">{camp.platform}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                      camp.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {camp.status === 'active' ? (
                        <Play size={10} className="fill-current" />
                      ) : (
                        <Pause size={10} />
                      )}
                      {camp.status === 'active' ? 'Active' : 'Paused'}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm font-medium text-slate-900">{formatCurrency(camp.spend)}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm text-slate-600">{formatNumber(camp.impressions)}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm text-slate-600">{formatNumber(camp.clicks)}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm font-medium text-emerald-600">{formatCurrency(camp.attributedSales)}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`text-sm font-semibold ${
                      camp.roas >= 3 ? 'text-emerald-600' : camp.roas >= 1.5 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {camp.roas.toFixed(2)}x
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm text-slate-600">{formatCurrency(camp.cpc)}</span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm text-slate-600">{camp.ctr.toFixed(1)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROAS gauge summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {platformChartData.map(p => (
          <div key={p.platform} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: adPlatformColors[p.platform] }}
              />
              <p className="text-sm font-semibold text-slate-900">{p.platform}</p>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-slate-500">ROAS</p>
                <p className="text-2xl font-bold text-slate-900">{p.roas.toFixed(2)}x</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Spend</p>
                <p className="text-sm font-semibold text-slate-700">{formatCurrency(p.spend)}</p>
              </div>
            </div>
            <div className="mt-3 w-full h-1.5 bg-slate-200 rounded-full">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(p.roas / 6 * 100, 100)}%`,
                  backgroundColor: adPlatformColors[p.platform],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}