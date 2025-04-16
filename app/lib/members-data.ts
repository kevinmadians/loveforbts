export interface MemberData {
  name: string
  stageName: string
  fullName: string
  role: string
  birthDate: string
  birthPlace: string
  height: string
  weight: string
  bloodType: string
  image: string
  slug: string
  shortBio: string
  biography: string
  funFacts: string[]
  achievements: string[]
  socialMedia?: {
    instagram?: string
    twitter?: string
    tiktok?: string
    weverse?: string
    other?: string
  }
}

export const membersData: MemberData[] = [
  {
    name: "RM",
    stageName: "RM (Formerly Rap Monster)",
    fullName: "Kim Namjoon",
    role: "Leader, Main Rapper",
    birthDate: "September 12, 1994",
    birthPlace: "Ilsan, South Korea",
    height: "181 cm (5'11\")",
    weight: "74 kg (163 lbs)",
    bloodType: "A",
    image: "/images/members/rm.jpg",
    slug: "rm",
    shortBio: "RM is the leader of BTS and a critically acclaimed rapper, lyricist, and producer. Known for his profound lyrics and high IQ, he represents the group in most English-language interviews.",
    biography: `Kim Namjoon, better known as RM (formerly Rap Monster), is the leader of BTS. Born on September 12, 1994, in Ilsan, South Korea, he was the first member to join the group and has been pivotal in their creative process.

RM is known for his incredible intelligence (with an IQ of 148 and scoring in the top 1% of the nation in university entrance exams) and remarkable fluency in English, which he taught himself by watching Friends. He is a prolific songwriter, credited on over 200 songs, and has released two solo mixtapes: "RM" (2015) and "Mono" (2018), as well as his first solo album "Indigo" (2022).

As the leader, RM is often the voice of BTS in interviews and public appearances, including their historic speech at the United Nations General Assembly in 2018. His thoughtful, introspective nature comes through in his lyrics, which often explore themes of personal identity, mental health, and social commentary.`,
    funFacts: [
      "Learned English by watching the TV show 'Friends'",
      "Has an IQ of 148",
      "Was a competitive basketball player in school",
      "Known for accidentally breaking things so often that fans call it the 'God of Destruction' phenomenon",
      "Has visited art museums in over 10 countries",
      "Released his first solo album 'Indigo' in December 2022"
    ],
    achievements: [
      "Listed on TIME's 'Next Generation Leaders' (2018)",
      "Appointed as a Presidential Envoy for Future Generations and Culture by the Korean President",
      "Addressed the United Nations General Assembly multiple times",
      "His solo album 'Indigo' debuted at #15 on Billboard 200",
      "Named in Bloomberg 50 for his influence in the arts",
      "Collaborated with renowned artists like Erykah Badu, Anderson .Paak, and John Eun"
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/rkive/",
      twitter: "https://x.com/BTS_twt",
      weverse: "https://weverse.io/bts"
    }
  },
  {
    name: "Jin",
    stageName: "Jin",
    fullName: "Kim Seokjin",
    role: "Vocalist, Visual",
    birthDate: "December 4, 1992",
    birthPlace: "Gwacheon, South Korea",
    height: "179 cm (5'10\")",
    weight: "63 kg (139 lbs)",
    bloodType: "O",
    image: "/images/members/jin.jpg",
    slug: "jin",
    shortBio: "Jin is the oldest member of BTS, known for his vocals and worldwide handsome visuals. With his charismatic personality, cooking skills, and dad jokes, he brings joy to the team.",
    biography: `Kim Seokjin, known professionally as Jin, is the oldest member of BTS. Born on December 4, 1992, in Gwacheon, South Korea, Jin was studying acting when he was scouted by Big Hit Entertainment for his outstanding looks.

Often playfully referring to himself as "Worldwide Handsome," Jin is recognized for his visual appeal and vocal abilities. His signature high notes feature prominently in many BTS songs, and he has contributed to the group's discography as a songwriter, particularly with solo tracks like "Awake," "Epiphany," and "Moon."

Jin is known for his cheerful personality and humor, often serving as mood-maker for the group. He's famous for his "dad jokes" and infectious windshield-wiper laugh. His solo activities include the variety show "Law of the Jungle" and hosting multiple shows. He released his first solo single "The Astronaut" in October 2022, co-written with Coldplay.

In December 2022, Jin began his mandatory military service, becoming the first BTS member to enlist. He completed his service on June 12, 2024, returning to a warm welcome from the BTS ARMY.`,
    funFacts: [
      "Studied Film Arts at Konkuk University",
      "Is an excellent cook and has a show called 'Eat Jin'",
      "Known for his numerous dad jokes and 'windshield wiper' laugh",
      "Has a Super Mario collection",
      "First BTS member to complete military service",
      "Co-wrote 'The Astronaut' with Coldplay"
    ],
    achievements: [
      "Received the Prime Minister's Commendation at the Korean Popular Culture and Arts Awards (2018)",
      "First BTS member to release a solo song with 'Awake' in 2016",
      "His song 'Moon' from BTS's 'Map of the Soul: 7' topped iTunes charts in 90 countries",
      "Released 'The Astronaut' in collaboration with Coldplay",
      "Solo single 'The Astronaut' debuted at #51 on Billboard Hot 100",
      "Holds a cooking certificate"
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/jin/",
      twitter: "https://x.com/BTS_twt",
      weverse: "https://weverse.io/bts"
    }
  },
  {
    name: "Suga",
    stageName: "Suga (Also known as Agust D)",
    fullName: "Min Yoongi",
    role: "Lead Rapper, Producer",
    birthDate: "March 9, 1993",
    birthPlace: "Daegu, South Korea",
    height: "174 cm (5'8\")",
    weight: "59 kg (130 lbs)",
    bloodType: "O",
    image: "/images/members/suga.jpg",
    slug: "suga",
    shortBio: "Suga is a brilliant rapper, producer, and songwriter with a straightforward personality. He produces music both for BTS and as a solo artist under the alias Agust D.",
    biography: `Min Yoongi, better known as Suga or by his solo alias Agust D, was born on March 9, 1993, in Daegu, South Korea. As one of BTS's main rappers and producers, Suga's technical prowess and emotional depth have been central to the group's sound.

Suga began producing music at just 13 years old and worked as an underground rapper before joining Big Hit Entertainment. His passion for music production is evident in his extensive contributions to BTS's discography and his work with other artists.

As Agust D, he has released two critically acclaimed mixtapes that showcase his personal struggles, including his experiences with depression and social anxiety. His honest, unfiltered lyrics have resonated deeply with fans worldwide.

Known for his seemingly calm and blunt demeanor, Suga often reveals a tender-hearted nature in his interactions with members and fans. He's also recognized for his insightful commentary on social issues and the music industry.

In 2023, Suga released his first official solo album "D-DAY," completing his "Agust D" trilogy and embarked on his first solo world tour.`,
    funFacts: [
      "Was an underground rapper named 'Gloss' before joining BTS",
      "Can play the piano",
      "Often speaks about mental health awareness",
      "Has a studio nicknamed 'Genius Lab'",
      "His cat is named Holly",
      "Can fall asleep almost anywhere, earning him the nickname 'Sleeping Genius'"
    ],
    achievements: [
      "Produced music for artists like Suran, Heize, and IU",
      "Produced the hit 'Wine' with Suran, which won Hot Trend Award at Melon Music Awards",
      "His mixtape 'D-2' reached #11 on Billboard 200",
      "His documentary 'Suga: Road to D-Day' was released on Disney+",
      "The song 'Daechwita' from his D-2 mixtape has over 400 million views on YouTube",
      "Collaborated with artists such as Halsey, PSY, and Juice WRLD"
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/agustd/",
      twitter: "https://x.com/BTS_twt",
      weverse: "https://weverse.io/bts"
    }
  },
  {
    name: "J-Hope",
    stageName: "J-Hope",
    fullName: "Jung Hoseok",
    role: "Main Dancer, Rapper, Sub-Vocalist",
    birthDate: "February 18, 1994",
    birthPlace: "Gwangju, South Korea",
    height: "177 cm (5'10\")",
    weight: "65 kg (143 lbs)",
    bloodType: "A",
    image: "/images/members/jhope.jpg",
    slug: "j-hope",
    shortBio: "J-Hope is BTS's main dancer and a versatile performer known for his bright energy and sunshine personality, as well as his precise dance moves and unique rap style.",
    biography: `Jung Hoseok, known professionally as J-Hope, was born on February 18, 1994, in Gwangju, South Korea. As BTS's main dancer and a skilled rapper, he is often considered the group's dance leader and one of its mood-makers.

Before joining Big Hit Entertainment, J-Hope was a member of an underground dance team called NEURON and had already built a reputation as a skilled street dancer. His dance expertise has been instrumental in helping choreograph and teach routines to other members.

J-Hope is known for his bright, positive energy, which inspired his stage name—bringing "hope" and joy to fans and members alike. Despite this sunny exterior, his solo work reveals deeper, more introspective layers to his artistry.

In 2018, he released his first solo mixtape, "Hope World," which showcased his unique musical color and garnered international acclaim. In 2022, he released his first official solo album "Jack in the Box" and made history as the first BTS member to headline a major U.S. music festival when he performed at Lollapalooza. 

In April 2023, J-Hope began his mandatory military service, becoming the second BTS member to enlist. He completed his service on October 17, 2024.`,
    funFacts: [
      "Was a competitive street dancer before joining BTS",
      "Known for his punctuality and organization",
      "Has a distinctive laugh that fans adore",
      "Coined the catchphrase 'I'm your hope, you're my hope, I'm J-Hope'",
      "His dog is named Mickey",
      "First BTS member to headline a major U.S. music festival (Lollapalooza 2022)"
    ],
    achievements: [
      "His mixtape 'Hope World' reached #38 on Billboard 200, making him the highest-charting Korean solo artist at that time",
      "'Jack in the Box' debuted at #6 on Billboard 200",
      "Headlined Lollapalooza 2022, making history as the first South Korean artist to headline a main stage at a major U.S. festival",
      "His documentary 'J-Hope in the Box' was released on Disney+",
      "His song 'Chicken Noodle Soup' featuring Becky G reached #81 on Billboard Hot 100",
      "His pre-release single 'on the street' featuring J. Cole debuted at #60 on Billboard Hot 100"
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/uarmyhope/",
      twitter: "https://x.com/BTS_twt",
      tiktok: "https://www.tiktok.com/@iamurhope",
      weverse: "https://weverse.io/bts"
    }
  },
  {
    name: "Jimin",
    stageName: "Jimin",
    fullName: "Park Jimin",
    role: "Main Dancer, Lead Vocalist",
    birthDate: "October 13, 1995",
    birthPlace: "Busan, South Korea",
    height: "174 cm (5'8\")",
    weight: "61 kg (134 lbs)",
    bloodType: "A",
    image: "/images/members/jimin.jpg",
    slug: "jimin",
    shortBio: "Jimin is known for his graceful dance movements, unique vocal color, and charismatic stage presence. With a background in contemporary dance, he brings artistic elegance to BTS performances.",
    biography: `Park Jimin was born on October 13, 1995, in Busan, South Korea. He studied contemporary dance at Busan High School of Arts before transferring to Korea Arts High School, where he met fellow BTS member V.

As one of BTS's main dancers and lead vocalists, Jimin is known for his precise movements, expressive performances, and distinctive vocal tone. His background in contemporary dance gives him a unique style characterized by fluid movements and emotional expression.

Jimin's vocal color is instantly recognizable, particularly in his falsetto range, featured prominently in songs like "Serendipity" and "Filter." His performances of solo songs "Lie" and "Filter" showcase both his vocal prowess and captivating dance abilities.

Known for his hardworking nature, Jimin is often mentioned by other members as being extremely diligent and perfectionist about performances. His warm personality and affectionate nature toward both members and fans have earned him enormous popularity globally.

In 2023, Jimin released his first solo album "FACE," which explores themes of facing oneself and overcoming challenges, and showcases his artistic growth and versatility. He later released his second solo album "MUSE" in 2024.`,
    funFacts: [
      "Studied contemporary dance and was top of his class",
      "Has a famous \"eye smile\" that disappears when he laughs",
      "Known for saying \"I purple you\" - a phrase that became symbolic for BTS and ARMY",
      "Can do a full split",
      "Was class president in middle school",
      "Often gives members and staff thoughtful gifts"
    ],
    achievements: [
      "First Korean solo artist to top both Billboard Hot 100 ('Like Crazy') and Billboard 200 ('FACE')",
      "His solo track 'Filter' from BTS's 'Map of the Soul: 7' broke streaming records for a B-side track",
      "His intro song 'Serendipity' has over 300 million views on YouTube",
      "His solo song 'Promise' broke SoundCloud's record for most streams in 24 hours (previously held by Drake)",
      "Collaborated with Taeyang on the single 'VIBE'",
      "Released second solo album 'MUSE' to critical acclaim in 2024"
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/j.m/",
      twitter: "https://x.com/BTS_twt",
      weverse: "https://weverse.io/bts"
    }
  },
  {
    name: "V",
    stageName: "V",
    fullName: "Kim Taehyung",
    role: "Vocalist, Visual",
    birthDate: "December 30, 1995",
    birthPlace: "Daegu, South Korea",
    height: "179 cm (5'10\")",
    weight: "63 kg (139 lbs)",
    bloodType: "AB",
    image: "/images/members/v.jpg",
    slug: "v",
    shortBio: "V is known for his deep, soulful voice, striking visuals, and quirky personality. His unique vocals and artistic sensibilities add depth to BTS's music and performances.",
    biography: `Kim Taehyung, known by his stage name V, was born on December 30, 1995, in Daegu, South Korea, and grew up in Geochang County. He was discovered by chance when he accompanied a friend to a Big Hit Entertainment audition and was encouraged by staff to audition himself.

V is recognized for his uniquely deep and husky vocal tone that adds a distinctive color to BTS's music. His solo songs like "Stigma," "Singularity," and "Inner Child" showcase his rich baritone and emotional delivery. His interest in jazz and classic pop has influenced his musical style.

Known for his quirky, free-spirited personality, V coined the phrase "I'm a good boy" and created the BTS iconic hand gesture meaning "I love you" in sign language. His artistic sensibilities extend beyond music to photography and visual arts, and he's known for his interest in classic films and art.

V has ventured into acting with a supporting role in the historical drama "Hwarang: The Poet Warrior Youth" and has contributed self-composed songs to BTS albums and K-drama soundtracks. He released his first solo album "Layover" in September 2023, showcasing his unique musical color and artistic vision.`,
    funFacts: [
      "Plays multiple instruments including saxophone and piano",
      "Created the \"I purple you\" phrase which became symbolic for BTS and ARMY",
      "Known for his love of vintage items and classic films",
      "Has a unique rectangular smile",
      "Collects Gucci items and has been featured in their campaigns",
      "His pets include a dog named Yeontan (Tannie)"
    ],
    achievements: [
      "Debuted as an actor in the historical K-drama 'Hwarang: The Poet Warrior Youth'",
      "His self-composed songs include 'Winter Bear,' 'Sweet Night,' and 'Scenery'",
      "His OST 'Sweet Night' for the drama 'Itaewon Class' topped iTunes charts in 118 countries",
      "Set a Guinness World Record for fastest time to reach 1 million followers on Instagram",
      "First Korean soloist to hit #1 on Billboard's Digital Song Sales chart with 'Christmas Tree'",
      "His solo album 'Layover' debuted at #2 on Billboard 200"
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/thv/",
      twitter: "https://x.com/BTS_twt",
      weverse: "https://weverse.io/bts"
    }
  },
  {
    name: "Jungkook",
    stageName: "Jungkook",
    fullName: "Jeon Jungkook",
    role: "Main Vocalist, Lead Dancer, Sub-Rapper, Center",
    birthDate: "September 1, 1997",
    birthPlace: "Busan, South Korea",
    height: "179 cm (5'10\")",
    weight: "70 kg (154 lbs)",
    bloodType: "A",
    image: "/images/members/jungkook.jpg",
    slug: "jungkook",
    shortBio: "Jungkook is the youngest member (maknae) of BTS and a multi-talented performer known as the 'Golden Maknae' for his abilities in singing, dancing, rapping, and athletics.",
    biography: `Jeon Jungkook, the youngest member of BTS, was born on September 1, 1997, in Busan, South Korea. He was only 15 years old when he debuted with BTS in 2013, having joined Big Hit Entertainment after being eliminated from the talent show Superstar K.

Nicknamed the "Golden Maknae" (maknae meaning the youngest), Jungkook has shown exceptional talent across multiple disciplines. As the main vocalist of BTS, his stable and versatile voice is featured prominently in their songs. He's also skilled in dancing, rapping, and various athletic activities.

Jungkook's solo songs within BTS albums, including "Begin," "Euphoria," and "My Time," showcase his vocal range and emotional delivery. His cover songs on platforms like SoundCloud have also garnered millions of streams, demonstrating his wide musical appeal.

Despite being shy around strangers, Jungkook is playful and energetic with people he's comfortable with. His hardworking nature and constant desire to improve have been documented throughout BTS's career, with many memorable moments of him practicing alone after concerts or shows.

In November 2023, Jungkook released his first solo album "GOLDEN", which broke numerous records and showcased his artistic growth and global appeal.`,
    funFacts: [
      "Was scouted by multiple entertainment companies before choosing Big Hit",
      "Trained in multiple martial arts including Taekwondo",
      "Known for his habit of saying \"Eomma\" (Mom) when surprised",
      "Can draw well and has created artwork for BTS merchandise",
      "His song covers on platforms like SoundCloud have millions of streams",
      "Holds numerous records for Spotify streams with his solo single 'Seven'"
    ],
    achievements: [
      "His solo single 'Seven' featuring Latto debuted at #1 on Billboard Hot 100",
      "First Korean soloist to perform at Global Citizen Festival in NYC",
      "His solo album 'GOLDEN' debuted at #2 on Billboard 200",
      "His single 'Seven' earned the fastest 1 billion streams in Spotify history",
      "Performed at the 2022 FIFA World Cup Opening Ceremony in Qatar",
      "His song 'Euphoria' was featured on the HBO show 'Euphoria' soundtrack"
    ],
    socialMedia: {
      twitter: "https://x.com/BTS_twt",
      tiktok: "https://www.tiktok.com/@jungkook",
      weverse: "https://weverse.io/bts"
    }
  }
] 