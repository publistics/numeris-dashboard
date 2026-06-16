'use client';

import { useState, useEffect } from 'react';
import {
  ShoppingBag, TrendingUp, Landmark, Package, CheckCircle2, ArrowRight, ArrowLeft,
  Upload, Link, FileSpreadsheet, Sparkles, RefreshCw, Zap,
} from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoContext';
import { apexGearBrand, apexGearConnections } from '@/data/apexGearDemo';

type Phase = 1 | 2 | 3 | 4;

const phases: { id: Phase; title: string; subtitle: string; icon: any }[] = [
  { id: 1, title: 'Registration', subtitle: 'Create your account', icon: CheckCircle2 },
  { id: 2, title: 'Platform Connections', subtitle: 'Connect your stores & ads', icon: Link },
  { id: 3, title: 'Financial Setup', subtitle: 'Configure COGS & mapping', icon: Package },
  { id: 4, title: 'Data Ingestion', subtitle: 'We\'ll pull your data', icon: RefreshCw },
];

export default function ConnectionWizard() {
  const [phase, setPhase] = useState<Phase>(1);
  const { isDemoMode, demoMerchantName } = useDemoMode();
  const [syncProgress, setSyncProgress] = useState(0);

  // Auto-advance sync progress when on phase 4
  useEffect(() => {
    if (phase === 4) {
      const timer = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
      return () => clearInterval(timer);
    } else {
      setSyncProgress(0);
    }
  }, [phase]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="px-8 py-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{isDemoMode ? `Welcome to ${demoMerchantName}` : 'Welcome to Numeris'}</h2>
              {isDemoMode && <p className="text-xs text-indigo-600 font-medium">Interactive Demo — Data pre-loaded</p>}
            </div>
          </div>
          <span className="text-sm text-slate-500">Step {phase} of 4</span>
        </div>
        <div className="flex gap-2">
          {phases.map(p => (
            <div key={p.id} className="flex-1">
              <div className={`h-2 rounded-full transition-all ${
                p.id < phase ? 'bg-emerald-500' : p.id === phase ? 'bg-emerald-400' : 'bg-slate-200'
              }`} />
              <p className={`text-xs mt-1.5 font-medium ${p.id <= phase ? 'text-emerald-700' : 'text-slate-400'}`}>
                <p.icon size={12} className="inline mr-1" />
                {p.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Phase Content */}
      <div className="px-8 py-8">
        {phase === 1 && (
          <div className="space-y-5 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-slate-900 text-center">Create Your Account</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" placeholder="you@store.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input type="password" placeholder="Minimum 8 characters" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Store URL</label>
              <input type="text" placeholder="mystore.myshopify.com" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Base Currency</label>
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 outline-none">
                <option>USD — US Dollar</option>
                <option>EUR — Euro</option>
                <option>GBP — British Pound</option>
                <option>CAD — Canadian Dollar</option>
              </select>
            </div>
          </div>
        )}

        {phase === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900 text-center">
              {isDemoMode ? `${demoMerchantName} — Connected Platforms` : 'Connect Your Platforms'}
            </h3>
            {isDemoMode && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-700 flex items-center gap-2">
                <Zap size={16} className="text-indigo-500 shrink-0" />
                <span>Demo mode: All platforms are pre-connected with sample data from {demoMerchantName}.</span>
              </div>
            )}
            <div className="grid gap-4">
              {(isDemoMode ? apexGearConnections : [
                { icon: ShoppingBag, name: 'Shopify', desc: 'Connect your Shopify store for orders & payouts', connected: true },
                { icon: ShoppingBag, name: 'Amazon', desc: 'Connect Amazon Seller Central SP-API', connected: false },
                { icon: TrendingUp, name: 'Meta Ads', desc: 'Track Facebook & Instagram ad spend', connected: true },
                { icon: TrendingUp, name: 'Google Ads', desc: 'Track Search & Performance Max campaigns', connected: false },
                { icon: Landmark, name: 'Bank (Plaid)', desc: 'Connect business bank accounts & credit cards', connected: false },
              ]).map((item: any, i: number) => (
                <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  item.connected ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.connected ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                      <ShoppingBag size={20} className={item.connected ? 'text-emerald-600' : 'text-slate-500'} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.label || item.desc}</p>
                    </div>
                  </div>
                  <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    item.connected
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
                    {item.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === 3 && (
          <div className="space-y-5 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-slate-900 text-center">Configure Your Costs</h3>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">COGS Method</label>
              {['Connect Inventory System (ShipStation)', 'Upload CSV with SKU costs', 'Set a flat margin % (Quick setup)'].map((opt, i) => (
                <label key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer">
                  <input type="radio" name="cogs" defaultChecked={i === 0} className="text-emerald-600 focus:ring-emerald-500" />
                  <div className="flex items-center gap-2">
                    {i === 0 && <Upload size={16} className="text-slate-400" />}
                    {i === 1 && <FileSpreadsheet size={16} className="text-slate-400" />}
                    {i === 2 && <Package size={16} className="text-slate-400" />}
                    <span className="text-sm text-slate-700">{opt}</span>
                  </div>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Accounting Method</label>
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm">
                <option>Accrual (Recommended for e-commerce)</option>
                <option>Cash Basis</option>
              </select>
            </div>
          </div>
        )}

        {phase === 4 && (
          <div className="text-center py-8 space-y-5">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <RefreshCw size={36} className="text-indigo-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              {isDemoMode ? `Loading ${demoMerchantName} Data...` : 'Syncing Your Data'}
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              {isDemoMode
                ? 'Pulling 12 months of historical orders, ad spend, and payouts from Shopify, Amazon, Meta, and Google.'
                : 'We\'re pulling data from your connected platforms. This usually takes 1-2 minutes.'}
            </p>
            <div className="w-full max-w-sm mx-auto bg-slate-200 rounded-full h-2.5">
              <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${syncProgress}%` }} />
            </div>
            <p className="text-xs text-slate-400">
              {syncProgress < 30 ? 'Connecting to Shopify & Amazon...' :
               syncProgress < 60 ? 'Fetching orders and payouts...' :
               syncProgress < 90 ? 'Calculating true net profit...' :
               'Initial reconciliation complete!'}
            </p>
            {syncProgress >= 100 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-700 max-w-sm mx-auto">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="font-semibold">Demo Ready!</span>
                </div>
                <p className="text-xs">{demoMerchantName} data loaded — explore the dashboard to see the magic moments.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-8 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
        <button
          onClick={() => setPhase((Math.max(1, phase - 1) as Phase))}
          disabled={phase === 1}
          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-800 disabled:opacity-30 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button
          onClick={() => {
            if (phase === 4) return;
            setPhase((Math.min(4, phase + 1) as Phase));
          }}
          disabled={phase === 4}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          {phase === 4 ? 'Processing...' : 'Continue'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}