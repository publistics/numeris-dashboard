'use client';

import { RefreshCw, CheckCircle2, AlertTriangle, Clock, DollarSign, Wifi, WifiOff } from 'lucide-react';
import { useSummaryMetrics, useApiStatus } from '@/lib/api-hooks';

export default function SummaryCards() {
  const { data: metrics, isLoading, isLive } = useSummaryMetrics();
  const { isConnected } = useApiStatus();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const cards = [
    {
      title: 'Total Reconciled',
      value: formatCurrency(metrics.totalReconciled),
      subtitle: 'This month',
      icon: CheckCircle2,
      color: 'emerald',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      border: 'border-emerald-200/50',
    },
    {
      title: 'Pending Payouts',
      value: formatCurrency(metrics.totalPending),
      subtitle: 'Awaiting clearance',
      icon: Clock,
      color: 'amber',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      border: 'border-amber-200/50',
    },
    {
      title: 'Open Discrepancies',
      value: formatCurrency(metrics.totalDiscrepancies),
      subtitle: 'Needs attention',
      icon: AlertTriangle,
      color: 'red',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      border: 'border-red-200/50',
    },
    {
      title: 'Total Payouts (MTD)',
      value: formatCurrency(metrics.totalPayoutsThisMonth),
      subtitle: 'Month to date',
      icon: DollarSign,
      color: 'blue',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      border: 'border-blue-200/50',
    },
  ];

  return (
    <div>
      {/* Connection status badge */}
      <div className="flex items-center justify-end mb-2 gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          isConnected
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-amber-50 text-amber-700'
        }`}>
          {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
          {isConnected ? 'Live API' : 'Demo Mode'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`bg-white rounded-xl border ${card.border} p-5 hover:shadow-md transition-all duration-200 ${isLoading ? 'animate-pulse' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-lg ${card.iconBg}`}>
                <card.icon size={20} className={card.iconColor} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <RefreshCw size={12} className="inline" />
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}