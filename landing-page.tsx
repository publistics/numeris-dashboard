'use client';

import { useState } from 'react';
import {
  ArrowRight, CheckCircle2, BarChart3, DollarSign, TrendingUp, RefreshCw,
  ShoppingBag, Package, Landmark, Star, Shield, Zap, Menu, X,
} from 'lucide-react';
import { createCheckoutSession, STRIPE_PRICE_IDS } from '@/lib/stripe-client';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Numeris</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900">Features</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900">Pricing</a>
            <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900">How It Works</a>
            <a href="/dashboard" className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
              View Live Demo <ArrowRight size={16} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-3">
            <a href="#features" className="block text-sm text-slate-600 py-2">Features</a>
            <a href="#pricing" className="block text-sm text-slate-600 py-2">Pricing</a>
            <a href="#how-it-works" className="block text-sm text-slate-600 py-2">How It Works</a>
            <a href="/dashboard" className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl">
              View Live Demo <ArrowRight size={16} />
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-sm font-medium text-indigo-700 mb-6">
              <Zap size={16} className="text-indigo-500" />
              The Unified Financial OS for E-commerce
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Stop guessing.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Know your true profit.
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              Numeris unifies your sales channels, ad platforms, and bank accounts into one real-time financial dashboard. No more spreadsheets. No more surprises.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-indigo-200">
                Start Free Trial <ArrowRight size={18} />
              </a>
              <a href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium rounded-xl transition-colors">
                View Live Demo
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 text-sm text-slate-500">
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> No credit card</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> 14-day free trial</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> Cancel anytime</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-3xl" />
            <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs text-slate-400 font-mono">numeris.com/dashboard</span>
              </div>
              {/* Mock dashboard preview */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  {[284750, 45620, 12340].map((v, i) => (
                    <div key={i} className={`flex-1 p-3 rounded-lg ${i === 0 ? 'bg-emerald-50' : i === 1 ? 'bg-amber-50' : 'bg-red-50'}`}>
                      <p className="text-[10px] font-medium text-slate-500">
                        {i === 0 ? 'Reconciled' : i === 1 ? 'Pending' : 'Discrepancies'}
                      </p>
                      <p className={`text-sm font-bold ${i === 0 ? 'text-emerald-700' : i === 1 ? 'text-amber-700' : 'text-red-700'}`}>
                        ${(v / 1000).toFixed(0)}K
                      </p>
                    </div>
                  ))}
                </div>
                <div className="h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-indigo-500 font-medium">Live Revenue Chart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section id="how-it-works" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">From Spreadsheet Chaos to One Dashboard</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Stop juggling Shopify, Amazon, Meta, Google, and your bank account. Numeris brings everything together automatically.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-red-100 rounded-lg"><DollarSign size={24} className="text-red-500" /></div>
                <h3 className="text-xl font-bold text-slate-900">The Old Way</h3>
              </div>
              <ul className="space-y-3">
                {['Manual CSV exports from every platform', 'VLOOKUP errors and broken formulas', 'Hidden Amazon FBA fees buried in reports', 'No visibility into true net profit'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="text-red-400 mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-indigo-100 rounded-lg"><Zap size={24} className="text-indigo-600" /></div>
                <h3 className="text-xl font-bold text-slate-900">The Numeris Way</h3>
              </div>
              <ul className="space-y-3">
                {['Automated sync from all sales channels', 'Real-time profit tracking with COGS', 'Ad spend ROI mapped to every product', 'Cash flow forecasting & scenario planning'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to run your numbers</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From profit tracking to cash flow simulation, Numeris gives you the tools to make data-driven decisions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: BarChart3, title: 'True Profit Tracking', desc: 'Automatically calculate net profit accounting for COGS, platform fees, and ad spend across all channels.', color: 'indigo' },
            { icon: TrendingUp, title: 'Ad Spend ROI', desc: 'Track ROAS across Meta, Google, and TikTok. See exactly which campaigns drive profit, not just revenue.', color: 'purple' },
            { icon: RefreshCw, title: 'Payout Reconciliation', desc: 'Match every bank deposit to specific orders and fees. Know when money is missing before it impacts your cash flow.', color: 'emerald' },
            { icon: Package, title: 'Inventory Health', desc: 'Monitor Days of Supply, get restock alerts for Class A SKUs, and prevent stockouts with predictive analytics.', color: 'amber' },
            { icon: DollarSign, title: 'Cash Flow Simulation', desc: 'Simulate the impact of ad spend changes, inventory buys, and new market entries with interactive what-if scenarios.', color: 'rose' },
            { icon: Landmark, title: 'Sales Tax Nexus', desc: 'Monitor economic nexus thresholds across all 50 states with color-coded alerts and automatic threshold tracking.', color: 'blue' },
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all">
                <div className={`p-3 rounded-xl bg-${feat.color}-100 w-fit mb-4`}>
                  <Icon size={24} className={`text-${feat.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Start with a 14-day free trial. No credit card required. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: '$29', desc: 'For solo founders getting started', features: ['Up to $10K GMV/mo', '1 Sales Channel', '3 months data history', 'Basic reconciliation', '1 user'], popular: false },
              { name: 'Growth', price: '$79', desc: 'For scaling brands', features: ['Up to $100K GMV/mo', '3 Sales Channels', '12 months data history', 'COGS & Profit Analytics', 'Ad Spend ROI', '2 users'], popular: true },
              { name: 'Scale', price: '$199', desc: 'For established businesses', features: ['Up to $500K GMV/mo', 'Unlimited channels', 'Unlimited data history', 'Multi-warehouse', 'Cash Flow Simulation', 'Priority support', '5 users'], popular: false },
            ].map((tier, i) => {
                const priceKey = tier.name.toLowerCase() + '_monthly';
                return (
              <div key={i} className={`relative bg-white rounded-2xl border-2 p-8 ${tier.popular ? 'border-indigo-500 shadow-xl shadow-indigo-100 scale-105' : 'border-slate-200'}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                <p className="text-sm text-slate-500 mt-1 mb-4">{tier.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                  <span className="text-sm text-slate-400 ml-1">/mo</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => createCheckoutSession(STRIPE_PRICE_IDS[priceKey])} className={`w-full text-center py-3 rounded-xl font-medium transition-all ${
                  tier.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}>
                  {tier.popular ? 'Start Free Trial' : 'Get Started'}
                </button>
              </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to know your true numbers?</h2>
          <p className="text-lg text-indigo-100 max-w-xl mx-auto mb-8">
            Join thousands of e-commerce entrepreneurs who have ditched spreadsheets for Numeris.
          </p>
          <a href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-medium rounded-xl transition-colors shadow-lg hover:bg-indigo-50">
            Start Your Free Trial <ArrowRight size={18} />
          </a>
          <p className="text-xs text-indigo-200 mt-4">14-day free trial · No credit card needed · Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            Numeris Financial OS
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-slate-700">Features</a>
            <a href="#pricing" className="hover:text-slate-700">Pricing</a>
            <a href="/terms" className="hover:text-slate-700">Terms</a>
            <a href="/privacy" className="hover:text-slate-700">Privacy</a>
            <a href="/support" className="hover:text-slate-700">Contact</a>
            <a href="/dashboard" className="hover:text-slate-700">Dashboard</a>
          </div>
        </div>
      </footer>
    </div>
  );
}