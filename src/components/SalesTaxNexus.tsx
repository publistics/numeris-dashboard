'use client';

import { useState, useMemo } from 'react';
import {
  Map, AlertTriangle, CheckCircle2, RefreshCw, Search, DollarSign, ShoppingCart,
  TrendingUp, ToggleLeft, ToggleRight,
} from 'lucide-react';
import { stateNexusData, type StateNexus, type NexusStatus } from '@/data/mockData';

const formatCurrency = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(v);

const statusConfig: Record<NexusStatus, { label: string; color: string; bg: string; text: string; icon: any }> = {
  safe: { label: 'Safe', color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircle2 },
  warning: { label: 'Warning', color: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-700', icon: TrendingUp },
  nexus_reached: { label: 'Nexus Reached', color: '#ef4444', bg: 'bg-red-50', text: 'text-red-700', icon: AlertTriangle },
  no_tax: { label: 'No Sales Tax', color: '#94a3b8', bg: 'bg-slate-100', text: 'text-slate-500', icon: CheckCircle2 },
};

// Simplified state positions for a grid map (approximate)
const statePositions: Record<string, { row: number; col: number }> = {
  WA: { row: 0, col: 0 }, OR: { row: 1, col: 0 }, CA: { row: 2, col: 0 },
  MT: { row: 0, col: 1 }, ID: { row: 1, col: 1 }, NV: { row: 2, col: 1 }, AZ: { row: 3, col: 0 },
  ND: { row: 0, col: 2 }, SD: { row: 1, col: 2 }, WY: { row: 1, col: 2 }, UT: { row: 2, col: 2 }, CO: { row: 2, col: 2 }, NM: { row: 3, col: 1 },
  MN: { row: 0, col: 3 }, IA: { row: 1, col: 3 }, NE: { row: 1, col: 3 }, KS: { row: 2, col: 3 }, OK: { row: 2, col: 3 }, TX: { row: 3, col: 2 },
  WI: { row: 0, col: 4 }, IL: { row: 1, col: 4 }, MO: { row: 1, col: 4 }, AR: { row: 2, col: 4 }, LA: { row: 3, col: 3 },
  MI: { row: 0, col: 5 }, IN: { row: 1, col: 5 }, KY: { row: 1, col: 5 }, TN: { row: 2, col: 5 }, MS: { row: 2, col: 5 }, AL: { row: 3, col: 4 },
  OH: { row: 0, col: 6 }, WV: { row: 1, col: 6 }, VA: { row: 1, col: 6 }, NC: { row: 2, col: 6 }, SC: { row: 2, col: 6 }, GA: { row: 3, col: 5 },
  PA: { row: 0, col: 7 }, MD: { row: 1, col: 7 }, DE: { row: 1, col: 7 }, NJ: { row: 1, col: 7 },
  NY: { row: 0, col: 8 }, CT: { row: 0, col: 8 }, RI: { row: 0, col: 8 }, MA: { row: 0, col: 8 }, VT: { row: 0, col: 8 }, NH: { row: 0, col: 8 }, ME: { row: 0, col: 9 },
  AK: { row: 4, col: 0 }, HI: { row: 4, col: 1 },
  FL: { row: 3, col: 6 },
};

export default function SalesTaxNexus() {
  const [excludeMarketplace, setExcludeMarketplace] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<StateNexus | null>(null);
  const [recalculating, setRecalculating] = useState(false);

  const data = stateNexusData;

  const filteredStates = useMemo(() => {
    if (!searchQuery) return data;
    const q = searchQuery.toLowerCase();
    return data.filter(s => s.stateName.toLowerCase().includes(q) || s.stateCode.toLowerCase().includes(q));
  }, [searchQuery, data]);

  const activeStates = data.filter(s => s.status !== 'no_tax');
  const nexusReached = data.filter(s => s.status === 'nexus_reached').length;
  const warningCount = data.filter(s => s.status === 'warning').length;

  const handleRecalculate = () => {
    setRecalculating(true);
    setTimeout(() => setRecalculating(false), 1500);
  };

  const mapRows = 5;
  const mapCols = 10;

  // Build grid
  const grid: (StateNexus | null)[][] = Array.from({ length: mapRows }, () => Array(mapCols).fill(null));
  Object.entries(statePositions).forEach(([code, pos]) => {
    const state = data.find(s => s.stateCode === code);
    if (state && pos.row < mapRows && pos.col < mapCols) {
      grid[pos.row][pos.col] = state;
    }
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search state..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none" />
          </div>

          {/* Marketplace toggle */}
          <button
            onClick={() => setExcludeMarketplace(!excludeMarketplace)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            {excludeMarketplace ? <ToggleRight size={18} className="text-emerald-600" /> : <ToggleLeft size={18} className="text-slate-400" />}
            <span className="text-slate-700">Exclude Marketplace Sales</span>
          </button>

          {/* Status legend */}
          <div className="flex items-center gap-3 ml-auto text-xs">
            {Object.entries(statusConfig).map(([key, cfg]) => (
              key !== 'no_tax' && (
                <span key={key} className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                  {cfg.label}
                </span>
              )
            ))}
          </div>

          {/* Recalculate */}
          <button
            onClick={handleRecalculate}
            disabled={recalculating}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            <RefreshCw size={16} className={recalculating ? 'animate-spin' : ''} />
            {recalculating ? 'Calculating...' : 'Recalculate'}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-blue-100"><Map size={18} className="text-blue-600" /></div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">States Tracked</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{activeStates.length}</p>
          <p className="text-xs text-slate-400 mt-1">{data.filter(s => s.status === 'no_tax').length} no-tax states excluded</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-red-100"><AlertTriangle size={18} className="text-red-600" /></div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Nexus Reached</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{nexusReached}</p>
          <p className="text-xs text-slate-400 mt-1">States requiring tax registration</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-amber-100"><TrendingUp size={18} className="text-amber-600" /></div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Near Threshold</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{warningCount}</p>
          <p className="text-xs text-slate-400 mt-1">States at {'>'}80% of threshold</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-emerald-100"><CheckCircle2 size={18} className="text-emerald-600" /></div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Compliant</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{activeStates.filter(s => s.status === 'safe').length}</p>
          <p className="text-xs text-slate-400 mt-1">Below thresholds</p>
        </div>
      </div>

      {/* US Map Visualization */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Nexus Status Map</h3>
        <div className="flex justify-center">
          <div className="grid gap-1" style={{
            gridTemplateColumns: `repeat(${mapCols}, minmax(0, 1fr))`,
            maxWidth: '900px',
          }}>
            {grid.flat().map((state, idx) => (
              <div
                key={idx}
                onClick={() => state && setSelectedState(selectedState?.stateCode === state.stateCode ? null : state)}
                className={`aspect-square rounded-md flex items-center justify-center text-[9px] font-bold cursor-pointer transition-all hover:scale-110 hover:shadow-md ${
                  state?.status === 'safe' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' :
                  state?.status === 'warning' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                  state?.status === 'nexus_reached' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                  state?.status === 'no_tax' ? 'bg-slate-100 text-slate-400' :
                  'bg-transparent'
                } ${selectedState?.stateCode === state?.stateCode ? 'ring-2 ring-emerald-500 ring-offset-1' : ''}`}
                title={state ? `${state.stateName}: ${state.status.replace('_', ' ')}` : ''}
              >
                {state?.stateCode || ''}
              </div>
            ))}
          </div>
        </div>

        {/* Selected state detail */}
        {selectedState && (
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-900">{selectedState.stateName}</span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusConfig[selectedState.status].bg} ${statusConfig[selectedState.status].text
                }`}>
                  {statusConfig[selectedState.status].label}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-500">Revenue Threshold</p>
                <p className="text-sm font-semibold text-slate-900">{formatCurrency(selectedState.thresholdRevenue)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Current Revenue</p>
                <p className="text-sm font-semibold text-slate-900">{formatCurrency(selectedState.currentRevenue)}</p>
              </div>
              {selectedState.thresholdTransactions && (
                <>
                  <div>
                    <p className="text-xs text-slate-500">Txn Threshold</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedState.thresholdTransactions.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Current Txns</p>
                    <p className="text-sm font-semibold text-slate-900">{selectedState.currentTransactions.toLocaleString()}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* State Table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">State-by-State Progress</h3>
          <span className="text-xs text-slate-500">{filteredStates.length} states</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">State</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Threshold</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Revenue</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Progress</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Transactions</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Txn Progress</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStates.map(state => {
                const sc = statusConfig[state.status];
                const StatusIcon = sc.icon;
                return (
                  <tr key={state.stateCode} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{state.stateCode}</span>
                        <span className="text-sm text-slate-500">{state.stateName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {state.category === 'no_tax' ? 'No Sales Tax' : `${formatCurrency(state.thresholdRevenue)}${state.thresholdTransactions ? ` / ${state.thresholdTransactions.toLocaleString()} txns` : ''}`}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-slate-900">{formatCurrency(state.currentRevenue)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="w-20 h-2 bg-slate-200 rounded-full">
                          <div className="h-full rounded-full" style={{
                            width: `${Math.min(state.revenuePct, 100)}%`,
                            backgroundColor: state.revenuePct >= 100 ? '#ef4444' : state.revenuePct >= 80 ? '#f59e0b' : '#10b981',
                          }} />
                        </div>
                        <span className="text-xs font-medium text-slate-600 w-10 text-right">{state.revenuePct.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-600">
                      {state.thresholdTransactions ? state.currentTransactions.toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {state.thresholdTransactions ? (
                        <div className="flex items-center gap-2 justify-end">
                          <div className="w-16 h-2 bg-slate-200 rounded-full">
                            <div className="h-full rounded-full" style={{
                              width: `${Math.min(state.transactionPct || 0, 100)}%`,
                              backgroundColor: (state.transactionPct || 0) >= 100 ? '#ef4444' : (state.transactionPct || 0) >= 80 ? '#f59e0b' : '#10b981',
                            }} />
                          </div>
                          <span className="text-xs font-medium text-slate-600 w-10 text-right">{state.transactionPct?.toFixed(0)}%</span>
                        </div>
                      ) : <span className="text-xs text-slate-400">N/A</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
                        <StatusIcon size={12} />
                        {sc.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}