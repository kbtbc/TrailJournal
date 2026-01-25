'use client';

import { useState } from 'react';
import { Expense } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function ExpensesView() {
  const [expenses, setExpenses, isLoaded] = useLocalStorage<Expense[]>('expenses', []);
  const [showForm, setShowForm] = useState(false);

  if (!isLoaded) {
    return <div className="bg-white rounded-xl shadow-md p-8">Loading...</div>;
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const expensesByCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2b2d42]">Expenses</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4a7c59] hover:bg-[#2d5016] text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Expense'}
        </button>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-br from-[#f4a261] to-[#e07a5f] text-white rounded-xl p-6 shadow-xl">
        <p className="text-lg mb-1">Total Expenses</p>
        <p className="text-4xl font-bold">${totalExpenses.toFixed(2)}</p>
      </div>

      {/* By Category */}
      {Object.keys(expensesByCategory).length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#2b2d42]">By Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(expensesByCategory).map(([category, amount]) => (
              <div key={category} className="p-4 bg-[#faf9f6] rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{category}</p>
                <p className="text-xl font-bold text-[#2b2d42]">${amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && <ExpenseForm expenses={expenses} setExpenses={setExpenses} setShowForm={setShowForm} />}

      <div className="space-y-3">
        {expenses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No expenses recorded yet
          </div>
        ) : (
          expenses
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((expense) => <ExpenseCard key={expense.id} expense={expense} expenses={expenses} setExpenses={setExpenses} />)
        )}
      </div>
    </div>
  );
}

function ExpenseForm({
  expenses,
  setExpenses,
  setShowForm,
}: {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  setShowForm: (show: boolean) => void;
}) {
  const [formData, setFormData] = useState<Partial<Expense>>({
    date: new Date().toISOString().split('T')[0] as unknown as Date,
    category: 'Food',
    amount: 0,
    description: '',
  });

  const categories = ['Food', 'Lodging', 'Gear', 'Transportation', 'Resupply', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense: Expense = {
      id: Date.now().toString(),
      date: new Date(formData.date as unknown as string),
      category: formData.category || 'Food',
      amount: formData.amount || 0,
      description: formData.description,
    };

    setExpenses([...expenses, newExpense]);
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Date *</label>
          <input
            type="date"
            required
            value={formData.date as unknown as string}
            onChange={(e) => setFormData({ ...formData, date: e.target.value as unknown as Date })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Amount *</label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
            placeholder="e.g., Lunch at trail town"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-[#4a7c59] hover:bg-[#2d5016] text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Add Expense
        </button>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="bg-gray-200 hover:bg-gray-300 text-[#2b2d42] px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ExpenseCard({
  expense,
  expenses,
  setExpenses,
}: {
  expense: Expense;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
}) {
  const handleDelete = () => {
    if (confirm('Delete this expense?')) {
      setExpenses(expenses.filter((e) => e.id !== expense.id));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-[#f4a261] bg-opacity-20 text-[#e07a5f] text-sm font-medium rounded-full">
            {expense.category}
          </span>
          <p className="text-sm text-gray-600">
            {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        {expense.description && <p className="text-sm text-gray-700 mt-1">{expense.description}</p>}
      </div>
      <div className="flex items-center gap-4">
        <p className="text-2xl font-bold text-[#2b2d42]">${expense.amount.toFixed(2)}</p>
        <button onClick={handleDelete} className="text-red-600 hover:text-red-800 text-sm font-medium">
          Delete
        </button>
      </div>
    </div>
  );
}
