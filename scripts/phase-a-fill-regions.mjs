import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const zonesDir = path.join(root, 'data', 'zones');
const countriesPath = path.join(zonesDir, 'countries.json');
const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

const templates = {
  sg: [
    { suffix: 'cen', name: 'Central Core', lat: 1.302, lng: 103.84, biome: 'Financial Citadel', tier: 'locked' },
    { suffix: 'we', name: 'West Innovation Belt', lat: 1.344, lng: 103.69, biome: 'Tech Nexus', tier: 'restricted' }
  ],
  th: [
    { suffix: '10', name: 'Bangkok Metro', lat: 13.756, lng: 100.501, biome: 'Urban Megacity', tier: 'restricted' },
    { suffix: '50', name: 'Chiang Mai', lat: 18.788, lng: 98.985, biome: 'Tropical Sanctuary', tier: 'open' }
  ],
  nl: [
    { suffix: 'nh', name: 'North Holland', lat: 52.52, lng: 4.79, biome: 'Urban Megacity', tier: 'restricted' },
    { suffix: 'zh', name: 'South Holland', lat: 52.01, lng: 4.36, biome: 'Financial Citadel', tier: 'restricted' }
  ],
  nz: [
    { suffix: 'auk', name: 'Auckland', lat: -36.848, lng: 174.763, biome: 'Coastal Haven', tier: 'restricted' },
    { suffix: 'wgn', name: 'Wellington', lat: -41.286, lng: 174.776, biome: 'Cultural Heartland', tier: 'restricted' }
  ],
  es: [
    { suffix: 'md', name: 'Community of Madrid', lat: 40.416, lng: -3.703, biome: 'Urban Megacity', tier: 'restricted' },
    { suffix: 'ct', name: 'Catalonia', lat: 41.385, lng: 2.173, biome: 'Cultural Heartland', tier: 'restricted' }
  ],
  br: [
    { suffix: 'sp', name: 'Sao Paulo', lat: -23.55, lng: -46.63, biome: 'Financial Citadel', tier: 'restricted' },
    { suffix: 'rj', name: 'Rio de Janeiro', lat: -22.906, lng: -43.172, biome: 'Coastal Haven', tier: 'open' }
  ],
  id: [
    { suffix: 'jk', name: 'Jakarta', lat: -6.208, lng: 106.845, biome: 'Urban Megacity', tier: 'restricted' },
    { suffix: 'ba', name: 'Bali', lat: -8.409, lng: 115.188, biome: 'Tropical Sanctuary', tier: 'open' }
  ],
  ae: [
    { suffix: 'du', name: 'Dubai', lat: 25.204, lng: 55.271, biome: 'Financial Citadel', tier: 'locked' },
    { suffix: 'az', name: 'Abu Dhabi', lat: 24.454, lng: 54.377, biome: 'Desert Outpost', tier: 'restricted' }
  ],
  fr: [
    { suffix: 'idf', name: 'Ile-de-France', lat: 48.856, lng: 2.352, biome: 'Financial Citadel', tier: 'locked' },
    { suffix: 'ara', name: 'Auvergne-Rhone-Alpes', lat: 45.764, lng: 4.836, biome: 'Alpine Fortress', tier: 'restricted' }
  ],
  kr: [
    { suffix: '11', name: 'Seoul Capital Area', lat: 37.566, lng: 126.978, biome: 'Tech Nexus', tier: 'restricted' },
    { suffix: '26', name: 'Busan Corridor', lat: 35.179, lng: 129.075, biome: 'Industrial Heartland', tier: 'restricted' }
  ],
  gb: [
    { suffix: 'eng', name: 'England', lat: 52.355, lng: -1.174, biome: 'Financial Citadel', tier: 'locked' },
    { suffix: 'sct', name: 'Scotland', lat: 56.491, lng: -4.203, biome: 'Alpine Fortress', tier: 'restricted' }
  ],
  ch: [
    { suffix: 'zh', name: 'Zurich Region', lat: 47.376, lng: 8.541, biome: 'Financial Citadel', tier: 'locked' },
    { suffix: 'ge', name: 'Geneva Arc', lat: 46.204, lng: 6.143, biome: 'Cultural Heartland', tier: 'locked' }
  ],
  se: [
    { suffix: 'ab', name: 'Stockholm County', lat: 59.329, lng: 18.068, biome: 'Nordic Citadel', tier: 'restricted' },
    { suffix: 'o', name: 'Vastra Gotaland', lat: 57.708, lng: 11.974, biome: 'Coastal Haven', tier: 'restricted' }
  ],
  co: [
    { suffix: 'dc', name: 'Bogota District', lat: 4.711, lng: -74.072, biome: 'Urban Megacity', tier: 'open' },
    { suffix: 'ant', name: 'Antioquia', lat: 6.244, lng: -75.581, biome: 'Cultural Heartland', tier: 'open' }
  ],
  pl: [
    { suffix: 'mz', name: 'Mazowieckie', lat: 52.229, lng: 21.012, biome: 'Urban Megacity', tier: 'restricted' },
    { suffix: 'ds', name: 'Lower Silesia', lat: 51.107, lng: 17.038, biome: 'Industrial Heartland', tier: 'restricted' }
  ],
  gh: [
    { suffix: 'aa', name: 'Greater Accra', lat: 5.603, lng: -0.187, biome: 'Cultural Heartland', tier: 'open' },
    { suffix: 'as', name: 'Ashanti Region', lat: 6.688, lng: -1.624, biome: 'Steppe Frontier', tier: 'open' }
  ],
  cz: [
    { suffix: 'pr', name: 'Prague Region', lat: 50.075, lng: 14.438, biome: 'Cultural Heartland', tier: 'restricted' },
    { suffix: 'jm', name: 'South Moravian', lat: 49.195, lng: 16.606, biome: 'Industrial Heartland', tier: 'restricted' }
  ],
  my: [
    { suffix: 'kl', name: 'Kuala Lumpur', lat: 3.139, lng: 101.686, biome: 'Urban Megacity', tier: 'open' },
    { suffix: 'pg', name: 'Penang', lat: 5.414, lng: 100.329, biome: 'Coastal Haven', tier: 'open' }
  ],
  za: [
    { suffix: 'gp', name: 'Gauteng', lat: -26.204, lng: 28.047, biome: 'Urban Megacity', tier: 'open' },
    { suffix: 'wc', name: 'Western Cape', lat: -33.924, lng: 18.424, biome: 'Coastal Haven', tier: 'open' }
  ],
  cr: [
    { suffix: 'sj', name: 'San Jose Valley', lat: 9.928, lng: -84.09, biome: 'Rainforest Enclave', tier: 'open' },
    { suffix: 'gu', name: 'Guanacaste', lat: 10.626, lng: -85.443, biome: 'Tropical Sanctuary', tier: 'open' }
  ],
  ua: [
    { suffix: '30', name: 'Kyiv Region', lat: 50.45, lng: 30.523, biome: 'Border Territory', tier: 'fortress' },
    { suffix: '46', name: 'Lviv Region', lat: 49.839, lng: 24.029, biome: 'Cultural Heartland', tier: 'fortress' }
  ]
};

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function adjustedDifficulty(base, idx, tier) {
  const mod = idx === 0 ? 6 : -4;
  const out = { ...base };
  out.overall = clamp(base.overall + mod, 5, 98);
  out.cost = clamp(base.cost + (idx === 0 ? 8 : -6), 5, 98);
  const secAdj = tier === 'locked' || tier === 'fortress' ? -6 : 2;
  out.security = clamp(base.security + secAdj, 5, 98);
  out.safety = clamp(base.safety + (idx === 0 ? 2 : -2), 2, 98);
  out.quality = clamp(base.quality + (idx === 0 ? 4 : -4), 2, 98);
  out.language = clamp(base.language + (idx === 0 ? 4 : -2), 0, 98);
  return out;
}

