'use client';

import { useState } from 'react';
import { DailyEntry } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function DailyLogView() {
  const [entries, setEntries, isLoaded] = useLocalStorage<DailyEntry[]>('dailyEntries', []);
  const [showForm, setShowForm] = useState(false);

  if (!isLoaded) {
    return <div className="bg-white rounded-xl shadow-md p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2b2d42]">Daily Log</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4a7c59] hover:bg-[#2d5016] text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ New Entry'}
        </button>
      </div>

      {showForm && <DailyEntryForm entries={entries} setEntries={setEntries} setShowForm={setShowForm} />}

      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No entries yet. Start logging your hike!
          </div>
        ) : (
          entries
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((entry) => <DailyEntryCard key={entry.id} entry={entry} entries={entries} setEntries={setEntries} />)
        )}
      </div>
    </div>
  );
}

function DailyEntryForm({
  entries,
  setEntries,
  setShowForm,
  editEntry,
}: {
  entries: DailyEntry[];
  setEntries: (entries: DailyEntry[]) => void;
  setShowForm: (show: boolean) => void;
  editEntry?: DailyEntry;
}) {
  const [formData, setFormData] = useState<Partial<DailyEntry>>(
    editEntry || {
      date: new Date().toISOString().split('T')[0] as unknown as Date,
      section: 1,
      startLocation: '',
      endLocation: '',
      miles: 0,
      sleepQuality: 3,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: DailyEntry = {
      id: editEntry?.id || Date.now().toString(),
      date: new Date(formData.date as unknown as string),
      section: formData.section || 1,
      startLocation: formData.startLocation || '',
      endLocation: formData.endLocation || '',
      miles: formData.miles || 0,
      startTime: formData.startTime,
      endTime: formData.endTime,
      breakTime: formData.breakTime,
      elevationGain: formData.elevationGain,
      elevationLoss: formData.elevationLoss,
      finalElevation: formData.finalElevation,
      sleepQuality: formData.sleepQuality,
      weather: formData.weather,
      isRaining: formData.isRaining,
      hasTrailMagic: formData.hasTrailMagic,
      notes: formData.notes,
    };

    if (editEntry) {
      setEntries(entries.map(e => e.id === editEntry.id ? newEntry : e));
    } else {
      setEntries([...entries, newEntry]);
    }

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
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Section</label>
          <input
            type="number"
            value={formData.section}
            onChange={(e) => setFormData({ ...formData, section: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Start Location *</label>
          <input
            type="text"
            required
            value={formData.startLocation}
            onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
            placeholder="e.g., Springer Mountain Shelter"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">End Location *</label>
          <input
            type="text"
            required
            value={formData.endLocation}
            onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
            placeholder="e.g., Hawk Mountain Shelter"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Miles *</label>
          <input
            type="number"
            step="0.1"
            required
            value={formData.miles}
            onChange={(e) => setFormData({ ...formData, miles: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Sleep Quality (1-5)</label>
          <select
            value={formData.sleepQuality}
            onChange={(e) => setFormData({ ...formData, sleepQuality: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          >
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Great</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Start Time</label>
          <input
            type="time"
            value={formData.startTime || ''}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">End Time</label>
          <input
            type="time"
            value={formData.endTime || ''}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Elevation Gain (ft)</label>
          <input
            type="number"
            value={formData.elevationGain || ''}
            onChange={(e) => setFormData({ ...formData, elevationGain: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Elevation Loss (ft)</label>
          <input
            type="number"
            value={formData.elevationLoss || ''}
            onChange={(e) => setFormData({ ...formData, elevationLoss: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Weather</label>
          <input
            type="text"
            value={formData.weather || ''}
            onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
            placeholder="e.g., Sunny, 75°F"
          />
        </div>

        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isRaining || false}
              onChange={(e) => setFormData({ ...formData, isRaining: e.target.checked })}
              className="w-4 h-4 text-[#4a7c59] rounded focus:ring-[#4a7c59]"
            />
            <span className="text-sm text-[#2b2d42]">Raining</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.hasTrailMagic || false}
              onChange={(e) => setFormData({ ...formData, hasTrailMagic: e.target.checked })}
              className="w-4 h-4 text-[#4a7c59] rounded focus:ring-[#4a7c59]"
            />
            <span className="text-sm text-[#2b2d42]">Trail Magic</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2b2d42] mb-1">Notes</label>
        <textarea
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          placeholder="How was the day? Any memorable moments?"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-[#4a7c59] hover:bg-[#2d5016] text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {editEntry ? 'Update Entry' : 'Save Entry'}
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

function DailyEntryCard({
  entry,
  entries,
  setEntries,
}: {
  entry: DailyEntry;
  entries: DailyEntry[];
  setEntries: (entries: DailyEntry[]) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (confirm('Delete this entry?')) {
      setEntries(entries.filter((e) => e.id !== entry.id));
    }
  };

  if (isEditing) {
    return <DailyEntryForm entries={entries} setEntries={setEntries} setShowForm={setIsEditing} editEntry={entry} />;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#f4a261]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#2b2d42]">
            {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h3>
          <p className="text-sm text-gray-600">
            {entry.startLocation} → {entry.endLocation}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsEditing(true)} className="text-[#4a7c59] hover:text-[#2d5016] text-sm font-medium">
            Edit
          </button>
          <button onClick={handleDelete} className="text-red-600 hover:text-red-800 text-sm font-medium">
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Miles</p>
          <p className="text-lg font-semibold text-[#2b2d42]">{entry.miles}</p>
        </div>
        {entry.elevationGain && (
          <div>
            <p className="text-xs text-gray-500">Elevation Gain</p>
            <p className="text-lg font-semibold text-[#2b2d42]">{entry.elevationGain} ft</p>
          </div>
        )}
        <div>
          <p className="text-xs text-gray-500">Sleep Quality</p>
          <p className="text-lg font-semibold text-[#2b2d42]">{'⭐'.repeat(entry.sleepQuality || 0)}</p>
        </div>
        {entry.weather && (
          <div>
            <p className="text-xs text-gray-500">Weather</p>
            <p className="text-sm text-[#2b2d42]">{entry.weather}</p>
          </div>
        )}
      </div>

      {(entry.isRaining || entry.hasTrailMagic) && (
        <div className="flex gap-2 mb-3">
          {entry.isRaining && <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">🌧️ Rainy</span>}
          {entry.hasTrailMagic && <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">✨ Trail Magic</span>}
        </div>
      )}

      {entry.notes && (
        <div className="mt-3 p-3 bg-[#faf9f6] rounded-lg">
          <p className="text-sm text-[#2b2d42]">{entry.notes}</p>
        </div>
      )}
    </div>
  );
}
