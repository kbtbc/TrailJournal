import { DailyEntry, JournalEntry, Expense, GearItem } from '@/types';

export function loadDemoData() {
  // Demo Daily Entries
  const dailyEntries: DailyEntry[] = [
    {
      id: '1',
      date: new Date('2024-06-10'),
      section: 1,
      startLocation: 'Springer Mountain Shelter',
      endLocation: 'Hawk Mountain Shelter',
      miles: 7.8,
      startTime: '07:30',
      endTime: '16:45',
      breakTime: 60,
      elevationGain: 2100,
      elevationLoss: 1850,
      finalElevation: 3450,
      sleepQuality: 3,
      weather: 'Partly cloudy, 68°F',
      isRaining: false,
      hasTrailMagic: false,
      notes: 'First day on the trail! Legs feeling it already. Met some great hikers at the shelter. Beautiful views from Blood Mountain in the distance.',
    },
    {
      id: '2',
      date: new Date('2024-06-11'),
      section: 1,
      startLocation: 'Hawk Mountain Shelter',
      endLocation: 'Gooch Mountain Shelter',
      miles: 12.3,
      startTime: '06:45',
      endTime: '17:20',
      breakTime: 75,
      elevationGain: 2850,
      elevationLoss: 2600,
      finalElevation: 2900,
      sleepQuality: 4,
      weather: 'Sunny, 72°F',
      isRaining: false,
      hasTrailMagic: true,
      notes: 'Crushed it today! Trail magic at Woody Gap - fresh fruit and cold drinks. The climb up to Gooch was tough but worth it. Feeling stronger already.',
    },
    {
      id: '3',
      date: new Date('2024-06-12'),
      section: 1,
      startLocation: 'Gooch Mountain Shelter',
      endLocation: 'Neels Gap',
      miles: 15.2,
      startTime: '06:30',
      endTime: '18:00',
      breakTime: 90,
      elevationGain: 3200,
      elevationLoss: 2900,
      finalElevation: 3125,
      sleepQuality: 5,
      weather: 'Clear skies, 75°F',
      isRaining: false,
      hasTrailMagic: false,
      notes: 'Made it to Neels Gap! Blood Mountain summit was incredible. Resupplied at Mountain Crossings outfitter. Sent home 3 lbs of gear I don\'t need. Sleeping in a real bed tonight!',
    },
    {
      id: '4',
      date: new Date('2024-06-13'),
      section: 1,
      startLocation: 'Neels Gap',
      endLocation: 'Low Gap Shelter',
      miles: 9.5,
      startTime: '08:00',
      endTime: '16:30',
      breakTime: 60,
      elevationGain: 1800,
      elevationLoss: 2100,
      finalElevation: 3050,
      sleepQuality: 4,
      weather: 'Overcast, 70°F',
      isRaining: false,
      hasTrailMagic: false,
      notes: 'Nero day after town stop. Taking it easy to let my feet recover from blisters. Trail was muddy but beautiful rhododendrons are blooming everywhere.',
    },
    {
      id: '5',
      date: new Date('2024-06-14'),
      section: 1,
      startLocation: 'Low Gap Shelter',
      endLocation: 'Blue Mountain Shelter',
      miles: 13.8,
      startTime: '07:00',
      endTime: '17:45',
      breakTime: 80,
      elevationGain: 2650,
      elevationLoss: 2400,
      finalElevation: 3350,
      sleepQuality: 3,
      weather: 'Foggy morning, 65°F',
      isRaining: true,
      hasTrailMagic: false,
      notes: 'Rain started around noon. Everything is wet. The climb up was slippery but I kept a good pace. Shared the shelter with a section hiker who had amazing trail stories from the PCT.',
    },
    {
      id: '6',
      date: new Date('2024-06-15'),
      section: 1,
      startLocation: 'Blue Mountain Shelter',
      endLocation: 'Unicoi Gap',
      miles: 11.2,
      startTime: '07:15',
      endTime: '16:00',
      breakTime: 70,
      elevationGain: 2100,
      elevationLoss: 2800,
      finalElevation: 2450,
      sleepQuality: 4,
      weather: 'Clearing up, 68°F',
      isRaining: false,
      hasTrailMagic: true,
      notes: 'Trail magic at the gap! A local church group had hot dogs and lemonade. Dried out my gear in the sun. Feeling grateful for the trail community.',
    },
    {
      id: '7',
      date: new Date('2024-06-16'),
      section: 1,
      startLocation: 'Unicoi Gap',
      endLocation: 'Tray Mountain Shelter',
      miles: 14.5,
      startTime: '06:45',
      endTime: '18:15',
      breakTime: 85,
      elevationGain: 3400,
      elevationLoss: 2650,
      finalElevation: 3850,
      sleepQuality: 5,
      weather: 'Perfect hiking weather, 70°F',
      isRaining: false,
      hasTrailMagic: false,
      notes: 'Week one complete! 84 miles down. Legs are getting stronger. Summit of Tray Mountain had 360° views. Watched an incredible sunset with my trail family. This is what I came for.',
    },
  ];

  // Demo Journal Entries
  const journalEntries: JournalEntry[] = [
    {
      id: '1',
      date: new Date('2024-06-10'),
      content: `Day 1 on the Appalachian Trail! 🥾

Woke up at Springer Mountain with butterflies in my stomach. After months of planning, I'm finally here. The trail greeted me with a steep climb right out of the gate - welcome to Georgia!

The forest is so lush and green. Every turn reveals something new - wildflowers, babbling brooks, and endless trees. My pack feels heavy (probably overpacked), but I'm determined to make it work.

Met "Trailblazer" and "Nomad" at Hawk Mountain Shelter. Already swapping stories and sharing snacks. There's something special about the instant community on the trail. Everyone's encouraging and genuine.

My feet hurt, I'm exhausted, but I've never felt more alive. Here's to 2,190 more miles! 🏔️`,
      hashtags: ['AppalachianTrail', 'ThruhHike2024', 'HikeYourOwnHike', 'Day1', 'Georgia'],
    },
    {
      id: '2',
      date: new Date('2024-06-11'),
      content: `Day 2: Trail Magic Already! ✨

12.3 miles today and I'm feeling it in every muscle. But the soreness is worth it when you get surprised by trail magic at Woody Gap. Cold Gatorade, fresh strawberries, and oranges - absolute heaven after that climb.

The trail angels were a retired couple who thru-hiked in 1998. They come out every June to "give back to the trail." These are the moments that restore your faith in humanity.

My trail legs are starting to develop. What felt impossible yesterday feels challenging today. That's progress! The summit views keep getting better. Can't wait to see what tomorrow brings.`,
      hashtags: ['TrailMagic', 'AppalachianTrail', 'ThruhHike', 'Grateful', 'HYOH'],
    },
    {
      id: '3',
      date: new Date('2024-06-12'),
      content: `Blood Mountain Summit & Neels Gap 🏔️

Blood Mountain (4,458 ft) - my first big milestone! The climb was brutal but standing at the summit with 360° views made every step worth it. You can see for miles in every direction.

Made it to Neels Gap and the famous Mountain Crossings outfitter. Had my pack shakedown and I was definitely carrying too much. Sent home:
- Extra clothes I "might need" (spoiler: won't need)
- Camp chair (seemed like a good idea in theory)
- Way too many first aid supplies

Now my pack is 3 pounds lighter! Sleeping at the hostel tonight - real bed, hot shower, and all-you-can-eat pizza in town. Trail life is good. 🍕`,
      hashtags: ['BloodMountain', 'NeelsGap', 'PackShakedown', 'ATMilestone', 'Georgia'],
    },
    {
      id: '4',
      date: new Date('2024-06-13'),
      content: `Nero Day: Rest & Recovery 🩹

Only 9.5 miles today. My feet needed the break after developing some blisters. Taking it slow is part of the journey.

The rhododendrons are in full bloom - it's like hiking through a tunnel of pink and white flowers. The trail provides exactly what you need when you need it. When my body needed rest, the trail gave me beauty to slow down for.

Spent the evening at Low Gap Shelter talking trail philosophy with the other hikers. We're all out here for different reasons, but we're all searching for something. That's the magic of the AT.`,
      hashtags: ['NeroDay', 'RestDay', 'Rhododendrons', 'TrailPhilosophy', 'ListenToYourBody'],
    },
    {
      id: '5',
      date: new Date('2024-06-14'),
      content: `Rainy Day Reflections 🌧️

They say you haven't really thru-hiked until you've hiked in the rain. Well, I'm officially a thru-hiker now!

Everything is wet. My socks are wet. My "waterproof" jacket is questionable. But somehow, I'm still smiling. There's something meditative about hiking in the rain - just you, the trail, and the sound of raindrops on leaves.

Met an amazing section hiker at Blue Mountain Shelter who hiked the PCT last year. Hearing her stories about the Sierra and the desert made me add the PCT to my bucket list. Maybe in a few years!

For now, I'm focused on staying warm and dry tonight. Hot cocoa never tasted so good. ☕`,
      hashtags: ['RainyDayHiking', 'EmbraceTheSuck', 'TrailStories', 'ShelterLife', 'StillSmiling'],
    },
    {
      id: '6',
      date: new Date('2024-06-15'),
      content: `Trail Angels at Unicoi Gap 👼

Just when I needed it most - more trail magic! A local church group set up at Unicoi Gap with hot dogs, chips, lemonade, and the warmest smiles.

Dried out all my wet gear in the sunshine while chatting with the volunteers. They do this every weekend during thru-hiking season. Their generosity and kindness is overwhelming.

One volunteer told me, "We can't hike the trail ourselves anymore, so we live vicariously through you hikers." That hit me right in the feels. I'm carrying their dreams with me now.

The trail community - both on and off the trail - is something special. 💚`,
      hashtags: ['TrailAngels', 'TrailCommunity', 'UnicioGap', 'Grateful', 'PayItForward'],
    },
    {
      id: '7',
      date: new Date('2024-06-16'),
      content: `One Week Complete! 🎉

84.3 miles
7 days
Countless memories

Watching the sunset from Tray Mountain with my trail family - this is what I imagined when I dreamed about thru-hiking. The sky was painted in oranges, pinks, and purples. Nobody said a word. We didn't need to.

My body is sore but strong. My mind is clear. My heart is full.

One week down, many more to go. But right now, in this moment, I'm exactly where I'm supposed to be.

Here's to the journey ahead! 🏔️⛰️`,
      hashtags: ['WeekOne', 'TrailFamily', 'TrayMountain', 'ThruHikeLife', 'LivingTheDream', 'AppalachianTrail2024'],
    },
  ];

  // Demo Expenses
  const expenses: Expense[] = [
    {
      id: '1',
      date: new Date('2024-06-10'),
      category: 'Food',
      amount: 15.50,
      description: 'Snacks and energy bars',
    },
    {
      id: '2',
      date: new Date('2024-06-12'),
      category: 'Lodging',
      amount: 45.00,
      description: 'Hostel at Neels Gap',
    },
    {
      id: '3',
      date: new Date('2024-06-12'),
      category: 'Food',
      amount: 28.75,
      description: 'Pizza dinner and breakfast in town',
    },
    {
      id: '4',
      date: new Date('2024-06-12'),
      category: 'Resupply',
      amount: 67.20,
      description: 'Week 2 food resupply at Mountain Crossings',
    },
    {
      id: '5',
      date: new Date('2024-06-14'),
      category: 'Gear',
      amount: 12.50,
      description: 'Replaced broken tent stake',
    },
  ];

  // Demo Gear
  const gear: GearItem[] = [
    {
      id: '1',
      date: new Date('2024-06-01'),
      name: 'Big Agnes Copper Spur HV UL2',
      category: 'Shelter',
      price: 449.95,
      weight: 42.0,
    },
    {
      id: '2',
      date: new Date('2024-06-01'),
      name: 'Osprey Exos 58',
      category: 'Backpack',
      price: 270.00,
      weight: 39.0,
    },
    {
      id: '3',
      date: new Date('2024-06-01'),
      name: 'Enlightened Equipment Revelation 20°',
      category: 'Sleep System',
      price: 325.00,
      weight: 18.5,
    },
    {
      id: '4',
      date: new Date('2024-06-12'),
      name: 'Sawyer Squeeze Water Filter',
      category: 'Water',
      price: 42.00,
      weight: 3.0,
    },
  ];

  return {
    dailyEntries,
    journalEntries,
    expenses,
    gear,
  };
}
