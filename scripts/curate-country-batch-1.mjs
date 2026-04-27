import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  ar: {
    name: 'Argentina',
    geo: { lat: -34.6, lng: -58.38, flag: '🇦🇷', region: 'Americas' },
    accessTier: 'open',
    biome: 'Cultural Heartland',
    lore: 'Large South American economy with strong education base, but macro volatility and inflation add planning difficulty.',
    stats: {
      wealth: { monthly_usd: 900, annual_usd: 10800 },
      language: { primary: 'Spanish', others: [], test: 'DELE', level: 'A2' },
      skills: { preferred: ['Agribusiness', 'Tech', 'Energy', 'Manufacturing'], degreeRequired: false },
      health: 'basic',
      age: { min: null, max: null }
    },
    quests: [{ id: 'residency', type: 'hard', label: 'Temporary residency pathway', detail: 'Work, study, or investment pathways available with renewals.', options: [] }],
    difficulty: { overall: 36, cost: 32, security: 66, safety: 54, quality: 66, language: 40 },
    population: 46000000,
    currency: 'ARS',
    children: [
      { id: 'ar-ba', name: 'Buenos Aires Province', lat: -34.92, lng: -57.95, tier: 'restricted', biome: 'Urban Megacity', diff: [44, 42, 40, 50, 70, 42], pop: 17700000 },
      { id: 'ar-cb', name: 'Cordoba', lat: -31.42, lng: -64.18, tier: 'open', biome: 'Industrial Heartland', diff: [32, 28, 32, 58, 64, 38], pop: 3900000 }
    ]
  },
  it: {
    name: 'Italy',
    geo: { lat: 41.9, lng: 12.5, flag: '🇮🇹', region: 'Europe' },
    accessTier: 'restricted',
    biome: 'Cultural Heartland',
    lore: 'High cultural quality-of-life and industrial clusters, with regionally varied economies and administrative overhead.',
    stats: {
      wealth: { monthly_usd: 2300, annual_usd: 27600 },
      language: { primary: 'Italian', others: [], test: 'CILS / CELI', level: 'B1' },
      skills: { preferred: ['Manufacturing', 'Design', 'Tourism', 'Engineering'], degreeRequired: false },
      health: 'insurance_required',
      age: { min: null, max: null }
    },
    quests: [{ id: 'permesso', type: 'hard', label: 'Work visa + Permesso di Soggiorno', detail: 'Permit and residence registration required post-arrival.', options: [] }],
    difficulty: { overall: 52, cost: 58, security: 46, safety: 72, quality: 80, language: 62 },
    population: 58900000,
    currency: 'EUR',
    children: [
      { id: 'it-lom', name: 'Lombardy', lat: 45.46, lng: 9.19, tier: 'restricted', biome: 'Financial Citadel', diff: [60, 70, 56, 70, 84, 64], pop: 10000000 },
      { id: 'it-laz', name: 'Lazio', lat: 41.9, lng: 12.5, tier: 'restricted', biome: 'Urban Megacity', diff: [52, 56, 52, 68, 80, 62], pop: 5800000 }
    ]
  },
  in: {
    name: 'India',
    geo: { lat: 20.59, lng: 78.96, flag: '🇮🇳', region: 'Asia' },
    accessTier: 'open',
    biome: 'Tech Nexus',
    lore: 'Massive and diverse growth economy with globally competitive tech and services hubs.',
    stats: {
      wealth: { monthly_usd: 700, annual_usd: 8400 },
      language: { primary: 'Hindi', others: ['English'], test: 'none', level: 'none' },
      skills: { preferred: ['IT Services', 'Manufacturing', 'Healthcare', 'Finance'], degreeRequired: false },
      health: 'basic',
      age: { min: null, max: null }
    },
    quests: [{ id: 'entry', type: 'hard', label: 'Visa class alignment', detail: 'Employment, business, and OCI pathways vary by origin and role.', options: [] }],
    difficulty: { overall: 30, cost: 20, security: 66, safety: 48, quality: 56, language: 38 },
    population: 1430000000,
    currency: 'INR',
    children: [
      { id: 'in-mh', name: 'Maharashtra', lat: 19.07, lng: 72.88, tier: 'restricted', biome: 'Financial Citadel', diff: [42, 36, 40, 46, 64, 36], pop: 124000000 },
      { id: 'in-ka', name: 'Karnataka', lat: 12.97, lng: 77.59, tier: 'restricted', biome: 'Tech Nexus', diff: [38, 30, 38, 52, 68, 34], pop: 68000000 }
    ]
  },
  cn: {
    name: 'China',
    geo: { lat: 35.86, lng: 104.2, flag: '🇨🇳', region: 'Asia' },
    accessTier: 'restricted',
    biome: 'Industrial Heartland',
    lore: 'Manufacturing superpower with advanced urban clusters and structured permit systems.',
    stats: {
      wealth: { monthly_usd: 1300, annual_usd: 15600 },
      language: { primary: 'Mandarin', others: [], test: 'HSK', level: 'HSK 4' },
      skills: { preferred: ['Manufacturing', 'Engineering', 'AI', 'Logistics'], degreeRequired: true },
      health: 'insurance_required',
      age: { min: null, max: null }
    },
    quests: [{ id: 'workpermit', type: 'hard', label: 'Z visa + work permit', detail: 'Employer sponsorship and permit class rating required.', options: [] }],
    difficulty: { overall: 56, cost: 46, security: 38, safety: 74, quality: 72, language: 78 },
    population: 1410000000,
    currency: 'CNY',
    children: [
      { id: 'cn-gd', name: 'Guangdong', lat: 23.13, lng: 113.26, tier: 'restricted', biome: 'Industrial Heartland', diff: [52, 44, 58, 68, 74, 74], pop: 126000000 },
      { id: 'cn-sh', name: 'Shanghai', lat: 31.23, lng: 121.47, tier: 'locked', biome: 'Financial Citadel', diff: [68, 72, 64, 76, 84, 80], pop: 25000000 }
    ]
  },
  fi: {
    name: 'Finland',
    geo: { lat: 61.92, lng: 25.75, flag: '🇫🇮', region: 'Europe' },
    accessTier: 'restricted',
    biome: 'Nordic Citadel',
    lore: 'High-trust Nordic state with strong tech and education outcomes and high living costs.',
    stats: {
      wealth: { monthly_usd: 2600, annual_usd: 31200 },
      language: { primary: 'Finnish', others: ['Swedish', 'English'], test: 'YKI', level: 'B1' },
      skills: { preferred: ['Tech', 'Education', 'Engineering', 'Healthcare'], degreeRequired: true },
      health: 'basic',
      age: { min: null, max: null }
    },
    quests: [{ id: 'residence', type: 'hard', label: 'Residence permit (work/study)', detail: 'Job contract or admission plus income support proof.', options: [] }],
    difficulty: { overall: 54, cost: 66, security: 50, safety: 88, quality: 90, language: 68 },
    population: 5600000,
    currency: 'EUR',
    children: [
      { id: 'fi-uus', name: 'Uusimaa', lat: 60.17, lng: 24.94, tier: 'restricted', biome: 'Tech Nexus', diff: [58, 72, 52, 88, 92, 66], pop: 1800000 },
      { id: 'fi-pir', name: 'Pirkanmaa', lat: 61.5, lng: 23.76, tier: 'restricted', biome: 'Cultural Heartland', diff: [48, 56, 48, 90, 88, 62], pop: 540000 }
    ]
  }
};

