'use client';

import { useEffect, useRef } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ExternalLink,
  FileDown,
  ShoppingBag,
  RotateCcw,
  Receipt,
  Settings,
} from 'lucide-react';
import { type PayoutRecord, platformColors } from '@/data/mockData';

interface Props {
  payout: PayoutRecord;
  onClose: () => void;
}

export default function ReconciliationDetail({ payout, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

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
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const statusConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    matched: { label: 'Fully Reconciled', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    pending: { label: 'Pending', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    discrepancy: { label: 'Discrepancy', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  };

  const sc = statusConfig[payout.status];
  const StatusIcon = sc.icon;

  const lineItemIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingBag;
      case 'refund': return RotateCcw;
      case 'fee': return Receipt;
      default: return Settings;
    }
  };

  const lineItemColor = (type: string) => {
    switch (type) {
      case 'order': return 'text-emerald-600 bg-emerald-50';
      case 'refund': return 'text-amber-600 bg-amber-50';
      case 'fee': return 'text-slate-600 bg-slate-100';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-200 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-slate-900">Payout Details</h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${sc.bg} ${sc.color}`}>
                <StatusIcon size={14} />
                {sc.label}
              </span>
            </div>
            <p className="text-sm text-slate-500 font-mono">{payout.payoutId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {/* Summary Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Platform</p>
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: platformColors[payout.platform] }}
                />
                <span className="text-sm font-semibold text-slate-900">{payout.platform}</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Platform Date</p>
              <p className="text-sm font-semibold text-slate-900">{formatDate(payout.platformDate)}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Bank Date</p>
              <p className={`text-sm font-semibold ${payout.bankDate ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                {formatDate(payout.bankDate)}
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Confidence Score</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-200 rounded-full">
                  <div
                    className={`h-full rounded-full ${
                      payout.confidenceScore >= 90 ? 'bg-emerald-500' : payout.confidenceScore >= 70 ? 'bg-amber-400' : 'bg-red-500'
                    }`}
                    style={{ width: `${payout.confidenceScore}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-slate-900">{payout.confidenceScore}%</span>
              </div>
            </div>
          </div>

          {/* Amount Comparison */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Amount Breakdown</h3>
            <div className="bg-slate-50 rounded-xl p-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Gross Amount</span>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(payout.grossAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Platform Fees</span>
                <span className="text-sm font-medium text-red-600">-{formatCurrency(payout.platformFees)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Adjustments / Refunds</span>
                <span className={`text-sm font-medium ${payout.adjustments < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {payout.adjustments < 0 ? '-' : '+'}{formatCurrency(Math.abs(payout.adjustments))}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-800">Expected Net Amount</span>
                <span className="text-lg font-bold text-slate-900">{formatCurrency(payout.netAmount)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-800">Bank Recorded Amount</span>
                <span className={`text-lg font-bold ${
                  payout.bankAmount === null
                    ? 'text-slate-400'
                    : payout.status === 'discrepancy'
                      ? 'text-red-600'
                      : 'text-emerald-600'
                }`}>
                  {payout.bankAmount !== null ? formatCurrency(payout.bankAmount) : 'Not yet received'}
                </span>
              </div>
              {payout.status === 'discrepancy' && payout.bankAmount !== null && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-500 shrink-0" />
                    <p className="text-sm text-red-700">
                      Difference of {formatCurrency(Math.abs(payout.netAmount - payout.bankAmount))} detected.
                      Platform reports {formatCurrency(payout.netAmount)} but bank shows {formatCurrency(payout.bankAmount)}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Line Items */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Line Item Breakdown
              <span className="font-normal normal-case text-slate-400 ml-2">
                ({payout.lineItems.length} items)
              </span>
            </h3>
            <div className="space-y-2">
              {payout.lineItems.map((item) => {
                const ItemIcon = lineItemIcon(item.type);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${lineItemColor(item.type)}`}>
                        <ItemIcon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{item.description}</p>
                        <p className="text-xs text-slate-400">
                          {formatDate(item.date)} · {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${
                      item.amount < 0 ? 'text-red-600' : 'text-emerald-600'
                    }`}>
                      {item.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(item.amount))}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-8 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors">
              <FileDown size={16} />
              Export
            </button>
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ExternalLink size={16} />
              View in {payout.platform}
            </button>
          </div>
          <div className="flex items-center gap-3">
            {payout.status !== 'matched' && (
              <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm">
                {payout.status === 'discrepancy' ? 'Resolve Discrepancy' : 'Try Auto-Match'}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}