'use client';

import { useState } from 'react';
import {
  DollarSign, Tag, ArrowUpDown, Upload, Search, Filter, CheckCircle2, Clock,
  AlertTriangle, RefreshCw, ChevronDown,
} from 'lucide-react';
import { useExpenses } from '@/lib/api-hooks';
import { expenseCategories, type ExpenseCategory, type ExpenseRecord } from '@/data/mockData';

const formatCurrency = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(v);

export default function ExpenseManagement() {
  const { expenses, summary, isLive } = useExpenses();
  const [filter, setFilter] = useState<'all' | 'categorized' | 'pending'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Track category changes locally
  const [localCategories, setLocalCategories] = useState<Record<string, ExpenseCategory>>({});

  const totalPending = expenses.filter(e => e.status === 'pending').length;
  const totalExpenses = expenses.reduce((s, e) => s + e.baseCurrencyAmount, 0);

  const filtered = expenses.filter(e => {
    if (filter === 'categorized' && e.status !== 'categorized') return false;
    if (filter === 'pending' && e.status !== 'pending') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return e.description.toLowerCase().includes(q) || (e.category || '').toLowerCase().includes(q);
    }
    return true;
  });

  const handleCategoryChange = (id: string, category: ExpenseCategory) => {
    setLocalCategories(prev => ({ ...prev, [id]: category }));
    // In production: PATCH /api/v1/expenses/:id { category }
  };

  const handleImport = async () => {
    // In production: POST /api/v1/expenses/import
    alert('Import triggered — new transactions fetched from bank feed.');
  };

  const getCategoryColor = (cat: string | null): string => {
    const colors: Record<string, string> = {
      Marketing: '#f59e0b', 'Software & SaaS': '#6366f1', Shipping: '#06b6d4',
      Payroll: '#10b981', 'Rent & Facilities': '#ef4444', 'Bank Fees': '#8b5cf6',
      Utilities: '#f97316', 'Office Supplies': '#14b8a6', Travel: '#ec4899',
      'Professional Services': '#0ea5e9', Taxes: '#dc2626', Other: '#94a3b8',
    };
    return cat ? colors[cat] || '#94a3b8' : '#94a3b8';
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
            {(['all', 'categorized', 'pending'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {f === 'all' ? 'All' : f === 'categorized' ? 'Categorized' : 'Review Queue'}
                {f === 'pending' && totalPending > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">{totalPending}</span>
                )}
              </button>
            ))}
          </div>
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search transactions..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none" />
          </div>
          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm ml-auto"
          >
            <Upload size={16} /> Import Transactions
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-slate-100"><DollarSign size={18} className="text-slate-600" /></div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Expenses (MTD)</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(totalExpenses)}</p>
          <p className="text-xs text-slate-400 mt-1">{expenses.length} transactions</p>
        </div>

        {summary.slice(0, 3).map(s => (
          <div key={s.category} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-lg" style={{ backgroundColor: s.color + '20' }}>
                <Tag size={18} style={{ color: s.color }} />
              </div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{s.category}</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{formatCurrency(s.total)}</p>
            <p className="text-xs text-slate-400 mt-1">{s.count} txns · {s.percentage}% of total</p>
          </div>
        ))}
      </div>

      {/* Category Breakdown Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Expense Breakdown by Category</h3>
        <div className="flex h-6 rounded-lg overflow-hidden">
          {summary.map(s => (
            <div
              key={s.category}
              style={{ width: `${s.percentage}%`, backgroundColor: s.color }}
              className="relative group cursor-pointer transition-all hover:opacity-80"
              title={`${s.category}: ${formatCurrency(s.total)} (${s.percentage}%)`}
            >
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                {s.percentage > 8 ? `${s.percentage}%` : ''}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {summary.map(s => (
            <div key={s.category} className="flex items-center gap-1.5 text-xs">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-slate-600">{s.category}</span>
              <span className="font-medium text-slate-900">{formatCurrency(s.total)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">
            {filter === 'pending' ? 'Review Queue — Needs Categorization' : 'Transactions'}
          </h3>
          <span className="text-xs text-slate-500">{filtered.length} of {expenses.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Description</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Amount (Base)</th>
                <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Original</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Bank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(exp => {
                const effectiveCat = localCategories[exp.id] || exp.category;
                return (
                  <tr key={exp.id} className={`hover:bg-slate-50/50 transition-colors ${exp.status === 'pending' ? 'bg-amber-50/30' : ''}`}>
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{exp.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">{exp.description}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900 whitespace-nowrap">
                      {formatCurrency(exp.baseCurrencyAmount)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-slate-500 whitespace-nowrap">
                      {exp.currency !== 'USD' ? `${formatCurrency(exp.grossAmount)} ${exp.currency}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {effectiveCat && (
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getCategoryColor(effectiveCat) }} />
                        )}
                        <select
                          value={effectiveCat || ''}
                          onChange={e => handleCategoryChange(exp.id, e.target.value as ExpenseCategory)}
                          className={`text-sm border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer ${
                            effectiveCat ? 'text-slate-700' : 'text-slate-400 italic'
                          }`}
                        >
                          <option value="">{exp.status === 'pending' ? '— Categorize —' : 'Uncategorized'}</option>
                          {expenseCategories.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        exp.status === 'categorized' ? 'bg-emerald-50 text-emerald-700' :
                        exp.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {exp.status === 'categorized' ? <CheckCircle2 size={12} /> :
                         exp.status === 'pending' ? <Clock size={12} /> : <AlertTriangle size={12} />}
                        {exp.status === 'categorized' ? 'Categorized' : exp.status === 'pending' ? 'Pending' : 'Ignored'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{exp.bankName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-sm text-slate-400">No transactions found.</div>
        )}
      </div>
    </div>
  );
}