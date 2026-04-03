import React from 'react';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SummaryCardsProps {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ totalBalance, totalIncome, totalExpenses }) => {
  const cards = [
    {
      title: 'Total Balance',
      amount: totalBalance,
      icon: Wallet,
      color: 'text-primary',
      bg: 'bg-primary/10',
      trend: '+2.5% from last month'
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      trend: '+12% from last month'
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: TrendingDown,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      trend: '-4% from last month'
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-xl border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight">
                ${card.amount.toLocaleString()}
              </h3>
            </div>
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", card.bg)}>
              <card.icon className={cn("h-6 w-6", card.color)} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs">
            <span className={cn(
              "font-medium",
              card.title === 'Total Expenses' ? 'text-emerald-500' : 'text-emerald-500'
            )}>
              {card.trend}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
