'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface DemoContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  demoMerchantName: string;
  demoStoreUrl: string;
}

const DemoContext = createContext<DemoContextType>({
  isDemoMode: true,
  toggleDemoMode: () => {},
  demoMerchantName: 'Apex Gear',
  demoStoreUrl: 'apexgear.com',
});

export function useDemoMode() {
  return useContext(DemoContext);
}

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(true);

  const toggleDemoMode = () => setIsDemoMode(prev => !prev);

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        toggleDemoMode,
        demoMerchantName: 'Apex Gear',
        demoStoreUrl: 'apexgear.com',
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}