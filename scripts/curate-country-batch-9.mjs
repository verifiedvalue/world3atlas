import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  ao: {
    name: 'Angola', geo: { lat: -11.2, lng: 17.87, flag: '🇦🇴', region: 'Africa' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'Oil and resource-linked economy with growing logistics and urban service sectors.',
    stats: { wealth: { monthly_usd: 900, annual_usd: 10800 }, language: { primary: 'Portuguese', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Construction', 'Logistics', 'Trade'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work visa and residence permit', detail: 'Employer-backed status and registration are required for long-term work.', options: [] }],
    difficulty: { overall: 36, cost: 34, security: 64, safety: 50, quality: 52, language: 46 }, population: 36000000, currency: 'AOA',
    children: [
      { id: 'ao-lua', name: 'Luanda Province', lat: -8.83, lng: 13.24, tier: 'restricted', biome: 'Urban Megacity', diff: [46, 46, 40, 46, 58, 44], pop: 9500000 },
      { id: 'ao-bgo', name: 'Bengo Province', lat: -8.9, lng: 13.9, tier: 'open', biome: 'Coastal Haven', diff: [26, 24, 30, 56, 48, 48], pop: 450000 }
    ]
  },
  mz: {
    name: 'Mozambique', geo: { lat: -18.67, lng: 35.53, flag: '🇲🇿', region: 'Africa' }, accessTier: 'open', biome: 'Coastal Frontier',
    lore: 'Indian Ocean corridor with major natural gas, port, and agriculture potential.',
    stats: { wealth: { monthly_usd: 500, annual_usd: 6000 }, language: { primary: 'Portuguese', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Logistics', 'Energy', 'Agriculture', 'Tourism'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'entry', type: 'hard', label: 'Work authorization and local registration', detail: 'Foreign work generally requires sponsor-backed permit flows.', options: [] }],
    difficulty: { overall: 28, cost: 16, security: 70, safety: 46, quality: 44, language: 50 }, population: 34000000, currency: 'MZN',
    children: [
      { id: 'mz-mpm', name: 'Maputo City', lat: -25.97, lng: 32.58, tier: 'open', biome: 'Urban Megacity', diff: [34, 20, 32, 44, 50, 48], pop: 1200000 },
      { id: 'mz-nmp', name: 'Nampula Province', lat: -15.12, lng: 39.27, tier: 'open', biome: 'Coastal Frontier', diff: [20, 12, 24, 50, 40, 52], pop: 6400000 }
    ]
  },
  mg: {
    name: 'Madagascar', geo: { lat: -18.77, lng: 46.87, flag: '🇲🇬', region: 'Africa' }, accessTier: 'open', biome: 'Island Sanctuary',
    lore: 'Large island ecosystem with agriculture, tourism, and resource opportunities under infrastructure constraints.',
    stats: { wealth: { monthly_usd: 400, annual_usd: 4800 }, language: { primary: 'Malagasy', others: ['French'], test: 'none', level: 'none' }, skills: { preferred: ['Agriculture', 'Tourism', 'Mining', 'Trade'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Long-stay visa + work permit', detail: 'Business and employment status need permit and registration follow-through.', options: [] }],
    difficulty: { overall: 24, cost: 10, security: 74, safety: 52, quality: 40, language: 54 }, population: 30000000, currency: 'MGA',
    children: [
      { id: 'mg-t', name: 'Analamanga', lat: -18.88, lng: 47.51, tier: 'open', biome: 'Urban Megacity', diff: [30, 14, 28, 50, 44, 52], pop: 4000000 },
      { id: 'mg-d', name: 'Diana', lat: -12.28, lng: 49.29, tier: 'open', biome: 'Coastal Haven', diff: [18, 8, 22, 56, 38, 56], pop: 1000000 }
    ]
  },
  cd: {
    name: 'Democratic Republic of the Congo', geo: { lat: -2.88, lng: 23.66, flag: '🇨🇩', region: 'Africa' }, accessTier: 'fortress', biome: 'Rainforest Enclave',
    lore: 'Resource-rich but highly challenging operational environment with major regional variability.',
    stats: { wealth: { monthly_usd: 450, annual_usd: 5400 }, language: { primary: 'French', others: ['Lingala', 'Swahili'], test: 'none', level: 'none' }, skills: { preferred: ['Mining', 'Humanitarian', 'Logistics', 'Public Health'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'risk', type: 'hard', label: 'High-risk entry and mobility constraints', detail: 'Security and compliance conditions vary sharply by province.', options: [] }],
    difficulty: { overall: 94, cost: 10, security: 12, safety: 8, quality: 20, language: 40 }, population: 111000000, currency: 'CDF',
    children: [
      { id: 'cd-kn', name: 'Kinshasa', lat: -4.44, lng: 15.27, tier: 'fortress', biome: 'Urban Megacity', diff: [96, 12, 90, 8, 24, 38], pop: 17000000 },
      { id: 'cd-hk', name: 'Haut-Katanga', lat: -11.66, lng: 27.48, tier: 'fortress', biome: 'Industrial Heartland', diff: [90, 8, 84, 12, 18, 42], pop: 9000000 }
    ]
  },
  cg: {
    name: 'Republic of the Congo', geo: { lat: -0.23, lng: 15.83, flag: '🇨🇬', region: 'Africa' }, accessTier: 'open', biome: 'Rainforest Enclave',
    lore: 'Central African oil-linked economy with concentrated urban services.',
    stats: { wealth: { monthly_usd: 750, annual_usd: 9000 }, language: { primary: 'French', others: ['Lingala'], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Trade', 'Services', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work authorization and residence card', detail: 'Sponsor-backed permits are common for foreign employment.', options: [] }],
    difficulty: { overall: 34, cost: 28, security: 64, safety: 54, quality: 50, language: 36 }, population: 6100000, currency: 'XAF',
    children: [
      { id: 'cg-bzv', name: 'Brazzaville', lat: -4.27, lng: 15.28, tier: 'restricted', biome: 'Urban Megacity', diff: [42, 34, 40, 52, 54, 34], pop: 2400000 },
      { id: 'cg-pnr', name: 'Pointe-Noire', lat: -4.78, lng: 11.86, tier: 'open', biome: 'Coastal Frontier', diff: [26, 22, 30, 58, 46, 38], pop: 1400000 }
    ]
  },
  ga: {
    name: 'Gabon', geo: { lat: -0.8, lng: 11.61, flag: '🇬🇦', region: 'Africa' }, accessTier: 'restricted', biome: 'Rainforest Enclave',
    lore: 'Small high-income African economy with energy and forestry strengths.',
    stats: { wealth: { monthly_usd: 1700, annual_usd: 20400 }, language: { primary: 'French', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Forestry', 'Services', 'Logistics'], degreeRequired: false }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'work_visa', type: 'hard', label: 'Work visa and residence process', detail: 'Employment sponsorship and permit validation are required.', options: [] }],
    difficulty: { overall: 44, cost: 60, security: 56, safety: 70, quality: 68, language: 34 }, population: 2400000, currency: 'XAF',
    children: [
      { id: 'ga-1', name: 'Estuaire', lat: 0.39, lng: 9.45, tier: 'restricted', biome: 'Urban Megacity', diff: [52, 70, 48, 68, 72, 32], pop: 1000000 },
      { id: 'ga-8', name: 'Ogooue-Maritime', lat: -1.56, lng: 9.26, tier: 'open', biome: 'Coastal Frontier', diff: [30, 40, 34, 72, 62, 36], pop: 220000 }
    ]
  },
  gq: {
    name: 'Equatorial Guinea', geo: { lat: 1.65, lng: 10.27, flag: '🇬🇶', region: 'Africa' }, accessTier: 'restricted', biome: 'Island Outpost',
    lore: 'Small oil-linked economy with concentrated urban-industrial opportunities.',
    stats: { wealth: { monthly_usd: 1500, annual_usd: 18000 }, language: { primary: 'Spanish', others: ['French', 'Portuguese'], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Construction', 'Services', 'Logistics'], degreeRequired: false }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work permit and residency authorization', detail: 'Sponsor-backed permits and compliance are needed for legal employment.', options: [] }],
    difficulty: { overall: 48, cost: 64, security: 50, safety: 60, quality: 62, language: 36 }, population: 1800000, currency: 'XAF',
    children: [
      { id: 'gq-bn', name: 'Bioko Norte', lat: 3.75, lng: 8.78, tier: 'restricted', biome: 'Island Outpost', diff: [56, 74, 54, 58, 66, 34], pop: 320000 },
      { id: 'gq-kn', name: 'Kie-Ntem', lat: 2.03, lng: 11.33, tier: 'open', biome: 'Rainforest Enclave', diff: [34, 46, 38, 64, 56, 38], pop: 200000 }
    ]
  },
  ne: {
    name: 'Niger', geo: { lat: 17.61, lng: 8.08, flag: '🇳🇪', region: 'Africa' }, accessTier: 'fortress', biome: 'Desert Outpost',
    lore: 'Sahelian state with severe security and infrastructure challenges across many regions.',
    stats: { wealth: { monthly_usd: 300, annual_usd: 3600 }, language: { primary: 'French', others: ['Hausa'], test: 'none', level: 'none' }, skills: { preferred: ['Humanitarian', 'Agriculture', 'Logistics', 'Public Health'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'risk', type: 'hard', label: 'High-risk mobility and permit constraints', detail: 'Entry and internal movement can be heavily restricted.', options: [] }],
    difficulty: { overall: 95, cost: 6, security: 10, safety: 6, quality: 16, language: 42 }, population: 27000000, currency: 'XOF',
    children: [
      { id: 'ne-8', name: 'Niamey', lat: 13.51, lng: 2.13, tier: 'fortress', biome: 'Urban Outpost', diff: [96, 8, 92, 6, 18, 40], pop: 1400000 },
      { id: 'ne-2', name: 'Agadez', lat: 16.97, lng: 7.99, tier: 'fortress', biome: 'Desert Outpost', diff: [94, 4, 88, 8, 14, 44], pop: 700000 }
    ]
  },
  td: {
    name: 'Chad', geo: { lat: 15.45, lng: 18.73, flag: '🇹🇩', region: 'Africa' }, accessTier: 'fortress', biome: 'Steppe Frontier',
    lore: 'Landlocked Sahel state with high insecurity and limited service infrastructure.',
    stats: { wealth: { monthly_usd: 320, annual_usd: 3840 }, language: { primary: 'French', others: ['Arabic'], test: 'none', level: 'none' }, skills: { preferred: ['Humanitarian', 'Energy', 'Logistics', 'Public Health'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'risk', type: 'hard', label: 'Severe security and access constraints', detail: 'Work and movement often require elevated controls and contingency planning.', options: [] }],
    difficulty: { overall: 96, cost: 8, security: 8, safety: 5, quality: 14, language: 44 }, population: 19000000, currency: 'XAF',
    children: [
      { id: 'td-ndj', name: "N'Djamena", lat: 12.13, lng: 15.04, tier: 'fortress', biome: 'Urban Outpost', diff: [97, 10, 94, 5, 16, 42], pop: 1500000 },
      { id: 'td-mo', name: 'Moyen-Chari', lat: 9.0, lng: 18.4, tier: 'fortress', biome: 'Steppe Frontier', diff: [95, 6, 90, 6, 12, 46], pop: 800000 }
    ]
  },
  mr: {
    name: 'Mauritania', geo: { lat: 21.01, lng: -10.94, flag: '🇲🇷', region: 'Africa' }, accessTier: 'open', biome: 'Desert Outpost',
    lore: 'Sparsely populated Saharan economy with mining and port-linked trade activity.',
    stats: { wealth: { monthly_usd: 650, annual_usd: 7800 }, language: { primary: 'Arabic', others: ['French'], test: 'none', level: 'none' }, skills: { preferred: ['Mining', 'Logistics', 'Fisheries', 'Trade'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work permit and residence card', detail: 'Foreign employment requires sponsorship and administrative registration.', options: [] }],
    difficulty: { overall: 34, cost: 20, security: 66, safety: 54, quality: 46, language: 40 }, population: 5000000, currency: 'MRU',
    children: [
      { id: 'mr-nkc', name: 'Nouakchott', lat: 18.08, lng: -15.98, tier: 'restricted', biome: 'Urban Outpost', diff: [42, 28, 40, 52, 50, 38], pop: 1400000 },
      { id: 'mr-dk', name: 'Dakhlet Nouadhibou', lat: 20.93, lng: -17.03, tier: 'open', biome: 'Coastal Frontier', diff: [26, 16, 28, 58, 42, 42], pop: 200000 }
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
    quests: [{ id: 'local_path', type: 'hard', label: 'National pathway + local settlement', detail: 'Local security, permits, and demand shape progression speed.', options: [] }],
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