function makeChild(country, c) {
  const [overall, cost, accessStrain, safety, quality, language] = c.diff;
  const security = Math.max(0, Math.min(100, Math.round(100 - accessStrain)));
  const monthly = Math.round(country.stats.wealth.monthly_usd * (cost > 65 ? 1.15 : 0.9));
  return {
    id: c.id,
    name: c.name,
    level: 'state',
    parent: country.id,
    hasChildren: false,
    geo: { lat: c.lat, lng: c.lng, flag: '🏴', region: country.geo.region },
    accessTier: c.tier,
    biome: c.biome,
    lore: `${c.name} is a primary progression route within ${country.name}.`,
    stats: {
      wealth: { monthly_usd: monthly, annual_usd: monthly * 12 },
      language: country.stats.language,
      skills: country.stats.skills,
      health: country.stats.health,
      age: country.stats.age
    },
    quests: [
      { id: 'local_permit', type: 'hard', label: 'National pathway + local fit', detail: 'Most outcomes depend on national eligibility plus local labor demand.', options: [] }
    ],
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

  const childPayload = {
    meta: { schemaVersion: 2, parent: z.id },
    zones: cur.children.map(c => makeChild(z, c))
  };
  fs.writeFileSync(
    path.join(zonesDir, `${z.id}.json`),
    JSON.stringify(childPayload, null, 2) + '\n',
    'utf8'
  );
}

countries.meta.updatedAt = '2026-Q2';
fs.writeFileSync(countriesPath, JSON.stringify(countries, null, 2) + '\n', 'utf8');
console.log('Curated countries:', Object.keys(curated).join(', '));
