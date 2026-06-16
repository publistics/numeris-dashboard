// Dashboard page - composes all dashboard components
'use client';
import { useState, useEffect } from 'react';
import { DemoModeProvider } from '@/contexts/DemoContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import DemoBanner from '@/components/DemoBanner';
import SummaryCards from '@/components/SummaryCards';
import TabNav from '@/components/TabNav';
import ProfitAnalytics from '@/components/ProfitAnalytics';
import ReconciliationTable from '@/components/ReconciliationTable';
import ReconciliationDetail from '@/components/ReconciliationDetail';
import AdSpendView from '@/components/AdSpendView';
import ExpenseManagement from '@/components/ExpenseManagement';
import InventoryHealth from '@/components/InventoryHealth';
import SalesTaxNexus from '@/components/SalesTaxNexus';
import CashFlowSimulation from '@/components/CashFlowSimulation';
import ReportsView from '@/components/ReportsView';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('reconciliation');
  const [selectedPayout, setSelectedPayout] = useState<any>(null);

  useEffect(() => { document.title = 'Dashboard — Numeris'; }, []);

  const renderView = () => {
    if (selectedPayout && activeTab === 'reconciliation') {
      return <ReconciliationDetail payout={selectedPayout} onBack={() => setSelectedPayout(null)} />;
    }
    switch (activeTab) {
      case 'reconciliation': return <ReconciliationTable onSelectPayout={setSelectedPayout} />;
      case 'profit': return <ProfitAnalytics />;
      case 'adspend': return <AdSpendView />;
      case 'expenses': return <ExpenseManagement />;
      case 'inventory': return <InventoryHealth />;
      case 'nexus': return <SalesTaxNexus />;
      case 'cashflow': return <CashFlowSimulation />;
      case 'reports': return <ReportsView />;
      default: return <ReconciliationTable onSelectPayout={setSelectedPayout} />;
    }
  };

  return (
    <DemoModeProvider>
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DemoBanner />
          <Header />
          <main className="flex-1 overflow-y-auto px-8 py-6">
            <SummaryCards />
            <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
            {renderView()}
          </main>
        </div>
      </div>
    </DemoModeProvider>
  );
}