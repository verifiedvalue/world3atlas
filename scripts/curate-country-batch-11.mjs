import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  bf: {
    name: 'Burkina Faso', geo: { lat: 12.24, lng: -1.56, flag: '🇧🇫', region: 'Africa' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'Sahelian economy with agriculture-led fundamentals and rising urban trade activity.',
    stats: { wealth: { monthly_usd: 350, annual_usd: 4200 }, language: { primary: 'French', others: ['Mossi'], test: 'none', level: 'none' }, skills: { preferred: ['Agriculture', 'Trade', 'Logistics', 'Public Health'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work permit and local registration', detail: 'Employer-backed paperwork and legal registration required for long-term work.', options: [] }],
    difficulty: { overall: 30, cost: 10, security: 70, safety: 48, quality: 38, language: 44 }, population: 23000000, currency: 'XOF',
    children: [
      { id: 'bf-kad', name: 'Kadiogo', lat: 12.37, lng: -1.53, tier: 'open', biome: 'Urban Outpost', diff: [36, 14, 34, 46, 42, 42], pop: 3000000 },
      { id: 'bf-hou', name: 'Houet', lat: 11.18, lng: -4.3, tier: 'open', biome: 'Steppe Frontier', diff: [22, 8, 24, 52, 34, 46], pop: 1800000 }
    ]
  },
  bi: {
    name: 'Burundi', geo: { lat: -3.37, lng: 29.92, flag: '🇧🇮', region: 'Africa' }, accessTier: 'open', biome: 'Highland Frontier',
    lore: 'Densely populated Great Lakes state with agriculture and trade-centered local economies.',
    stats: { wealth: { monthly_usd: 300, annual_usd: 3600 }, language: { primary: 'Kirundi', others: ['French', 'English'], test: 'none', level: 'none' }, skills: { preferred: ['Agriculture', 'Trade', 'Public Health', 'Education'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'entry', type: 'hard', label: 'Residence/work authorization process', detail: 'Long-stay status generally depends on documented work or business purpose.', options: [] }],
    difficulty: { overall: 28, cost: 8, security: 72, safety: 50, quality: 34, language: 36 }, population: 13000000, currency: 'BIF',
    children: [
      { id: 'bi-bj', name: 'Bujumbura Mairie', lat: -3.38, lng: 29.36, tier: 'open', biome: 'Urban Outpost', diff: [34, 10, 32, 48, 36, 34], pop: 1100000 },
      { id: 'bi-gi', name: 'Gitega Province', lat: -3.42, lng: 29.93, tier: 'open', biome: 'Highland Frontier', diff: [20, 6, 22, 52, 30, 38], pop: 1000000 }
    ]
  },
  bj: {
    name: 'Benin', geo: { lat: 9.31, lng: 2.32, flag: '🇧🇯', region: 'Africa' }, accessTier: 'open', biome: 'Cultural Heartland',
    lore: 'West African coastal economy with trade, agriculture, and logistics opportunities.',
    stats: { wealth: { monthly_usd: 450, annual_usd: 5400 }, language: { primary: 'French', others: ['Fon'], test: 'none', level: 'none' }, skills: { preferred: ['Trade', 'Logistics', 'Agriculture', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work/residence permit pathway', detail: 'Employer or business-backed legal stay documents are typically required.', options: [] }],
    difficulty: { overall: 26, cost: 12, security: 76, safety: 58, quality: 44, language: 38 }, population: 14000000, currency: 'XOF',
    children: [
      { id: 'bj-aq', name: 'Littoral (Cotonou)', lat: 6.37, lng: 2.43, tier: 'open', biome: 'Coastal Haven', diff: [32, 16, 28, 56, 48, 36], pop: 1000000 },
      { id: 'bj-bo', name: 'Borgou', lat: 9.34, lng: 2.63, tier: 'open', biome: 'Steppe Frontier', diff: [18, 8, 20, 60, 40, 40], pop: 1200000 }
    ]
  },
  bn: {
    name: 'Brunei', geo: { lat: 4.54, lng: 114.73, flag: '🇧🇳', region: 'Asia' }, accessTier: 'restricted', biome: 'Tropical Sanctuary',
    lore: 'High-income microstate with hydrocarbon-backed economy and strict labor governance.',
    stats: { wealth: { monthly_usd: 2600, annual_usd: 31200 }, language: { primary: 'Malay', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Public Services', 'Finance', 'Logistics'], degreeRequired: false }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'employment_pass', type: 'hard', label: 'Employment pass and sponsor approvals', detail: 'Most foreign workers require employer-sponsored permit routes.', options: [] }],
    difficulty: { overall: 50, cost: 56, security: 42, safety: 90, quality: 80, language: 24 }, population: 450000, currency: 'BND',
    children: [
      { id: 'bn-bm', name: 'Brunei-Muara', lat: 4.94, lng: 114.95, tier: 'restricted', biome: 'Urban Outpost', diff: [56, 62, 62, 90, 82, 22], pop: 320000 },
      { id: 'bn-bs', name: 'Belait', lat: 4.58, lng: 114.17, tier: 'open', biome: 'Industrial Heartland', diff: [38, 42, 46, 92, 76, 26], pop: 73000 }
    ]
  },
  bs: {
    name: 'Bahamas', geo: { lat: 25.03, lng: -77.4, flag: '🇧🇸', region: 'Americas' }, accessTier: 'restricted', biome: 'Island Sanctuary',
    lore: 'Tourism and offshore-finance-driven island economy with high import-linked costs.',
    stats: { wealth: { monthly_usd: 2400, annual_usd: 28800 }, language: { primary: 'English', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'Hospitality', 'Finance', 'Marine Services'], degreeRequired: false }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'work_permit', type: 'hard', label: 'Employer-led work permit', detail: 'Long-stay work requires sponsorship and permit approvals.', options: [] }],
    difficulty: { overall: 48, cost: 68, security: 54, safety: 76, quality: 74, language: 12 }, population: 410000, currency: 'BSD',
    children: [
      { id: 'bs-np', name: 'New Providence', lat: 25.04, lng: -77.35, tier: 'restricted', biome: 'Urban Outpost', diff: [56, 78, 50, 74, 78, 10], pop: 300000 },
      { id: 'bs-gb', name: 'Grand Bahama', lat: 26.54, lng: -78.7, tier: 'open', biome: 'Coastal Haven', diff: [34, 52, 34, 78, 70, 14], pop: 52000 }
    ]
  },
  bt: {
    name: 'Bhutan', geo: { lat: 27.51, lng: 90.43, flag: '🇧🇹', region: 'Asia' }, accessTier: 'restricted', biome: 'Mountain Stronghold',
    lore: 'Small Himalayan state with tightly managed tourism and conservative migration policy.',
    stats: { wealth: { monthly_usd: 900, annual_usd: 10800 }, language: { primary: 'Dzongkha', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Hydropower', 'Public Services', 'Tourism', 'Education'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'restricted_entry', type: 'hard', label: 'Restricted long-stay pathways', detail: 'Employment and residency routes are selective and policy-controlled.', options: [] }],
    difficulty: { overall: 52, cost: 34, security: 34, safety: 88, quality: 72, language: 46 }, population: 790000, currency: 'BTN',
    children: [
      { id: 'bt-15', name: 'Thimphu', lat: 27.47, lng: 89.64, tier: 'restricted', biome: 'Urban Outpost', diff: [58, 38, 70, 88, 74, 44], pop: 150000 },
      { id: 'bt-11', name: 'Paro', lat: 27.43, lng: 89.42, tier: 'open', biome: 'Mountain Stronghold', diff: [40, 26, 54, 90, 70, 48], pop: 46000 }
    ]
  },
  bz: {
    name: 'Belize', geo: { lat: 17.19, lng: -88.5, flag: '🇧🇿', region: 'Americas' }, accessTier: 'open', biome: 'Rainforest Enclave',
    lore: 'English-speaking Central American economy with tourism and expat-friendly pathways.',
    stats: { wealth: { monthly_usd: 1200, annual_usd: 14400 }, language: { primary: 'English', others: ['Spanish'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'Hospitality', 'Marine Services', 'Agriculture'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Residence permit pathways', detail: 'Employment and retirement routes exist with local documentation.', options: [] }],
    difficulty: { overall: 34, cost: 40, security: 70, safety: 62, quality: 60, language: 10 }, population: 420000, currency: 'BZD',
    children: [
      { id: 'bz-bz', name: 'Belize District', lat: 17.5, lng: -88.2, tier: 'restricted', biome: 'Coastal Haven', diff: [42, 48, 34, 60, 64, 8], pop: 110000 },
      { id: 'bz-cy', name: 'Cayo District', lat: 17.15, lng: -89.07, tier: 'open', biome: 'Rainforest Enclave', diff: [26, 30, 24, 66, 56, 12], pop: 100000 }
    ]
  },
  cf: {
    name: 'Central African Republic', geo: { lat: 6.61, lng: 20.94, flag: '🇨🇫', region: 'Africa' }, accessTier: 'fortress', biome: 'Rainforest Enclave',
    lore: 'Fragile governance context with severe security and logistics constraints.',
    stats: { wealth: { monthly_usd: 300, annual_usd: 3600 }, language: { primary: 'French/Sango', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Humanitarian', 'Public Health', 'Logistics', 'Peacebuilding'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'risk', type: 'hard', label: 'Severe security and access constraints', detail: 'Operational movement and long-stay activity can be heavily restricted.', options: [] }],
    difficulty: { overall: 97, cost: 6, security: 8, safety: 4, quality: 12, language: 42 }, population: 5500000, currency: 'XAF',
    children: [
      { id: 'cf-bgf', name: 'Bangui', lat: 4.37, lng: 18.56, tier: 'fortress', biome: 'Urban Outpost', diff: [98, 8, 94, 4, 14, 40], pop: 900000 },
      { id: 'cf-ou', name: 'Ouaka', lat: 6.32, lng: 20.71, tier: 'fortress', biome: 'Rainforest Enclave', diff: [96, 4, 90, 5, 10, 44], pop: 280000 }
    ]
  },
  dj: {
    name: 'Djibouti', geo: { lat: 11.83, lng: 42.59, flag: '🇩🇯', region: 'Africa' }, accessTier: 'restricted', biome: 'Desert Outpost',
    lore: 'Strategic Red Sea chokepoint economy centered on ports, bases, and logistics.',
    stats: { wealth: { monthly_usd: 1500, annual_usd: 18000 }, language: { primary: 'French/Arabic', others: ['Afar', 'Somali'], test: 'none', level: 'none' }, skills: { preferred: ['Logistics', 'Port Operations', 'Defense Services', 'Trade'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work visa and residence permit', detail: 'Long-term employment is typically sponsor-linked.', options: [] }],
    difficulty: { overall: 42, cost: 58, security: 54, safety: 70, quality: 60, language: 34 }, population: 1100000, currency: 'DJF',
    children: [
      { id: 'dj-dj', name: 'Djibouti City', lat: 11.59, lng: 43.15, tier: 'restricted', biome: 'Urban Outpost', diff: [48, 66, 50, 68, 64, 32], pop: 620000 },
      { id: 'dj-ta', name: 'Tadjourah Region', lat: 11.79, lng: 42.88, tier: 'open', biome: 'Desert Outpost', diff: [30, 42, 34, 74, 54, 36], pop: 100000 }
    ]
  },
  er: {
    name: 'Eritrea', geo: { lat: 15.18, lng: 39.78, flag: '🇪🇷', region: 'Africa' }, accessTier: 'fortress', biome: 'Desert Outpost',
    lore: 'Highly restricted policy environment with limited external labor mobility pathways.',
    stats: { wealth: { monthly_usd: 350, annual_usd: 4200 }, language: { primary: 'Tigrinya', others: ['Arabic', 'English'], test: 'none', level: 'none' }, skills: { preferred: ['Public Services', 'Logistics', 'Agriculture', 'Healthcare'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'restricted', type: 'hard', label: 'Highly restricted entry framework', detail: 'Long-stay and work authorizations are limited and policy-constrained.', options: [] }],
    difficulty: { overall: 94, cost: 12, security: 10, safety: 18, quality: 18, language: 44 }, population: 3600000, currency: 'ERN',
    children: [
      { id: 'er-ma', name: 'Maekel Region', lat: 15.33, lng: 38.93, tier: 'fortress', biome: 'Urban Outpost', diff: [96, 14, 92, 16, 20, 42], pop: 700000 },
      { id: 'er-an', name: 'Anseba Region', lat: 16.47, lng: 37.42, tier: 'fortress', biome: 'Desert Outpost', diff: [92, 10, 88, 20, 16, 46], pop: 500000 }
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
    quests: [{ id: 'local_path', type: 'hard', label: 'National pathway + local settlement', detail: 'Local permits, safety, and labor demand shape progression speed.', options: [] }],
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

for (const id of Object.keys(curated)) {
  if (countries.zones.some(z => z.id === id)) continue;
  const cur = curated[id];
  const newCountry = {
    id,
    name: cur.name,
    level: 'country',
    parent: null,
    hasChildren: true,
    childrenFile: id,
    geo: cur.geo,
    accessTier: cur.accessTier,
    biome: cur.biome,
    lore: cur.lore,
    stats: cur.stats,
    quests: cur.quests,
    difficulty: cur.difficulty,
    population: cur.population,
    currency: cur.currency
  };
  countries.zones.push(newCountry);
  const payload = { meta: { schemaVersion: 2, parent: id }, zones: cur.children.map(c => makeChild(newCountry, c)) };
  fs.writeFileSync(path.join(zonesDir, `${id}.json`), JSON.stringify(payload, null, 2) + '\n', 'utf8');
}

countries.meta.updatedAt = '2026-Q2';
fs.writeFileSync(countriesPath, JSON.stringify(countries, null, 2) + '\n', 'utf8');
console.log('Curated countries:', Object.keys(curated).join(', '));
