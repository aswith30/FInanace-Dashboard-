import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  UserCircle,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { UserRole } from '../types';
import { cn } from '../lib/utils';

export type TabType = 'Dashboard' | 'Transactions' | 'Insights' | 'Settings';

interface SidebarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  role, 
  setRole, 
  darkMode, 
  setDarkMode,
  currentTab,
  setCurrentTab
}) => {
  const navItems: { icon: any; label: TabType }[] = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: ArrowLeftRight, label: 'Transactions' },
    { icon: PieChart, label: 'Insights' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r bg-card md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-bold text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            F
          </div>
          <span className="text-xl tracking-tight">FinTrack</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setCurrentTab(item.label)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                currentTab === item.label 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Role
              </span>
              {role === 'Admin' ? (
                <ShieldCheck className="h-4 w-4 text-primary" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full rounded-md border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Viewer">Viewer</option>
              <option value="Admin">Admin</option>
            </select>
            <p className="mt-2 text-[10px] text-muted-foreground">
              {role === 'Admin' ? 'Full access to edit data' : 'Read-only access to data'}
            </p>
          </div>

          <div className="flex items-center justify-between px-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted text-destructive">
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 border-t pt-4 px-2">
            <UserCircle className="h-8 w-8 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Premium User</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
