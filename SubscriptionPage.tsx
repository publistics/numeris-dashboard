'use client';

import { useState } from 'react';
import { Check, X, Sparkles, Star, TrendingUp, Zap, Building2, HelpCircle } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 29,
    color: 'emerald',
    icon: Star,
    limit: '$10k GMV',
    channels: '1 Channel',
    history: '3 Months',
    users: '1 User',
    features: ['Basic Profit Tracking', 'Daily Automated Sync', 'Basic Reconciliation', 'Email Support'],
    missing: ['Ad Spend ROI', 'COGS Module', 'Multi-Warehouse', 'Inventory Forecasting'],
  },
  {
    name: 'Growth',
    price: 79,
    color: 'blue',
    icon: TrendingUp,
    popular: true,
    limit: '$100k GMV',
    channels: '3 Channels',
    history: '12 Months',
    users: '2 Users',
    features: ['Everything in Starter', 'Ad Spend ROI Tracking', 'COGS Module', 'Multi-Channel Analytics', 'Chat Support'],
    missing: ['Multi-Warehouse', 'Inventory Forecasting', 'API Access'],
  },
  {
    name: 'Pro',
    price: 199,
    color: 'purple',
    icon: Zap,
    limit: '$500k GMV',
    channels: 'Unlimited',
    history: 'Unlimited',
    users: '5 Users',
    features: ['Everything in Growth', 'Multi-Warehouse Support', 'Inventory Forecasting', 'Priority Support', 'Custom Reports'],
    missing: ['API Access', 'Dedicated Account Manager'],
  },
  {
    name: 'Enterprise',
    price: null,
    color: 'amber',
    icon: Building2,
    limit: '$500k+ GMV',
    channels: 'Unlimited',
    history: 'Unlimited',
    users: 'Unlimited',
    features: ['Everything in Pro', 'API Access', 'Dedicated Support', 'Custom Integrations', 'SLA Guarantee', 'Onboarding Concierge'],
    missing: [],
  },
];

export default function SubscriptionPage() {
  const [selected, setSelected] = useState('Growth');
  const [annual, setAnnual] = useState(false);

  const formatCurrency = (v: number | null) => {
    if (v === null) return 'Custom';
    return `$${annual ? Math.round(v * 10 * 12) : v}`;
  };

  const formatPeriod = (v: number | null) => {
    if (v === null) return '';
    return annual ? '/yr' : '/mo';
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Choose Your Plan</h2>
        <p className="text-sm text-slate-500 mt-1">All plans include automated sync, unified dashboard, and reconciliation tools.</p>
        <div className="inline-flex items-center gap-3 mt-4 bg-slate-100 rounded-lg p-1">
          <button onClick={() => setAnnual(false)} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${!annual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Monthly</button>
          <button onClick={() => setAnnual(true)} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${annual ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Annual <span className="text-emerald-600 text-xs">Save 17%</span></button>
        </div>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map(tier => {
          const isSelected = selected === tier.name;
          const TierIcon = tier.icon;
          return (
            <div
              key={tier.name}
              onClick={() => setSelected(tier.name)}
              className={`relative bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? 'border-emerald-500 shadow-md' : 'border-slate-200'
              } ${tier.popular ? 'scale-105 z-10' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> Most Popular
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-lg bg-${tier.color}-100`}>
                  <TierIcon size={22} className={`text-${tier.color}-600`} />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">{tier.name}</p>
                  <p className="text-xs text-slate-400">{tier.limit}</p>
                </div>
              </div>
              <div className="mb-5">
                <span className="text-3xl font-bold text-slate-900">{formatCurrency(tier.price)}</span>
                <span className="text-sm text-slate-400 ml-1">{formatPeriod(tier.price)}</span>
                {tier.price && <span className="text-xs text-slate-400 block mt-0.5">{annual ? `$${tier.price * 12}` : `$${tier.price}`}/mo billed {annual ? 'annually' : 'monthly'}</span>}
              </div>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{tier.channels}</span>
                  <span>·</span>
                  <span>{tier.users}</span>
                  <span>·</span>
                  <span>{tier.history}</span>
                </div>
                {tier.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700">{f}</span>
                  </div>
                ))}
                {tier.missing.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 opacity-40">
                    <X size={14} className="text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-400">{f}</span>
                  </div>
                ))}
              </div>
              <button className={`w-full py-2.5 text-sm font-medium rounded-lg transition-all ${
                isSelected ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}>
                {isSelected ? 'Current Plan' : tier.price === null ? 'Contact Sales' : 'Choose Plan'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Current Usage Summary */}
      <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-base font-semibold text-slate-900 mb-4">Current Usage</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Monthly GMV</p>
            <p className="text-lg font-bold text-slate-900">$89,450</p>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '89%' }} />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">89% of $100k Growth tier limit</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Connected Channels</p>
            <p className="text-lg font-bold text-slate-900">2 / 3</p>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '67%' }} />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Team Members</p>
            <p className="text-lg font-bold text-slate-900">1 / 2</p>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}