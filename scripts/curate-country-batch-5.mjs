import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  ke: {
    name: 'Kenya', geo: { lat: -0.02, lng: 37.91, flag: '🇰🇪', region: 'Africa' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'East African economic anchor with strong fintech, logistics, and regional trade connectivity.',
    stats: { wealth: { monthly_usd: 700, annual_usd: 8400 }, language: { primary: 'Swahili', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Fintech', 'Logistics', 'Agriculture', 'Healthcare'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work permit and residence process', detail: 'Employment permit categories and local registration required.', options: [] }],
    difficulty: { overall: 30, cost: 24, security: 70, safety: 54, quality: 58, language: 26 }, population: 55000000, currency: 'KES',
    children: [
      { id: 'ke-30', name: 'Nairobi County', lat: -1.286, lng: 36.817, tier: 'restricted', biome: 'Urban Megacity', diff: [40, 30, 34, 50, 64, 24], pop: 5000000 },
      { id: 'ke-28', name: 'Mombasa County', lat: -4.043, lng: 39.668, tier: 'open', biome: 'Coastal Haven', diff: [24, 18, 26, 58, 54, 28], pop: 1300000 }
    ]
  },
  tz: {
    name: 'Tanzania', geo: { lat: -6.37, lng: 34.89, flag: '🇹🇿', region: 'Africa' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'Large East African market with growing urban corridors and major logistics potential.',
    stats: { wealth: { monthly_usd: 500, annual_usd: 6000 }, language: { primary: 'Swahili', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Logistics', 'Agriculture', 'Tourism', 'Mining'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Work permit + residence permit', detail: 'Employer support and permit sequencing required.', options: [] }],
    difficulty: { overall: 26, cost: 16, security: 70, safety: 56, quality: 50, language: 30 }, population: 67000000, currency: 'TZS',
    children: [
      { id: 'tz-02', name: 'Dar es Salaam', lat: -6.792, lng: 39.208, tier: 'restricted', biome: 'Urban Megacity', diff: [34, 22, 34, 54, 56, 28], pop: 7000000 },
      { id: 'tz-01', name: 'Arusha', lat: -3.386, lng: 36.683, tier: 'open', biome: 'Steppe Frontier', diff: [20, 12, 24, 60, 48, 30], pop: 2200000 }
    ]
  },
  ug: {
    name: 'Uganda', geo: { lat: 1.37, lng: 32.29, flag: '🇺🇬', region: 'Africa' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'Fast-growing inland market with strong agricultural base and rising urban demand.',
    stats: { wealth: { monthly_usd: 450, annual_usd: 5400 }, language: { primary: 'English', others: ['Luganda', 'Swahili'], test: 'none', level: 'none' }, skills: { preferred: ['Agriculture', 'Trade', 'Healthcare', 'Education'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_visa', type: 'hard', label: 'Entry/work permit process', detail: 'Work permits require sponsor and immigration approvals.', options: [] }],
    difficulty: { overall: 24, cost: 14, security: 72, safety: 52, quality: 46, language: 24 }, population: 49000000, currency: 'UGX',
    children: [
      { id: 'ug-c', name: 'Kampala Capital', lat: 0.347, lng: 32.582, tier: 'open', biome: 'Cultural Heartland', diff: [30, 18, 30, 50, 50, 24], pop: 1900000 },
      { id: 'ug-w', name: 'Western Region', lat: -0.52, lng: 30.65, tier: 'open', biome: 'Steppe Frontier', diff: [18, 10, 22, 56, 44, 26], pop: 12000000 }
    ]
  },
  cm: {
    name: 'Cameroon', geo: { lat: 7.37, lng: 12.35, flag: '🇨🇲', region: 'Africa' }, accessTier: 'open', biome: 'Rainforest Enclave',
    lore: 'Resource-diverse economy linking West and Central Africa through transport and trade corridors.',
    stats: { wealth: { monthly_usd: 500, annual_usd: 6000 }, language: { primary: 'French', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Logistics', 'Energy', 'Agriculture', 'Construction'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work authorization and residency', detail: 'Employer-backed permits and local documentation required.', options: [] }],
    difficulty: { overall: 28, cost: 16, security: 70, safety: 46, quality: 48, language: 32 }, population: 28000000, currency: 'XAF',
    children: [
      { id: 'cm-ce', name: 'Centre Region', lat: 3.848, lng: 11.502, tier: 'open', biome: 'Cultural Heartland', diff: [34, 20, 32, 44, 52, 30], pop: 4500000 },
      { id: 'cm-lt', name: 'Littoral Region', lat: 4.05, lng: 9.7, tier: 'open', biome: 'Coastal Haven', diff: [22, 14, 26, 50, 46, 34], pop: 4200000 }
    ]
  },
  ci: {
    name: "Cote d'Ivoire", geo: { lat: 7.54, lng: -5.55, flag: '🇨🇮', region: 'Africa' }, accessTier: 'open', biome: 'Cultural Heartland',
    lore: 'Francophone West African growth hub with strong trade and agribusiness expansion.',
    stats: { wealth: { monthly_usd: 550, annual_usd: 6600 }, language: { primary: 'French', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Trade', 'Agribusiness', 'Construction', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Work and residence card process', detail: 'Entry and long-stay status typically tied to sponsor/employer.', options: [] }],
    difficulty: { overall: 26, cost: 16, security: 72, safety: 52, quality: 50, language: 34 }, population: 29000000, currency: 'XOF',
    children: [
      { id: 'ci-ab', name: 'Abidjan District', lat: 5.36, lng: -4.008, tier: 'restricted', biome: 'Urban Megacity', diff: [34, 22, 30, 50, 56, 32], pop: 6300000 },
      { id: 'ci-ym', name: 'Yamoussoukro District', lat: 6.827, lng: -5.289, tier: 'open', biome: 'Cultural Heartland', diff: [20, 12, 24, 56, 48, 34], pop: 400000 }
    ]
  },
  sn: {
    name: 'Senegal', geo: { lat: 14.5, lng: -14.45, flag: '🇸🇳', region: 'Africa' }, accessTier: 'open', biome: 'Cultural Heartland',
    lore: 'Stable Atlantic gateway with growing digital services and regional trade relevance.',
    stats: { wealth: { monthly_usd: 550, annual_usd: 6600 }, language: { primary: 'French', others: ['Wolof'], test: 'none', level: 'none' }, skills: { preferred: ['Trade', 'Services', 'Logistics', 'Fisheries'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_permit', type: 'hard', label: 'Professional visa and registration', detail: 'Employer-backed documentation generally required.', options: [] }],
    difficulty: { overall: 24, cost: 14, security: 74, safety: 62, quality: 52, language: 34 }, population: 18000000, currency: 'XOF',
    children: [
      { id: 'sn-dk', name: 'Dakar Region', lat: 14.692, lng: -17.446, tier: 'restricted', biome: 'Urban Megacity', diff: [32, 20, 30, 60, 58, 32], pop: 4000000 },
      { id: 'sn-th', name: 'Thies Region', lat: 14.788, lng: -16.926, tier: 'open', biome: 'Cultural Heartland', diff: [18, 10, 22, 64, 50, 34], pop: 2200000 }
    ]
  },
  do: {
    name: 'Dominican Republic', geo: { lat: 18.74, lng: -70.16, flag: '🇩🇴', region: 'Americas' }, accessTier: 'open', biome: 'Tropical Sanctuary',
    lore: 'Caribbean services and tourism economy with growing nearshore business operations.',
    stats: { wealth: { monthly_usd: 900, annual_usd: 10800 }, language: { primary: 'Spanish', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'BPO', 'Logistics', 'Healthcare'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residency', type: 'hard', label: 'Temporary residence pathways', detail: 'Work, investor, and pensioner routes available with documentation.', options: [] }],
    difficulty: { overall: 32, cost: 28, security: 72, safety: 56, quality: 62, language: 36 }, population: 11400000, currency: 'DOP',
    children: [
      { id: 'do-01', name: 'National District', lat: 18.486, lng: -69.931, tier: 'restricted', biome: 'Urban Megacity', diff: [40, 34, 32, 54, 66, 34], pop: 1200000 },
      { id: 'do-11', name: 'Puerto Plata', lat: 19.79, lng: -70.69, tier: 'open', biome: 'Coastal Haven', diff: [24, 20, 24, 60, 58, 38], pop: 450000 }
    ]
  },
  ec: {
    name: 'Ecuador', geo: { lat: -1.83, lng: -78.18, flag: '🇪🇨', region: 'Americas' }, accessTier: 'open', biome: 'Rainforest Enclave',
    lore: 'Dollarized Andean economy with manageable costs and diverse climate/economic zones.',
    stats: { wealth: { monthly_usd: 850, annual_usd: 10200 }, language: { primary: 'Spanish', others: ['Quechua'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'Agriculture', 'Logistics', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'visa', type: 'hard', label: 'Temporary residency categories', detail: 'Work, professional, or investment visas are common routes.', options: [] }],
    difficulty: { overall: 28, cost: 24, security: 72, safety: 52, quality: 58, language: 38 }, population: 18000000, currency: 'USD',
    children: [
      { id: 'ec-p', name: 'Pichincha', lat: -0.181, lng: -78.467, tier: 'restricted', biome: 'Mountain Stronghold', diff: [36, 30, 30, 50, 62, 36], pop: 3300000 },
      { id: 'ec-g', name: 'Guayas', lat: -2.17, lng: -79.922, tier: 'open', biome: 'Coastal Haven', diff: [22, 18, 24, 54, 56, 40], pop: 4300000 }
    ]
  },
  gt: {
    name: 'Guatemala', geo: { lat: 15.78, lng: -90.23, flag: '🇬🇹', region: 'Americas' }, accessTier: 'open', biome: 'Cultural Heartland',
    lore: 'Central American economy with expanding manufacturing and services opportunities.',
    stats: { wealth: { monthly_usd: 700, annual_usd: 8400 }, language: { primary: 'Spanish', others: ['Mayan languages'], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'Agriculture', 'Trade', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Residency and work authorization', detail: 'Long-stay work routes generally require sponsor-backed filings.', options: [] }],
    difficulty: { overall: 30, cost: 20, security: 72, safety: 42, quality: 50, language: 40 }, population: 18000000, currency: 'GTQ',
    children: [
      { id: 'gt-gu', name: 'Guatemala Department', lat: 14.634, lng: -90.506, tier: 'restricted', biome: 'Urban Megacity', diff: [38, 26, 30, 40, 56, 38], pop: 3800000 },
      { id: 'gt-sa', name: 'Sacatepequez', lat: 14.56, lng: -90.734, tier: 'open', biome: 'Cultural Heartland', diff: [22, 14, 24, 48, 52, 40], pop: 380000 }
    ]
  },
  hn: {
    name: 'Honduras', geo: { lat: 15.2, lng: -86.24, flag: '🇭🇳', region: 'Americas' }, accessTier: 'open', biome: 'Tropical Sanctuary',
    lore: 'Central American market with expanding manufacturing corridors and service-sector growth.',
    stats: { wealth: { monthly_usd: 650, annual_usd: 7800 }, language: { primary: 'Spanish', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'Agriculture', 'Logistics', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residency', type: 'hard', label: 'Residence and work authorization route', detail: 'Employer-backed documents and long-stay registration required.', options: [] }],
    difficulty: { overall: 30, cost: 18, security: 72, safety: 40, quality: 48, language: 38 }, population: 11000000, currency: 'HNL',
    children: [
      { id: 'hn-fm', name: 'Francisco Morazan', lat: 14.072, lng: -87.192, tier: 'open', biome: 'Cultural Heartland', diff: [34, 22, 30, 38, 52, 36], pop: 1700000 },
      { id: 'hn-cr', name: 'Cortes', lat: 15.5, lng: -88.03, tier: 'open', biome: 'Industrial Heartland', diff: [24, 14, 24, 44, 48, 40], pop: 2100000 }
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
    quests: [{ id: 'local_path', type: 'hard', label: 'National pathway + local setup', detail: 'Local demand, docs, and settlement friction determine onboarding speed.', options: [] }],
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
