export type EventCategory = 'tour' | 'release' | 'birthday' | 'military' | 'army';

export type CalendarEvent = {
  title: string;
  start: Date;
  end?: Date;
  category: EventCategory;
  description?: string;
  location?: string;
};

export const eventCategories: Record<EventCategory, { color: string; label: string }> = {
  tour: {
    color: '#FFDE00',
    label: 'Concert Tour'
  },
  release: {
    color: '#3b82f6',
    label: 'New Releases'
  },
  birthday: {
    color: '#ec4899',
    label: 'Birthday'
  },
  military: {
    color: '#22c55e',
    label: 'Military Discharge'
  },
  army: {
    color: '#9E4EF9',
    label: 'ARMY Day'
  }
};

export const calendarEvents: CalendarEvent[] = [
  // Tour Events
  {
    title: "Jin Solo Tour - Goyang",
    start: new Date(2025, 5, 28), // June 28
    end: new Date(2025, 5, 29), // June 29
    category: 'tour',
    location: "Goyang Auxiliary Stadium, South Korea",
    description: "#RUNSEOKJIN_EP.TOUR"
  },
  {
    title: "Jin Solo Tour - Chiba",
    start: new Date(2025, 6, 5), // July 5
    end: new Date(2025, 6, 6), // July 6
    category: 'tour',
    location: "Makuhari Messe International Exhibition Hall 4-6, Japan",
    description: "#RUNSEOKJIN_EP.TOUR"
  },
  {
    title: "Jin Solo Tour - Osaka",
    start: new Date(2025, 6, 12), // July 12
    end: new Date(2025, 6, 13), // July 13
    category: 'tour',
    location: "Kyocera Dome Osaka, Japan",
    description: "#RUNSEOKJIN_EP.TOUR"
  },
  {
    title: "Jin Solo Tour - Anaheim",
    start: new Date(2025, 6, 17), // July 17
    end: new Date(2025, 6, 18), // July 18
    category: 'tour',
    location: "Honda Center, California, USA",
    description: "#RUNSEOKJIN_EP.TOUR"
  },
  {
    title: "Jin Solo Tour - Dallas",
    start: new Date(2025, 6, 22), // July 22
    end: new Date(2025, 6, 23), // July 23
    category: 'tour',
    location: "American Airlines Center, Texas, USA",
    description: "#RUNSEOKJIN_EP.TOUR"
  },
  {
    title: "Jin Solo Tour - Tampa",
    start: new Date(2025, 6, 26), // July 26
    end: new Date(2025, 6, 27), // July 27
    category: 'tour',
    location: "Amalie Arena, Florida, USA",
    description: "#RUNSEOKJIN_EP.TOUR"
  },
  {
    title: "Jin Solo Tour - Newark",
    start: new Date(2025, 6, 30), // July 30
    end: new Date(2025, 6, 31), // July 31
    category: 'tour',
    location: "Prudential Center, New Jersey, USA",
    description: "#RUNSEOKJIN_EP.TOUR"
  },
  {
    title: "Jin Solo Tour - London",
    start: new Date(2025, 7, 5), // August 5
    end: new Date(2025, 7, 6), // August 6
    category: 'tour',
    location: "The O2, United Kingdom",
    description: "#RUNSEOKJIN_EP.TOUR"
  },
  {
    title: "Jin Solo Tour - Amsterdam",
    start: new Date(2025, 7, 9), // August 9
    end: new Date(2025, 7, 10), // August 10
    category: 'tour',
    location: "Ziggo Dome, Netherlands",
    description: "#RUNSEOKJIN_EP.TOUR"
  },
  {
    title: "J-Hope Solo Tour - Seoul",
    start: new Date(2025, 1, 28), // Feb 28
    end: new Date(2025, 2, 2), // March 2
    category: 'tour',
    location: "KSPO Dome, Seoul"
  },
  {
    title: "J-Hope Solo Tour - Brooklyn",
    start: new Date(2025, 2, 13), // March 13
    end: new Date(2025, 2, 14),
    category: 'tour',
    location: "Barclays Center"
  },
  {
    title: "J-Hope Solo Tour - Chicago",
    start: new Date(2025, 2, 17),
    end: new Date(2025, 2, 18),
    category: 'tour',
    location: "Allstate Arena"
  },
  {
    title: "J-Hope Solo Tour - Mexico City",
    start: new Date(2025, 2, 22),
    end: new Date(2025, 2, 23),
    category: 'tour',
    location: "Palacio de los Deportes"
  },
  {
    title: "J-Hope Solo Tour - San Antonio",
    start: new Date(2025, 2, 26),
    end: new Date(2025, 2, 27),
    category: 'tour',
    location: "Frost Bank Center"
  },
  {
    title: "J-Hope Solo Tour - Oakland",
    start: new Date(2025, 2, 31),
    end: new Date(2025, 3, 1),
    category: 'tour',
    location: "Oakland Arena"
  },
  {
    title: "J-Hope Solo Tour - Los Angeles",
    start: new Date(2025, 3, 4),
    end: new Date(2025, 3, 6),
    category: 'tour',
    location: "BMO Stadium"
  },
  {
    title: "J-Hope Solo Tour - Manila",
    start: new Date(2025, 3, 12),
    end: new Date(2025, 3, 13),
    category: 'tour',
    location: "SM Mall of Asia Arena"
  },
  {
    title: "J-Hope Solo Tour - Saitama",
    start: new Date(2025, 3, 19),
    end: new Date(2025, 3, 20),
    category: 'tour',
    location: "Saitama Super Arena"
  },
  {
    title: "J-Hope Solo Tour - Singapore",
    start: new Date(2025, 3, 26),
    end: new Date(2025, 3, 27),
    category: 'tour',
    location: "Singapore Indoor Stadium"
  },
  {
    title: "J-Hope Solo Tour - Jakarta",
    start: new Date(2025, 4, 3),
    end: new Date(2025, 4, 4),
    category: 'tour',
    location: "Indonesia Arena, GBK"
  },
  {
    title: "J-Hope Solo Tour - Bangkok",
    start: new Date(2025, 4, 10),
    end: new Date(2025, 4, 11),
    category: 'tour',
    location: "Impact Arena"
  },
  {
    title: "J-Hope Solo Tour - Macau",
    start: new Date(2025, 4, 17),
    end: new Date(2025, 4, 18),
    category: 'tour',
    location: "Galaxy Macau"
  },

  // ARMY Day Event
  {
    title: "ARMY Day",
    start: new Date(2025, 6, 9), // July 9, 2025
    category: 'army',
    description: "Celebrating BTS ARMY's founding day"
  },

  // Releases
  {
    title: "BTS 7 Moments Pre-order Begins",
    start: new Date(2025, 2, 19),
    category: 'release'
  },
  {
    title: "BTS 7 Moments Official Release",
    start: new Date(2025, 3, 2),
    category: 'release'
  },
  {
    title: "RUN BTS POLY Highlight Package Pre-order",
    start: new Date(2025, 3, 8),
    category: 'release'
  },
  {
    title: "RUN BTS POLY Highlight Package Release",
    start: new Date(2025, 3, 24),
    category: 'release'
  },

  // Birthdays
  {
    title: "Jin's Birthday",
    start: new Date(2025, 11, 4), // December 4
    category: 'birthday',
    description: "Jin turns 33"
  },
  {
    title: "Suga's Birthday",
    start: new Date(2025, 2, 9), // March 9
    category: 'birthday',
    description: "Suga turns 32"
  },
  {
    title: "J-Hope's Birthday",
    start: new Date(2025, 1, 18), // February 18
    category: 'birthday',
    description: "J-Hope turns 31"
  },
  {
    title: "RM's Birthday",
    start: new Date(2025, 8, 12), // September 12
    category: 'birthday',
    description: "RM turns 31"
  },
  {
    title: "Jimin's Birthday",
    start: new Date(2025, 9, 13), // October 13
    category: 'birthday',
    description: "Jimin turns 30"
  },
  {
    title: "V's Birthday",
    start: new Date(2025, 11, 30), // December 30
    category: 'birthday',
    description: "V turns 30"
  },
  {
    title: "Jungkook's Birthday",
    start: new Date(2025, 8, 1), // September 1
    category: 'birthday',
    description: "Jungkook turns 28"
  },

  // Military Service Events
  {
    title: "Jin's Military Discharge",
    start: new Date(2024, 5, 12), // June 12, 2024
    category: 'military',
    description: "Jin completes military service"
  },
  {
    title: "J-Hope's Military Discharge",
    start: new Date(2024, 9, 17), // October 17, 2024
    category: 'military',
    description: "J-Hope completes military service"
  },
  {
    title: "Suga's Discharge Date",
    start: new Date(2025, 5, 21), // June 21, 2025
    category: 'military',
    description: "Suga's expected completion of military service"
  },
  {
    title: "RM's Discharge Date",
    start: new Date(2025, 5, 10), // June 10, 2025
    category: 'military',
    description: "RM's expected completion of military service"
  },
  {
    title: "V's Discharge Date",
    start: new Date(2025, 5, 10), // June 10, 2025
    category: 'military',
    description: "V's expected completion of military service"
  },
  {
    title: "Jimin's Discharge Date",
    start: new Date(2025, 5, 11), // June 11, 2025
    category: 'military',
    description: "Jimin's expected completion of military service"
  },
  {
    title: "Jungkook's Discharge Date",
    start: new Date(2025, 5, 11), // June 11, 2025
    category: 'military',
    description: "Jungkook's expected completion of military service"
  }
]; 