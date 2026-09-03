import { Service } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'vedic-kundli-analysis',
    title: 'Complete Vedic Kundli & Life Forecast',
    bengaliTitle: 'সম্পূর্ণ বেদিক কোষ্ঠী বিচার ও জীবন বিশ্লেষণ',
    category: 'vedic',
    badge: 'Most Popular',
    durationMinutes: 45,
    feeINR: 2100,
    shortDesc: 'In-depth analysis of 12 Houses, Vimshottari Mahadasha, Sade Sati phase, and D-9 Navamsha chart with certified astrological remedies.',
    fullDesc: 'Comprehensive Vedic birth chart evaluation by Sri Suvabrata Bharati. Covers career trajectories, promotion timings, financial stability, health vulnerabilities, and relationship dynamics. Includes customized gemstone and mantra recommendations.',
    deliverables: [
      'Comprehensive Lagna & Navamsha Kundli assessment',
      'Mahadasha & Antardasha timeline breakdown (Next 5 Years)',
      'Sade Sati & Kantaka Shani impact and remedies',
      'Handwritten astrological prescription & Vedic mantra recommendations',
      'Dedicated Q&A time for 3 pressing life questions'
    ],
    modesAllowed: ['video', 'audio', 'in_person'],
    icon: 'Compass'
  },
  {
    id: '16-zone-vastu-consultation',
    title: '16-Zone Scientific Vastu Shastra Audit',
    bengaliTitle: '১৬-দিক বৈদিক ও বৈজ্ঞানিক বাস্তু বিচার',
    category: 'vastu',
    badge: 'High Impact',
    durationMinutes: 60,
    feeINR: 5100,
    shortDesc: 'Vedic energy grid analysis for residential homes, commercial shops, and office spaces with zero-demolition spatial remedies.',
    fullDesc: 'Scientific 16-zone directional balance mapping by Sri Suvabrata Bharati. Identifies energy blocks causing sudden financial leaks, chronic family friction, legal disputes, and health ailments. Complete remedies provided using elemental balance, copper wires, yantras, and color therapies without structural demolition.',
    deliverables: [
      '16-Directional Bar Chart & Energy Grid mapping',
      'Entrance (Padavinyasa) energy assessment',
      'Kitchen (Agni), Master Bedroom (Nairutya) & Brahmasthan balancing',
      'Non-destructive spatial remedies (Metal rods, color remedies, mirrors)',
      'Review of user-uploaded architectural blueprint/floor plan'
    ],
    modesAllowed: ['video', 'in_person'],
    icon: 'Home'
  },
  {
    id: 'kp-astrology-prashna',
    title: 'KP System Precision Prashna (Horary) Analysis',
    bengaliTitle: 'কে.পি. জ্যোতিষ ও তাৎক্ষণিক প্রশ্ন নির্ণয়',
    category: 'kp',
    badge: 'Precision Timing',
    durationMinutes: 30,
    feeINR: 1500,
    shortDesc: 'Sub-lord theory based pinpoint predictions for urgent dilemmas: job change, visa clearance, lost items, court verdicts.',
    fullDesc: 'When exact birth time is ambiguous or you face an immediate decision fork, Krishnamurti Padhdhati (KP System) provides mathematical accuracy through Horary (Prashna) numbers 1 to 249. Sri Suvabrata Bharati is a renowned master of Cuspal Sub-Lords.',
    deliverables: [
      'Horary Chart casted for the exact query moment',
      'Binary confirmation (Yes/No timing for event maturation)',
      'Significator ruling planets and sub-lord connection report',
      'Actionable timing windows for filing legal papers, job switches, or proposals'
    ],
    modesAllowed: ['video', 'audio'],
    icon: 'Clock'
  },
  {
    id: 'marriage-matchmaking-nadi',
    title: 'Ashtakoot Milan & Nadi Dosha Rectification',
    bengaliTitle: 'যোটক বিচার, নাড়ী দোষ ও বৈবাহিক সামঞ্জস্য',
    category: 'nadi',
    badge: 'Heritage Trust',
    durationMinutes: 45,
    feeINR: 2500,
    shortDesc: '36 Guna Milan, Manglik Dosha evaluation, emotional compatibility, and progeny blessing remedies for prospective brides & grooms.',
    fullDesc: 'Marriage is a union of karmic destinies. Beyond ordinary 36 Guna scores, Sri Suvabrata Bharati analyzes longevity (Ayushya), temperamental harmony, financial compatibility, and provides authentic Shastric remedies for Nadi, Bhakoot, or Mangal Doshas.',
    deliverables: [
      'Detailed dual Kundli comparative matching report',
      'Manglik Dosha severity grading and cancellation check',
      'Nadi Dosha root causes and remedial Pujas',
      'Auspicious Vivah Muhurat window suggestions'
    ],
    modesAllowed: ['video', 'audio', 'in_person'],
    icon: 'HeartHandshake'
  },
  {
    id: 'palmistry-numerology-combo',
    title: 'Hastarekha (Palmistry) & Numerology Synergy',
    bengaliTitle: 'হস্তরেখা বিচার ও বৈদিক সংখ্যাতত্ত্ব',
    category: 'numerology',
    badge: 'Holistic Blueprint',
    durationMinutes: 45,
    feeINR: 1800,
    shortDesc: 'Detailed palm mounts and lines review combined with Destiny, Psychic, and Name vibration numerical optimization.',
    fullDesc: 'Your palms change with your deeds, while your numbers reveal your subconscious vibration. Sri Suvabrata Bharati synthesizes ancient Cheiro palmistry with Chaldean & Vedic numerology to calibrate your name spelling, auspicious vehicle numbers, and lucky signatures.',
    deliverables: [
      'High-resolution palm photo analysis (Heart, Head, Life & Fate Lines)',
      'Mount of Jupiter, Saturn, Sun & Venus strength assessment',
      'Name spelling phonetic frequency adjustment for career success',
      'Personal lucky numbers, colors, and talisman guidance'
    ],
    modesAllowed: ['video', 'in_person'],
    icon: 'Hand'
  },
  {
    id: 'gemstone-rudraksha-remedy',
    title: 'Certified Vedic Gemstone & Rudraksha Consultation',
    bengaliTitle: 'রত্ন ও রুদ্রাক্ষ প্রেসক্রিপশন এবং ধারণ বিধি',
    category: 'gemstone',
    badge: 'Safe & Energized',
    durationMinutes: 30,
    feeINR: 1100,
    shortDesc: 'Zero-harm planetary gemstone prescription, weight (rati), finger selection, metal, and Pran-Pratishtha energization instructions.',
    fullDesc: 'Incorrect gemstones can cause severe planetary imbalances. Sri Suvabrata Bharati prescribes only friendly Graha gemstones based on Lagna Lord, 5th Lord, and 9th Lord (Trikona lords), alongside authentic Nepalese Rudraksha combinations.',
    deliverables: [
      'Personalized Gemstone compatibility verification',
      'Carat / Rati calculations based on body weight',
      'Metal selection (Gold, Silver, Panchadhatu or Ashtadhatu)',
      'Vedic Pran-Pratishtha Puja ritual guidelines'
    ],
    modesAllowed: ['video', 'audio', 'in_person'],
    icon: 'Sparkles'
  }
];
