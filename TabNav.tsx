'use client';

import { RefreshCw, BarChart3, DollarSign, Wallet, Activity, FileText, Package, Receipt, Landmark, TrendingUp } from 'lucide-react';

interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'reconciliation', label: 'Reconciliation', icon: RefreshCw },
  { id: 'profit', label: 'Profit Analytics', icon: BarChart3 },
  { id: 'adspend', label: 'Ad Spend', icon: DollarSign },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'nexus', label: 'Sales Tax', icon: Landmark },
  { id: 'cashflow', label: 'Cash Flow', icon: TrendingUp },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'accounts', label: 'Accounts', icon: Wallet },
  { id: 'activity', label: 'Activity Log', icon: Activity },
];

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  return (
    <div className="border-b border-slate-200 mb-6">
      <nav className="flex gap-1 -mb-px overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-emerald-500 text-emerald-700 bg-emerald-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}