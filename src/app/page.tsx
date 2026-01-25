'use client';

import { useState, useEffect } from 'react';
import DailyLogView from '@/components/DailyLogView';
import JournalView from '@/components/JournalView';
import StatsView from '@/components/StatsView';
import ExpensesView from '@/components/ExpensesView';
import GearView from '@/components/GearView';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DailyEntry, Expense, JournalEntry, GearItem } from '@/types';

type View = 'home' | 'daily' | 'journal' | 'stats' | 'expenses' | 'gear';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('home');
  const [dailyEntries, setDailyEntries] = useLocalStorage<DailyEntry[]>('dailyEntries', []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>('journalEntries', []);
  const [gear, setGear] = useLocalStorage<GearItem[]>('gear', []);

  useEffect(() => {
    // Check if user is already authenticated in this session
    const authStatus = sessionStorage.getItem('trailJournalAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (password: string): boolean => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (!adminPassword) {
      alert('Password not configured. Please set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local');
      return false;
    }

    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('trailJournalAuth', 'true');
      return true;
    }

    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('trailJournalAuth');
    setCurrentView('home');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <div className="text-[#2d5016] text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const hasData = dailyEntries.length > 0 || expenses.length > 0 || journalEntries.length > 0 || gear.length > 0;

  const loadDemoData = () => {
    const { loadDemoData: loadData } = require('@/lib/demoData');
    const demoData = loadData();

    setDailyEntries([...dailyEntries, ...demoData.dailyEntries]);
    setJournalEntries([...journalEntries, ...demoData.journalEntries]);
    setExpenses([...expenses, ...demoData.expenses]);
    setGear([...gear, ...demoData.gear]);

    // Refresh page to show updates
    setTimeout(() => window.location.reload(), 100);
  };

  const verifyAdminPassword = (): boolean => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (!adminPassword) {
      alert('Admin password not configured. Please set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local');
      return false;
    }

    const userPassword = prompt('Enter admin password to continue:');

    if (userPassword === null) {
      return false; // User cancelled
    }

    if (userPassword !== adminPassword) {
      alert('Incorrect password. Access denied.');
      return false;
    }

    return true;
  };

  const resetData = () => {
    if (!verifyAdminPassword()) {
      return;
    }

    if (confirm('Reset all data? This will delete all your entries. This cannot be undone.')) {
      setDailyEntries([]);
      setJournalEntries([]);
      setExpenses([]);
      setGear([]);

      // Refresh page to show updates
      setTimeout(() => window.location.reload(), 100);
    }
  };

  const handleDataToggle = () => {
    if (hasData) {
      resetData();
    } else {
      loadDemoData();
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <header className="bg-[#2d5016] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Trail Journal</h1>
              <p className="text-sm mt-1 text-[#f4a261]">Your thru-hike companion</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDataToggle}
                className="bg-[#f4a261] hover:bg-[#e07a5f] text-[#2b2d42] px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
              >
                {hasData ? 'Clear All Data' : 'Add Demo Data'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-[#e07a5f] hover:bg-[#d06a4f] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'home', label: 'Home', icon: '🏔️' },
              { id: 'daily', label: 'Daily Log', icon: '📝' },
              { id: 'journal', label: 'Journal', icon: '📖' },
              { id: 'stats', label: 'Stats', icon: '📊' },
              { id: 'expenses', label: 'Expenses', icon: '💰' },
              { id: 'gear', label: 'Gear', icon: '🎒' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as View)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
                  currentView === item.id
                    ? 'border-[#4a7c59] text-[#2d5016]'
                    : 'border-transparent text-gray-600 hover:text-[#4a7c59] hover:border-gray-300'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'home' && <HomeView setCurrentView={setCurrentView} />}
        {currentView === 'daily' && <DailyLogView />}
        {currentView === 'journal' && <JournalView />}
        {currentView === 'stats' && <StatsView />}
        {currentView === 'expenses' && <ExpensesView />}
        {currentView === 'gear' && <GearView />}
      </main>
    </div>
  );
}

function HomeView({ setCurrentView }: { setCurrentView: (view: View) => void }) {
  const [dailyEntries] = useLocalStorage<DailyEntry[]>('dailyEntries', []);
  const [expenses] = useLocalStorage<Expense[]>('expenses', []);

  const totalMiles = dailyEntries.reduce((sum, e) => sum + e.miles, 0);
  const totalDays = dailyEntries.length;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4a7c59] to-[#2d5016] text-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Welcome Back, Hiker! 👋</h2>
        <p className="text-lg opacity-90">Ready to log today&apos;s adventure?</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Miles" value={totalMiles.toFixed(1)} icon="🥾" color="bg-[#4a7c59]" />
        <StatCard title="Days on Trail" value={totalDays.toString()} icon="📅" color="bg-[#e07a5f]" />
        <StatCard title="Total Expenses" value={`$${totalExpenses.toFixed(2)}`} icon="💵" color="bg-[#f4a261]" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-[#2b2d42]">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton icon="📝" label="Log Today's Miles" onClick={() => setCurrentView('daily')} />
          <ActionButton icon="📖" label="Write Journal Entry" onClick={() => setCurrentView('journal')} />
          <ActionButton icon="💰" label="Add Expense" onClick={() => setCurrentView('expenses')} />
          <ActionButton icon="🎒" label="Track Gear" onClick={() => setCurrentView('gear')} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#4a7c59]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-[#2b2d42]">{value}</p>
        </div>
        <div className={`${color} text-white text-3xl p-4 rounded-full`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 bg-[#f5f5dc] hover:bg-[#e07a5f] hover:text-white rounded-lg transition-all duration-200 font-medium text-[#2b2d42] border border-gray-200 hover:border-[#e07a5f] hover:shadow-lg"
    >
      <span className="text-2xl">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function LoginScreen({ onLogin }: { onLogin: (password: string) => boolean }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4a7c59] to-[#2d5016] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Trail Journal</h1>
          <p className="text-[#f4a261] text-lg">Your private thru-hike companion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent outline-none transition-all text-gray-900"
              placeholder="Enter your password"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#4a7c59] hover:bg-[#2d5016] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Protected access to your private journal</p>
        </div>
      </div>
    </div>
  );
}
