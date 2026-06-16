'use client';

import { useState } from 'react';
import { TrendingUp, DollarSign, Percent, Calculator, ArrowRight } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoContext';

const formatCurrency = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(v);

export default function ProfitCalculator() {
  const [revenue, setRevenue] = useState(150000);
  const [cogs, setCogs] = useState(60000);
  const [adSpend, setAdSpend] = useState(35000);
  const [fees, setFees] = useState(15000);
  const [calculated, setCalculated] = useState(false);
  const { isDemoMode } = useDemoMode();

  const grossProfit = revenue - cogs;
  const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  const netProfit = grossProfit - adSpend - fees;
  const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

  // Numeris Efficiency Score — composite metric
  const efficiencyScore = Math.min(100, Math.round(
    ((netMargin / 20) * 40) +       // Net margin contribution (40 pts max at 20% margin)
    ((grossMargin / 50) * 30) +      // Gross margin contribution (30 pts max at 50%)
    ((1 - adSpend / Math.max(revenue, 1) / 0.3) * 20) +  // Ad efficiency (20 pts)
    ((revenue > 0 ? 1 : 0) * 10)     // Base score (10 pts)
  ));

  const handleCalculate = () => setCalculated(true);

  const scoreColor = efficiencyScore >= 70 ? 'text-emerald-600' : efficiencyScore >= 40 ? 'text-amber-600' : 'text-red-600';
  const scoreRing = efficiencyScore >= 70 ? '#10b981' : efficiencyScore >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-indigo-100">
            <Calculator size={22} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">True Profit Calculator</h3>
            <p className="text-sm text-slate-500">See what Numeris reveals about your real bottom line</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-1.5">
                <span><DollarSign size={14} className="inline text-slate-400" /> Monthly Revenue</span>
                <span className="text-indigo-600 font-semibold">{formatCurrency(revenue)}</span>
              </label>
              <input type="range" min={10000} max={500000} step={5000} value={revenue}
                onChange={e => { setRevenue(Number(e.target.value)); setCalculated(false); }}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-600" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>$10K</span><span>$500K</span></div>
            </div>
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-1.5">
                <span><Percent size={14} className="inline text-slate-400" /> COGS (Cost of Goods)</span>
                <span className="text-amber-600 font-semibold">{formatCurrency(cogs)}</span>
              </label>
              <input type="range" min={0} max={350000} step={5000} value={cogs}
                onChange={e => { setCogs(Number(e.target.value)); setCalculated(false); }}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-amber-500" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>$0</span><span>$350K</span></div>
            </div>
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-1.5">
                <span><TrendingUp size={14} className="inline text-slate-400" /> Ad Spend (Meta + Google)</span>
                <span className="text-red-500 font-semibold">{formatCurrency(adSpend)}</span>
              </label>
              <input type="range" min={0} max={100000} step={1000} value={adSpend}
                onChange={e => { setAdSpend(Number(e.target.value)); setCalculated(false); }}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-red-400" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>$0</span><span>$100K</span></div>
            </div>
            <div>
              <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-1.5">
                <span><DollarSign size={14} className="inline text-slate-400" /> Platform Fees</span>
                <span className="text-slate-600 font-semibold">{formatCurrency(fees)}</span>
              </label>
              <input type="range" min={0} max={50000} step={1000} value={fees}
                onChange={e => { setFees(Number(e.target.value)); setCalculated(false); }}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-slate-500" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>$0</span><span>$50K</span></div>
            </div>
            <button onClick={handleCalculate} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm">
              Calculate True Profit
            </button>
          </div>

          {/* Results */}
          <div className="bg-slate-50 rounded-xl p-6 space-y-5">
            {/* Efficiency Score */}
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={scoreRing} strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 42}`}
                    strokeDashoffset={`${2 * Math.PI * 42 * (1 - efficiencyScore / 100)}`}
                    className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-2xl font-bold ${scoreColor}`}>{efficiencyScore}</span>
                </div>
              </div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Numeris Efficiency Score</p>
            </div>

            {/* Metric breakdown */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Gross Profit</span>
                  <span className="font-semibold text-emerald-600">{formatCurrency(grossProfit)}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${Math.min(grossMargin, 100)}%` }} />
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Gross Margin</span>
                <span className="font-medium text-slate-900">{grossMargin.toFixed(1)}%</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Ad Spend</span>
                <span className="font-medium text-red-500">-{formatCurrency(adSpend)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Platform Fees</span>
                <span className="font-medium text-red-500">-{formatCurrency(fees)}</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex justify-between text-base">
                <span className="font-semibold text-slate-900">True Net Profit</span>
                <span className={`font-bold ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatCurrency(netProfit)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Net Margin</span>
                <span className={`font-medium ${netMargin >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {netMargin.toFixed(1)}%
                </span>
              </div>
            </div>

            {calculated && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-700">
                <p className="font-semibold mb-1">💰 The Hidden Costs Revealed</p>
                <p>Your true net profit is {formatCurrency(netProfit)} — but your Shopify dashboard likely shows closer to {formatCurrency(revenue - cogs)}. Numeris automatically accounts for the ad spend and platform fees most tools miss.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isDemoMode && (
        <div className="px-6 md:px-8 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-indigo-100 flex items-center gap-2 text-sm text-indigo-700">
          <TrendingUp size={16} />
          <span>Try the live demo to see this on your real data →</span>
          <a href="/dashboard" className="ml-auto flex items-center gap-1 text-indigo-600 font-medium hover:text-indigo-800">
            Go to Dashboard <ArrowRight size={14} />
          </a>
        </div>
      )}
    </div>
  );
}