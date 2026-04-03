import React from 'react';
import { Transaction } from '../types';
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface InsightsProps {
  transactions: Transaction[];
}

export const Insights: React.FC<InsightsProps> = ({ transactions }) => {
  // Calculate insights
  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const highestCategory = Object.entries(categoryTotals).sort((a, b) => (b[1] as number) - (a[1] as number))[0];
  
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const insights = [
    {
      title: 'Highest Spending',
      description: highestCategory 
        ? `You spent the most on ${highestCategory[0]} ($${highestCategory[1].toLocaleString()}).`
        : 'No expense data available.',
      icon: TrendingUp,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      title: 'Savings Rate',
      description: `Your current savings rate is ${savingsRate.toFixed(1)}%. ${savingsRate > 20 ? 'Great job!' : 'Try to aim for 20%.'}`,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      title: 'Budget Alert',
      description: totalExpenses > totalIncome * 0.8 
        ? 'Your expenses are reaching 80% of your income. Be careful!'
        : 'Your spending is well within your income limits.',
      icon: AlertCircle,
      color: totalExpenses > totalIncome * 0.8 ? 'text-rose-500' : 'text-blue-500',
      bg: totalExpenses > totalIncome * 0.8 ? 'bg-rose-500/10' : 'bg-blue-500/10'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Financial Insights</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${insight.bg}`}>
              <insight.icon className={`h-5 w-5 ${insight.color}`} />
            </div>
            <div>
              <h4 className="font-medium">{insight.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {insight.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
