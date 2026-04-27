import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const countriesPath = path.join(root, 'data', 'zones', 'countries.json');
const worldGeoPath = path.join(root, 'data', 'geo', 'ne_110m_admin_0_countries.geojson');

const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));
const worldGeo = JSON.parse(fs.readFileSync(worldGeoPath, 'utf8'));

const existing = new Set(countries.zones.map(z => z.id));

const regionToBiome = {
  Europe: 'Cultural Heartland',
  Asia: 'Tech Nexus',
  Africa: 'Steppe Frontier',
  Oceania: 'Coastal Haven',
  Americas: 'Cultural Heartland',
  'North America': 'Prairie Expanse',
  'South America': 'Rainforest Enclave',
  Antarctica: 'Frozen Expanse'
};

function flagFromIso2(iso2) {
  const t = String(iso2 || '').toUpperCase();
  if (!/^[A-Z]{2}$/.test(t)) return '🗺️';
  const A = 0x1f1e6;
  const first = t.charCodeAt(0) - 65 + A;
  const second = t.charCodeAt(1) - 65 + A;
  return String.fromCodePoint(first, second);
}

// cost = COL strain (high-income templates are expensive). security = readiness 0–100 (higher = better), same as legacy (100 − access strain).
function difficultyFromIncome(inc) {
  const s = String(inc || '').toLowerCase();
  if (s.includes('high income')) return { overall: 58, cost: 76, security: 38, safety: 78, quality: 82, language: 38 };
  if (s.includes('upper middle')) return { overall: 42, cost: 48, security: 55, safety: 62, quality: 65, language: 42 };
  if (s.includes('lower middle')) return { overall: 34, cost: 30, security: 60, safety: 52, quality: 50, language: 46 };
  return { overall: 30, cost: 22, security: 62, safety: 48, quality: 44, language: 40 };
}

function tierFromIncome(inc) {
  const s = String(inc || '').toLowerCase();
  if (s.includes('high income')) return 'restricted';
  if (s.includes('upper middle')) return 'open';
  if (s.includes('lower middle')) return 'open';
  return 'open';
}

function wealthFromIncome(inc) {
  const s = String(inc || '').toLowerCase();
  if (s.includes('high income')) return 2600;
  if (s.includes('upper middle')) return 1200;
  if (s.includes('lower middle')) return 750;
  return 500;
}

function normalizeRegion(props) {
  return props.REGION_UN || props.CONTINENT || 'Global';
}

const additions = [];

for (const f of worldGeo.features) {
  const p = f.properties || {};
  const iso2 = String(p.ISO_A2 || '').toUpperCase();
  if (!iso2 || iso2 === '-99') continue;
  const id = iso2.toLowerCase();
  if (existing.has(id)) continue;

  const name = p.NAME_EN || p.NAME_LONG || p.NAME || iso2;
  const region = normalizeRegion(p);
  const income = p.INCOME_GRP || '';
  const monthly = wealthFromIncome(income);
  const tier = tierFromIncome(income);

  additions.push({
    id,
    name,
    level: 'country',
    parent: null,
    hasChildren: false,
    geo: {
      lat: Number.isFinite(p.LABEL_Y) ? p.LABEL_Y : 0,
      lng: Number.isFinite(p.LABEL_X) ? p.LABEL_X : 0,
      flag: flagFromIso2(iso2),
      region
    },
    accessTier: tier,
    biome: regionToBiome[region] || 'Border Territory',
    lore: `${name} is now mapped as a baseline world zone. Detailed regional content can be layered in later phases.`,
    stats: {
      wealth: { monthly_usd: monthly, annual_usd: monthly * 12 },
      language: { primary: 'Local / National', others: [], test: 'none', level: 'none' },
      skills: { preferred: ['General Skills', 'Trade', 'Services'], degreeRequired: false },
      health: 'basic',
      age: { min: null, max: null }
    },
    quests: [
      {
        id: 'entry_path',
        type: 'hard',
        label: 'Entry and residency pathway',
        detail: 'Check official immigration channels for visa, permit, and residency requirements.',
        options: []
      }
    ],
    difficulty: difficultyFromIncome(income),
    population: Number.isFinite(p.POP_EST) ? p.POP_EST : null,
    currency: 'Local Currency'
  });
}

countries.zones.push(...additions);
countries.zones.sort((a, b) => a.name.localeCompare(b.name));
countries.meta.totalZones = countries.zones.length;
countries.meta.updatedAt = '2026-Q2';

fs.writeFileSync(countriesPath, JSON.stringify(countries, null, 2) + '\n', 'utf8');

console.log(`Added countries: ${additions.length}`);
console.log(`Total countries now: ${countries.zones.length}`);
