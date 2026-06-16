'use client';

import { Sparkles, CheckCircle2, ArrowRight, RefreshCw, ShoppingBag, TrendingUp, Landmark, Package } from 'lucide-react';
import { summaryMetrics } from '@/data/mockData';

interface Props {
  onComplete?: () => void;
}

export default function OnboardingSuccess({ onComplete }: Props) {
  const formatCurrency = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(v);

  const steps = [
    { icon: ShoppingBag, label: 'Sales Connected', value: 'Shopify + Amazon', done: true },
    { icon: TrendingUp, label: 'Ads Connected', value: 'Meta + Google', done: true },
    { icon: Landmark, label: 'Bank Connected', value: '2 Accounts', done: true },
    { icon: Package, label: 'COGS Configured', value: 'Average Cost Method', done: true },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
          <Sparkles size={48} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">You&apos;re All Set!</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Your accounts are connected and Numeris is already crunching the numbers. Here&apos;s your first look at your financial health.
        </p>
      </div>

      {/* Connection Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Connected Platforms</h3>
        <div className="grid grid-cols-2 gap-3">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <div className="p-2 rounded-lg bg-emerald-100">
                <s.icon size={16} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">{s.label}</p>
                <p className="text-sm font-medium text-slate-900">{s.value}</p>
              </div>
              <CheckCircle2 size={16} className="text-emerald-500 ml-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* The "Magic" Moment — Reconciliation Preview */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <RefreshCw size={20} className="text-emerald-200" />
          <span className="text-sm font-medium text-emerald-100">Reconciliation Preview</span>
        </div>
        <h3 className="text-2xl font-bold mb-1">Your First 30 Days</h3>
        <p className="text-emerald-100 text-sm mb-6">We automatically matched your payouts against bank deposits.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-emerald-100 text-xs uppercase tracking-wider">Total Reconciled</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(summaryMetrics.totalReconciled)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-emerald-100 text-xs uppercase tracking-wider">Pending Payouts</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(summaryMetrics.totalPending)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-emerald-100 text-xs uppercase tracking-wider">Orders Matched</p>
            <p className="text-2xl font-bold mt-1">842</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-emerald-100 text-xs uppercase tracking-wider">Estimated Net Profit</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(summaryMetrics.totalPayoutsThisMonth - summaryMetrics.totalReconciled)}</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="text-center">
        <button
          onClick={onComplete}
          className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-200"
        >
          Go to Dashboard <ArrowRight size={18} />
        </button>
        <p className="text-xs text-slate-400 mt-3">Data sync will continue in the background</p>
      </div>
    </div>
  );
}