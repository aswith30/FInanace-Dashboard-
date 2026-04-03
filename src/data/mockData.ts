import { Transaction } from '../types';
import { subDays, format } from 'date-fns';

const categories = [
  'Housing', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Salary', 'Investment', 'Other'
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: format(subDays(new Date(), 0), 'yyyy-MM-dd'),
    amount: 5000,
    category: 'Salary',
    type: 'income',
    description: 'Monthly Salary',
  },
  {
    id: '2',
    date: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    amount: 120,
    category: 'Food',
    type: 'expense',
    description: 'Grocery Shopping',
  },
  {
    id: '3',
    date: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    amount: 45,
    category: 'Transport',
    type: 'expense',
    description: 'Uber Ride',
  },
  {
    id: '4',
    date: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    amount: 1500,
    category: 'Housing',
    type: 'expense',
    description: 'Rent Payment',
  },
  {
    id: '5',
    date: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    amount: 200,
    category: 'Shopping',
    type: 'expense',
    description: 'New Shoes',
  },
  {
    id: '6',
    date: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    amount: 300,
    category: 'Investment',
    type: 'income',
    description: 'Stock Dividend',
  },
  {
    id: '7',
    date: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
    amount: 80,
    category: 'Entertainment',
    type: 'expense',
    description: 'Netflix & Spotify',
  },
  {
    id: '8',
    date: format(subDays(new Date(), 12), 'yyyy-MM-dd'),
    amount: 150,
    category: 'Health',
    type: 'expense',
    description: 'Pharmacy',
  },
  {
    id: '9',
    date: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
    amount: 60,
    category: 'Food',
    type: 'expense',
    description: 'Dinner with friends',
  },
  {
    id: '10',
    date: format(subDays(new Date(), 20), 'yyyy-MM-dd'),
    amount: 1000,
    category: 'Investment',
    type: 'expense',
    description: 'Crypto Investment',
  }
];
