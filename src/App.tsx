import { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { SummaryCards } from './components/SummaryCards';
import { Charts } from './components/Charts';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { Insights } from './components/Insights';
import { TabType } from './components/Sidebar';
import { Transaction, UserRole, DashboardStats } from './types';
import { INITIAL_TRANSACTIONS } from './data/mockData';
import { format, subDays } from 'date-fns';
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard } from 'lucide-react';

export default function App() {
  // State
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('fintrack_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('fintrack_role');
    return (saved as UserRole) || 'Admin';
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('fintrack_darkmode');
    return saved === 'true';
  });
  const [currentTab, setCurrentTab] = useState<TabType>('Dashboard');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('fintrack_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('fintrack_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('fintrack_darkmode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Calculated Stats
  const stats = useMemo((): DashboardStats => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    // Monthly Trend (Last 30 days)
    const trendData = Array.from({ length: 30 }).map((_, i) => {
      const date = subDays(new Date(), 29 - i);
      const dateStr = format(date, 'yyyy-MM-dd');
      
      const dayTransactions = transactions.filter(t => t.date <= dateStr);
      const dayIncome = dayTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const dayExpense = dayTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      
      return {
        date: format(date, 'MMM dd'),
        balance: dayIncome - dayExpense,
        income: dayIncome,
        expense: dayExpense
      };
    });

    // Category Breakdown
    const categoryMap = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const categoryBreakdown = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value: value as number
    }));

    return {
      totalBalance,
      totalIncome,
      totalExpenses,
      monthlyTrend: trendData,
      categoryBreakdown
    };
  }, [transactions]);

  // Handlers
  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleSubmitTransaction = (data: Omit<Transaction, 'id'> & { id?: string }) => {
    if (data.id) {
      setTransactions(prev => prev.map(t => t.id === data.id ? { ...data, id: data.id! } : t));
    } else {
      const newTransaction: Transaction = {
        ...data,
        id: Math.random().toString(36).substr(2, 9)
      };
      setTransactions(prev => [newTransaction, ...prev]);
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'Dashboard':
        return (
          <>
            <SummaryCards 
              totalBalance={stats.totalBalance}
              totalIncome={stats.totalIncome}
              totalExpenses={stats.totalExpenses}
            />
            <Charts 
              trendData={stats.monthlyTrend}
              categoryData={stats.categoryBreakdown}
            />
            <Insights transactions={transactions} />
            <TransactionList 
              transactions={transactions.slice(0, 5)}
              role={role}
              onDelete={handleDeleteTransaction}
              onEdit={handleEditTransaction}
              onAdd={handleAddTransaction}
            />
          </>
        );
      case 'Transactions':
        return (
          <TransactionList 
            transactions={transactions}
            role={role}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
            onAdd={handleAddTransaction}
          />
        );
      case 'Insights':
        return (
          <div className="space-y-8">
            <Insights transactions={transactions} />
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Detailed Analysis</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Monthly Comparison</h4>
                  <div className="h-48 rounded-lg bg-muted/50 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground italic">Comparison chart coming soon...</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Spending Velocity</h4>
                  <div className="h-48 rounded-lg bg-muted/50 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground italic">Velocity metrics coming soon...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="max-w-2xl space-y-6">
            <div className="rounded-xl border bg-card p-6">
              <div className="mb-6 flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Account Settings</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Profile Information</p>
                      <p className="text-sm text-muted-foreground">Update your personal details</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-primary hover:underline">Edit</button>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-muted-foreground">Manage your alerts and emails</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-primary hover:underline">Configure</button>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Security</p>
                      <p className="text-sm text-muted-foreground">Password and authentication</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-primary hover:underline">Update</button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Billing</p>
                      <p className="text-sm text-muted-foreground">Manage your subscription</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-primary hover:underline">View</button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
              <h4 className="font-semibold text-destructive">Danger Zone</h4>
              <p className="mt-1 text-sm text-muted-foreground">Once you delete your account, there is no going back.</p>
              <button className="mt-4 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
                Delete Account
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout 
      role={role} 
      setRole={setRole} 
      darkMode={darkMode} 
      setDarkMode={setDarkMode}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
    >
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{currentTab}</h1>
            <p className="text-muted-foreground">
              {currentTab === 'Dashboard' && "Welcome back, John! Here's what's happening with your money."}
              {currentTab === 'Transactions' && "View and manage your full transaction history."}
              {currentTab === 'Insights' && "Deep dive into your spending habits and financial health."}
              {currentTab === 'Settings' && "Manage your account preferences and security."}
            </p>
          </div>
        </div>

        {renderContent()}

        {/* Form Modal */}
        <TransactionForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmitTransaction}
          initialData={editingTransaction}
        />
      </div>
    </Layout>
  );
}
