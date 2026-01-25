'use client';

import { useState } from 'react';
import { JournalEntry, DailyEntry } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function JournalView() {
  const [entries, setEntries, isLoaded] = useLocalStorage<JournalEntry[]>('journalEntries', []);
  const [dailyEntries] = useLocalStorage<DailyEntry[]>('dailyEntries', []);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  if (!isLoaded) {
    return <div className="bg-white rounded-xl shadow-md p-8">Loading...</div>;
  }

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEntry(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2b2d42]">Journal</h2>
        <button
          onClick={() => {
            setEditingEntry(null);
            setShowForm(!showForm);
          }}
          className="bg-[#4a7c59] hover:bg-[#2d5016] text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ New Entry'}
        </button>
      </div>

      {showForm && (
        <JournalForm
          entries={entries}
          setEntries={setEntries}
          setShowForm={handleCloseForm}
          dailyEntries={dailyEntries}
          editingEntry={editingEntry}
        />
      )}

      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            No journal entries yet. Start writing about your journey!
          </div>
        ) : (
          entries
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((entry) => (
              <JournalCard
                key={entry.id}
                entry={entry}
                entries={entries}
                setEntries={setEntries}
                onEdit={handleEdit}
              />
            ))
        )}
      </div>
    </div>
  );
}

function JournalForm({
  entries,
  setEntries,
  setShowForm,
  dailyEntries,
  editingEntry,
}: {
  entries: JournalEntry[];
  setEntries: (entries: JournalEntry[]) => void;
  setShowForm: (show: boolean) => void;
  dailyEntries: DailyEntry[];
  editingEntry: JournalEntry | null;
}) {
  const [formData, setFormData] = useState<Partial<JournalEntry>>({
    date: editingEntry
      ? (new Date(editingEntry.date).toISOString().split('T')[0] as unknown as Date)
      : (new Date().toISOString().split('T')[0] as unknown as Date),
    content: editingEntry?.content || '',
    hashtags: editingEntry?.hashtags || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEntry) {
      // Update existing entry
      const updatedEntry: JournalEntry = {
        ...editingEntry,
        date: new Date(formData.date as unknown as string),
        content: formData.content || '',
        hashtags: formData.hashtags,
        photos: formData.photos,
      };
      setEntries(entries.map((e) => (e.id === editingEntry.id ? updatedEntry : e)));
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date(formData.date as unknown as string),
        content: formData.content || '',
        hashtags: formData.hashtags,
        photos: formData.photos,
      };
      setEntries([...entries, newEntry]);
    }

    setShowForm(false);
  };

  // Get stats for selected date
  const selectedDate = formData.date as unknown as string;
  const dailyEntry = dailyEntries.find((e) => {
    const entryDate = new Date(e.date).toISOString().split('T')[0];
    return entryDate === selectedDate;
  });

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
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

      {dailyEntry && (
        <div className="p-4 bg-[#f5f5dc] rounded-lg border-l-4 border-[#4a7c59]">
          <p className="text-sm font-medium text-[#2b2d42] mb-2">Day Stats:</p>
          <p className="text-sm text-gray-700">
            {dailyEntry.startLocation} → {dailyEntry.endLocation} • {dailyEntry.miles} miles
            {dailyEntry.elevationGain && ` • ↗ ${dailyEntry.elevationGain} ft`}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-[#2b2d42] mb-1">Journal Entry *</label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          placeholder="Write about your day on the trail..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2b2d42] mb-1">Hashtags (comma-separated)</label>
        <input
          type="text"
          value={formData.hashtags?.join(', ') || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              hashtags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
            })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          placeholder="e.g., hiking, thruhike, PCT, adventure"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-[#4a7c59] hover:bg-[#2d5016] text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {editingEntry ? 'Update Entry' : 'Save Entry'}
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

function JournalCard({
  entry,
  entries,
  setEntries,
  onEdit,
}: {
  entry: JournalEntry;
  entries: JournalEntry[];
  setEntries: (entries: JournalEntry[]) => void;
  onEdit: (entry: JournalEntry) => void;
}) {
  const handleDelete = () => {
    if (confirm('Delete this journal entry?')) {
      setEntries(entries.filter((e) => e.id !== entry.id));
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#e07a5f]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#2b2d42]">
            {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(entry)}
            className="text-[#4a7c59] hover:text-[#2d5016] text-sm font-medium"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="text-red-600 hover:text-red-800 text-sm font-medium">
            Delete
          </button>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="text-[#2b2d42] whitespace-pre-wrap">{entry.content}</p>
      </div>

      {entry.hashtags && entry.hashtags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.hashtags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-[#4a7c59] bg-opacity-10 text-[#2d5016] text-sm rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