function makeZone(country, region, idx) {
  const id = `${country.id}-${region.suffix}`.toLowerCase();
  const monthly = Math.round(country.stats.wealth.monthly_usd * (idx === 0 ? 1.18 : 0.88));
  return {
    id,
    name: region.name,
    level: 'state',
    parent: country.id,
    hasChildren: false,
    geo: { lat: region.lat, lng: region.lng, flag: '🏴', region: country.geo.region },
    accessTier: region.tier,
    biome: region.biome,
    lore: `${region.name} acts as a major progression zone inside ${country.name}, with region-specific economy and entry friction.`,
    stats: {
      wealth: { monthly_usd: monthly, annual_usd: monthly * 12 },
      language: country.stats.language,
      skills: country.stats.skills,
      health: country.stats.health,
      age: country.stats.age
    },
    quests: [
      {
        id: 'regional_path',
        type: 'hard',
        label: `${country.name} national immigration route`,
        detail: `Regional entry relies on national rules plus local employer or economic fit.`,
        options: country.quests?.[0]?.options || []
      },
      {
        id: 'local_settlement',
        type: 'soft',
        label: 'Local settlement readiness',
        detail: 'Housing search, registration, and language adaptation significantly affect first-year outcomes.',
        options: []
      }
    ],
    difficulty: adjustedDifficulty(country.difficulty, idx, region.tier),
    population: Math.round(country.population * (idx === 0 ? 0.3 : 0.18)),
    currency: country.currency
  };
}

let created = 0;
let enabled = 0;

for (const c of countries.zones) {
  if (c.level !== 'country') continue;
  const regions = templates[c.id];
  if (!regions) continue;

  if (!c.hasChildren || !c.childrenFile) {
    c.hasChildren = true;
    c.childrenFile = c.id;
    enabled++;
  }

  const file = path.join(zonesDir, `${c.id}.json`);
  if (fs.existsSync(file)) continue;

  const zones = regions.map((r, i) => makeZone(c, r, i));
  const payload = { meta: { schemaVersion: 2, parent: c.id }, zones };
  fs.writeFileSync(file, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  created++;
}

fs.writeFileSync(countriesPath, JSON.stringify(countries, null, 2) + '\n', 'utf8');
console.log(`Created region files: ${created}`);
console.log(`Countries newly enabled for children: ${enabled}`);
