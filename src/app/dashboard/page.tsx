// Dashboard page - composes all dashboard components
'use client';
import { useState, useEffect } from 'react';
import { DemoModeProvider } from '../../contexts/DemoContext';
import Sidebar from '../../Sidebar';
import Header from '../../Header';
import DemoBanner from '../../DemoBanner';
import SummaryCards from '../../SummaryCards';
import TabNav from '../../TabNav';
import ProfitAnalytics from '../../ProfitAnalytics';
import ReconciliationTable from '../../ReconciliationTable';
import ReconciliationDetail from '../../ReconciliationDetail';
import AdSpendView from '../../AdSpendView';
import ExpenseManagement from '../../ExpenseManagement';
import InventoryHealth from '../../InventoryHealth';
import SalesTaxNexus from '../../SalesTaxNexus';
import CashFlowSimulation from '../../CashFlowSimulation';
import ReportsView from '../../ReportsView';

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