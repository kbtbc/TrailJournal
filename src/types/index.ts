export interface DailyEntry {
  id: string;
  date: Date;
  section: number;
  startLocation: string;
  endLocation: string;
  miles: number;
  startTime?: string;
  endTime?: string;
  breakTime?: number;
  elevationGain?: number;
  elevationLoss?: number;
  finalElevation?: number;
  sleepQuality?: number;
  weather?: string;
  isRaining?: boolean;
  hasTrailMagic?: boolean;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  hashtags?: string[];
  photos?: string[];
}

export interface Expense {
  id: string;
  date: Date;
  category: string;
  amount: number;
  description?: string;
}

export interface GearItem {
  id: string;
  date: Date;
  name: string;
  category: string;
  price: number;
  weight?: number;
}

export interface HikeConfig {
  trail: string;
  startDate: Date;
  endDate?: Date;
  hashtags: string[];
}

export interface Stats {
  totalMiles: number;
  totalDays: number;
  avgMilesPerDay: number;
  totalElevationGain: number;
  totalElevationLoss: number;
  zeroDays: number;
  totalExpenses: number;
}
