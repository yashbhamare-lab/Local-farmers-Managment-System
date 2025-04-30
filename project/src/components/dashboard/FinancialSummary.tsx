import React from 'react';
import Card from '../ui/Card';
import { useAppContext } from '../../context/AppContext';

const FinancialSummary: React.FC = () => {
  const { transactions } = useAppContext();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const incomeByCategory = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card title="Financial Summary">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-800">Income</p>
          <p className="text-xl font-bold text-green-800">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-sm font-medium text-red-800">Expenses</p>
          <p className="text-xl font-bold text-red-800">{formatCurrency(totalExpenses)}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-800">Balance</p>
          <p className="text-xl font-bold text-blue-800">{formatCurrency(balance)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Income Sources</h3>
          <div className="space-y-2">
            {Object.entries(incomeByCategory).map(([category, amount]) => (
              <div key={`income-${category}`} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{category}</span>
                <span className="text-sm font-medium text-green-700">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Expense Categories</h3>
          <div className="space-y-2">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={`expense-${category}`} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{category}</span>
                <span className="text-sm font-medium text-red-700">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FinancialSummary;