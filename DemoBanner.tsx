'use client';

import { Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';
import { useDemoMode } from '@/contexts/DemoContext';

export default function DemoBanner() {
  const { isDemoMode, toggleDemoMode, demoMerchantName } = useDemoMode();

  if (!isDemoMode) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white">
      <div className="px-8 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-yellow-300" />
          <span className="text-sm font-medium">
            <span className="font-bold">{demoMerchantName}</span> Demo Environment
          </span>
          <span className="text-xs text-indigo-200 bg-indigo-500/30 px-2 py-0.5 rounded-full">
            Live Backend Data
          </span>
        </div>
        <button
          onClick={toggleDemoMode}
          className="flex items-center gap-1.5 text-xs text-indigo-200 hover:text-white transition-colors"
        >
          {isDemoMode ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
          {isDemoMode ? 'Demo Mode On' : 'Exit Demo'}
        </button>
      </div>
    </div>
  );
}