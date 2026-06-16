'use client';

import {
  LayoutDashboard,
  RefreshCw,
  TrendingUp,
  Wallet,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
} from 'lucide-react';
import { useState } from 'react';
import { useDemoMode } from '@/contexts/DemoContext';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '#', active: true },
  { name: 'Reconciliation', icon: RefreshCw, href: '#', active: false },
  { name: 'Profit Analytics', icon: TrendingUp, href: '#', active: false },
  { name: 'Ad Spend', icon: DollarSign, href: '#', active: false },
  { name: 'Bank Connections', icon: Wallet, href: '#', active: false },
  { name: 'Reports', icon: BarChart3, href: '#', active: false },
];

const bottomItems = [
  { name: 'Settings', icon: Settings, href: '#', active: false },
  { name: 'Help', icon: HelpCircle, href: '#', active: false },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { isDemoMode, demoMerchantName, demoStoreUrl } = useDemoMode();

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } min-h-screen bg-slate-900 text-white flex flex-col transition-all duration-300 ease-in-out relative`}
    >
      {/* Logo */}
      <div className={`p-6 border-b border-slate-700/50 ${collapsed ? 'px-4' : ''}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className={`w-9 h-9 ${isDemoMode ? 'bg-gradient-to-br from-indigo-400 to-purple-500' : 'bg-gradient-to-br from-emerald-400 to-blue-500'} rounded-xl flex items-center justify-center shrink-0`}>
            <span className="text-white font-bold text-lg">{isDemoMode ? 'AG' : 'N'}</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold tracking-tight">{isDemoMode ? demoMerchantName : 'Numeris'}</h1>
              <p className="text-xs text-slate-400">{isDemoMode ? demoStoreUrl : 'Financial OS'}</p>
            </div>
          )}
        </div>
        {isDemoMode && !collapsed && (
          <div className="mt-2 flex items-center gap-1 text-[10px] font-medium text-indigo-300 bg-indigo-500/20 rounded-md px-2 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Demo Mode
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-slate-800 border border-slate-600 rounded-full p-1 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <div className="space-y-1 px-3">
          {!collapsed && (
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
              Main Menu
            </p>
          )}
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center ${
                collapsed ? 'justify-center px-2' : 'px-3'
              } py-2.5 rounded-lg transition-all duration-150 group ${
                item.active
                  ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/10 text-white border-l-2 border-emerald-400'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <item.icon
                size={20}
                className={`shrink-0 ${item.active ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`}
              />
              {!collapsed && (
                <span className="ml-3 text-sm font-medium">{item.name}</span>
              )}
            </a>
          ))}
        </div>
      </nav>

      {/* Bottom items */}
      <div className="border-t border-slate-700/50 py-4 px-3 space-y-1">
        {bottomItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center ${
              collapsed ? 'justify-center px-2' : 'px-3'
            } py-2.5 rounded-lg transition-all duration-150 group ${
              item.active
                ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/10 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <item.icon
              size={20}
              className="shrink-0 text-slate-500 group-hover:text-slate-300"
            />
            {!collapsed && (
              <span className="ml-3 text-sm font-medium">{item.name}</span>
            )}
          </a>
        ))}
      </div>
    </aside>
  );
}