export interface AlbumData {
  title: string;
  releaseDate: string;
  releaseYear: number;
  type: 'Studio' | 'Mini' | 'Compilation' | 'Single' | 'Repackage' | 'Special Edition';
  description: string;
  coverImage: string;
  slug: string;
  language: 'Korean' | 'Japanese' | 'English' | 'Mixed';
  tracks?: string[];
  spotifyLink?: string;
  highlights?: string[];
}

export const discographyData: AlbumData[] = [
  {
    title: "2 Cool 4 Skool",
    releaseDate: "June 12, 2013",
    releaseYear: 2013,
    type: "Mini",
    language: "Korean",
    description: "BTS's debut single album introduced their hip-hop focused sound and established themes of youth rebellion and social commentary that would become central to their identity.",
    coverImage: "/images/albums/2-cool-4-skool.jpg",
    slug: "2-cool-4-skool",
    tracks: [
      "Intro: 2 Cool 4 Skool",
      "We Are Bulletproof Pt.2",
      "No More Dream",
      "Interlude",
      "Like",
      "Outro: Circle Room Cypher",
      "Path"
    ],
    spotifyLink: "https://open.spotify.com/album/6egaEe9JaULuUCkihSnYlH",
    highlights: [
      "Debut release introducing BTS to the world",
      "Features their debut single 'No More Dream'",
      "Showcased their early hip-hop inspired style",
      "The song 'Path' (released only on the physical album as a hidden track) foreshadows their future success",
      "The album was part of their 'School Trilogy' series exploring youth experiences"
    ]
  },
  {
    title: "O!RUL8,2?",
    releaseDate: "September 11, 2013",
    releaseYear: 2013,
    type: "Mini",
    language: "Korean",
    description: "Their first EP continued BTS's school trilogy concept, critiquing societal expectations of youth while developing their musical identity with tracks that blended hip-hop with R&B influences.",
    coverImage: "/images/albums/orul82.jpg",
    slug: "orul82",
    tracks: [
      "Intro: O!RUL8,2?",
      "N.O",
      "We On",
      "Skit: R U Happy Now?",
      "If I Ruled The World",
      "Coffee",
      "BTS Cypher Pt.1",
      "Attack on Bangtan",
      "Satoori Rap",
      "Outro: Luv in Skool"
    ],
    spotifyLink: "https://open.spotify.com/album/6rWmdSJIaGTVtdMJQ35Lvf",
    highlights: [
      "Second part of the 'School Trilogy'",
      "Lead single 'N.O' criticized Korea's educational system",
      "First appearance of the now iconic 'BTS Cypher' series",
      "'Attack on Bangtan' became a fan favorite concert song",
      "The title is a play on words meaning 'Oh! Are you late, too?'"
    ]
  },
  {
    title: "Skool Luv Affair",
    releaseDate: "February 12, 2014",
    releaseYear: 2014,
    type: "Mini",
    language: "Korean",
    description: "Completing the school trilogy, this EP shifted focus to the challenges of teenage romance while maintaining social commentary. It marked a significant step in refining their sound and message.",
    coverImage: "/images/albums/skool-luv-affair.jpg",
    slug: "skool-luv-affair",
    tracks: [
      "Intro: Skool Luv Affair",
      "Boy In Luv",
      "Skit: Soulmate",
      "Where You From",
      "Jump",
      "BTS Cypher Pt.2: Triptych",
      "Skit: Proposing",
      "Just One Day",
      "Tomorrow",
      "BTS Cypher Pt.2: Triptych (Tough Cookie Remix)",
      "Outro: Propose"
    ],
    spotifyLink: "https://open.spotify.com/album/5r35iS0uSSoQBKzQj0IeI3",
    highlights: [
      "Final part of the 'School Trilogy'",
      "Includes fan-favorites 'Boy In Luv' and 'Just One Day'",
      "Showcased their duality with both aggressive and softer sounds",
      "The 'Tomorrow' track features early philosophical themes that would become trademark BTS",
      "The album reached #3 on the Gaon Album Chart, showing their growing popularity"
    ]
  },
  {
    title: "Skool Luv Affair Special Addition",
    releaseDate: "May 14, 2014",
    releaseYear: 2014,
    type: "Special Edition",
    language: "Korean",
    description: "This special edition repackage added two significant tracks to the original EP, including 'Miss Right' and a remix of 'I Like It,' expanding on the themes of young love.",
    coverImage: "/images/albums/skool-luv-affair-special.jpg",
    slug: "skool-luv-affair-special",
    tracks: [
      "Intro: Skool Luv Affair",
      "Boy In Luv",
      "Skit: Soulmate",
      "Where You From",
      "Jump",
      "BTS Cypher Pt.2: Triptych",
      "Skit: Proposing",
      "Just One Day",
      "Tomorrow",
      "Miss Right",
      "Like (Slow Jam Remix)",
      "Outro: Propose"
    ],
    spotifyLink: "https://open.spotify.com/album/0pX41mddl0CZXxpxkQ7347",
    highlights: [
      "Repackaged version of 'Skool Luv Affair'",
      "Added the popular B-side 'Miss Right'",
      "Included a remix of 'Like' from their debut album",
      "Limited special edition that quickly sold out upon release",
      "Marked the successful conclusion of their School Trilogy concept"
    ]
  },
  {
    title: "Dark & Wild",
    releaseDate: "August 20, 2014",
    releaseYear: 2014,
    type: "Studio",
    language: "Korean",
    description: "BTS's first full-length album explored darker and more mature themes, showing their growth as artists. With a mix of hard-hitting hip-hop tracks and smoother R&B songs, it demonstrated their expanding musical range.",
    coverImage: "/images/albums/dark-and-wild.jpg",
    slug: "dark-and-wild",
    tracks: [
      "Intro: What Am I To You",
      "Danger",
      "호르몬 전쟁 (War of Hormone)",
      "힙합성애자 (Hip Hop Phile)",
      "Let Me Know",
      "Rain",
      "BTS Cypher Pt.3: Killer",
      "Interlude: 뭐해 (What Are You Doing)",
      "Could You Turn Off Your Phone",
      "Blanket Kick (이불킥)",
      "24/7=Heaven",
      "여기 봐 (Look Here)",
      "2학년 (Second Grade)",
      "Outro: 그게 말이 돼? (Does That Make Sense?)"
    ],
    spotifyLink: "https://open.spotify.com/album/35voVqYGkotyJ945O9egDY",
    highlights: [
      "First full-length studio album",
      "Featured singles 'Danger' and 'War of Hormone'",
      "Marked a more mature direction in their music and concepts",
      "Contains the powerful track 'Let Me Know' showcasing vocal abilities",
      "Debuted at #2 on the Gaon Album Chart and reached #3 on Billboard's World Albums Chart"
    ]
  },
  {
    title: "Wake Up",
    releaseDate: "December 24, 2014",
    releaseYear: 2014,
    type: "Studio",
    language: "Japanese",
    description: "BTS's first Japanese studio album included Japanese versions of their Korean hits alongside original Japanese tracks, helping them establish a presence in the Japanese market.",
    coverImage: "/images/albums/wake-up.jpg",
    slug: "wake-up",
    tracks: [
      "The Stars",
      "Wake Up",
      "No More Dream (Japanese Ver.)",
      "Just One Day (Japanese Ver.)",
      "Danger (Japanese Ver.)",
      "Boy In Luv (Japanese Ver.)",
      "Adult Child",
      "進撃の防弾 (Attack on Bangtan) (Japanese Ver.)",
      "Jump (Japanese Ver.)",
      "Miss Right (Japanese Ver.)",
      "I Like It (Japanese Ver.)",
      "Outro: Luv in Skool (Japanese Ver.)",
      "No More Dream (Japanese Ver.) (Remix)",
      "The Stars (Acoustic Remix)"
    ],
    spotifyLink: "https://open.spotify.com/album/2bXp5bEM5sgZdIznTesQZb",
    highlights: [
      "First full Japanese album",
      "Contained original Japanese songs 'The Stars' and 'Wake Up'",
      "Helped establish BTS in the Japanese market",
      "Released during their first Japan tour 'Wake Up: Open Your Eyes'",
      "Peaked at #2 on the Oricon Weekly Albums Chart"
    ]
  },
  {
    title: "The Most Beautiful Moment in Life, Pt. 1",
    releaseDate: "April 29, 2015",
    releaseYear: 2015,
    type: "Mini",
    language: "Korean",
    description: "This groundbreaking EP marked a pivotal shift in BTS's artistry, beginning their exploration of the beauty and uncertainty of youth with more diverse musical styles, including their first major foray into more melodic pop sounds.",
    coverImage: "/images/albums/hyyh-pt1.jpg",
    slug: "hyyh-pt1",
    tracks: [
      "Intro: The Most Beautiful Moment in Life",
      "I Need U",
      "잡았다! (Hold Me Tight)",
      "Skit: Expectation!",
      "쩔어 (Dope)",
      "흥탄소년단 (Boyz with Fun)",
      "Converse High",
      "이사 (Moving On)",
      "Outro: Love is Not Over"
    ],
    spotifyLink: "https://open.spotify.com/album/0mEeCuKJQ8Xh9tQ5dMm89X",
    highlights: [
      "First part of the iconic 'HYYH' trilogy",
      "'I Need U' marked their first music show win",
      "Began the narrative and aesthetic that would define BTS's artistic breakthrough",
      "The EP's music videos started an interconnected narrative known as the 'BTS Universe'",
      "Debuted at #6 on Billboard's World Albums Chart, showcasing their growing international appeal"
    ]
  },
  {
    title: "The Most Beautiful Moment in Life, Pt. 2",
    releaseDate: "November 30, 2015",
    releaseYear: 2015,
    type: "Mini",
    language: "Korean",
    description: "Continuing the narrative of youth, this EP delved deeper into themes of friendship, loss, and the transition to adulthood with tracks that showcased their growing musical sophistication and storytelling abilities.",
    coverImage: "/images/albums/hyyh-pt2.jpg",
    slug: "hyyh-pt2",
    tracks: [
      "Intro: Never Mind",
      "Run",
      "Butterfly",
      "Whalien 52",
      "Ma City",
      "뱁새 (Silver Spoon/Baepsae)",
      "고엽 (Dead Leaves)",
      "Skit: One Night in a Strange City",
      "Outro: House of Cards"
    ],
    spotifyLink: "https://open.spotify.com/album/2ds8iT4wkaN1Q1gZe1qcOD",
    highlights: [
      "Second part of the 'HYYH' trilogy",
      "Contains fan favorites 'Run' and 'Baepsae'",
      "Deepened the narrative storytelling in their music videos",
      "First BTS album to enter the Billboard 200, reaching #171",
      "Won Album of the Year at the 2016 Melon Music Awards"
    ]
  },
  {
    title: "The Most Beautiful Moment in Life: Young Forever",
    releaseDate: "May 2, 2016",
    releaseYear: 2016,
    type: "Compilation",
    language: "Korean",
    description: "This compilation album concluded the HYYH trilogy, combining tracks from both previous EPs with new songs that provided a poignant finale to their exploration of youth, including the now-iconic title track 'Young Forever'.",
    coverImage: "/images/albums/young-forever.jpg",
    slug: "young-forever",
    tracks: [
      "Intro: The Most Beautiful Moment in Life",
      "I Need U",
      "잡았다! (Hold Me Tight)",
      "고엽 (Dead Leaves)",
      "흥탄소년단 (Boyz with Fun)",
      "쩔어 (Dope)",
      "Run",
      "Butterfly",
      "Whalien 52",
      "뱁새 (Silver Spoon/Baepsae)",
      "Ma City",
      "Outro: House of Cards",
      "Converse High",
      "이사 (Moving On)",
      "Intro: Never Mind",
      "Skit: Expectation!",
      "Skit: One Night in a Strange City",
      "Epilogue: Young Forever",
      "Fire",
      "Save ME",
      "Epilogue: Young Forever (Unplugged Ver.)",
      "I Need U (Urban Mix)",
      "I Need U (Remix)",
      "Run (Ballad Mix)",
      "Run (Alternative Mix)",
      "Butterfly (Alternative Mix)",
      "Love is Not Over (Full Length Edition)",
      "House of Cards (Full Length Edition)"
    ],
    spotifyLink: "https://open.spotify.com/album/1k5bJ8l5oL5xxVBVHjil09",
    highlights: [
      "Compilation album concluding the 'HYYH' trilogy",
      "Added new singles 'Fire', 'Save ME', and 'Young Forever'",
      "Included remix versions and full-length editions of previously released tracks",
      "Won Album of the Year at the 2016 Melon Music Awards",
      "The title track 'Young Forever' became an anthem for both BTS and ARMY"
    ]
  },
  {
    title: "Youth",
    releaseDate: "September 7, 2016",
    releaseYear: 2016,
    type: "Studio",
    language: "Japanese",
    description: "The group's second Japanese studio album featured Japanese versions of their Korean hits from the HYYH era, along with original Japanese tracks that continued the themes of youth and growth.",
    coverImage: "/images/albums/youth.jpg",
    slug: "youth",
    tracks: [
      "Intro: Youth",
      "Fire (Japanese Ver.)",
      "Save ME (Japanese Ver.)",
      "I Need U (Japanese Ver.)",
      "Run (Japanese Ver.)",
      "Butterfly (Japanese Ver.)",
      "Good Day",
      "Epilogue: Young Forever (Japanese Ver.)",
      "For You",
      "I Need U (Japanese Ver.) (Urban Mix)"
    ],
    spotifyLink: "https://open.spotify.com/album/442zUwKHCTO47XPF7cUSqY",
    highlights: [
      "Second full Japanese album",
      "Featured Japanese versions of songs from the HYYH series",
      "Included the original Japanese track 'For You'",
      "Reached #1 on the Oricon Weekly Album Chart",
      "Sold over 44,000 copies in its first day of release in Japan"
    ]
  },
  {
    title: "Wings",
    releaseDate: "October 10, 2016",
    releaseYear: 2016,
    type: "Studio",
    language: "Korean",
    description: "This groundbreaking album marked a major artistic evolution for BTS, with each member contributing solo tracks that explored personal struggles, temptation, and growth, all united by the concept of facing one's inner shadows.",
    coverImage: "/images/albums/wings.jpg",
    slug: "wings",
    tracks: [
      "Intro: Boy Meets Evil",
      "피 땀 눈물 (Blood Sweat & Tears)",
      "Begin",
      "Lie",
      "Stigma",
      "First Love",
      "Reflection",
      "MAMA",
      "Awake",
      "Lost",
      "BTS Cypher 4",
      "Am I Wrong",
      "21세기 소녀 (21st Century Girl)",
      "둘! 셋! (그래도 좋은 날이 더 많기를) (Two! Three! (Still Wishing There Will Be Better Days))",
      "Interlude: Wings"
    ],
    spotifyLink: "https://open.spotify.com/album/1vhNGBTFoaSTLbHjPGFIlF",
    highlights: [
      "First BTS album to feature solo tracks from each member",
      "Lead single 'Blood Sweat & Tears' became their first music video to reach 100 million views",
      "Debuted at #26 on the Billboard 200, their highest U.S. chart position at that time",
      "Inspired by Hermann Hesse's novel 'Demian'",
      "Won Album of the Year at the 2016 Melon Music Awards and Seoul Music Awards"
    ]
  },
  {
    title: "You Never Walk Alone",
    releaseDate: "February 13, 2017",
    releaseYear: 2017,
    type: "Repackage",
    language: "Korean",
    description: "This repackage album added new tracks to the 'Wings' album, expanding its themes while introducing the powerful message of solidarity and perseverance that would become a cornerstone of BTS's identity.",
    coverImage: "/images/albums/you-never-walk-alone.jpg",
    slug: "you-never-walk-alone",
    tracks: [
      "Intro: Boy Meets Evil",
      "피 땀 눈물 (Blood Sweat & Tears)",
      "Begin",
      "Lie",
      "Stigma",
      "First Love",
      "Reflection",
      "MAMA",
      "Awake",
      "Lost",
      "BTS Cypher 4",
      "Am I Wrong",
      "21세기 소녀 (21st Century Girl)",
      "둘! 셋! (그래도 좋은 날이 더 많기를) (Two! Three! (Still Wishing There Will Be Better Days))",
      "Interlude: Wings",
      "봄날 (Spring Day)",
      "Not Today",
      "Outro: Wings",
      "A Supplementary Story: You Never Walk Alone"
    ],
    spotifyLink: "https://open.spotify.com/album/6THpewjqJ15ORBJkh5CEYb",
    highlights: [
      "Repackage of the 'Wings' album with 4 new tracks",
      "Lead single 'Spring Day' became an iconic song addressing grief and hope",
      "Won Song of the Year at the 2017 Melon Music Awards",
      "Many fans consider 'Spring Day' the greatest BTS song ever created",
      "'Not Today' became a powerful anthem for underdogs and minorities"
    ]
  },
  {
    title: "Love Yourself: Her",
    releaseDate: "September 18, 2017",
    releaseYear: 2017,
    type: "Mini",
    language: "Korean",
    description: "The first entry in the groundbreaking 'Love Yourself' series explored themes of joy and discovery in love, with a bright, pop-oriented sound that significantly expanded their global appeal while retaining their artistic integrity.",
    coverImage: "/images/albums/love-yourself-her.jpg",
    slug: "love-yourself-her",
    tracks: [
      "Intro: Serendipity",
      "DNA",
      "Best Of Me",
      "보조개 (Dimple)",
      "Pied Piper",
      "MIC Drop",
      "고민보다 Go (Go Go)",
      "Outro: Her"
    ],
    spotifyLink: "https://open.spotify.com/album/07Rq17GzCnIdWJcyVHb57G",
    highlights: [
      "First part of the 'Love Yourself' trilogy",
      "Lead single 'DNA' became their first song to enter the Billboard Hot 100",
      "The 'MIC Drop' remix with Steve Aoki reached #28 on Billboard Hot 100",
      "First K-pop album to reach the Top 10 of the Billboard 200, debuting at #7",
      "The EP's success led to BTS's first major U.S. TV appearances"
    ]
  },
  {
    title: "Love Yourself: Tear",
    releaseDate: "May 18, 2018",
    releaseYear: 2018,
    type: "Studio",
    language: "Korean",
    description: "The second part of the 'Love Yourself' series explored darker themes of heartbreak and separation, showcasing their musical versatility with hip-hop, R&B, rock, EDM, and Latin-inspired sounds while breaking numerous chart records.",
    coverImage: "/images/albums/love-yourself-tear.jpg",
    slug: "love-yourself-tear",
    tracks: [
      "Intro: Singularity",
      "FAKE LOVE",
      "전하지 못한 진심 (The Truth Untold) (feat. Steve Aoki)",
      "134340",
      "낙원 (Paradise)",
      "Love Maze",
      "Magic Shop",
      "Airplane pt.2",
      "Anpanman",
      "So What",
      "Outro: Tear"
    ],
    spotifyLink: "https://open.spotify.com/album/4NIqCxqP9o8Tp6tGLBqd8O",
    highlights: [
      "Became the first K-pop album to reach #1 on the Billboard 200",
      "Lead single 'FAKE LOVE' reached #10 on the Billboard Hot 100",
      "Nominated for a Grammy Award for Best Recording Package",
      "Won Album of the Year at the 2018 Melon Music Awards and Mnet Asian Music Awards",
      "The rap-line's 'Outro: Tear' is widely regarded as one of BTS's most powerful tracks"
    ]
  },
  {
    title: "Love Yourself: Answer",
    releaseDate: "August 24, 2018",
    releaseYear: 2018,
    type: "Compilation",
    language: "Korean",
    description: "This compilation album concluded the 'Love Yourself' trilogy, telling a complete narrative of self-discovery through love and heartbreak. The addition of new songs completed the journey with a message of self-love and acceptance.",
    coverImage: "/images/albums/love-yourself-answer.jpg",
    slug: "love-yourself-answer",
    tracks: [
      "Euphoria",
      "Trivia 起: Just Dance",
      "Serendipity (Full Length Edition)",
      "DNA",
      "보조개 (Dimple)",
      "Trivia 承: Love",
      "Her",
      "Singularity",
      "FAKE LOVE",
      "전하지 못한 진심 (The Truth Untold) (feat. Steve Aoki)",
      "Trivia 轉: Seesaw",
      "Tear",
      "Epiphany",
      "I'm Fine",
      "IDOL",
      "Answer: Love Myself",
      "MIC Drop (Steve Aoki Remix)",
      "DNA (Pedal 2 LA Mix)",
      "FAKE LOVE (Rocking Vibe Mix)",
      "IDOL (feat. Nicki Minaj)"
    ],
    spotifyLink: "https://open.spotify.com/album/43wFM1HquliY3iwKWzPN4y",
    highlights: [
      "Concluding album of the 'Love Yourself' trilogy",
      "Became their second consecutive #1 album on the Billboard 200",
      "Lead single 'IDOL' reached #11 on the Billboard Hot 100",
      "The album included solo tracks from each member explored their individual talents",
      "Certified Platinum by the RIAA, the first Korean album to achieve this milestone"
    ]
  },
  {
    title: "Map of the Soul: Persona",
    releaseDate: "April 12, 2019",
    releaseYear: 2019,
    type: "Mini",
    language: "Korean",
    description: "Drawing inspiration from Carl Jung's psychological concepts, this EP explored the persona—the social mask we wear in daily life—with diverse musical styles that captured BTS at the height of their global momentum.",
    coverImage: "/images/albums/map-of-the-soul-persona.jpg",
    slug: "map-of-the-soul-persona",
    tracks: [
      "Intro: Persona",
      "작은 것들을 위한 시 (Boy With Luv) (feat. Halsey)",
      "소우주 (Mikrokosmos)",
      "Make It Right",
      "HOME",
      "Jamais Vu",
      "Dionysus"
    ],
    spotifyLink: "https://open.spotify.com/album/2KqlAl1Kl5fZvbFgJ0qFB6",
    highlights: [
      "First installment of the 'Map of the Soul' series",
      "Debuted at #1 on the Billboard 200, their third consecutive #1",
      "'Boy With Luv' feat. Halsey broke YouTube's 24-hour viewing record at the time",
      "Sold over 3.2 million copies in South Korea, one of the highest-selling albums in Korean history",
      "Their collaboration with Halsey marked their first major pop crossover"
    ]
  },
  {
    title: "Map of the Soul: 7",
    releaseDate: "February 21, 2020",
    releaseYear: 2020,
    type: "Studio",
    language: "Korean",
    description: "Named for the seven members and seven years since their debut, this ambitious album represented a profound reflection on their journey, fears, and identity, blending their earliest hip-hop roots with mature artistry.",
    coverImage: "/images/albums/map-of-the-soul-7.jpg",
    slug: "map-of-the-soul-7",
    tracks: [
      "Intro: Persona",
      "작은 것들을 위한 시 (Boy With Luv) (feat. Halsey)",
      "Make It Right",
      "Jamais Vu",
      "Dionysus",
      "Interlude: Shadow",
      "Black Swan",
      "Filter",
      "시차 (My Time)",
      "Louder than bombs",
      "ON",
      "UGH!",
      "00:00 (Zero O'Clock)",
      "Inner Child",
      "Friends",
      "Moon",
      "Respect",
      "We are Bulletproof: the Eternal",
      "Outro: Ego",
      "ON (feat. Sia)"
    ],
    spotifyLink: "https://open.spotify.com/album/5W1XY5ucNATjTULERvXx9j",
    highlights: [
      "Sold over 4 million copies globally, one of their best-selling albums",
      "Features 5 solo tracks and 2 unit songs, highlighting each member's growth",
      "Lead single 'ON' debuted at #4 on the Billboard Hot 100, their highest at the time",
      "The music video for 'Black Swan' is considered one of their most artistic visual works",
      "The album reflects on their seven-year journey since debut and their shadows"
    ]
  },
  {
    title: "BE",
    releaseDate: "November 20, 2020",
    releaseYear: 2020,
    type: "Studio",
    language: "Korean",
    description: "Created during the COVID-19 pandemic, this intimate album expressed feelings of isolation, despair, and hope with the members taking unprecedented involvement in all aspects of its creation, from concept to visual direction.",
    coverImage: "/images/albums/be.jpg",
    slug: "be",
    tracks: [
      "Life Goes On",
      "내 방을 여행하는 법 (Fly To My Room)",
      "Blue & Grey",
      "Skit",
      "잠시 (Telepathy)",
      "병 (Dis-ease)",
      "Stay",
      "Dynamite"
    ],
    spotifyLink: "https://open.spotify.com/album/6nYfHQnvkvOTNHnOhDT3sr",
    highlights: [
      "Created entirely during the COVID-19 pandemic",
      "Members had unprecedented creative control over all aspects of the album",
      "Lead single 'Life Goes On' became the first Korean-language song to top the Billboard Hot 100",
      "Included their first Grammy-nominated hit 'Dynamite'",
      "The 'Skit' track captures their genuine reaction to achieving their first #1 on Billboard Hot 100"
    ]
  },
  {
    title: "Butter",
    releaseDate: "July 9, 2021",
    releaseYear: 2021,
    type: "Single",
    language: "English",
    description: "This CD single album featured their smooth summer hit 'Butter' alongside the emotional fan tribute 'Permission to Dance,' both English-language singles that dominated global charts while engaging with Western pop audiences.",
    coverImage: "/images/albums/butter.jpg",
    slug: "butter",
    tracks: [
      "Butter",
      "Permission to Dance",
      "Butter (Instrumental)",
      "Permission to Dance (Instrumental)"
    ],
    spotifyLink: "https://open.spotify.com/album/0PBQ3Cp6NG8WX0G9KQVNMP",
    highlights: [
      "'Butter' spent 10 weeks at #1 on the Billboard Hot 100",
      "Broke their own record for most YouTube views in 24 hours",
      "Nominated for a Grammy Award for Best Pop Duo/Group Performance",
      "'Permission to Dance' was co-written by Ed Sheeran",
      "The songs were performed at the UN General Assembly, where BTS addressed world leaders"
    ]
  },
  {
    title: "Proof",
    releaseDate: "June 10, 2022",
    releaseYear: 2022,
    type: "Compilation",
    language: "Mixed",
    description: "This anthology album celebrated BTS's nine-year journey with a collection of their greatest hits, unreleased demos, and new tracks that honored their past while marking a pause before their next chapter as individual artists and as a group.",
    coverImage: "/images/albums/proof.jpg",
    slug: "proof",
    tracks: [
      "Born Singer",
      "No More Dream",
      "N.O",
      "Boy in Luv",
      "Danger",
      "I NEED U",
      "RUN",
      "FIRE",
      "피 땀 눈물 (Blood Sweat & Tears)",
      "Spring Day",
      "DNA",
      "FAKE LOVE",
      "IDOL",
      "Boy With Luv (feat. Halsey)",
      "ON",
      "Dynamite",
      "Life Goes On",
      "Butter",
      "Yet To Come (The Most Beautiful Moment)",
      "Run BTS",
      "For Youth",
      "흥탄소년단 (BTS Cypher PT.3: KILLER) (Demo Ver.)",
      "Jump (Demo Ver.)",
      "Young Love",
      "Quotation Mark",
      "I NEED U (Demo Ver.)",
      "Boyz with Fun (Demo Ver.)",
      "Tony Montana (with Jimin)",
      "Young Forever (RM Demo Ver.)",
      "작은 것들을 위한 시 (Boy With Luv) (Demo Ver.)",
      "Epilogue: Young Forever",
      "DNA (Demo Ver.)",
      "상남자 (Boy In Luv) (Original Demo Ver.)",
      "Fake Love (Demo Ver.)",
      "Permission to Dance",
      "Butter (Sweeter Remix)"
    ],
    spotifyLink: "https://open.spotify.com/album/6al2VdKbb6FIz9d7lU7WRB",
    highlights: [
      "Three-disc anthology album celebrating BTS's nine-year career",
      "Included three new songs: 'Yet to Come', 'Run BTS', and 'For Youth'",
      "Featured unreleased demos and alternative versions of fan-favorite tracks",
      "Marked their last album before announcing a hiatus to focus on solo activities",
      "Debuted at #1 on the Billboard 200, their sixth chart-topping album"
    ]
  },
  {
    title: "Dynamite",
    releaseDate: "August 21, 2020",
    releaseYear: 2020,
    type: "Single",
    language: "English",
    description: "Their first all-English digital single, 'Dynamite' was a disco-pop track created to bring joy during the pandemic. It became a historic milestone, earning BTS their first Grammy nomination and topping the Billboard Hot 100.",
    coverImage: "/images/albums/dynamite.jpg",
    slug: "dynamite",
    tracks: [
      "Dynamite",
      "Dynamite (Instrumental)"
    ],
    spotifyLink: "https://open.spotify.com/album/1Yo63a5AzPMyHiYMKYIrld",
    highlights: [
      "First BTS song to reach #1 on the Billboard Hot 100",
      "First Grammy nomination for a K-pop act (Best Pop Duo/Group Performance)",
      "Broke YouTube's 24-hour viewing record at the time with 101.1 million views",
      "Created specifically to bring joy to fans during the COVID-19 pandemic",
      "The music video's retro concept and choreography became iconic worldwide"
    ]
  },
  {
    title: "Take Two",
    releaseDate: "June 9, 2023",
    releaseYear: 2023,
    type: "Single",
    language: "Korean",
    description: "Released as a special gift to celebrate BTS's 10th anniversary, this heartfelt digital single expresses gratitude to their fans while promising a new chapter ahead, despite the members' enlistment in military service.",
    coverImage: "/images/albums/take-two.jpg",
    slug: "take-two",
    tracks: [
      "Take Two"
    ],
    spotifyLink: "https://open.spotify.com/album/3jeQDa9OFZ6GndLindHx3k",
    highlights: [
      "Special single celebrating BTS's 10th anniversary",
      "Released as a gift for fans during the members' military service period",
      "All seven members participated in recording despite being in different locations",
      "The title 'Take Two' symbolizes the beginning of BTS's second chapter",
      "Reached #1 on the Billboard Global 200 and Global Excl. US charts"
    ]
  }
]; 