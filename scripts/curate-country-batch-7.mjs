import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  jo: {
    name: 'Jordan', geo: { lat: 30.59, lng: 36.24, flag: '🇯🇴', region: 'Middle East' }, accessTier: 'restricted', biome: 'Desert Outpost',
    lore: 'Stable Levantine hub with strengths in logistics, healthcare, and education services.',
    stats: { wealth: { monthly_usd: 1200, annual_usd: 14400 }, language: { primary: 'Arabic', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Healthcare', 'Logistics', 'Education', 'Tourism'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_permit', type: 'hard', label: 'Work permit and residence card', detail: 'Employer sponsorship and permit approvals are required for most foreign workers.', options: [] }],
    difficulty: { overall: 42, cost: 40, security: 54, safety: 74, quality: 68, language: 42 }, population: 11300000, currency: 'JOD',
    children: [
      { id: 'jo-am', name: 'Amman Governorate', lat: 31.95, lng: 35.93, tier: 'restricted', biome: 'Urban Megacity', diff: [50, 48, 50, 72, 72, 40], pop: 4000000 },
      { id: 'jo-aq', name: 'Aqaba Governorate', lat: 29.53, lng: 35.01, tier: 'open', biome: 'Coastal Haven', diff: [30, 28, 34, 78, 64, 44], pop: 220000 }
    ]
  },
  lb: {
    name: 'Lebanon', geo: { lat: 33.85, lng: 35.86, flag: '🇱🇧', region: 'Middle East' }, accessTier: 'fortress', biome: 'Coastal Haven',
    lore: 'Historic Levant hub under persistent economic stress and institutional uncertainty.',
    stats: { wealth: { monthly_usd: 1000, annual_usd: 12000 }, language: { primary: 'Arabic', others: ['French', 'English'], test: 'none', level: 'none' }, skills: { preferred: ['Services', 'Healthcare', 'Trade', 'Hospitality'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'high_risk', type: 'hard', label: 'Volatile operating environment', detail: 'Entry and long-term settlement require heightened due diligence.', options: [] }],
    difficulty: { overall: 82, cost: 46, security: 22, safety: 24, quality: 42, language: 36 }, population: 5500000, currency: 'LBP',
    children: [
      { id: 'lb-ba', name: 'Beirut', lat: 33.89, lng: 35.5, tier: 'fortress', biome: 'Urban Megacity', diff: [86, 50, 82, 22, 46, 34], pop: 2000000 },
      { id: 'lb-na', name: 'North Governorate', lat: 34.43, lng: 35.85, tier: 'restricted', biome: 'Cultural Heartland', diff: [74, 40, 70, 28, 38, 38], pop: 900000 }
    ]
  },
  iq: {
    name: 'Iraq', geo: { lat: 33.22, lng: 43.68, flag: '🇮🇶', region: 'Middle East' }, accessTier: 'fortress', biome: 'Desert Outpost',
    lore: 'Energy-rich country with uneven security and infrastructure conditions across regions.',
    stats: { wealth: { monthly_usd: 900, annual_usd: 10800 }, language: { primary: 'Arabic', others: ['Kurdish'], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Construction', 'Logistics', 'Healthcare'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'security', type: 'hard', label: 'Security-sensitive entry process', detail: 'Permit and entry requirements vary significantly by purpose and region.', options: [] }],
    difficulty: { overall: 88, cost: 24, security: 18, safety: 20, quality: 34, language: 44 }, population: 45000000, currency: 'IQD',
    children: [
      { id: 'iq-bg', name: 'Baghdad Governorate', lat: 33.31, lng: 44.36, tier: 'fortress', biome: 'Urban Megacity', diff: [90, 26, 84, 18, 36, 42], pop: 8500000 },
      { id: 'iq-ar', name: 'Erbil Governorate', lat: 36.19, lng: 44.01, tier: 'restricted', biome: 'Border Territory', diff: [70, 24, 68, 40, 46, 44], pop: 2200000 }
    ]
  },
  ir: {
    name: 'Iran', geo: { lat: 32.43, lng: 53.69, flag: '🇮🇷', region: 'Middle East' }, accessTier: 'fortress', biome: 'Mountain Stronghold',
    lore: 'Large regional economy with strong technical talent under complex sanctions and regulatory constraints.',
    stats: { wealth: { monthly_usd: 800, annual_usd: 9600 }, language: { primary: 'Persian', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Engineering', 'Energy', 'Healthcare', 'Manufacturing'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'sanctions', type: 'hard', label: 'Sanctions-constrained operating environment', detail: 'Entry, payments, and legal compliance can be materially restricted.', options: [] }],
    difficulty: { overall: 84, cost: 18, security: 20, safety: 30, quality: 44, language: 56 }, population: 89000000, currency: 'IRR',
    children: [
      { id: 'ir-07', name: 'Tehran Province', lat: 35.69, lng: 51.39, tier: 'fortress', biome: 'Urban Megacity', diff: [88, 24, 82, 28, 48, 54], pop: 14000000 },
      { id: 'ir-26', name: 'Isfahan Province', lat: 32.65, lng: 51.67, tier: 'restricted', biome: 'Industrial Heartland', diff: [68, 16, 66, 36, 44, 58], pop: 5300000 }
    ]
  },
  om: {
    name: 'Oman', geo: { lat: 21.47, lng: 55.98, flag: '🇴🇲', region: 'Middle East' }, accessTier: 'restricted', biome: 'Desert Outpost',
    lore: 'Stable Gulf state with measured diversification and strong logistics/shipping position.',
    stats: { wealth: { monthly_usd: 2200, annual_usd: 26400 }, language: { primary: 'Arabic', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Logistics', 'Energy', 'Construction', 'Tourism'], degreeRequired: false }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'sponsorship', type: 'hard', label: 'Employer sponsorship and residence card', detail: 'Most work routes require sponsor-backed labor clearances.', options: [] }],
    difficulty: { overall: 48, cost: 56, security: 48, safety: 82, quality: 74, language: 34 }, population: 4700000, currency: 'OMR',
    children: [
      { id: 'om-ma', name: 'Muscat Governorate', lat: 23.59, lng: 58.41, tier: 'restricted', biome: 'Coastal Haven', diff: [56, 64, 56, 82, 78, 32], pop: 1500000 },
      { id: 'om-dh', name: 'Dhofar Governorate', lat: 17.02, lng: 54.09, tier: 'open', biome: 'Desert Outpost', diff: [34, 42, 40, 84, 66, 36], pop: 500000 }
    ]
  },
  qa: {
    name: 'Qatar', geo: { lat: 25.35, lng: 51.18, flag: '🇶🇦', region: 'Middle East' }, accessTier: 'locked', biome: 'Financial Citadel',
    lore: 'High-income Gulf microstate with strong energy revenue and concentrated urban economy.',
    stats: { wealth: { monthly_usd: 3200, annual_usd: 38400 }, language: { primary: 'Arabic', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Finance', 'Construction', 'Sports & Events'], degreeRequired: false }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'kafala', type: 'hard', label: 'Sponsor-backed employment status', detail: 'Work and stay are typically tied to employer sponsorship.', options: [] }],
    difficulty: { overall: 62, cost: 72, security: 34, safety: 90, quality: 82, language: 28 }, population: 2900000, currency: 'QAR',
    children: [
      { id: 'qa-da', name: 'Doha Municipality', lat: 25.29, lng: 51.53, tier: 'locked', biome: 'Financial Citadel', diff: [70, 82, 70, 90, 86, 26], pop: 1500000 },
      { id: 'qa-ra', name: 'Al Rayyan Municipality', lat: 25.29, lng: 51.42, tier: 'restricted', biome: 'Desert Outpost', diff: [50, 60, 58, 92, 78, 30], pop: 600000 }
    ]
  },
  kw: {
    name: 'Kuwait', geo: { lat: 29.31, lng: 47.48, flag: '🇰🇼', region: 'Middle East' }, accessTier: 'restricted', biome: 'Desert Outpost',
    lore: 'Oil-funded Gulf economy with high-income labor market and sponsor-based migration pathways.',
    stats: { wealth: { monthly_usd: 2800, annual_usd: 33600 }, language: { primary: 'Arabic', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Healthcare', 'Construction', 'Finance'], degreeRequired: false }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'sponsor', type: 'hard', label: 'Sponsor-led work permit process', detail: 'Work authorization is employer-linked for most foreign workers.', options: [] }],
    difficulty: { overall: 54, cost: 66, security: 42, safety: 84, quality: 76, language: 30 }, population: 4300000, currency: 'KWD',
    children: [
      { id: 'kw-ku', name: 'Capital Governorate', lat: 29.37, lng: 47.98, tier: 'restricted', biome: 'Financial Citadel', diff: [60, 74, 62, 84, 80, 28], pop: 500000 },
      { id: 'kw-ha', name: 'Hawalli Governorate', lat: 29.33, lng: 48.03, tier: 'open', biome: 'Urban Megacity', diff: [42, 52, 48, 86, 72, 32], pop: 950000 }
    ]
  },
  bh: {
    name: 'Bahrain', geo: { lat: 26.07, lng: 50.56, flag: '🇧🇭', region: 'Middle East' }, accessTier: 'restricted', biome: 'Island Outpost',
    lore: 'Compact Gulf financial center with diversified services and regional banking role.',
    stats: { wealth: { monthly_usd: 2400, annual_usd: 28800 }, language: { primary: 'Arabic', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Finance', 'Logistics', 'Hospitality', 'Tech Services'], degreeRequired: false }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'work_visa', type: 'hard', label: 'Employer-sponsored work visa', detail: 'Residence/work status is generally tied to sponsoring employer.', options: [] }],
    difficulty: { overall: 48, cost: 58, security: 48, safety: 86, quality: 74, language: 26 }, population: 1500000, currency: 'BHD',
    children: [
      { id: 'bh-mh', name: 'Capital Governorate', lat: 26.22, lng: 50.58, tier: 'restricted', biome: 'Financial Citadel', diff: [56, 66, 56, 86, 78, 24], pop: 450000 },
      { id: 'bh-mu', name: 'Muharraq Governorate', lat: 26.25, lng: 50.61, tier: 'open', biome: 'Island Outpost', diff: [36, 46, 42, 88, 68, 28], pop: 270000 }
    ]
  },
  az: {
    name: 'Azerbaijan', geo: { lat: 40.14, lng: 47.58, flag: '🇦🇿', region: 'Asia' }, accessTier: 'restricted', biome: 'Border Territory',
    lore: 'Caspian economy with strong energy base and expanding transport corridors.',
    stats: { wealth: { monthly_usd: 1200, annual_usd: 14400 }, language: { primary: 'Azerbaijani', others: ['Russian', 'English'], test: 'none', level: 'none' }, skills: { preferred: ['Energy', 'Logistics', 'Construction', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Temporary residence/work permit', detail: 'Work and stay generally require employer or project backing.', options: [] }],
    difficulty: { overall: 40, cost: 30, security: 56, safety: 68, quality: 64, language: 48 }, population: 10200000, currency: 'AZN',
    children: [
      { id: 'az-ba', name: 'Baku', lat: 40.409, lng: 49.867, tier: 'restricted', biome: 'Financial Citadel', diff: [48, 38, 48, 66, 68, 46], pop: 2300000 },
      { id: 'az-ga', name: 'Ganja', lat: 40.683, lng: 46.36, tier: 'open', biome: 'Industrial Heartland', diff: [32, 24, 36, 72, 60, 50], pop: 330000 }
    ]
  },
  ge: {
    name: 'Georgia', geo: { lat: 42.32, lng: 43.36, flag: '🇬🇪', region: 'Asia' }, accessTier: 'open', biome: 'Mountain Stronghold',
    lore: 'Caucasus transit hub with liberal entry options and rising startup/tourism profile.',
    stats: { wealth: { monthly_usd: 1100, annual_usd: 13200 }, language: { primary: 'Georgian', others: ['English', 'Russian'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'Tech', 'Logistics', 'Hospitality'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Residence permit pathways', detail: 'Business, work, and property-linked options are commonly used.', options: [] }],
    difficulty: { overall: 32, cost: 24, security: 72, safety: 72, quality: 66, language: 42 }, population: 3700000, currency: 'GEL',
    children: [
      { id: 'ge-tb', name: 'Tbilisi', lat: 41.715, lng: 44.827, tier: 'restricted', biome: 'Cultural Heartland', diff: [40, 30, 32, 70, 70, 40], pop: 1200000 },
      { id: 'ge-aj', name: 'Adjara', lat: 41.65, lng: 41.64, tier: 'open', biome: 'Coastal Haven', diff: [24, 18, 24, 76, 62, 44], pop: 350000 }
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
    quests: [{ id: 'local_path', type: 'hard', label: 'National pathway + local settlement', detail: 'Local permitting and labor demand determine onboarding pace.', options: [] }],
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
