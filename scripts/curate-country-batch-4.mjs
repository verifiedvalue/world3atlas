import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  il: {
    name: 'Israel', geo: { lat: 31.05, lng: 34.85, flag: '🇮🇱', region: 'Middle East' }, accessTier: 'restricted', biome: 'Tech Nexus',
    lore: 'Innovation-heavy economy with deep startup density and high cost in central metro zones.',
    stats: { wealth: { monthly_usd: 3000, annual_usd: 36000 }, language: { primary: 'Hebrew', others: ['Arabic', 'English'], test: 'none', level: 'none' }, skills: { preferred: ['Software', 'Cybersecurity', 'Biotech', 'Defense Tech'], degreeRequired: true }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'work_b1', type: 'hard', label: 'B/1 work visa pathway', detail: 'Employment requires sponsor-backed permit and status compliance.', options: [] }],
    difficulty: { overall: 62, cost: 82, security: 42, safety: 66, quality: 84, language: 54 }, population: 9800000, currency: 'ILS',
    children: [
      { id: 'il-ta', name: 'Tel Aviv District', lat: 32.085, lng: 34.781, tier: 'locked', biome: 'Tech Nexus', diff: [70, 90, 62, 64, 88, 52], pop: 1500000 },
      { id: 'il-jer', name: 'Jerusalem District', lat: 31.768, lng: 35.214, tier: 'restricted', biome: 'Cultural Heartland', diff: [56, 70, 56, 64, 80, 56], pop: 1250000 }
    ]
  },
  eg: {
    name: 'Egypt', geo: { lat: 26.82, lng: 30.8, flag: '🇪🇬', region: 'Africa' }, accessTier: 'open', biome: 'Desert Outpost',
    lore: 'Large regional economy anchored by Cairo and Alexandria, with logistics and tourism scale.',
    stats: { wealth: { monthly_usd: 650, annual_usd: 7800 }, language: { primary: 'Arabic', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'Logistics', 'Construction', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_residence', type: 'hard', label: 'Work permit and residency process', detail: 'Sponsorship and permit approvals vary by role and employer.', options: [] }],
    difficulty: { overall: 30, cost: 20, security: 66, safety: 46, quality: 54, language: 48 }, population: 112000000, currency: 'EGP',
    children: [
      { id: 'eg-c', name: 'Cairo Governorate', lat: 30.044, lng: 31.236, tier: 'restricted', biome: 'Urban Megacity', diff: [42, 28, 40, 42, 60, 50], pop: 10200000 },
      { id: 'eg-alx', name: 'Alexandria', lat: 31.2, lng: 29.918, tier: 'open', biome: 'Coastal Haven', diff: [26, 16, 30, 52, 56, 46], pop: 5600000 }
    ]
  },
  ng: {
    name: 'Nigeria', geo: { lat: 9.08, lng: 8.67, flag: '🇳🇬', region: 'Africa' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'Africa’s largest population center with major fintech growth and large market demand.',
    stats: { wealth: { monthly_usd: 550, annual_usd: 6600 }, language: { primary: 'English', others: ['Yoruba', 'Hausa', 'Igbo'], test: 'none', level: 'none' }, skills: { preferred: ['Fintech', 'Telecom', 'Energy', 'Trade'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'STR visa + residence permit', detail: 'Employment entry depends on sponsor and immigration quota approvals.', options: [] }],
    difficulty: { overall: 34, cost: 18, security: 62, safety: 36, quality: 50, language: 22 }, population: 223000000, currency: 'NGN',
    children: [
      { id: 'ng-la', name: 'Lagos', lat: 6.524, lng: 3.379, tier: 'restricted', biome: 'Urban Megacity', diff: [46, 24, 42, 30, 58, 20], pop: 15000000 },
      { id: 'ng-fc', name: 'Federal Capital Territory', lat: 9.076, lng: 7.399, tier: 'open', biome: 'Cultural Heartland', diff: [30, 16, 34, 42, 54, 22], pop: 3600000 }
    ]
  },
  ma: {
    name: 'Morocco', geo: { lat: 31.79, lng: -7.09, flag: '🇲🇦', region: 'Africa' }, accessTier: 'open', biome: 'Desert Outpost',
    lore: 'North African gateway economy with strong logistics, manufacturing, and tourism potential.',
    stats: { wealth: { monthly_usd: 800, annual_usd: 9600 }, language: { primary: 'Arabic', others: ['French', 'Tamazight'], test: 'none', level: 'none' }, skills: { preferred: ['Logistics', 'Manufacturing', 'Tourism', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_card', type: 'hard', label: 'Work contract and residence card', detail: 'Employer documentation and local registration required.', options: [] }],
    difficulty: { overall: 30, cost: 24, security: 68, safety: 64, quality: 60, language: 44 }, population: 37500000, currency: 'MAD',
    children: [
      { id: 'ma-cas', name: 'Casablanca-Settat', lat: 33.573, lng: -7.589, tier: 'restricted', biome: 'Financial Citadel', diff: [38, 30, 36, 60, 66, 42], pop: 6900000 },
      { id: 'ma-rab', name: 'Rabat-Sale-Kenitra', lat: 34.02, lng: -6.841, tier: 'open', biome: 'Cultural Heartland', diff: [26, 20, 28, 66, 62, 44], pop: 4900000 }
    ]
  },
  kz: {
    name: 'Kazakhstan', geo: { lat: 48.02, lng: 66.92, flag: '🇰🇿', region: 'Asia' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'Resource-rich Eurasian state with rising logistics corridors and energy opportunities.',
    stats: { wealth: { monthly_usd: 1100, annual_usd: 13200 }, language: { primary: 'Kazakh', others: ['Russian', 'English'], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Mining', 'Logistics', 'Engineering'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_permit', type: 'hard', label: 'Work permit and temporary residence', detail: 'Foreign labor quotas and employer sponsorship apply.', options: [] }],
    difficulty: { overall: 36, cost: 28, security: 62, safety: 62, quality: 62, language: 52 }, population: 20000000, currency: 'KZT',
    children: [
      { id: 'kz-ala', name: 'Almaty Region', lat: 43.238, lng: 76.945, tier: 'restricted', biome: 'Cultural Heartland', diff: [42, 34, 42, 60, 66, 50], pop: 2400000 },
      { id: 'kz-ast', name: 'Astana Region', lat: 51.169, lng: 71.449, tier: 'open', biome: 'Steppe Frontier', diff: [30, 24, 34, 66, 60, 52], pop: 1400000 }
    ]
  },
  uz: {
    name: 'Uzbekistan', geo: { lat: 41.38, lng: 64.59, flag: '🇺🇿', region: 'Asia' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'Fast-reforming Central Asian economy with expanding services and manufacturing sectors.',
    stats: { wealth: { monthly_usd: 600, annual_usd: 7200 }, language: { primary: 'Uzbek', others: ['Russian'], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'Textiles', 'Logistics', 'Agriculture'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work visa and registration', detail: 'Employer support and local registration are required for long stays.', options: [] }],
    difficulty: { overall: 28, cost: 18, security: 68, safety: 58, quality: 50, language: 56 }, population: 36000000, currency: 'UZS',
    children: [
      { id: 'uz-tk', name: 'Tashkent Region', lat: 41.299, lng: 69.24, tier: 'restricted', biome: 'Urban Megacity', diff: [36, 24, 38, 56, 56, 54], pop: 3000000 },
      { id: 'uz-sm', name: 'Samarkand Region', lat: 39.654, lng: 66.959, tier: 'open', biome: 'Cultural Heartland', diff: [22, 14, 28, 62, 50, 56], pop: 4000000 }
    ]
  },
  pk: {
    name: 'Pakistan', geo: { lat: 30.38, lng: 69.35, flag: '🇵🇰', region: 'Asia' }, accessTier: 'open', biome: 'Border Territory',
    lore: 'Large and youthful economy with major textile, agriculture, and services clusters.',
    stats: { wealth: { monthly_usd: 500, annual_usd: 6000 }, language: { primary: 'Urdu', others: ['English', 'Punjabi'], test: 'none', level: 'none' }, skills: { preferred: ['Textiles', 'IT Services', 'Agriculture', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'employment_visa', type: 'hard', label: 'Employment visa + registration', detail: 'Company sponsorship and permit compliance needed for long-term work.', options: [] }],
    difficulty: { overall: 34, cost: 16, security: 64, safety: 34, quality: 46, language: 46 }, population: 240000000, currency: 'PKR',
    children: [
      { id: 'pk-sd', name: 'Sindh', lat: 24.86, lng: 67.01, tier: 'restricted', biome: 'Urban Megacity', diff: [44, 20, 40, 30, 52, 44], pop: 55000000 },
      { id: 'pk-pb', name: 'Punjab', lat: 31.52, lng: 74.35, tier: 'open', biome: 'Cultural Heartland', diff: [28, 14, 32, 38, 48, 46], pop: 127000000 }
    ]
  },
  bd: {
    name: 'Bangladesh', geo: { lat: 23.68, lng: 90.36, flag: '🇧🇩', region: 'Asia' }, accessTier: 'open', biome: 'River Delta',
    lore: 'Dense manufacturing and export economy with rapidly growing digital and services sectors.',
    stats: { wealth: { monthly_usd: 450, annual_usd: 5400 }, language: { primary: 'Bengali', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Textiles', 'Manufacturing', 'IT Services', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_permit', type: 'hard', label: 'Work permit and visa compliance', detail: 'Foreign employment generally requires sponsoring employer and approvals.', options: [] }],
    difficulty: { overall: 30, cost: 14, security: 66, safety: 42, quality: 44, language: 42 }, population: 171000000, currency: 'BDT',
    children: [
      { id: 'bd-c', name: 'Dhaka Division', lat: 23.81, lng: 90.41, tier: 'restricted', biome: 'Urban Megacity', diff: [40, 18, 38, 38, 48, 40], pop: 47000000 },
      { id: 'bd-b', name: 'Chittagong Division', lat: 22.356, lng: 91.783, tier: 'open', biome: 'Coastal Haven', diff: [24, 12, 30, 46, 42, 42], pop: 33000000 }
    ]
  },
  lk: {
    name: 'Sri Lanka', geo: { lat: 7.87, lng: 80.77, flag: '🇱🇰', region: 'Asia' }, accessTier: 'open', biome: 'Tropical Sanctuary',
    lore: 'Island economy with tourism, logistics, and services opportunities in a compact geography.',
    stats: { wealth: { monthly_usd: 500, annual_usd: 6000 }, language: { primary: 'Sinhala', others: ['Tamil', 'English'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'Logistics', 'IT Services', 'Agriculture'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Residence/work visa categories', detail: 'Business and employment pathways require documentation and approvals.', options: [] }],
    difficulty: { overall: 28, cost: 16, security: 70, safety: 60, quality: 52, language: 40 }, population: 22000000, currency: 'LKR',
    children: [
      { id: 'lk-11', name: 'Colombo District', lat: 6.927, lng: 79.861, tier: 'restricted', biome: 'Urban Megacity', diff: [36, 22, 34, 56, 58, 38], pop: 2400000 },
      { id: 'lk-21', name: 'Kandy District', lat: 7.29, lng: 80.633, tier: 'open', biome: 'Cultural Heartland', diff: [22, 12, 26, 64, 50, 42], pop: 1400000 }
    ]
  },
  np: {
    name: 'Nepal', geo: { lat: 28.39, lng: 84.12, flag: '🇳🇵', region: 'Asia' }, accessTier: 'open', biome: 'Mountain Stronghold',
    lore: 'Himalayan nation with tourism and services opportunities and low baseline cost profile.',
    stats: { wealth: { monthly_usd: 400, annual_usd: 4800 }, language: { primary: 'Nepali', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'Hospitality', 'Agriculture', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work visa and permit process', detail: 'Employment pathways depend on sponsoring entities and permit filings.', options: [] }],
    difficulty: { overall: 24, cost: 10, security: 72, safety: 58, quality: 44, language: 46 }, population: 31000000, currency: 'NPR',
    children: [
      { id: 'np-ba', name: 'Bagmati Province', lat: 27.717, lng: 85.324, tier: 'open', biome: 'Cultural Heartland', diff: [30, 14, 30, 54, 46, 44], pop: 6100000 },
      { id: 'np-ga', name: 'Gandaki Province', lat: 28.209, lng: 83.985, tier: 'open', biome: 'Mountain Stronghold', diff: [18, 8, 24, 62, 42, 46], pop: 2500000 }
    ]
  }
};

function makeChild(country, c) {
  const [overall, cost, accessStrain, safety, quality, language] = c.diff;
  const security = Math.max(0, Math.min(100, Math.round(100 - accessStrain)));
  const monthly = Math.round(country.stats.wealth.monthly_usd * (cost > 55 ? 1.1 : 0.9));
  return {
    id: c.id,
    name: c.name,
    level: 'state',
    parent: country.id,
    hasChildren: false,
    geo: { lat: c.lat, lng: c.lng, flag: '🏴', region: country.geo.region },
    accessTier: c.tier,
    biome: c.biome,
    lore: `${c.name} is a curated regional zone in ${country.name}.`,
    stats: {
      wealth: { monthly_usd: monthly, annual_usd: monthly * 12 },
      language: country.stats.language,
      skills: country.stats.skills,
      health: country.stats.health,
      age: country.stats.age
    },
    quests: [{ id: 'local_path', type: 'hard', label: 'National pathway + local settlement', detail: 'Local labor demand and administrative requirements shape progression speed.', options: [] }],
    difficulty: { overall, cost, security, safety, quality, language },
    population: c.pop,
    currency: country.currency
  };
}

for (const z of countries.zones) {
  const cur = curated[z.id];
  if (!cur) continue;
  z.name = cur.name;
  z.level = 'country';
  z.parent = null;
  z.hasChildren = true;
  z.childrenFile = z.id;
  z.geo = cur.geo;
  z.accessTier = cur.accessTier;
  z.biome = cur.biome;
  z.lore = cur.lore;
  z.stats = cur.stats;
  z.quests = cur.quests;
  z.difficulty = cur.difficulty;
  z.population = cur.population;
  z.currency = cur.currency;

  const payload = { meta: { schemaVersion: 2, parent: z.id }, zones: cur.children.map(c => makeChild(z, c)) };
  fs.writeFileSync(path.join(zonesDir, `${z.id}.json`), JSON.stringify(payload, null, 2) + '\n', 'utf8');
}

countries.meta.updatedAt = '2026-Q2';
fs.writeFileSync(countriesPath, JSON.stringify(countries, null, 2) + '\n', 'utf8');
console.log('Curated countries:', Object.keys(curated).join(', '));
