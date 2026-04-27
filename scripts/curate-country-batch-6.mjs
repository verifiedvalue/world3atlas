import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  pa: {
    name: 'Panama', geo: { lat: 8.54, lng: -80.78, flag: '🇵🇦', region: 'Americas' }, accessTier: 'open', biome: 'Canal Crossroads',
    lore: 'Dollarized logistics hub centered on canal trade and regional finance/services.',
    stats: { wealth: { monthly_usd: 1300, annual_usd: 15600 }, language: { primary: 'Spanish', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Logistics', 'Finance', 'Tourism', 'Trade'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residency', type: 'hard', label: 'Friendly Nations / work permit pathways', detail: 'Several visa classes exist with differing economic and sponsorship requirements.', options: [] }],
    difficulty: { overall: 34, cost: 40, security: 70, safety: 62, quality: 70, language: 34 }, population: 4500000, currency: 'USD',
    children: [
      { id: 'pa-8', name: 'Panama Province', lat: 8.98, lng: -79.52, tier: 'restricted', biome: 'Urban Megacity', diff: [44, 50, 36, 58, 74, 32], pop: 2100000 },
      { id: 'pa-2', name: 'Cocle', lat: 8.47, lng: -80.36, tier: 'open', biome: 'Tropical Sanctuary', diff: [24, 30, 24, 66, 64, 36], pop: 290000 }
    ]
  },
  ni: {
    name: 'Nicaragua', geo: { lat: 12.87, lng: -85.21, flag: '🇳🇮', region: 'Americas' }, accessTier: 'open', biome: 'Tropical Sanctuary',
    lore: 'Low-cost Central American route with agriculture, trade, and small services sectors.',
    stats: { wealth: { monthly_usd: 550, annual_usd: 6600 }, language: { primary: 'Spanish', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Agriculture', 'Trade', 'Tourism', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Temporary residence and work authorization', detail: 'Long-stay routes generally require local sponsor/business documentation.', options: [] }],
    difficulty: { overall: 26, cost: 16, security: 74, safety: 42, quality: 46, language: 38 }, population: 7000000, currency: 'NIO',
    children: [
      { id: 'ni-mn', name: 'Managua', lat: 12.114, lng: -86.236, tier: 'open', biome: 'Urban Megacity', diff: [34, 20, 30, 40, 50, 36], pop: 1100000 },
      { id: 'ni-ri', name: 'Rivas', lat: 11.4, lng: -85.83, tier: 'open', biome: 'Coastal Haven', diff: [18, 10, 22, 46, 44, 40], pop: 190000 }
    ]
  },
  sv: {
    name: 'El Salvador', geo: { lat: 13.79, lng: -88.9, flag: '🇸🇻', region: 'Americas' }, accessTier: 'open', biome: 'Volcanic Frontier',
    lore: 'Compact economy with growing services and digital-finance ambitions.',
    stats: { wealth: { monthly_usd: 850, annual_usd: 10200 }, language: { primary: 'Spanish', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Services', 'Logistics', 'Tech', 'Manufacturing'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_status', type: 'hard', label: 'Temporary residence + work permit', detail: 'Employer-backed residence categories are typical for long-term work.', options: [] }],
    difficulty: { overall: 34, cost: 24, security: 72, safety: 36, quality: 52, language: 36 }, population: 6400000, currency: 'USD',
    children: [
      { id: 'sv-sa', name: 'San Salvador', lat: 13.693, lng: -89.218, tier: 'restricted', biome: 'Urban Megacity', diff: [42, 30, 32, 32, 56, 34], pop: 1700000 },
      { id: 'sv-li', name: 'La Libertad', lat: 13.49, lng: -89.32, tier: 'open', biome: 'Coastal Haven', diff: [26, 18, 24, 40, 50, 36], pop: 900000 }
    ]
  },
  bo: {
    name: 'Bolivia', geo: { lat: -16.29, lng: -63.59, flag: '🇧🇴', region: 'Americas' }, accessTier: 'open', biome: 'Highland Frontier',
    lore: 'Andean interior economy with low costs and growing urban service nodes.',
    stats: { wealth: { monthly_usd: 600, annual_usd: 7200 }, language: { primary: 'Spanish', others: ['Quechua', 'Aymara'], test: 'none', level: 'none' }, skills: { preferred: ['Mining', 'Agriculture', 'Trade', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residency', type: 'hard', label: 'Temporary residence categories', detail: 'Work and business pathways available with local documentation.', options: [] }],
    difficulty: { overall: 24, cost: 12, security: 76, safety: 48, quality: 44, language: 40 }, population: 12400000, currency: 'BOB',
    children: [
      { id: 'bo-l', name: 'La Paz Department', lat: -16.5, lng: -68.15, tier: 'open', biome: 'Mountain Stronghold', diff: [30, 16, 28, 46, 48, 38], pop: 3200000 },
      { id: 'bo-s', name: 'Santa Cruz Department', lat: -17.79, lng: -63.18, tier: 'open', biome: 'Steppe Frontier', diff: [20, 10, 20, 50, 42, 40], pop: 3700000 }
    ]
  },
  py: {
    name: 'Paraguay', geo: { lat: -23.44, lng: -58.44, flag: '🇵🇾', region: 'Americas' }, accessTier: 'open', biome: 'River Frontier',
    lore: 'Low-tax, low-cost inland economy with straightforward residence pathways.',
    stats: { wealth: { monthly_usd: 700, annual_usd: 8400 }, language: { primary: 'Spanish', others: ['Guarani'], test: 'none', level: 'none' }, skills: { preferred: ['Agribusiness', 'Trade', 'Services', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Temporary/permanent residence process', detail: 'Common pathways include economic activity and local compliance docs.', options: [] }],
    difficulty: { overall: 24, cost: 12, security: 78, safety: 56, quality: 48, language: 36 }, population: 6900000, currency: 'PYG',
    children: [
      { id: 'py-asu', name: 'Asuncion', lat: -25.264, lng: -57.575, tier: 'open', biome: 'Cultural Heartland', diff: [30, 16, 26, 54, 52, 34], pop: 520000 },
      { id: 'py-ca', name: 'Central Department', lat: -25.35, lng: -57.5, tier: 'open', biome: 'River Frontier', diff: [18, 10, 18, 58, 46, 38], pop: 2200000 }
    ]
  },
  uy: {
    name: 'Uruguay', geo: { lat: -32.52, lng: -55.77, flag: '🇺🇾', region: 'Americas' }, accessTier: 'restricted', biome: 'Coastal Haven',
    lore: 'Stable, high-governance South American option with comparatively strong institutions.',
    stats: { wealth: { monthly_usd: 1700, annual_usd: 20400 }, language: { primary: 'Spanish', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Services', 'Tech', 'Agribusiness', 'Finance'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Legal residence and cédula process', detail: 'Economic proof and local registration support long-term residence.', options: [] }],
    difficulty: { overall: 40, cost: 52, security: 66, safety: 80, quality: 78, language: 34 }, population: 3500000, currency: 'UYU',
    children: [
      { id: 'uy-mo', name: 'Montevideo', lat: -34.901, lng: -56.164, tier: 'restricted', biome: 'Urban Megacity', diff: [48, 62, 38, 78, 82, 32], pop: 1400000 },
      { id: 'uy-ca', name: 'Canelones', lat: -34.52, lng: -56.28, tier: 'open', biome: 'Coastal Haven', diff: [28, 40, 28, 82, 74, 36], pop: 600000 }
    ]
  },
  ve: {
    name: 'Venezuela', geo: { lat: 6.42, lng: -66.59, flag: '🇻🇪', region: 'Americas' }, accessTier: 'fortress', biome: 'Border Territory',
    lore: 'Resource-rich nation facing severe economic and governance instability in recent years.',
    stats: { wealth: { monthly_usd: 500, annual_usd: 6000 }, language: { primary: 'Spanish', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Healthcare', 'Humanitarian', 'Logistics'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'risk', type: 'hard', label: 'High-risk operating environment', detail: 'Entry, safety, and legal processes can be volatile and highly context-dependent.', options: [] }],
    difficulty: { overall: 90, cost: 18, security: 16, safety: 18, quality: 24, language: 38 }, population: 28000000, currency: 'VES',
    children: [
      { id: 've-dc', name: 'Capital District', lat: 10.48, lng: -66.9, tier: 'fortress', biome: 'Urban Megacity', diff: [94, 20, 88, 16, 26, 36], pop: 2100000 },
      { id: 've-z', name: 'Zulia', lat: 10.65, lng: -71.64, tier: 'fortress', biome: 'Industrial Heartland', diff: [86, 16, 80, 20, 22, 40], pop: 4100000 }
    ]
  },
  jm: {
    name: 'Jamaica', geo: { lat: 18.11, lng: -77.3, flag: '🇯🇲', region: 'Americas' }, accessTier: 'open', biome: 'Island Sanctuary',
    lore: 'Tourism and services-led Caribbean economy with strong cultural export influence.',
    stats: { wealth: { monthly_usd: 1100, annual_usd: 13200 }, language: { primary: 'English', others: ['Jamaican Patois'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'BPO', 'Logistics', 'Creative Industries'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work permit and residence permission', detail: 'Long-term work generally requires employer-backed permits.', options: [] }],
    difficulty: { overall: 34, cost: 38, security: 70, safety: 50, quality: 60, language: 12 }, population: 2800000, currency: 'JMD',
    children: [
      { id: 'jm-01', name: 'Kingston', lat: 17.971, lng: -76.793, tier: 'restricted', biome: 'Urban Megacity', diff: [42, 46, 34, 46, 64, 10], pop: 670000 },
      { id: 'jm-06', name: 'Saint Ann', lat: 18.41, lng: -77.2, tier: 'open', biome: 'Coastal Haven', diff: [26, 30, 24, 54, 56, 14], pop: 170000 }
    ]
  },
  tt: {
    name: 'Trinidad and Tobago', geo: { lat: 10.69, lng: -61.22, flag: '🇹🇹', region: 'Americas' }, accessTier: 'restricted', biome: 'Island Outpost',
    lore: 'Energy-rich Caribbean economy with concentrated urban-industrial activity.',
    stats: { wealth: { monthly_usd: 1600, annual_usd: 19200 }, language: { primary: 'English', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Manufacturing', 'Logistics', 'Finance'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work permit route', detail: 'Employer sponsorship and permit approvals required for non-citizen employment.', options: [] }],
    difficulty: { overall: 40, cost: 48, security: 64, safety: 58, quality: 66, language: 10 }, population: 1500000, currency: 'TTD',
    children: [
      { id: 'tt-pos', name: 'Port of Spain', lat: 10.66, lng: -61.52, tier: 'restricted', biome: 'Financial Citadel', diff: [48, 56, 40, 56, 70, 8], pop: 37000 },
      { id: 'tt-sfo', name: 'San Fernando', lat: 10.28, lng: -61.46, tier: 'open', biome: 'Industrial Heartland', diff: [30, 38, 30, 60, 62, 12], pop: 48000 }
    ]
  },
  cu: {
    name: 'Cuba', geo: { lat: 21.52, lng: -77.78, flag: '🇨🇺', region: 'Americas' }, accessTier: 'restricted', biome: 'Island Sanctuary',
    lore: 'Large Caribbean island economy with strong healthcare and tourism systems under unique regulatory structure.',
    stats: { wealth: { monthly_usd: 700, annual_usd: 8400 }, language: { primary: 'Spanish', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Healthcare', 'Tourism', 'Education', 'Agriculture'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'entry', type: 'hard', label: 'Entry and long-stay authorization', detail: 'Residency and work routes are tightly regulated and context-specific.', options: [] }],
    difficulty: { overall: 42, cost: 22, security: 48, safety: 68, quality: 64, language: 36 }, population: 11100000, currency: 'CUP',
    children: [
      { id: 'cu-03', name: 'Havana', lat: 23.113, lng: -82.366, tier: 'restricted', biome: 'Urban Megacity', diff: [50, 26, 58, 66, 70, 34], pop: 2100000 },
      { id: 'cu-14', name: 'Santiago de Cuba', lat: 20.02, lng: -75.82, tier: 'open', biome: 'Cultural Heartland', diff: [34, 18, 44, 70, 60, 38], pop: 1000000 }
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
    quests: [{ id: 'local_path', type: 'hard', label: 'National pathway + local settlement', detail: 'Local labor demand and compliance shape early progression.', options: [] }],
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
