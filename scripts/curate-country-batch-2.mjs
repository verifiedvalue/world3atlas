import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  dk: {
    name: 'Denmark', geo: { lat: 56.26, lng: 9.5, flag: '🇩🇰', region: 'Europe' }, accessTier: 'restricted', biome: 'Nordic Citadel',
    lore: 'Highly stable welfare state with strong work-life balance and high salary/high tax equilibrium.',
    stats: { wealth: { monthly_usd: 2800, annual_usd: 33600 }, language: { primary: 'Danish', others: ['English'], test: 'PD3', level: 'B1' }, skills: { preferred: ['Tech', 'Pharma', 'Engineering', 'Wind Energy'], degreeRequired: true }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_permit', type: 'hard', label: 'Positive List or Pay Limit Scheme', detail: 'Work permit routes tied to shortage occupations and salary floors.', options: [] }],
    difficulty: { overall: 58, cost: 70, security: 46, safety: 90, quality: 92, language: 58 }, population: 6000000, currency: 'DKK',
    children: [
      { id: 'dk-h', name: 'Capital Region', lat: 55.676, lng: 12.568, tier: 'restricted', biome: 'Urban Megacity', diff: [64, 78, 58, 90, 94, 60], pop: 1900000 },
      { id: 'dk-m', name: 'Central Denmark', lat: 56.162, lng: 10.204, tier: 'restricted', biome: 'Cultural Heartland', diff: [50, 60, 50, 92, 90, 54], pop: 1300000 }
    ]
  },
  be: {
    name: 'Belgium', geo: { lat: 50.85, lng: 4.35, flag: '🇧🇪', region: 'Europe' }, accessTier: 'restricted', biome: 'Financial Citadel',
    lore: 'EU administrative core with multilingual labor markets and dense logistics corridors.',
    stats: { wealth: { monthly_usd: 2500, annual_usd: 30000 }, language: { primary: 'Dutch/French', others: ['German', 'English'], test: 'none', level: 'none' }, skills: { preferred: ['EU Affairs', 'Logistics', 'Pharma', 'Tech'], degreeRequired: true }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'single_permit', type: 'hard', label: 'Single Permit', detail: 'Combined work and residence permit for most non-EU employees.', options: [] }],
    difficulty: { overall: 54, cost: 62, security: 48, safety: 80, quality: 84, language: 44 }, population: 11800000, currency: 'EUR',
    children: [
      { id: 'be-vbr', name: 'Brussels-Capital', lat: 50.85, lng: 4.35, tier: 'locked', biome: 'Financial Citadel', diff: [66, 76, 58, 78, 88, 42], pop: 1200000 },
      { id: 'be-vov', name: 'East Flanders', lat: 51.05, lng: 3.72, tier: 'restricted', biome: 'Industrial Heartland', diff: [48, 54, 50, 82, 82, 48], pop: 1500000 }
    ]
  },
  at: {
    name: 'Austria', geo: { lat: 47.52, lng: 14.55, flag: '🇦🇹', region: 'Europe' }, accessTier: 'restricted', biome: 'Alpine Fortress',
    lore: 'High-quality Alpine economy with strong engineering and services sectors.',
    stats: { wealth: { monthly_usd: 2600, annual_usd: 31200 }, language: { primary: 'German', others: ['English'], test: 'OSD', level: 'B1' }, skills: { preferred: ['Engineering', 'Tourism', 'Manufacturing', 'Healthcare'], degreeRequired: true }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'rwr', type: 'hard', label: 'Red-White-Red Card', detail: 'Points-based route for skilled workers and shortage occupations.', options: [] }],
    difficulty: { overall: 55, cost: 64, security: 48, safety: 88, quality: 88, language: 58 }, population: 9100000, currency: 'EUR',
    children: [
      { id: 'at-9', name: 'Vienna', lat: 48.208, lng: 16.373, tier: 'restricted', biome: 'Urban Megacity', diff: [60, 70, 54, 86, 92, 56], pop: 2000000 },
      { id: 'at-6', name: 'Styria', lat: 47.07, lng: 15.44, tier: 'restricted', biome: 'Industrial Heartland', diff: [48, 56, 50, 90, 84, 60], pop: 1250000 }
    ]
  },
  ie: {
    name: 'Ireland', geo: { lat: 53.14, lng: -7.69, flag: '🇮🇪', region: 'Europe' }, accessTier: 'restricted', biome: 'Tech Nexus',
    lore: 'English-speaking EU hub with outsized presence of global tech and pharma.',
    stats: { wealth: { monthly_usd: 3000, annual_usd: 36000 }, language: { primary: 'English', others: ['Irish'], test: 'none', level: 'none' }, skills: { preferred: ['Tech', 'Pharma', 'Finance', 'Data'], degreeRequired: true }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'critical_skills', type: 'hard', label: 'Critical Skills Employment Permit', detail: 'Fast-track route for high-demand occupations and salary thresholds.', options: [] }],
    difficulty: { overall: 60, cost: 78, security: 45, safety: 82, quality: 86, language: 8 }, population: 5300000, currency: 'EUR',
    children: [
      { id: 'ie-l', name: 'Leinster', lat: 53.35, lng: -6.26, tier: 'restricted', biome: 'Tech Nexus', diff: [64, 82, 58, 80, 88, 8], pop: 2800000 },
      { id: 'ie-m', name: 'Munster', lat: 51.9, lng: -8.47, tier: 'restricted', biome: 'Coastal Haven', diff: [50, 62, 50, 84, 82, 10], pop: 1300000 }
    ]
  },
  cl: {
    name: 'Chile', geo: { lat: -35.68, lng: -71.54, flag: '🇨🇱', region: 'Americas' }, accessTier: 'open', biome: 'Mountain Stronghold',
    lore: 'Andean-Pacific economy with stable institutions and strong mining/energy sectors.',
    stats: { wealth: { monthly_usd: 1200, annual_usd: 14400 }, language: { primary: 'Spanish', others: [], test: 'DELE', level: 'A2' }, skills: { preferred: ['Mining', 'Energy', 'Tech', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'temp_residence', type: 'hard', label: 'Temporary residence categories', detail: 'Routes for work contracts, professional services, and entrepreneurship.', options: [] }],
    difficulty: { overall: 36, cost: 36, security: 66, safety: 66, quality: 72, language: 40 }, population: 19600000, currency: 'CLP',
    children: [
      { id: 'cl-rm', name: 'Santiago Metropolitan', lat: -33.45, lng: -70.66, tier: 'restricted', biome: 'Urban Megacity', diff: [46, 44, 38, 62, 76, 40], pop: 8200000 },
      { id: 'cl-vs', name: 'Valparaiso', lat: -33.05, lng: -71.62, tier: 'open', biome: 'Coastal Haven', diff: [30, 28, 30, 68, 70, 38], pop: 1900000 }
    ]
  },
  pe: {
    name: 'Peru', geo: { lat: -9.19, lng: -75.02, flag: '🇵🇪', region: 'Americas' }, accessTier: 'open', biome: 'Mountain Stronghold',
    lore: 'Rapidly growing Pacific-Andean economy with strong mining, services, and tourism potential.',
    stats: { wealth: { monthly_usd: 850, annual_usd: 10200 }, language: { primary: 'Spanish', others: ['Quechua'], test: 'none', level: 'none' }, skills: { preferred: ['Mining', 'Logistics', 'Tourism', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residency', type: 'hard', label: 'Worker or professional residency', detail: 'Contract-based and professional pathways with registration steps.', options: [] }],
    difficulty: { overall: 30, cost: 26, security: 70, safety: 48, quality: 58, language: 42 }, population: 34000000, currency: 'PEN',
    children: [
      { id: 'pe-lim', name: 'Lima', lat: -12.05, lng: -77.04, tier: 'restricted', biome: 'Urban Megacity', diff: [38, 34, 34, 46, 64, 40], pop: 11000000 },
      { id: 'pe-are', name: 'Arequipa', lat: -16.41, lng: -71.54, tier: 'open', biome: 'Cultural Heartland', diff: [26, 22, 28, 52, 58, 40], pop: 1500000 }
    ]
  },
  ph: {
    name: 'Philippines', geo: { lat: 12.88, lng: 121.77, flag: '🇵🇭', region: 'Asia' }, accessTier: 'open', biome: 'Tropical Sanctuary',
    lore: 'Archipelago economy with major BPO, maritime, and services sectors and strong English usage.',
    stats: { wealth: { monthly_usd: 700, annual_usd: 8400 }, language: { primary: 'Filipino', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['BPO', 'Healthcare', 'Logistics', 'Tourism'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work visa + alien permit', detail: 'Employment requires visa sponsorship and labor permit filings.', options: [] }],
    difficulty: { overall: 28, cost: 22, security: 70, safety: 50, quality: 56, language: 20 }, population: 118000000, currency: 'PHP',
    children: [
      { id: 'ph-00', name: 'Metro Manila', lat: 14.6, lng: 120.98, tier: 'restricted', biome: 'Urban Megacity', diff: [38, 32, 34, 44, 62, 18], pop: 13500000 },
      { id: 'ph-07', name: 'Central Visayas', lat: 10.32, lng: 123.9, tier: 'open', biome: 'Coastal Haven', diff: [24, 18, 28, 56, 56, 22], pop: 8200000 }
    ]
  },
  vn: {
    name: 'Vietnam', geo: { lat: 14.06, lng: 108.28, flag: '🇻🇳', region: 'Asia' }, accessTier: 'open', biome: 'Tropical Sanctuary',
    lore: 'Fast-growing manufacturing and tech destination with strong urban growth corridors.',
    stats: { wealth: { monthly_usd: 750, annual_usd: 9000 }, language: { primary: 'Vietnamese', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'Tech', 'Education', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_permit', type: 'hard', label: 'Work permit + temporary residence', detail: 'Permit exemptions exist, but most long-term roles require employer-backed permits.', options: [] }],
    difficulty: { overall: 30, cost: 20, security: 68, safety: 60, quality: 62, language: 46 }, population: 100000000, currency: 'VND',
    children: [
      { id: 'vn-hn', name: 'Hanoi', lat: 21.028, lng: 105.834, tier: 'restricted', biome: 'Cultural Heartland', diff: [40, 28, 36, 64, 66, 44], pop: 8500000 },
      { id: 'vn-sg', name: 'Ho Chi Minh City', lat: 10.823, lng: 106.629, tier: 'restricted', biome: 'Tech Nexus', diff: [42, 30, 38, 58, 68, 42], pop: 9400000 }
    ]
  },
  tr: {
    name: 'Turkey', geo: { lat: 38.96, lng: 35.24, flag: '🇹🇷', region: 'Middle East' }, accessTier: 'open', biome: 'Border Territory',
    lore: 'Bridge economy between Europe and Asia with major logistics, industry, and services hubs.',
    stats: { wealth: { monthly_usd: 900, annual_usd: 10800 }, language: { primary: 'Turkish', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'Logistics', 'Tourism', 'Construction'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'ikamet', type: 'hard', label: 'Residence permit (ikamet) pathway', detail: 'Work and residence processes depend on sponsorship and permit category.', options: [] }],
    difficulty: { overall: 40, cost: 30, security: 62, safety: 52, quality: 62, language: 52 }, population: 86000000, currency: 'TRY',
    children: [
      { id: 'tr-34', name: 'Istanbul', lat: 41.008, lng: 28.978, tier: 'restricted', biome: 'Urban Megacity', diff: [50, 40, 44, 48, 70, 54], pop: 15800000 },
      { id: 'tr-06', name: 'Ankara', lat: 39.933, lng: 32.859, tier: 'open', biome: 'Cultural Heartland', diff: [34, 26, 34, 56, 62, 50], pop: 5800000 }
    ]
  },
  sa: {
    name: 'Saudi Arabia', geo: { lat: 23.89, lng: 45.08, flag: '🇸🇦', region: 'Middle East' }, accessTier: 'restricted', biome: 'Desert Outpost',
    lore: 'High-income Gulf economy with large-scale infrastructure and diversification programs.',
    stats: { wealth: { monthly_usd: 2400, annual_usd: 28800 }, language: { primary: 'Arabic', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Construction', 'Healthcare', 'Tech'], degreeRequired: false }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'iqama', type: 'hard', label: 'Employer sponsorship + iqama', detail: 'Most foreign workers require sponsor-backed residence/work status.', options: [] }],
    difficulty: { overall: 50, cost: 58, security: 46, safety: 74, quality: 72, language: 40 }, population: 36000000, currency: 'SAR',
    children: [
      { id: 'sa-01', name: 'Riyadh Province', lat: 24.713, lng: 46.675, tier: 'restricted', biome: 'Financial Citadel', diff: [56, 62, 58, 72, 76, 42], pop: 9000000 },
      { id: 'sa-02', name: 'Makkah Province', lat: 21.485, lng: 39.193, tier: 'restricted', biome: 'Coastal Haven', diff: [48, 56, 52, 70, 72, 40], pop: 8700000 }
    ]
  }
};

function makeChild(country, c) {
  const [overall, cost, accessStrain, safety, quality, language] = c.diff;
  const security = Math.max(0, Math.min(100, Math.round(100 - accessStrain)));
  const monthly = Math.round(country.stats.wealth.monthly_usd * (cost > 65 ? 1.14 : 0.9));
  return {
    id: c.id,
    name: c.name,
    level: 'state',
    parent: country.id,
    hasChildren: false,
    geo: { lat: c.lat, lng: c.lng, flag: '🏴', region: country.geo.region },
    accessTier: c.tier,
    biome: c.biome,
    lore: `${c.name} is a strategic regional zone within ${country.name}.`,
    stats: {
      wealth: { monthly_usd: monthly, annual_usd: monthly * 12 },
      language: country.stats.language,
      skills: country.stats.skills,
      health: country.stats.health,
      age: country.stats.age
    },
    quests: [{ id: 'local_path', type: 'hard', label: 'National pathway + local conditions', detail: 'Local employer demand and settlement logistics materially affect outcomes.', options: [] }],
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
