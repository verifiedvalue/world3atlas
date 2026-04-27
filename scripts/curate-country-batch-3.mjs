import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const curated = {
  gr: {
    name: 'Greece', geo: { lat: 39.07, lng: 21.82, flag: '🇬🇷', region: 'Europe' }, accessTier: 'open', biome: 'Coastal Haven',
    lore: 'Mediterranean economy balancing tourism, shipping, and growing digital services hubs.',
    stats: { wealth: { monthly_usd: 1500, annual_usd: 18000 }, language: { primary: 'Greek', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'Shipping', 'Tech', 'Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Work/residence permit pathway', detail: 'Employer-backed permits and long-stay routes vary by profession.', options: [] }],
    difficulty: { overall: 40, cost: 42, security: 62, safety: 74, quality: 72, language: 48 }, population: 10300000, currency: 'EUR',
    children: [
      { id: 'gr-a1', name: 'Attica', lat: 37.98, lng: 23.73, tier: 'restricted', biome: 'Urban Megacity', diff: [48, 50, 42, 70, 76, 50], pop: 3800000 },
      { id: 'gr-b', name: 'Central Macedonia', lat: 40.64, lng: 22.94, tier: 'open', biome: 'Cultural Heartland', diff: [34, 34, 34, 76, 70, 46], pop: 1800000 }
    ]
  },
  hu: {
    name: 'Hungary', geo: { lat: 47.16, lng: 19.5, flag: '🇭🇺', region: 'Europe' }, accessTier: 'restricted', biome: 'Cultural Heartland',
    lore: 'Central European growth economy with strong manufacturing and shared-services sectors.',
    stats: { wealth: { monthly_usd: 1400, annual_usd: 16800 }, language: { primary: 'Hungarian', others: ['English', 'German'], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'Automotive', 'Tech', 'Finance Ops'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Single Permit for work and stay', detail: 'Employment contract and permit category determine entry route.', options: [] }],
    difficulty: { overall: 38, cost: 34, security: 56, safety: 74, quality: 70, language: 72 }, population: 9600000, currency: 'HUF',
    children: [
      { id: 'hu-bu', name: 'Budapest', lat: 47.497, lng: 19.04, tier: 'restricted', biome: 'Urban Megacity', diff: [46, 42, 46, 72, 76, 68], pop: 1700000 },
      { id: 'hu-gs', name: 'Gyor-Moson-Sopron', lat: 47.687, lng: 17.65, tier: 'restricted', biome: 'Industrial Heartland', diff: [34, 30, 42, 78, 72, 70], pop: 470000 }
    ]
  },
  ro: {
    name: 'Romania', geo: { lat: 45.94, lng: 24.97, flag: '🇷🇴', region: 'Europe' }, accessTier: 'open', biome: 'Border Territory',
    lore: 'Rapidly modernizing EU member with competitive tech talent and lower operating costs.',
    stats: { wealth: { monthly_usd: 1300, annual_usd: 15600 }, language: { primary: 'Romanian', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Tech', 'BPO', 'Manufacturing', 'Construction'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Work authorization and residence registration', detail: 'Employer sponsorship remains typical for non-EU nationals.', options: [] }],
    difficulty: { overall: 34, cost: 30, security: 64, safety: 68, quality: 68, language: 58 }, population: 19000000, currency: 'RON',
    children: [
      { id: 'ro-b', name: 'Bucharest-Ilfov', lat: 44.43, lng: 26.1, tier: 'restricted', biome: 'Urban Megacity', diff: [42, 36, 38, 64, 72, 54], pop: 2300000 },
      { id: 'ro-cj', name: 'Cluj', lat: 46.77, lng: 23.59, tier: 'open', biome: 'Tech Nexus', diff: [30, 26, 32, 72, 70, 56], pop: 740000 }
    ]
  },
  bg: {
    name: 'Bulgaria', geo: { lat: 42.73, lng: 25.49, flag: '🇧🇬', region: 'Europe' }, accessTier: 'open', biome: 'Border Territory',
    lore: 'Cost-efficient EU location with growing outsourcing and technology sectors.',
    stats: { wealth: { monthly_usd: 1100, annual_usd: 13200 }, language: { primary: 'Bulgarian', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['BPO', 'Tech', 'Logistics', 'Manufacturing'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'Long-stay visa D + residence', detail: 'Employer sponsorship or specific residence purpose required.', options: [] }],
    difficulty: { overall: 32, cost: 24, security: 66, safety: 70, quality: 64, language: 60 }, population: 6400000, currency: 'BGN',
    children: [
      { id: 'bg-22', name: 'Sofia City', lat: 42.697, lng: 23.322, tier: 'restricted', biome: 'Urban Megacity', diff: [38, 30, 36, 68, 68, 58], pop: 1300000 },
      { id: 'bg-03', name: 'Varna', lat: 43.214, lng: 27.915, tier: 'open', biome: 'Coastal Haven', diff: [28, 22, 30, 72, 64, 56], pop: 470000 }
    ]
  },
  hr: {
    name: 'Croatia', geo: { lat: 45.1, lng: 15.2, flag: '🇭🇷', region: 'Europe' }, accessTier: 'open', biome: 'Coastal Haven',
    lore: 'Adriatic destination with growing remote-work and tourism-oriented economy.',
    stats: { wealth: { monthly_usd: 1400, annual_usd: 16800 }, language: { primary: 'Croatian', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Tourism', 'Services', 'Tech', 'Logistics'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'digital_nomad', type: 'hard', label: 'Temporary stay pathways', detail: 'Includes work-based permits and digital nomad options.', options: [] }],
    difficulty: { overall: 36, cost: 38, security: 68, safety: 78, quality: 72, language: 50 }, population: 3900000, currency: 'EUR',
    children: [
      { id: 'hr-21', name: 'City of Zagreb', lat: 45.815, lng: 15.982, tier: 'restricted', biome: 'Cultural Heartland', diff: [42, 44, 36, 76, 76, 48], pop: 770000 },
      { id: 'hr-17', name: 'Split-Dalmatia', lat: 43.51, lng: 16.44, tier: 'open', biome: 'Coastal Haven', diff: [30, 32, 30, 80, 70, 50], pop: 450000 }
    ]
  },
  si: {
    name: 'Slovenia', geo: { lat: 46.15, lng: 14.99, flag: '🇸🇮', region: 'Europe' }, accessTier: 'restricted', biome: 'Alpine Fortress',
    lore: 'Small high-quality EU economy with strong logistics and manufacturing connectivity.',
    stats: { wealth: { monthly_usd: 1800, annual_usd: 21600 }, language: { primary: 'Slovene', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Manufacturing', 'Logistics', 'Pharma', 'Tech'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'single_permit', type: 'hard', label: 'Single permit process', detail: 'Employment contract and permit filing required for most non-EU workers.', options: [] }],
    difficulty: { overall: 42, cost: 46, security: 58, safety: 84, quality: 82, language: 56 }, population: 2100000, currency: 'EUR',
    children: [
      { id: 'si-061', name: 'Ljubljana', lat: 46.056, lng: 14.505, tier: 'restricted', biome: 'Cultural Heartland', diff: [48, 54, 44, 84, 84, 54], pop: 300000 },
      { id: 'si-070', name: 'Maribor', lat: 46.554, lng: 15.646, tier: 'open', biome: 'Industrial Heartland', diff: [34, 36, 38, 86, 78, 56], pop: 115000 }
    ]
  },
  sk: {
    name: 'Slovakia', geo: { lat: 48.67, lng: 19.7, flag: '🇸🇰', region: 'Europe' }, accessTier: 'restricted', biome: 'Industrial Heartland',
    lore: 'Automotive and manufacturing-heavy EU economy with lower costs than Western core markets.',
    stats: { wealth: { monthly_usd: 1500, annual_usd: 18000 }, language: { primary: 'Slovak', others: ['English'], test: 'none', level: 'none' }, skills: { preferred: ['Automotive', 'Manufacturing', 'Engineering', 'IT'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'work_residence', type: 'hard', label: 'Work permit + temporary residence', detail: 'Employer process plus police registration for residence.', options: [] }],
    difficulty: { overall: 38, cost: 34, security: 60, safety: 80, quality: 72, language: 62 }, population: 5400000, currency: 'EUR',
    children: [
      { id: 'sk-bl', name: 'Bratislava Region', lat: 48.148, lng: 17.107, tier: 'restricted', biome: 'Urban Megacity', diff: [46, 42, 44, 78, 76, 58], pop: 730000 },
      { id: 'sk-ki', name: 'Kosice Region', lat: 48.716, lng: 21.261, tier: 'open', biome: 'Industrial Heartland', diff: [30, 26, 36, 82, 70, 60], pop: 780000 }
    ]
  },
  lt: {
    name: 'Lithuania', geo: { lat: 55.17, lng: 23.88, flag: '🇱🇹', region: 'Europe' }, accessTier: 'open', biome: 'Border Territory',
    lore: 'Digitally advanced Baltic economy with competitive fintech and service ecosystems.',
    stats: { wealth: { monthly_usd: 1600, annual_usd: 19200 }, language: { primary: 'Lithuanian', others: ['English', 'Russian'], test: 'none', level: 'none' }, skills: { preferred: ['Fintech', 'IT', 'Logistics', 'Shared Services'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'permit', type: 'hard', label: 'National visa D / temporary residence', detail: 'Work and startup pathways exist with employer or business basis.', options: [] }],
    difficulty: { overall: 36, cost: 36, security: 66, safety: 82, quality: 74, language: 60 }, population: 2800000, currency: 'EUR',
    children: [
      { id: 'lt-vl', name: 'Vilnius County', lat: 54.687, lng: 25.279, tier: 'restricted', biome: 'Tech Nexus', diff: [42, 42, 36, 82, 78, 56], pop: 840000 },
      { id: 'lt-ku', name: 'Kaunas County', lat: 54.898, lng: 23.903, tier: 'open', biome: 'Industrial Heartland', diff: [30, 30, 32, 84, 72, 58], pop: 560000 }
    ]
  },
  lv: {
    name: 'Latvia', geo: { lat: 56.88, lng: 24.6, flag: '🇱🇻', region: 'Europe' }, accessTier: 'open', biome: 'Border Territory',
    lore: 'Baltic service economy with strategic logistics position and moderate living costs.',
    stats: { wealth: { monthly_usd: 1500, annual_usd: 18000 }, language: { primary: 'Latvian', others: ['English', 'Russian'], test: 'none', level: 'none' }, skills: { preferred: ['Logistics', 'IT', 'Finance Ops', 'Manufacturing'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'residence', type: 'hard', label: 'Work visa and residence permit', detail: 'Employment-driven permits are primary route for long-term stay.', options: [] }],
    difficulty: { overall: 36, cost: 34, security: 66, safety: 80, quality: 72, language: 62 }, population: 1900000, currency: 'EUR',
    children: [
      { id: 'lv-rix', name: 'Riga Region', lat: 56.949, lng: 24.105, tier: 'restricted', biome: 'Urban Megacity', diff: [42, 40, 36, 78, 76, 58], pop: 900000 },
      { id: 'lv-kur', name: 'Kurzeme', lat: 56.97, lng: 21.96, tier: 'open', biome: 'Coastal Haven', diff: [30, 28, 32, 82, 70, 60], pop: 240000 }
    ]
  },
  ee: {
    name: 'Estonia', geo: { lat: 58.6, lng: 25.01, flag: '🇪🇪', region: 'Europe' }, accessTier: 'restricted', biome: 'Tech Nexus',
    lore: 'Highly digital Baltic state with startup-friendly governance and lean administration.',
    stats: { wealth: { monthly_usd: 1600, annual_usd: 19200 }, language: { primary: 'Estonian', others: ['English', 'Russian'], test: 'none', level: 'none' }, skills: { preferred: ['Software', 'Cybersecurity', 'Digital Business', 'Fintech'], degreeRequired: false }, health: 'basic', age: { min: null, max: null } },
    quests: [{ id: 'nomad', type: 'hard', label: 'Digital Nomad / employment permit', detail: 'Remote work and startup routes are relatively streamlined.', options: [] }],
    difficulty: { overall: 40, cost: 42, security: 60, safety: 84, quality: 78, language: 42 }, population: 1330000, currency: 'EUR',
    children: [
      { id: 'ee-har', name: 'Harju County', lat: 59.437, lng: 24.753, tier: 'restricted', biome: 'Tech Nexus', diff: [46, 48, 42, 84, 80, 40], pop: 650000 },
      { id: 'ee-tar', name: 'Tartu County', lat: 58.378, lng: 26.729, tier: 'open', biome: 'Cultural Heartland', diff: [34, 34, 36, 86, 78, 42], pop: 160000 }
    ]
  }
};

function makeChild(country, c) {
  const [overall, cost, accessStrain, safety, quality, language] = c.diff;
  const security = Math.max(0, Math.min(100, Math.round(100 - accessStrain)));
  const monthly = Math.round(country.stats.wealth.monthly_usd * (cost > 60 ? 1.12 : 0.9));
  return {
    id: c.id,
    name: c.name,
    level: 'state',
    parent: country.id,
    hasChildren: false,
    geo: { lat: c.lat, lng: c.lng, flag: '🏴', region: country.geo.region },
    accessTier: c.tier,
    biome: c.biome,
    lore: `${c.name} is a curated sub-region within ${country.name}.`,
    stats: {
      wealth: { monthly_usd: monthly, annual_usd: monthly * 12 },
      language: country.stats.language,
      skills: country.stats.skills,
      health: country.stats.health,
      age: country.stats.age
    },
    quests: [{ id: 'local_path', type: 'hard', label: 'National pathway + local labor fit', detail: 'Local demand and housing/settlement dynamics impact progression speed.', options: [] }],
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
