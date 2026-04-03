export type TransactionType = 'income' | 'expense';

export type Category = 
  | 'Housing' 
  | 'Food' 
  | 'Transport' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Health' 
  | 'Salary' 
  | 'Investment' 
  | 'Other';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description: string;
}

export type UserRole = 'Admin' | 'Viewer';

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  monthlyTrend: { date: string; balance: number; income: number; expense: number }[];
  categoryBreakdown: { name: string; value: number }[];
}
