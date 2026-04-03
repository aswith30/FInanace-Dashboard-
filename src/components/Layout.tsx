import React from 'react';
import { Sidebar, TabType } from './Sidebar';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  setRole: (role: UserRole) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  role, 
  setRole, 
  darkMode, 
  setDarkMode,
  currentTab,
  setCurrentTab
}) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        role={role} 
        setRole={setRole} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
        <div className="mx-auto max-w-7xl space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
};
