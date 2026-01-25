'use client';

import { DailyEntry } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function StatsView() {
  const [entries] = useLocalStorage<DailyEntry[]>('dailyEntries', []);

  const stats = calculateStats(entries);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2b2d42]">Statistics</h2>

      {entries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
          No data yet. Start logging your hike to see statistics!
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard label="Total Miles" value={stats.totalMiles.toFixed(1)} icon="🥾" />
            <StatCard label="Days Hiked" value={stats.totalDays.toString()} icon="📅" />
            <StatCard label="Avg Miles/Day" value={stats.avgMilesPerDay.toFixed(1)} icon="📈" />
            <StatCard label="Zero Days" value={stats.zeroDays.toString()} icon="🏕️" />
          </div>

          {/* Elevation Stats */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#2b2d42]">Elevation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Gain</p>
                <p className="text-2xl font-bold text-[#4a7c59]">{stats.totalElevationGain.toLocaleString()} ft</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Loss</p>
                <p className="text-2xl font-bold text-[#e07a5f]">{stats.totalElevationLoss.toLocaleString()} ft</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Gain/Day</p>
                <p className="text-2xl font-bold text-[#2b2d42]">{stats.avgElevationGain.toLocaleString()} ft</p>
              </div>
            </div>
          </div>

          {/* Trail Conditions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#2b2d42]">Trail Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rainy Days</p>
                <p className="text-2xl font-bold text-blue-600">{stats.rainyDays} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Trail Magic</p>
                <p className="text-2xl font-bold text-green-600">{stats.trailMagicDays} times</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Sleep Quality</p>
                <p className="text-2xl font-bold text-[#f4a261]">{stats.avgSleepQuality.toFixed(1)} / 5</p>
              </div>
            </div>
          </div>

          {/* Recent Entries */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#2b2d42]">Recent Days</h3>
            <div className="space-y-3">
              {entries
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)
                .map((entry) => (
                  <div key={entry.id} className="flex justify-between items-center p-3 bg-[#faf9f6] rounded-lg">
                    <div>
                      <p className="font-medium text-[#2b2d42]">
                        {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {entry.startLocation} → {entry.endLocation}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#4a7c59]">{entry.miles} mi</p>
                      {entry.elevationGain && <p className="text-xs text-gray-500">↗ {entry.elevationGain} ft</p>}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#4a7c59]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-[#2b2d42]">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

function calculateStats(entries: DailyEntry[]) {
  const totalMiles = entries.reduce((sum, e) => sum + e.miles, 0);
  const totalDays = entries.length;
  const zeroDays = entries.filter((e) => e.miles === 0).length;
  const avgMilesPerDay = totalDays > 0 ? totalMiles / totalDays : 0;

  const totalElevationGain = entries.reduce((sum, e) => sum + (e.elevationGain || 0), 0);
  const totalElevationLoss = entries.reduce((sum, e) => sum + (e.elevationLoss || 0), 0);
  const avgElevationGain = totalDays > 0 ? totalElevationGain / totalDays : 0;

  const rainyDays = entries.filter((e) => e.isRaining).length;
  const trailMagicDays = entries.filter((e) => e.hasTrailMagic).length;

  const totalSleepQuality = entries.reduce((sum, e) => sum + (e.sleepQuality || 0), 0);
  const avgSleepQuality = totalDays > 0 ? totalSleepQuality / totalDays : 0;

  return {
    totalMiles,
    totalDays,
    zeroDays,
    avgMilesPerDay,
    totalElevationGain,
    totalElevationLoss,
    avgElevationGain,
    rainyDays,
    trailMagicDays,
    avgSleepQuality,
  };
}
