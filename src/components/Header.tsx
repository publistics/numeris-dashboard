'use client';

import { Bell, Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useDemoMode } from '@/contexts/DemoContext';
import { createPortalSession } from '@/lib/stripe-client';

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isDemoMode, demoMerchantName } = useDemoMode();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Page title + Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Numeris</span>
            <span>/</span>
            <span className="text-slate-600 font-medium">Reconciliation</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Payout Reconciliation</h2>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search payouts..."
              className="pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 w-64 transition-all"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* User profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-1.5 pr-3 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className={`w-8 h-8 ${isDemoMode ? 'bg-gradient-to-br from-indigo-400 to-purple-500' : 'bg-gradient-to-br from-emerald-400 to-blue-500'} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                {isDemoMode ? 'AK' : 'AK'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-900 leading-tight">{isDemoMode ? 'Alex Kim' : 'Alex Kim'}</p>
                <p className="text-xs text-slate-500">{isDemoMode ? `Owner, ${demoMerchantName}` : 'Store Owner'}</p>
              </div>
              <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900">Alex Kim</p>
                  <p className="text-xs text-slate-500">{isDemoMode ? 'alex@apexgear.com' : 'alex@brightlife.com'}</p>
                </div>
                {isDemoMode && (
                  <div className="px-4 py-2 bg-indigo-50 border-b border-indigo-100">
                    <p className="text-xs font-medium text-indigo-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      Demo: Apex Gear
                    </p>
                  </div>
                )}
                <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Store Settings</a>
                <button onClick={() => createPortalSession()} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">Manage Subscription</button>
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
