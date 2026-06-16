'use client';

import { useState, useMemo } from 'react';
import {
  Package, AlertTriangle, CheckCircle2, TrendingUp, DollarSign, Clock,
  Warehouse, Truck, RefreshCw, Search, Filter, ArrowUpDown,
} from 'lucide-react';
import { inventorySkus, inboundShipments, type WarehouseType, type InventorySku } from '@/data/mockData';

const formatCurrency = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(v);

const dosConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  critical: { label: 'Critical', color: 'text-red-600', bg: 'bg-red-50', icon: AlertTriangle },
  low: { label: 'Low', color: 'text-amber-600', bg: 'bg-amber-50', icon: Clock },
  healthy: { label: 'Healthy', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
  overstock: { label: 'Overstock', color: 'text-blue-600', bg: 'bg-blue-50', icon: TrendingUp },
};

const classColors: Record<string, string> = { A: '#8b5cf6', B: '#3b82f6', C: '#94a3b8' };

export default function InventoryHealth() {
  const [warehouseFilter, setWarehouseFilter] = useState<WarehouseType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkus = useMemo(() => {
    let items = inventorySkus;
    if (warehouseFilter !== 'all') items = items.filter(s => s.warehouse === warehouseFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(s => s.sku.toLowerCase().includes(q) || s.productName.toLowerCase().includes(q));
    }
    return items;
  }, [warehouseFilter, searchQuery]);

  // Compute summary metrics
  const totalAssetValue = inventorySkus.reduce((s, i) => s + i.onHand * i.unitCost, 0);
  const dosCounts = { critical: 0, low: 0, healthy: 0, overstock: 0 };
  inventorySkus.forEach(i => dosCounts[i.dosStatus]++);
  const restockCount = inventorySkus.filter(i => i.restockRecommended > 0).length;

  // ABC breakdown
  const abcData = [
    { class: 'A', label: 'Class A — Top 20% Revenue', count: inventorySkus.filter(i => i.class === 'A').length, color: classColors.A },
    { class: 'B', label: 'Class B — Next 30% Revenue', count: inventorySkus.filter(i => i.class === 'B').length, color: classColors.B },
    { class: 'C', label: 'Class C — Bottom 50% Revenue', count: inventorySkus.filter(i => i.class === 'C').length, color: classColors.C },
  ];

  const sortedForRestock = filteredSkus.filter(i => i.restockRecommended > 0).sort((a, b) => a.daysOfSupply - b.daysOfSupply);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-wrap items-center gap-4">
          {/* Warehouse Toggle */}
          <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
            {(['all', 'fba', '3pl', 'in-house'] as const).map(w => (
              <button
                key={w}
                onClick={() => setWarehouseFilter(w)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  warehouseFilter === w ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {w === 'all' ? 'Combined' : w === 'fba' ? 'FBA' : w === '3pl' ? '3PL' : 'In-House'}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by SKU or product..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none"
            />
          </div>

          {/* Summary chips */}
          <div className="flex items-center gap-3 ml-auto text-xs">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {dosCounts.healthy} Healthy</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> {dosCounts.low} Low</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> {dosCounts.critical} Critical</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" /> {dosCounts.overstock} Overstock</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-emerald-100"><DollarSign size={18} className="text-emerald-600" /></div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Inventory Asset Value</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalAssetValue)}</p>
          <p className="text-xs text-slate-400 mt-1">Based on landed cost × on-hand qty</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-red-100"><AlertTriangle size={18} className="text-red-600" /></div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Critical Stock</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{dosCounts.critical}</p>
          <p className="text-xs text-slate-400 mt-1">SKUs with DOS {'<'} 7 days</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-amber-100"><Package size={18} className="text-amber-600" /></div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Needs Restock</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{restockCount}</p>
          <p className="text-xs text-slate-400 mt-1">SKUs requiring purchase orders</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-blue-100"><Truck size={18} className="text-blue-600" /></div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Inbound Units</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{inboundShipments.reduce((s, i) => s + i.quantity, 0).toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-1">Units in transit</p>
        </div>
      </div>

      {/* Main grid: Restock List + ABC */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Restock List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Prioritized Restock List</h3>
            <span className="text-xs text-slate-500">{sortedForRestock.length} items need reorder</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Product</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Class</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">DOS</th>
                  <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Available</th>
                  <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">ADS</th>
                  <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">In Transit</th>
                  <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Restock Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedForRestock.map(item => {
                  const dc = dosConfig[item.dosStatus];
                  const DosIcon = dc.icon;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: classColors[item.class] }} />
                          <span className="text-sm font-medium text-slate-900">{item.productName}</span>
                          <span className="text-xs text-slate-400 font-mono">{item.sku}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white`}
                          style={{ backgroundColor: classColors[item.class] }}>{item.class}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${dc.bg} ${dc.color}`}>
                          <DosIcon size={12} /> {item.daysOfSupply.toFixed(1)}d
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right text-sm text-slate-700">{item.available}</td>
                      <td className="px-3 py-3 text-right text-sm text-slate-600">{item.averageDailySales.toFixed(1)}</td>
                      <td className="px-3 py-3 text-right text-sm text-slate-600">{item.inTransit > 0 ? item.inTransit : '—'}</td>
                      <td className="px-3 py-3 text-right">
                        <span className="text-sm font-bold text-emerald-600">{item.restockRecommended}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {sortedForRestock.length === 0 && (
            <div className="text-center py-8 text-sm text-slate-400">No items need restocking for this view.</div>
          )}
        </div>

        {/* ABC Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-semibold text-slate-900 mb-4">ABC Analysis</h3>
          <div className="space-y-4">
            {abcData.map(a => (
              <div key={a.class}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: a.color }} />
                    <span className="text-sm text-slate-700">{a.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{a.count}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${(a.count / inventorySkus.length) * 100}%`, backgroundColor: a.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-3">Inventory Health Summary</p>
            {Object.entries(dosCounts).map(([key, count]) => {
              const dc = dosConfig[key];
              const Icon = dc.icon;
              const pct = (count / inventorySkus.length * 100).toFixed(0);
              return (
                <div key={key} className="flex items-center gap-3 py-1.5">
                  <Icon size={14} className={dc.color} />
                  <div className="flex-1 h-1.5 bg-slate-200 rounded-full">
                    <div className={`h-full rounded-full ${dc.bg.replace('50', '500')}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 w-12 text-right">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">All Inventory</h3>
          <span className="text-xs text-slate-500">{filteredSkus.length} SKUs</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Product / SKU</th>
                <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Whse</th>
                <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Class</th>
                <th className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">DOS</th>
                <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">On Hand</th>
                <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Available</th>
                <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">In Transit</th>
                <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Reserved</th>
                <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Unit Cost</th>
                <th className="text-right px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Asset Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSkus.map(item => {
                const dc = dosConfig[item.dosStatus];
                const DosIcon = dc.icon;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">{item.productName}</span>
                        <span className="text-xs text-slate-400 font-mono">{item.sku}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                        item.warehouse === 'fba' ? 'bg-orange-50 text-orange-700' :
                        item.warehouse === '3pl' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Warehouse size={10} />
                        {item.warehouse === 'fba' ? 'FBA' : item.warehouse === '3pl' ? '3PL' : 'In-House'}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: classColors[item.class] }}>{item.class}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${dc.bg} ${dc.color}`}>
                        <DosIcon size={10} /> {item.daysOfSupply.toFixed(1)}d
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-sm text-slate-700">{item.onHand}</td>
                    <td className="px-3 py-3 text-right text-sm text-slate-700">{item.available}</td>
                    <td className="px-3 py-3 text-right text-sm text-slate-600">{item.inTransit > 0 ? item.inTransit : '—'}</td>
                    <td className="px-3 py-3 text-right text-sm text-slate-600">{item.reserved}</td>
                    <td className="px-3 py-3 text-right text-sm text-slate-600">{formatCurrency(item.unitCost)}</td>
                    <td className="px-3 py-3 text-right text-sm font-medium text-slate-900">{formatCurrency(item.onHand * item.unitCost)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inbound Shipments */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-base font-semibold text-slate-900">Inbound Shipments</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {inboundShipments.map(ship => (
            <div key={ship.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-2 rounded-lg ${
                  ship.status === 'in-transit' ? 'bg-blue-100' : ship.status === 'processing' ? 'bg-amber-100' : 'bg-red-100'
                }`}>
                  <Truck size={18} className={
                    ship.status === 'in-transit' ? 'text-blue-600' : ship.status === 'processing' ? 'text-amber-600' : 'text-red-600'
                  } />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{ship.productName}</p>
                  <p className="text-xs text-slate-500">{ship.supplier} · {ship.sku}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{ship.quantity.toLocaleString()} units</p>
                  <p className="text-xs text-slate-400">
                    {ship.warehouse === 'fba' ? 'Amazon FBA' : ship.warehouse === '3pl' ? '3PL Warehouse' : 'In-House'}
                  </p>
                </div>
                <div className="text-right min-w-[100px]">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    ship.status === 'in-transit' ? 'bg-blue-50 text-blue-700' :
                    ship.status === 'processing' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                  }`}>
                    <RefreshCw size={10} className={ship.status === 'in-transit' ? 'animate-spin' : ''} />
                    {ship.status === 'in-transit' ? 'In Transit' : ship.status === 'processing' ? 'Processing' : 'Delayed'}
                  </span>
                </div>
                <div className="text-right min-w-[80px]">
                  <p className="text-sm font-medium text-slate-900">ETA {ship.etaDays}d</p>
                  <div className="w-full h-1 bg-slate-200 rounded-full mt-1">
                    <div className={`h-full rounded-full ${
                      ship.status === 'delayed' ? 'bg-red-500' : ship.status === 'processing' ? 'bg-amber-400' : 'bg-blue-500'
                    }`} style={{ width: `${Math.min(100, (1 - ship.etaDays / 30) * 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}