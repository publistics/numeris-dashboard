'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, ReferenceDot,
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, AlertTriangle, RefreshCw, SlidersHorizontal,
  RotateCcw, Gauge, Circle, Triangle, X,
} from 'lucide-react';
import { generateCashFlowData, defaultScenarioParams, type ScenarioParams, type CashFlowDay, type CashFlowEvent } from '@/data/mockData';

const formatCurrency = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(v);

const formatCurrencyShort = (v: number) => {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `$${(v / 1000).toFixed(0)}K`;
  return `$${v}`;
};

const eventIcons: Record<string, { icon: string; color: string }> = {
  stockout: { icon: '●', color: '#ef4444' },
  reorder: { icon: '▲', color: '#f59e0b' },
  payout: { icon: '●', color: '#10b981' },
  runway_end: { icon: '✕', color: '#dc2626' },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dayData: CashFlowDay | undefined = payload[0]?.payload;
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-4 text-sm max-w-xs">
        <p className="font-semibold text-slate-900 mb-1">{dayData?.date || label}</p>
        <p className="text-slate-600">Day {dayData?.day || 0}</p>
        {payload.map((entry: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 py-0.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className={`font-medium ${entry.dataKey === 'projectedBalance' && entry.value < 0 ? 'text-red-600' : 'text-slate-900'}`}>
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
        {dayData?.events && dayData.events.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-1">Events:</p>
            {dayData.events.map((evt, i) => (
              <p key={i} className="text-xs flex items-center gap-1" style={{ color: eventIcons[evt.type]?.color || '#94a3b8' }}>
                <span>{eventIcons[evt.type]?.icon || '•'}</span>
                {evt.label}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};

const confidenceColor = (score: number) => {
  if (score >= 70) return '#10b981';
  if (score >= 40) return '#f59e0b';
  return '#ef4444';
};

const eventBadge = (evt: CashFlowEvent) => {
  const cfg = eventIcons[evt.type];
  return { label: evt.label, color: cfg?.color || '#94a3b8' };
};

export default function CashFlowSimulation() {
  const [params, setParams] = useState<ScenarioParams>(defaultScenarioParams);
  const [showEvents, setShowEvents] = useState(true);

  const { days, confidenceScore, currentBalance } = useMemo(() => generateCashFlowData(params), [params]);

  const finalBalance = days[days.length - 1]?.projectedBalance || 0;
  const minBalance = Math.min(...days.map(d => d.projectedBalance));
  const runwayEndDay = days.findIndex(d => d.projectedBalance <= 0);

  const handleReset = () => setParams(defaultScenarioParams);

  // Build event markers for chart
  const eventMarkers = useMemo(() => {
    const markers: { day: number; date: string; events: CashFlowEvent[] }[] = [];
    days.forEach(d => {
      if (d.events.length > 0) markers.push({ day: d.day, date: d.date, events: d.events });
    });
    return markers;
  }, [days]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-emerald-100"><DollarSign size={18} className="text-emerald-600" /></div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Current Balance</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(currentBalance)}</p>
          <p className="text-xs text-slate-400 mt-1">Day 0 starting position</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-lg ${finalBalance >= 0 ? 'bg-emerald-100' : 'bg-red-100'}`}>
              <TrendingUp size={18} className={finalBalance >= 0 ? 'text-emerald-600' : 'text-red-600'} />
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Projected (Day 90)</p>
          </div>
          <p className={`text-2xl font-bold ${finalBalance >= 0 ? 'text-slate-900' : 'text-red-600'}`}>
            {formatCurrency(finalBalance)}
          </p>
          <p className="text-xs text-slate-400 mt-1">90-day forecast</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-lg ${runwayEndDay === -1 ? 'bg-emerald-100' : 'bg-red-100'}`}>
              {runwayEndDay === -1 ? <CheckIcon className="text-emerald-600" /> : <AlertTriangle size={18} className="text-red-600" />}
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Cash Runway</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{runwayEndDay === -1 ? '90+ days' : `Day ${runwayEndDay}`}</p>
          <p className="text-xs text-slate-400 mt-1">{runwayEndDay === -1 ? 'No cash-out predicted' : 'Cash runway end date'}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg" style={{ backgroundColor: confidenceColor(confidenceScore) + '20' }}>
              <Gauge size={18} style={{ color: confidenceColor(confidenceScore) }} />
            </div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Confidence Score</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-slate-900">{confidenceScore}</p>
            <span className="text-sm text-slate-400">/ 100</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full mt-2">
            <div className="h-full rounded-full transition-all duration-500" style={{
              width: `${confidenceScore}%`,
              backgroundColor: confidenceColor(confidenceScore),
            }} />
          </div>
        </div>
      </div>

      {/* Main grid: Chart + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">90-Day Cash Flow Projection</h3>
              <p className="text-xs text-slate-400 mt-0.5">Shaded area = 85% confidence interval</p>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
              <input type="checkbox" checked={showEvents} onChange={e => setShowEvents(e.target.checked)} className="rounded text-emerald-600 focus:ring-emerald-500" />
              Show Events
            </label>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={days}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} interval={5} />
                <YAxis tickFormatter={formatCurrencyShort} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />

                {/* Confidence band */}
                <Area type="monotone" dataKey="confidenceHigh" stroke="none" fill="#6366f1" fillOpacity={0.08} name="Confidence (High)" />
                <Area type="monotone" dataKey="confidenceLow" stroke="none" fill="#6366f1" fillOpacity={0.08} name="Confidence (Low)" />

                {/* Main projected balance line */}
                <Line type="monotone" dataKey="projectedBalance" stroke="#6366f1" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#6366f1' }} name="Projected Balance" />

                {/* Zero reference line */}
                <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="4 4" />

                {/* Event markers */}
                {showEvents && eventMarkers.map(m => (
                  m.events.map((evt, i) => {
                    const cfg = eventIcons[evt.type];
                    return (
                      <ReferenceDot
                        key={`${m.day}-${i}`}
                        x={m.day}
                        y={days[m.day]?.projectedBalance || 0}
                        r={6}
                        fill={cfg.color}
                        stroke="white"
                        strokeWidth={2}
                      />
                    );
                  })
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Event legend */}
          {showEvents && (
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-100">
              {Object.entries(eventIcons).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span style={{ color: cfg.color, fontWeight: 'bold' }}>{cfg.icon}</span>
                  <span className="capitalize">{key.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Simulation Sidebar */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Scenario
            </h3>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          <div className="space-y-6">
            {/* Ad Spend Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-700">Ad Spend Adjustment</label>
                <span className={`text-sm font-semibold ${params.adSpendAdjustPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {params.adSpendAdjustPct >= 0 ? '+' : ''}{params.adSpendAdjustPct}%
                </span>
              </div>
              <input
                type="range" min="-50" max="100" value={params.adSpendAdjustPct}
                onChange={e => setParams(p => ({ ...p, adSpendAdjustPct: Number(e.target.value) }))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>-50%</span><span>0</span><span>+100%</span>
              </div>
            </div>

            {/* Expected ROAS */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-700">Expected ROAS</label>
                <span className="text-sm font-semibold text-slate-900">{params.expectedRoas.toFixed(1)}x</span>
              </div>
              <input
                type="range" min="1" max="10" step="0.1" value={params.expectedRoas}
                onChange={e => setParams(p => ({ ...p, expectedRoas: Number(e.target.value) }))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1x</span><span>5.5x</span><span>10x</span>
              </div>
            </div>

            {/* Lead Time Buffer */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-700">Lead Time Buffer</label>
                <span className="text-sm font-semibold text-slate-900">{params.leadTimeBufferDays}d</span>
              </div>
              <input
                type="range" min="0" max="21" value={params.leadTimeBufferDays}
                onChange={e => setParams(p => ({ ...p, leadTimeBufferDays: Number(e.target.value) }))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0d</span><span>10d</span><span>21d</span>
              </div>
            </div>

            {/* Slider values impact summary */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Scenario Impact</p>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Daily Revenue</span>
                <span className="font-medium text-slate-900">
                  {formatCurrency(Math.round(8200 * (1 + params.adSpendAdjustPct / 100) * (params.expectedRoas / 3.8)))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Daily Ad Spend</span>
                <span className="font-medium text-red-600">
                  {formatCurrency(Math.round(1400 * (1 + params.adSpendAdjustPct / 100)))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Day 90 Balance</span>
                <span className={`font-medium ${finalBalance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatCurrency(finalBalance)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Timeline */}
      {showEvents && eventMarkers.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Predicted Events Timeline</h3>
          <div className="space-y-2">
            {eventMarkers.map(m => (
              m.events.map((evt, i) => (
                <div key={`${m.day}-${i}`} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: eventIcons[evt.type]?.color }} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{evt.label}</p>
                    <p className="text-xs text-slate-400">Day {m.day} · {m.date}</p>
                  </div>
                  {evt.amount && (
                    <span className={`text-sm font-semibold ${evt.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {evt.amount > 0 ? '+' : ''}{formatCurrency(evt.amount)}
                    </span>
                  )}
                </div>
              ))
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
    </svg>
  );
}