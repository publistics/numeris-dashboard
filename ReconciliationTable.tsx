'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
  ArrowUpDown,
  FileDown,
} from 'lucide-react';
import { platformColors, type PayoutRecord } from '@/data/mockData';
import { usePayouts } from '@/lib/api-hooks';
import ReconciliationDetail from './ReconciliationDetail';

export default function ReconciliationTable() {
  const { data: payouts, isLoading, isLive } = usePayouts();
  const [selectedPayout, setSelectedPayout] = useState<PayoutRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('platformDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const allStatuses = [...new Set(payouts.map(p => p.status))];
  const allPlatforms = [...new Set(payouts.map(p => p.platform))];

  const filteredPayouts = payouts
    .filter(p => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (platformFilter !== 'all' && p.platform !== platformFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.payoutId.toLowerCase().includes(q) ||
          p.platform.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      let aVal: any, bVal: any;
      switch (sortField) {
        case 'platformDate': aVal = a.platformDate; bVal = b.platformDate; break;
        case 'netAmount': aVal = a.netAmount; bVal = b.netAmount; break;
        case 'grossAmount': aVal = a.grossAmount; bVal = b.grossAmount; break;
        case 'platform': aVal = a.platform; bVal = b.platform; break;
        default: aVal = a.platformDate; bVal = b.platformDate;
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const allSelected = filteredPayouts.length > 0 && filteredPayouts.every(p => selectedRows.has(p.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredPayouts.map(p => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(next);
  };

  const statusConfig: Record<string, { label: string; icon: any; bgColor: string; textColor: string; dot: string }> = {
    matched: {
      label: 'Matched',
      icon: CheckCircle2,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      dot: 'bg-emerald-500',
    },
    pending: {
      label: 'Pending',
      icon: Clock,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      dot: 'bg-amber-400',
    },
    discrepancy: {
      label: 'Discrepancy',
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      dot: 'bg-red-500',
    },
  };

  return (
    <>
      {/* Filters bar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-5">
        <div className="p-4 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID or platform..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              {allStatuses.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <Filter size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Platform filter */}
          <div className="relative">
            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 cursor-pointer"
            >
              <option value="all">All Platforms</option>
              {allPlatforms.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <Filter size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {selectedRows.size > 0 && (
              <span className="text-sm text-slate-500 mr-2">
                {selectedRows.size} selected
              </span>
            )}
            <button className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              <FileDown size={16} />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-emerald-200">
              <CheckCircle2 size={16} />
              <span className="hidden sm:inline">Match Selected</span>
            </button>
          </div>
        </div>

        {/* Active filters indicator */}
        {(statusFilter !== 'all' || platformFilter !== 'all' || searchQuery) && (
          <div className="px-4 pb-3 flex items-center gap-2 text-xs text-slate-500">
            <span>Active filters:</span>
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-md">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter('all')} className="hover:text-slate-700">&times;</button>
              </span>
            )}
            {platformFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-md">
                Platform: {platformFilter}
                <button onClick={() => setPlatformFilter('all')} className="hover:text-slate-700">&times;</button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-md">
                Search: &ldquo;{searchQuery}&rdquo;
                <button onClick={() => setSearchQuery('')} className="hover:text-slate-700">&times;</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="w-12 px-4 py-3.5">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </th>
                <th className="px-3 py-3.5 text-left">
                  <button
                    onClick={() => handleSort('platform')}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-700"
                  >
                    Platform
                    {sortField === 'platform' && (
                      <ArrowUpDown size={12} className="text-emerald-500" />
                    )}
                  </button>
                </th>
                <th className="px-3 py-3.5 text-left">
                  <button
                    onClick={() => handleSort('platformDate')}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-700"
                  >
                    Payout ID
                    <ArrowUpDown size={12} className={sortField === 'platformDate' ? 'text-emerald-500' : 'opacity-0'} />
                  </button>
                </th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Platform Date
                </th>
                <th className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Bank Date
                </th>
                <th className="px-3 py-3.5 text-right">
                  <button
                    onClick={() => handleSort('grossAmount')}
                    className="flex items-center gap-1 justify-end text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-700"
                  >
                    Gross
                    <ArrowUpDown size={12} className={sortField === 'grossAmount' ? 'text-emerald-500' : 'opacity-0'} />
                  </button>
                </th>
                <th className="px-3 py-3.5 text-right">
                  <button
                    onClick={() => handleSort('netAmount')}
                    className="flex items-center gap-1 justify-end text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-700"
                  >
                    Net Amount
                    <ArrowUpDown size={12} className={sortField === 'netAmount' ? 'text-emerald-500' : 'opacity-0'} />
                  </button>
                </th>
                <th className="px-3 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Bank Amount
                </th>
                <th className="px-3 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Match
                </th>
                <th className="px-3 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="w-12 px-4 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayouts.map((payout) => {
                const isExpanded = expandedRow === payout.id;
                const sc = statusConfig[payout.status];
                const StatusIcon = sc.icon;

                return (
                  <tr key={payout.id} className={`group transition-colors ${selectedRows.has(payout.id) ? 'bg-emerald-50/50' : 'hover:bg-slate-50/50'}`}>
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(payout.id)}
                        onChange={() => toggleSelect(payout.id)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: platformColors[payout.platform] }}
                        />
                        <span className="text-sm font-medium text-slate-800">{payout.platform}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        onClick={() => setSelectedPayout(payout)}
                        className="text-sm font-mono text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer"
                      >
                        {payout.payoutId}
                      </button>
                    </td>
                    <td className="px-3 py-4">
                      <span className="text-sm text-slate-600">{formatDate(payout.platformDate)}</span>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`text-sm ${payout.bankDate ? 'text-slate-600' : 'text-slate-400 italic'}`}>
                        {formatDate(payout.bankDate)}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <span className="text-sm text-slate-600">{formatCurrency(payout.grossAmount)}</span>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <span className="text-sm font-semibold text-slate-900">{formatCurrency(payout.netAmount)}</span>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <span className={`text-sm font-medium ${
                        payout.bankAmount === null
                          ? 'text-slate-400'
                          : payout.status === 'discrepancy'
                            ? 'text-red-600'
                            : 'text-emerald-600'
                      }`}>
                        {payout.bankAmount !== null ? formatCurrency(payout.bankAmount) : '—'}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="relative w-12 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                              payout.confidenceScore >= 90
                                ? 'bg-emerald-500'
                                : payout.confidenceScore >= 70
                                  ? 'bg-amber-400'
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${payout.confidenceScore}%` }}
                          />
                        </div>
                        <span className="ml-2 text-xs text-slate-500 font-medium">{payout.confidenceScore}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${sc.bgColor} ${sc.textColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedPayout(payout)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => setExpandedRow(isExpanded ? null : payout.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                          title="Expand"
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredPayouts.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">No payouts found</h3>
            <p className="text-sm text-slate-500">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Pagination / Footer */}
        <div className="border-t border-slate-100 px-6 py-3 flex items-center justify-between text-sm text-slate-500">
          <span>Showing {filteredPayouts.length} of {payouts.length} payouts</span>
          <div className="flex items-center gap-3">
            <span className="text-xs">
              {selectedRows.size > 0
                ? `${selectedRows.size} selected`
                : 'Click rows to select for batch matching'}
            </span>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPayout && (
        <ReconciliationDetail
          payout={selectedPayout}
          onClose={() => setSelectedPayout(null)}
        />
      )}
    </>
  );
}