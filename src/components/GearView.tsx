'use client';

import { useState } from 'react';
import { GearItem } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function GearView() {
  const [gear, setGear, isLoaded] = useLocalStorage<GearItem[]>('gear', []);
  const [showForm, setShowForm] = useState(false);

  if (!isLoaded) {
    return <div className="bg-white rounded-xl shadow-md p-8">Loading...</div>;
  }

  const totalCost = gear.reduce((sum, g) => sum + g.price, 0);
  const totalWeight = gear.reduce((sum, g) => sum + (g.weight || 0), 0);
  const gearByCategory = gear.reduce((acc, g) => {
    if (!acc[g.category]) acc[g.category] = [];
    acc[g.category].push(g);
    return acc;
  }, {} as Record<string, GearItem[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#2b2d42]">Gear</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4a7c59] hover:bg-[#2d5016] text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Gear'}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#4a7c59] to-[#2d5016] text-white rounded-xl p-6 shadow-xl">
          <p className="text-lg mb-1">Total Cost</p>
          <p className="text-4xl font-bold">${totalCost.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-[#f4a261] to-[#e07a5f] text-white rounded-xl p-6 shadow-xl">
          <p className="text-lg mb-1">Total Weight</p>
          <p className="text-4xl font-bold">{totalWeight.toFixed(1)} oz</p>
        </div>
      </div>

      {showForm && <GearForm gear={gear} setGear={setGear} setShowForm={setShowForm} />}

      {/* By Category */}
      {Object.keys(gearByCategory).length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
          No gear tracked yet
        </div>
      ) : (
        Object.entries(gearByCategory).map(([category, items]) => (
          <div key={category} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#2b2d42]">{category}</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <GearCard key={item.id} item={item} gear={gear} setGear={setGear} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function GearForm({
  gear,
  setGear,
  setShowForm,
}: {
  gear: GearItem[];
  setGear: (gear: GearItem[]) => void;
  setShowForm: (show: boolean) => void;
}) {
  const [formData, setFormData] = useState<Partial<GearItem>>({
    date: new Date().toISOString().split('T')[0] as unknown as Date,
    name: '',
    category: 'Shelter',
    price: 0,
    weight: 0,
  });

  const categories = ['Shelter', 'Sleep System', 'Backpack', 'Clothing', 'Cooking', 'Water', 'Navigation', 'First Aid', 'Misc'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: GearItem = {
      id: Date.now().toString(),
      date: new Date(formData.date as unknown as string),
      name: formData.name || '',
      category: formData.category || 'Misc',
      price: formData.price || 0,
      weight: formData.weight,
    };

    setGear([...gear, newItem]);
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
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Item Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
            placeholder="e.g., REI Flash 55 Backpack"
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
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Price *</label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2b2d42] mb-1">Weight (oz)</label>
          <input
            type="number"
            step="0.1"
            value={formData.weight || ''}
            onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a7c59] focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-[#4a7c59] hover:bg-[#2d5016] text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Add Gear
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

function GearCard({
  item,
  gear,
  setGear,
}: {
  item: GearItem;
  gear: GearItem[];
  setGear: (gear: GearItem[]) => void;
}) {
  const handleDelete = () => {
    if (confirm('Delete this gear item?')) {
      setGear(gear.filter((g) => g.id !== item.id));
    }
  };

  return (
    <div className="bg-[#faf9f6] rounded-lg p-4 flex justify-between items-center">
      <div className="flex-1">
        <h4 className="font-semibold text-[#2b2d42]">{item.name}</h4>
        <div className="flex gap-4 mt-1 text-sm text-gray-600">
          <span>${item.price.toFixed(2)}</span>
          {item.weight && <span>{item.weight} oz</span>}
          <span className="text-xs">
            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
      <button onClick={handleDelete} className="text-red-600 hover:text-red-800 text-sm font-medium">
        Delete
      </button>
    </div>
  );
}
