import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  dz: {
    name: 'Algeria', geo: { lat: 28.03, lng: 1.66, flag: '🇩🇿', region: 'Africa' }, accessTier: 'open', biome: 'Desert Outpost',
    lore: 'Large Maghreb economy with strong hydrocarbon base and growing regional logistics relevance.',
    stats: { wealth: { monthly_usd: 850, annual_usd: 10200 }, language: { primary: 'Arabic', others: ['French', 'Tamazight'], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Construction', 'Logistics', 'Public Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work permit and residence card', detail: 'Long-stay employment usually requires sponsor-backed approvals.', options: [] }],
    difficulty: { overall: 34, cost: 24, security: 64, safety: 56, quality: 56, language: 44 }, population: 45000000, currency: 'DZD',
    children: [
      { id: 'dz-16', name: 'Algiers', lat: 36.75, lng: 3.06, tier: 'restricted', biome: 'Urban Megacity', diff: [42, 30, 40, 54, 60, 42], pop: 3700000 },
      { id: 'dz-31', name: 'Oran', lat: 35.7, lng: -0.63, tier: 'open', biome: 'Coastal Haven', diff: [26, 18, 30, 60, 54, 46], pop: 1600000 }
    ]
  },
  tn: {
    name: 'Tunisia', geo: { lat: 33.89, lng: 9.54, flag: '🇹🇳', region: 'Africa' }, accessTier: 'open', biome: 'Coastal Haven',
    lore: 'Compact North African economy with export manufacturing and services potential.',
    stats: { wealth: { monthly_usd: 800, annual_usd: 9600 }, language: { primary: 'Arabic', others: ['French'], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'Tourism', 'IT Services', 'Trade'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_residence', type: 'hard', label: 'Work authorization and residence permit', detail: 'Employer-backed status remains the standard route.', options: [] }],
    difficulty: { overall: 30, cost: 24, security: 70, safety: 62, quality: 58, language: 42 }, population: 12500000, currency: 'TND',
    children: [
      { id: 'tn-11', name: 'Tunis', lat: 36.8, lng: 10.18, tier: 'restricted', biome: 'Urban Megacity', diff: [38, 30, 34, 60, 62, 40], pop: 2700000 },
      { id: 'tn-61', name: 'Sfax', lat: 34.74, lng: 10.76, tier: 'open', biome: 'Industrial Heartland', diff: [24, 18, 26, 66, 54, 44], pop: 1000000 }
    ]
  },
  sd: {
    name: 'Sudan', geo: { lat: 12.86, lng: 30.22, flag: '🇸🇩', region: 'Africa' }, accessTier: 'fortress', biome: 'Steppe Frontier',
    lore: 'High-volatility environment with significant operational and security uncertainty.',
    stats: { wealth: { monthly_usd: 400, annual_usd: 4800 }, language: { primary: 'Arabic', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Humanitarian', 'Healthcare', 'Logistics', 'Agriculture'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'risk', type: 'hard', label: 'High-risk entry environment', detail: 'Movement, work, and long-stay permissions can be unstable and restrictive.', options: [] }],
    difficulty: { overall: 92, cost: 10, security: 14, safety: 10, quality: 22, language: 46 }, population: 49000000, currency: 'SDG',
    children: [
      { id: 'sd-kh', name: 'Khartoum State', lat: 15.5, lng: 32.56, tier: 'fortress', biome: 'Urban Megacity', diff: [94, 14, 88, 8, 24, 44], pop: 8300000 },
      { id: 'sd-gd', name: 'Gedaref State', lat: 14.04, lng: 35.38, tier: 'fortress', biome: 'Steppe Frontier', diff: [88, 8, 82, 12, 20, 48], pop: 2300000 }
    ]
  },
  et: {
    name: 'Ethiopia', geo: { lat: 9.15, lng: 40.49, flag: '🇪🇹', region: 'Africa' }, accessTier: 'open', biome: 'Highland Frontier',
    lore: 'Large and fast-growing East African economy with major infrastructure expansion.',
    stats: { wealth: { monthly_usd: 450, annual_usd: 5400 }, language: { primary: 'Amharic', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Construction', 'Logistics', 'Agriculture', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'entry', type: 'hard', label: 'Work permit and residence process', detail: 'Employment-based status requires sponsor filings and registrations.', options: [] }],
    difficulty: { overall: 28, cost: 14, security: 70, safety: 50, quality: 44, language: 42 }, population: 126000000, currency: 'ETB',
    children: [
      { id: 'et-aa', name: 'Addis Ababa', lat: 8.98, lng: 38.79, tier: 'restricted', biome: 'Urban Megacity', diff: [36, 20, 34, 48, 50, 40], pop: 5400000 },
      { id: 'et-or', name: 'Oromia', lat: 8.98, lng: 39.0, tier: 'open', biome: 'Highland Frontier', diff: [22, 10, 26, 54, 42, 44], pop: 38000000 }
    ]
  },
  rw: {
    name: 'Rwanda', geo: { lat: -1.94, lng: 29.87, flag: '🇷🇼', region: 'Africa' }, accessTier: 'open', biome: 'Highland Frontier',
    lore: 'Policy-stable East African growth state with emphasis on digital services and governance.',
    stats: { wealth: { monthly_usd: 700, annual_usd: 8400 }, language: { primary: 'Kinyarwanda', others: ['English', 'French'], test: 'none', level: 'none' }, skills: { preferred: ['Tech Services', 'Tourism', 'Logistics', 'Healthcare'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work visa and residency', detail: 'Employer-supported permits and local registration are typical.', options: [] }],
    difficulty: { overall: 24, cost: 20, security: 76, safety: 78, quality: 60, language: 34 }, population: 14000000, currency: 'RWF',
    children: [
      { id: 'rw-kg', name: 'Kigali City', lat: -1.95, lng: 30.06, tier: 'restricted', biome: 'Urban Megacity', diff: [32, 26, 28, 80, 64, 32], pop: 1400000 },
      { id: 'rw-sn', name: 'Southern Province', lat: -2.6, lng: 29.73, tier: 'open', biome: 'Highland Frontier', diff: [18, 14, 20, 82, 56, 36], pop: 3500000 }
    ]
  },
  zm: {
    name: 'Zambia', geo: { lat: -13.13, lng: 27.85, flag: '🇿🇲', region: 'Africa' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'Resource-linked economy with expanding mining, energy, and agribusiness sectors.',
    stats: { wealth: { monthly_usd: 550, annual_usd: 6600 }, language: { primary: 'English', others: ['Bemba', 'Nyanja'], test: 'none', level: 'none' }, skills: { preferred: ['Mining', 'Energy', 'Agriculture', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_permit', type: 'hard', label: 'Employment permit route', detail: 'Permit process requires sponsor and role-specific approvals.', options: [] }],
    difficulty: { overall: 28, cost: 18, security: 72, safety: 58, quality: 50, language: 20 }, population: 20000000, currency: 'ZMW',
    children: [
      { id: 'zm-lu', name: 'Lusaka Province', lat: -15.41, lng: 28.28, tier: 'open', biome: 'Urban Megacity', diff: [34, 22, 32, 56, 54, 18], pop: 3400000 },
      { id: 'zm-cb', name: 'Copperbelt Province', lat: -12.81, lng: 28.21, tier: 'open', biome: 'Industrial Heartland', diff: [22, 14, 24, 60, 48, 22], pop: 2800000 }
    ]
  },
  zw: {
    name: 'Zimbabwe', geo: { lat: -19.02, lng: 29.15, flag: '🇿🇼', region: 'Africa' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'Agriculture and mining-centered economy with periodic policy and currency instability.',
    stats: { wealth: { monthly_usd: 500, annual_usd: 6000 }, language: { primary: 'English', others: ['Shona', 'Ndebele'], test: 'none', level: 'none' }, skills: { preferred: ['Mining', 'Agriculture', 'Tourism', 'Trade'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work permit and residence process', detail: 'Employer-backed route with regular compliance updates.', options: [] }],
    difficulty: { overall: 32, cost: 16, security: 68, safety: 48, quality: 42, language: 18 }, population: 16000000, currency: 'USD',
    children: [
      { id: 'zw-ha', name: 'Harare Province', lat: -17.83, lng: 31.05, tier: 'open', biome: 'Urban Megacity', diff: [38, 20, 36, 44, 46, 16], pop: 2500000 },
      { id: 'zw-bu', name: 'Bulawayo Province', lat: -20.16, lng: 28.58, tier: 'open', biome: 'Cultural Heartland', diff: [24, 12, 26, 52, 40, 20], pop: 760000 }
    ]
  },
  na: {
    name: 'Namibia', geo: { lat: -22.56, lng: 17.08, flag: '🇳🇦', region: 'Africa' }, accessTier: 'open', biome: 'Desert Outpost',
    lore: 'Sparse-population Southern African state with mining, logistics, and tourism value.',
    stats: { wealth: { monthly_usd: 1000, annual_usd: 12000 }, language: { primary: 'English', others: ['Afrikaans', 'Oshiwambo'], test: 'none', level: 'none' }, skills: { preferred: ['Mining', 'Logistics', 'Tourism', 'Renewables'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work visa and residence permit', detail: 'Employment-based permits require sponsor and proof of role necessity.', options: [] }],
    difficulty: { overall: 34, cost: 34, security: 66, safety: 70, quality: 62, language: 18 }, population: 3000000, currency: 'NAD',
    children: [
      { id: 'na-kh', name: 'Khomas Region', lat: -22.57, lng: 17.08, tier: 'restricted', biome: 'Urban Megacity', diff: [42, 42, 38, 68, 66, 16], pop: 500000 },
      { id: 'na-er', name: 'Erongo Region', lat: -22.26, lng: 15.0, tier: 'open', biome: 'Coastal Haven', diff: [26, 28, 28, 74, 58, 20], pop: 190000 }
    ]
  },
  bw: {
    name: 'Botswana', geo: { lat: -22.33, lng: 24.68, flag: '🇧🇼', region: 'Africa' }, accessTier: 'open', biome: 'Steppe Frontier',
    lore: 'Governance-stable Southern African state with mining wealth and steady public institutions.',
    stats: { wealth: { monthly_usd: 1200, annual_usd: 14400 }, language: { primary: 'English', others: ['Setswana'], test: 'none', level: 'none' }, skills: { preferred: ['Mining', 'Healthcare', 'Public Services', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_permit', type: 'hard', label: 'Work and residence permit track', detail: 'Employer sponsorship and professional need are key factors.', options: [] }],
    difficulty: { overall: 32, cost: 36, security: 70, safety: 76, quality: 64, language: 16 }, population: 2600000, currency: 'BWP',
    children: [
      { id: 'bw-se', name: 'South East District', lat: -24.65, lng: 25.91, tier: 'open', biome: 'Urban Megacity', diff: [38, 42, 34, 74, 66, 14], pop: 500000 },
      { id: 'bw-no', name: 'North East District', lat: -20.16, lng: 27.5, tier: 'open', biome: 'Steppe Frontier', diff: [22, 24, 24, 78, 60, 18], pop: 220000 }
    ]
  },
  ml: {
    name: 'Mali', geo: { lat: 17.57, lng: -3.99, flag: '🇲🇱', region: 'Africa' }, accessTier: 'fortress', biome: 'Steppe Frontier',
    lore: 'Sahelian state with high operational risk and regionally variable security conditions.',
    stats: { wealth: { monthly_usd: 350, annual_usd: 4200 }, language: { primary: 'French', others: ['Bambara'], test: 'none', level: 'none' }, skills: { preferred: ['Humanitarian', 'Agriculture', 'Logistics', 'Public Health'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'risk', type: 'hard', label: 'High-risk access and movement constraints', detail: 'Travel, work, and residence can be heavily constrained by local conditions.', options: [] }],
    difficulty: { overall: 94, cost: 8, security: 12, safety: 8, quality: 18, language: 44 }, population: 23000000, currency: 'XOF',
    children: [
      { id: 'ml-bko', name: 'Bamako District', lat: 12.64, lng: -8.0, tier: 'fortress', biome: 'Urban Megacity', diff: [96, 10, 90, 8, 20, 42], pop: 3500000 },
      { id: 'ml-kys', name: 'Kayes Region', lat: 14.45, lng: -11.44, tier: 'fortress', biome: 'Steppe Frontier', diff: [92, 6, 86, 10, 16, 46], pop: 2500000 }
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
    quests: [{ id: 'local_path', type: 'hard', label: 'National pathway + local settlement', detail: 'Local administration and labor demand influence progression speed.', options: [] }],
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
