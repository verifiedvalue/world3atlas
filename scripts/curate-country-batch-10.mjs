import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  af: {
    name: 'Afghanistan', geo: { lat: 33.94, lng: 67.71, flag: '🇦🇫', region: 'Asia' }, accessTier: 'fortress', biome: 'Mountain Stronghold',
    lore: 'High-risk operating environment with severe security and mobility constraints.',
    stats: { wealth: { monthly_usd: 350, annual_usd: 4200 }, language: { primary: 'Dari/Pashto', others: [], test: 'none', level: 'none' }, skills: { preferred: ['Humanitarian', 'Public Health', 'Logistics', 'Education'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'risk', type: 'hard', label: 'Severe security constraints', detail: 'Entry, movement, and long-stay activity can be highly restricted.', options: [] }],
    difficulty: { overall: 98, cost: 8, security: 6, safety: 4, quality: 14, language: 56 }, population: 42000000, currency: 'AFN',
    children: [
      { id: 'af-kbl', name: 'Kabul Province', lat: 34.53, lng: 69.17, tier: 'fortress', biome: 'Urban Outpost', diff: [98, 10, 95, 4, 16, 54], pop: 6000000 },
      { id: 'af-hrt', name: 'Herat Province', lat: 34.35, lng: 62.2, tier: 'fortress', biome: 'Border Territory', diff: [95, 6, 92, 6, 12, 58], pop: 2200000 }
    ]
  },
  al: {
    name: 'Albania', geo: { lat: 41.15, lng: 20.17, flag: '🇦🇱', region: 'Europe' }, accessTier: 'open', biome: 'Coastal Haven',
    lore: 'Lower-cost Balkan route with rising tourism and services sectors.',
    stats: { wealth: { monthly_usd: 1000, annual_usd: 12000 }, language: { primary: 'Albanian', others: ['English', 'Italian'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'Services', 'Construction', 'IT Support'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Residence and work permit process', detail: 'Long-stay work typically requires employer-backed permits.', options: [] }],
    difficulty: { overall: 32, cost: 24, security: 70, safety: 68, quality: 62, language: 44 }, population: 2800000, currency: 'ALL',
    children: [
      { id: 'al-tr', name: 'Tirana County', lat: 41.33, lng: 19.82, tier: 'restricted', biome: 'Urban Megacity', diff: [40, 30, 34, 66, 66, 42], pop: 900000 },
      { id: 'al-vl', name: 'Vlore County', lat: 40.47, lng: 19.49, tier: 'open', biome: 'Coastal Haven', diff: [24, 18, 24, 72, 60, 46], pop: 190000 }
    ]
  },
  am: {
    name: 'Armenia', geo: { lat: 40.07, lng: 45.04, flag: '🇦🇲', region: 'Asia' }, accessTier: 'open', biome: 'Mountain Stronghold',
    lore: 'Small Caucasus economy with strong tech talent and diaspora-linked investment.',
    stats: { wealth: { monthly_usd: 1100, annual_usd: 13200 }, language: { primary: 'Armenian', others: ['Russian', 'English'], test: 'none', level: 'none' }, skills: { preferred: ['Software', 'Engineering', 'Services', 'Trade'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Residence registration pathway', detail: 'Work/business-based legal stay routes are comparatively accessible.', options: [] }],
    difficulty: { overall: 34, cost: 24, security: 70, safety: 70, quality: 64, language: 40 }, population: 2800000, currency: 'AMD',
    children: [
      { id: 'am-er', name: 'Yerevan', lat: 40.18, lng: 44.51, tier: 'restricted', biome: 'Urban Megacity', diff: [40, 28, 32, 68, 68, 38], pop: 1100000 },
      { id: 'am-sh', name: 'Shirak', lat: 40.79, lng: 43.84, tier: 'open', biome: 'Mountain Stronghold', diff: [24, 16, 22, 74, 58, 42], pop: 230000 }
    ]
  },
  ba: {
    name: 'Bosnia and Herzegovina', geo: { lat: 43.92, lng: 17.68, flag: '🇧🇦', region: 'Europe' }, accessTier: 'open', biome: 'Border Territory',
    lore: 'Western Balkan economy with moderate costs and growing services output.',
    stats: { wealth: { monthly_usd: 1000, annual_usd: 12000 }, language: { primary: 'Bosnian/Croatian/Serbian', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'Services', 'Tourism', 'IT Support'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Work permit and temporary residence', detail: 'Employer-sponsored permit is common for non-local workers.', options: [] }],
    difficulty: { overall: 34, cost: 28, security: 66, safety: 68, quality: 60, language: 48 }, population: 3200000, currency: 'BAM',
    children: [
      { id: 'ba-sa', name: 'Sarajevo Canton', lat: 43.86, lng: 18.41, tier: 'restricted', biome: 'Cultural Heartland', diff: [40, 34, 36, 66, 64, 46], pop: 420000 },
      { id: 'ba-tz', name: 'Tuzla Canton', lat: 44.53, lng: 18.68, tier: 'open', biome: 'Industrial Heartland', diff: [26, 22, 28, 70, 56, 50], pop: 450000 }
    ]
  },
  by: {
    name: 'Belarus', geo: { lat: 53.71, lng: 27.95, flag: '🇧🇾', region: 'Europe' }, accessTier: 'fortress', biome: 'Border Territory',
    lore: 'Sanctions-impacted environment with elevated geopolitical and compliance risk.',
    stats: { wealth: { monthly_usd: 1000, annual_usd: 12000 }, language: { primary: 'Belarusian', others: ['Russian'], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'IT', 'Logistics', 'Public Services'], degreeRequired: false }, health: 'proof_required', age: { min: null, max: null } },
    quests: [{ id: 'compliance', type: 'hard', label: 'High compliance and sanctions complexity', detail: 'Permits and financial/legal operations can be significantly constrained.', options: [] }],
    difficulty: { overall: 80, cost: 24, security: 22, safety: 48, quality: 54, language: 52 }, population: 9200000, currency: 'BYN',
    children: [
      { id: 'by-mi', name: 'Minsk Region', lat: 53.9, lng: 27.56, tier: 'fortress', biome: 'Urban Megacity', diff: [84, 28, 80, 46, 58, 50], pop: 2000000 },
      { id: 'by-br', name: 'Brest Region', lat: 52.1, lng: 23.7, tier: 'restricted', biome: 'Border Territory', diff: [68, 20, 66, 52, 50, 54], pop: 1300000 }
    ]
  },
  cy: {
    name: 'Cyprus', geo: { lat: 35.13, lng: 33.43, flag: '🇨🇾', region: 'Europe' }, accessTier: 'restricted', biome: 'Island Sanctuary',
    lore: 'EU island economy with strong professional services and shipping sectors.',
    stats: { wealth: { monthly_usd: 2000, annual_usd: 24000 }, language: { primary: 'Greek', others: ['English', 'Turkish'], test: 'none', level: 'none' }, skills: { preferred: ['Finance', 'Shipping', 'Tourism', 'Tech'], degreeRequired: false }, health: 'insurance_required', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Residence/work permit framework', detail: 'Employment and business pathways available with registration requirements.', options: [] }],
    difficulty: { overall: 44, cost: 56, security: 58, safety: 82, quality: 76, language: 30 }, population: 1300000, currency: 'EUR',
    children: [
      { id: 'cy-01', name: 'Nicosia District', lat: 35.18, lng: 33.38, tier: 'restricted', biome: 'Cultural Heartland', diff: [50, 62, 46, 80, 78, 28], pop: 350000 },
      { id: 'cy-02', name: 'Limassol District', lat: 34.68, lng: 33.04, tier: 'open', biome: 'Coastal Haven', diff: [34, 46, 34, 84, 74, 32], pop: 270000 }
    ]
  },
  is: {
    name: 'Iceland', geo: { lat: 64.96, lng: -19.02, flag: '🇮🇸', region: 'Europe' }, accessTier: 'restricted', biome: 'Alpine Fortress',
    lore: 'High-income North Atlantic economy with excellent governance and high living costs.',
    stats: { wealth: { monthly_usd: 3200, annual_usd: 38400 }, language: { primary: 'Icelandic', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Tech', 'Renewables', 'Tourism', 'Healthcare'], degreeRequired: true }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_permit', type: 'hard', label: 'Residence and work permit', detail: 'Non-EEA routes generally need employer sponsorship and role eligibility.', options: [] }],
    difficulty: { overall: 62, cost: 88, security: 46, safety: 94, quality: 92, language: 52 }, population: 390000, currency: 'ISK',
    children: [
      { id: 'is-hfu', name: 'Capital Region', lat: 64.14, lng: -21.94, tier: 'restricted', biome: 'Urban Outpost', diff: [68, 92, 58, 94, 94, 50], pop: 240000 },
      { id: 'is-su', name: 'Southern Region', lat: 63.93, lng: -20.98, tier: 'open', biome: 'Alpine Fortress', diff: [46, 70, 42, 96, 88, 54], pop: 35000 }
    ]
  },
  kg: {
    name: 'Kyrgyzstan', geo: { lat: 41.2, lng: 74.77, flag: '🇰🇬', region: 'Asia' }, accessTier: 'open', biome: 'Mountain Stronghold',
    lore: 'Mountainous Central Asian economy with trade, agriculture, and services growth corridors.',
    stats: { wealth: { monthly_usd: 550, annual_usd: 6600 }, language: { primary: 'Kyrgyz', others: ['Russian'], test: 'none', level: 'none' }, skills: { preferred: ['Trade', 'Logistics', 'Agriculture', 'Tourism'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'registration', type: 'hard', label: 'Residence registration and permit process', detail: 'Long-term legal stay depends on status type and local registration.', options: [] }],
    difficulty: { overall: 28, cost: 14, security: 72, safety: 60, quality: 48, language: 48 }, population: 7000000, currency: 'KGS',
    children: [
      { id: 'kg-gb', name: 'Bishkek', lat: 42.87, lng: 74.6, tier: 'open', biome: 'Urban Outpost', diff: [34, 18, 30, 58, 52, 46], pop: 1100000 },
      { id: 'kg-oc', name: 'Osh Region', lat: 40.53, lng: 72.8, tier: 'open', biome: 'Mountain Stronghold', diff: [20, 10, 24, 62, 44, 50], pop: 1300000 }
    ]
  },
  kh: {
    name: 'Cambodia', geo: { lat: 12.56, lng: 104.99, flag: '🇰🇭', region: 'Asia' }, accessTier: 'open', biome: 'Tropical Sanctuary',
    lore: 'Lower-cost Southeast Asian economy with expanding manufacturing and tourism sectors.',
    stats: { wealth: { monthly_usd: 650, annual_usd: 7800 }, language: { primary: 'Khmer', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'Tourism', 'Hospitality', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Business visa + work permit', detail: 'Employment requires annual permit compliance and documentation.', options: [] }],
    difficulty: { overall: 26, cost: 14, security: 74, safety: 58, quality: 50, language: 52 }, population: 17000000, currency: 'KHR',
    children: [
      { id: 'kh-12', name: 'Phnom Penh', lat: 11.56, lng: 104.92, tier: 'restricted', biome: 'Urban Megacity', diff: [34, 20, 30, 56, 54, 50], pop: 2300000 },
      { id: 'kh-18', name: 'Sihanoukville', lat: 10.63, lng: 103.51, tier: 'open', biome: 'Coastal Haven', diff: [20, 10, 22, 60, 46, 54], pop: 300000 }
    ]
  },
  la: {
    name: 'Laos', geo: { lat: 19.86, lng: 102.49, flag: '🇱🇦', region: 'Asia' }, accessTier: 'open', biome: 'River Frontier',
    lore: 'Landlocked Mekong economy with gradual infrastructure growth and low baseline costs.',
    stats: { wealth: { monthly_usd: 600, annual_usd: 7200 }, language: { primary: 'Lao', others: ['French', 'English'], test: 'none', level: 'none' }, skills: { preferred: ['Logistics', 'Hydropower', 'Tourism', 'Trade'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Business/work visa and permit process', detail: 'Employer or enterprise sponsorship is common for legal long-term work.', options: [] }],
    difficulty: { overall: 24, cost: 12, security: 76, safety: 66, quality: 46, language: 54 }, population: 7600000, currency: 'LAK',
    children: [
      { id: 'la-vt', name: 'Vientiane Prefecture', lat: 17.98, lng: 102.63, tier: 'open', biome: 'Urban Outpost', diff: [30, 16, 26, 64, 50, 52], pop: 1000000 },
      { id: 'la-lp', name: 'Luang Prabang Province', lat: 19.88, lng: 102.13, tier: 'open', biome: 'Cultural Heartland', diff: [18, 8, 20, 68, 44, 56], pop: 480000 }
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
    quests: [{ id: 'local_path', type: 'hard', label: 'National pathway + local settlement', detail: 'Local compliance and labor demand shape onboarding speed.', options: [] }],
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
