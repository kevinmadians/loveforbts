export type EventCategory = 'debut' | 'release' | 'award' | 'performance' | 'milestone' | 'vlive' | 'other';

export interface HistoricalEvent {
  date: string; // Format: YYYY-MM-DD
  year: number;
  title: string;
  description: string;
  category: EventCategory;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    alt?: string;
  }[];
  link?: string;
}

export const btsHistory: HistoricalEvent[] = [
  // Debut Era
  {
    date: '2013-06-13',
    year: 2013,
    title: 'BTS Official Debut',
    description: 'BTS officially debuted with their first single "No More Dream" from the album "2 Cool 4 Skool" under Big Hit Entertainment.',
    category: 'debut',
    media: [
      {
        type: 'image',
        url: '/images/history/bts-debut.jpg',
        alt: 'BTS debut group photo'
      }
    ],
    link: 'https://www.youtube.com/watch?v=rBG5L7UsUxA'
  },
  {
    date: '2013-07-09',
    year: 2013,
    title: 'Official ARMY Fanclub Established',
    description: 'BTS\'s official fan club "ARMY" was officially established, standing for Adorable Representative M.C for Youth.',
    category: 'milestone',
    media: [
      {
        type: 'image',
        url: '/images/history/army-logo.jpg',
        alt: 'ARMY logo'
      }
    ]
  },
  
  // 2014
  {
    date: '2014-02-12',
    year: 2014,
    title: 'First Rookie Award',
    description: 'BTS won their first-ever award, "New Artist of the Year" at the 3rd Gaon Chart K-Pop Awards.',
    category: 'award',
    media: [
      {
        type: 'image',
        url: '/images/history/first-award.jpg',
        alt: 'BTS receiving their first rookie award'
      }
    ]
  },
  {
    date: '2014-08-20',
    year: 2014,
    title: 'Dark & Wild Album Release',
    description: 'BTS released their first full-length studio album "Dark & Wild" featuring the title track "Danger".',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/dark-wild.jpg',
        alt: 'Dark & Wild album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=bagj78IQ3l0'
  },
  
  // 2015
  {
    date: '2015-04-29',
    year: 2015,
    title: 'The Most Beautiful Moment in Life Pt.1 Release',
    description: 'BTS released "The Most Beautiful Moment in Life Pt.1" featuring the hit track "I NEED U" which marked their first major commercial breakthrough.',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/hyyh1.jpg',
        alt: 'HYYH Pt.1 album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=NMdTd9e-LEI'
  },
  {
    date: '2015-05-05',
    year: 2015,
    title: 'First Music Show Win',
    description: 'BTS achieved their first music show win with "I NEED U" on SBS MTV\'s "The Show".',
    category: 'award',
    media: [
      {
        type: 'image',
        url: '/images/history/first-win.jpg',
        alt: 'BTS members celebrating their first win'
      }
    ]
  },
  {
    date: '2015-11-30',
    year: 2015,
    title: 'The Most Beautiful Moment in Life Pt.2 Release',
    description: 'BTS released "The Most Beautiful Moment in Life Pt.2" featuring the hit track "RUN".',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/hyyh2.jpg',
        alt: 'HYYH Pt.2 album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=wKysONrSmew'
  },
  
  // 2016
  {
    date: '2016-05-02',
    year: 2016,
    title: 'The Most Beautiful Moment in Life: Young Forever Release',
    description: 'BTS released the compilation album "The Most Beautiful Moment in Life: Young Forever" with new tracks including "Fire" and "Save ME".',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/young-forever.jpg',
        alt: 'Young Forever album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=ALj5MKjy2BU'
  },
  {
    date: '2016-10-10',
    year: 2016,
    title: 'WINGS Album Release',
    description: 'BTS released their second studio album "WINGS" featuring the hit track "Blood Sweat & Tears".',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/wings.jpg',
        alt: 'WINGS album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=hmE9f-TEutc'
  },
  {
    date: '2016-11-19',
    year: 2016,
    title: 'First Daesang Award',
    description: 'BTS won their first Daesang (major award) for "Album of the Year" with "WINGS" at the Melon Music Awards.',
    category: 'award',
    media: [
      {
        type: 'image',
        url: '/images/history/first-daesang.jpg',
        alt: 'BTS receiving their first Daesang award'
      }
    ]
  },
  
  // 2017
  {
    date: '2017-02-12',
    year: 2017,
    title: 'YOU NEVER WALK ALONE Release',
    description: 'BTS released "You Never Walk Alone", the repackaged edition of "WINGS" featuring the hit track "Spring Day".',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/ynwa.jpg',
        alt: 'You Never Walk Alone album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=xEeFrLSkMm8'
  },
  {
    date: '2017-05-21',
    year: 2017,
    title: 'First Billboard Music Award',
    description: 'BTS won "Top Social Artist" at the Billboard Music Awards, becoming the first K-pop group to win a BBMA.',
    category: 'award',
    media: [
      {
        type: 'image',
        url: '/images/history/first-bbma.jpg',
        alt: 'BTS at the Billboard Music Awards'
      }
    ]
  },
  {
    date: '2017-09-18',
    year: 2017,
    title: 'LOVE YOURSELF: Her Release',
    description: 'BTS released "LOVE YOURSELF: Her" featuring the hit track "DNA".',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/ly-her.jpg',
        alt: 'LOVE YOURSELF: Her album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=MBdVXkSdhwU'
  },
  {
    date: '2017-11-19',
    year: 2017,
    title: 'First American TV Performance',
    description: 'BTS performed "DNA" at the American Music Awards, marking their U.S. television debut.',
    category: 'performance',
    media: [
      {
        type: 'image',
        url: '/images/history/ama-performance.jpg',
        alt: 'BTS performing at the American Music Awards'
      }
    ],
    link: 'https://www.youtube.com/watch?v=MMA8nU-Yhgk'
  },
  
  // 2018
  {
    date: '2018-01-15',
    year: 2018,
    title: 'Golden Disc Album of the Year',
    description: 'BTS won Album of the Year at the 32nd Golden Disc Awards for "LOVE YOURSELF: Her".',
    category: 'award',
    media: [
      {
        type: 'image',
        url: '/images/history/golden-disc.jpg',
        alt: 'BTS at the Golden Disc Awards'
      }
    ]
  },
  {
    date: '2018-05-18',
    year: 2018,
    title: 'LOVE YOURSELF: Tear Release',
    description: 'BTS released "LOVE YOURSELF: Tear" featuring the hit track "FAKE LOVE". This album became their first to reach #1 on the Billboard 200.',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/ly-tear.jpg',
        alt: 'LOVE YOURSELF: Tear album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=7C2z4GqqS5E'
  },
  {
    date: '2018-08-24',
    year: 2018,
    title: 'LOVE YOURSELF: Answer Release',
    description: 'BTS released "LOVE YOURSELF: Answer" featuring the hit track "IDOL". This completed the LOVE YOURSELF trilogy.',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/ly-answer.jpg',
        alt: 'LOVE YOURSELF: Answer album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=pBuZEGYXA6E'
  },
  {
    date: '2018-09-24',
    year: 2018,
    title: 'UN General Assembly Speech',
    description: 'RM delivered the "Speak Yourself" speech at the 73rd United Nations General Assembly for the launch of UNICEF\'s "Generation Unlimited" program.',
    category: 'milestone',
    media: [
      {
        type: 'image',
        url: '/images/history/un-speech.jpg',
        alt: 'BTS at the United Nations'
      }
    ],
    link: 'https://www.youtube.com/watch?v=ZhJ-LAQ6e_Y'
  },
  
  // 2019
  {
    date: '2019-04-12',
    year: 2019,
    title: 'MAP OF THE SOUL: PERSONA Release',
    description: 'BTS released "MAP OF THE SOUL: PERSONA" featuring the hit track "Boy With Luv" ft. Halsey.',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/mots-persona.jpg',
        alt: 'MAP OF THE SOUL: PERSONA album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=XsX3ATc3FbA'
  },
  {
    date: '2019-05-01',
    year: 2019,
    title: 'Billboard Music Awards Multiple Wins',
    description: 'BTS won "Top Duo/Group" and "Top Social Artist" at the Billboard Music Awards, becoming the first Korean act to win "Top Duo/Group".',
    category: 'award',
    media: [
      {
        type: 'image',
        url: '/images/history/bbma-2019.jpg',
        alt: 'BTS at the 2019 Billboard Music Awards'
      }
    ]
  },
  {
    date: '2019-07-03',
    year: 2019,
    title: 'First Japanese Stadium Shows',
    description: 'BTS became the first Korean artist to perform dome concerts in Japan, playing at the Shizuoka Stadium Ecopa.',
    category: 'performance',
    media: [
      {
        type: 'image',
        url: '/images/history/japan-stadium.jpg',
        alt: 'BTS performing at a Japanese stadium'
      }
    ]
  },
  {
    date: '2019-10-11',
    year: 2019,
    title: 'King\'s Order Cultural Medal',
    description: 'All seven BTS members were awarded the Hwagwan Order of Cultural Merit by the President of South Korea for their contributions to Korean culture.',
    category: 'award',
    media: [
      {
        type: 'image',
        url: '/images/history/cultural-medal.jpg',
        alt: 'BTS receiving the cultural medal'
      }
    ],
    link: 'https://www.youtube.com/watch?v=-0kIWxaw83E'
  },
  
  // 2020
  {
    date: '2020-02-21',
    year: 2020,
    title: 'MAP OF THE SOUL: 7 Release',
    description: 'BTS released "MAP OF THE SOUL: 7" featuring the hit tracks "ON" and "Black Swan".',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/mots7.jpg',
        alt: 'MAP OF THE SOUL: 7 album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=mPVDGOVjRQ0'
  },
  {
    date: '2020-06-07',
    year: 2020,
    title: 'Dear Class of 2020 Commencement Speech',
    description: 'BTS delivered a commencement speech as part of YouTube\'s "Dear Class of 2020" virtual graduation event.',
    category: 'performance',
    media: [
      {
        type: 'image',
        url: '/images/history/dear-class-2020.jpg',
        alt: 'BTS during Dear Class of 2020'
      }
    ],
    link: 'https://www.youtube.com/watch?v=AU6uF5sFtwA'
  },
  {
    date: '2020-08-21',
    year: 2020,
    title: 'Dynamite Release',
    description: 'BTS released their first English single "Dynamite", which debuted at #1 on the Billboard Hot 100, making them the first Korean act to top the chart.',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/dynamite.jpg',
        alt: 'Dynamite single cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=gdZLi9oWNZg'
  },
  {
    date: '2020-11-20',
    year: 2020,
    title: 'BE Album Release',
    description: 'BTS released their album "BE" featuring the hit track "Life Goes On", which became the first Korean-language song to debut at #1 on the Billboard Hot 100.',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/be-album.jpg',
        alt: 'BE album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=-5q5mZbe3V8'
  },
  {
    date: '2020-12-31',
    year: 2020,
    title: 'New Year\'s Eve Performance',
    description: 'BTS performed at MBC\'s "2021 New Year\'s Eve Live" concert, their last group performance before Jin\'s military enlistment preparations.',
    category: 'performance',
    media: [
      {
        type: 'image',
        url: '/images/history/nye-2020.jpg',
        alt: 'BTS performing on New Year\'s Eve'
      }
    ],
    link: 'https://www.youtube.com/watch?v=3nf-l98DbeU'
  },
  
  // 2021
  {
    date: '2021-05-21',
    year: 2021,
    title: 'Butter Release',
    description: 'BTS released their second English single "Butter", which spent 10 weeks at #1 on the Billboard Hot 100.',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/butter.jpg',
        alt: 'Butter single cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=WMweEpGlu_U'
  },
  {
    date: '2021-07-09',
    year: 2021,
    title: 'Permission to Dance Release',
    description: 'BTS released their third English single "Permission to Dance", co-written by Ed Sheeran, which replaced "Butter" at #1 on the Billboard Hot 100.',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/permission-to-dance.jpg',
        alt: 'Permission to Dance single cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=CuklIb9d3fI'
  },
  {
    date: '2021-09-20',
    year: 2021,
    title: 'UN General Assembly Speech and Performance',
    description: 'BTS delivered a speech at the 76th United Nations General Assembly and performed "Permission to Dance" at the UN headquarters.',
    category: 'performance',
    media: [
      {
        type: 'image',
        url: '/images/history/un-2021.jpg',
        alt: 'BTS at the United Nations in 2021'
      }
    ],
    link: 'https://www.youtube.com/watch?v=jzptGL6Qlqg'
  },
  {
    date: '2021-11-27',
    year: 2021,
    title: 'Permission to Dance on Stage - LA Concert',
    description: 'BTS held their first in-person concert since the pandemic began at SoFi Stadium in Los Angeles.',
    category: 'performance',
    media: [
      {
        type: 'image',
        url: '/images/history/ptd-la.jpg',
        alt: 'BTS performing at SoFi Stadium'
      }
    ]
  },
  
  // 2022
  {
    date: '2022-03-13',
    year: 2022,
    title: 'Permission to Dance on Stage - Seoul Concert',
    description: 'BTS held their first in-person concert in Korea since the pandemic at the Seoul Olympic Stadium.',
    category: 'performance',
    media: [
      {
        type: 'image',
        url: '/images/history/ptd-seoul.jpg',
        alt: 'BTS performing in Seoul'
      }
    ]
  },
  {
    date: '2022-06-10',
    year: 2022,
    title: 'Anthology Album "Proof" Release',
    description: 'BTS released their anthology album "Proof" with the new single "Yet to Come" celebrating their 9th anniversary.',
    category: 'release',
    media: [
      {
        type: 'image',
        url: '/images/history/proof.jpg',
        alt: 'Proof album cover'
      }
    ],
    link: 'https://www.youtube.com/watch?v=kXpOEzNZ8hQ'
  },
  {
    date: '2022-06-14',
    year: 2022,
    title: 'BTS Announces Break to Focus on Solo Projects',
    description: 'During their FESTA dinner, BTS announced they would be taking a break from group activities to focus on solo projects.',
    category: 'milestone',
    media: [
      {
        type: 'image',
        url: '/images/history/festa-dinner-2022.jpg',
        alt: 'BTS at their FESTA dinner'
      }
    ]
  },
  {
    date: '2022-10-15',
    year: 2022,
    title: 'Busan Concert for World Expo Bid',
    description: 'BTS held a free concert "Yet to Come in Busan" to support South Korea\'s bid to host the 2030 World Expo.',
    category: 'performance',
    media: [
      {
        type: 'image',
        url: '/images/history/busan-concert.jpg',
        alt: 'BTS performing in Busan'
      }
    ]
  },
  
  // 2023
  {
    date: '2023-06-09',
    year: 2023,
    title: 'BTS 10th Anniversary',
    description: 'BTS celebrated their 10th anniversary with global celebrations and the release of the commemorative single "Take Two".',
    category: 'milestone',
    media: [
      {
        type: 'image',
        url: '/images/history/10th-anniversary.jpg',
        alt: 'BTS 10th anniversary celebration'
      }
    ],
    link: 'https://www.youtube.com/watch?v=owZ0Fn0Zzhs'
  },
  {
    date: '2023-06-13',
    year: 2023,
    title: 'BTS FESTA 2023',
    description: 'BTS held special events for their 10th anniversary FESTA, including pop-up stores and exhibitions.',
    category: 'milestone',
    media: [
      {
        type: 'image',
        url: '/images/history/festa-2023.jpg',
        alt: 'BTS FESTA 2023'
      }
    ]
  },
  {
    date: '2023-07-21',
    year: 2023,
    title: 'J-Hope Military Enlistment',
    description: 'J-Hope became the second BTS member to begin his mandatory military service.',
    category: 'milestone',
    media: [
      {
        type: 'image',
        url: '/images/history/jhope-military.jpg',
        alt: 'J-Hope before military enlistment'
      }
    ]
  }
];

export function getEventsByDate(month: number, day: number): HistoricalEvent[] {
  return btsHistory.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() + 1 === month && eventDate.getDate() === day;
  });
}

export function getEventsForToday(): HistoricalEvent[] {
  const today = new Date();
  return getEventsByDate(today.getMonth() + 1, today.getDate());
}

export function getEventsByYear(year: number): HistoricalEvent[] {
  return btsHistory.filter(event => event.year === year);
}

export function getEventsByCategory(category: EventCategory): HistoricalEvent[] {
  return btsHistory.filter(event => event.category === category);
}

export function getAllEvents(): HistoricalEvent[] {
  return [...btsHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEventsCount(): number {
  return btsHistory.length;
} 