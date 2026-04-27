import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const usPath = path.join(root, 'data', 'zones', 'us.json');
const geoPath = path.join(root, 'data', 'geo', 'us-admin1-110m.geojson');

const us = JSON.parse(fs.readFileSync(usPath, 'utf8'));
const geo = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

const existing = new Set(us.zones.map(z => z.id));

const regionProfile = {
  Northeast: { tier: 'locked', biome: 'Financial Citadel', base: { overall: 66, cost: 78, security: 28, safety: 66, quality: 76, language: 5 }, wealth: 4200, skills: ['Finance', 'Biotech', 'Education', 'Healthcare'] },
  South: { tier: 'restricted', biome: 'Cultural Heartland', base: { overall: 54, cost: 50, security: 28, safety: 54, quality: 66, language: 8 }, wealth: 2800, skills: ['Healthcare', 'Manufacturing', 'Logistics', 'Agriculture'] },
  Midwest: { tier: 'restricted', biome: 'Industrial Heartland', base: { overall: 50, cost: 42, security: 28, safety: 62, quality: 70, language: 5 }, wealth: 2600, skills: ['Manufacturing', 'Logistics', 'Agribusiness', 'Healthcare'] },
  West: { tier: 'restricted', biome: 'Mountain Stronghold', base: { overall: 58, cost: 62, security: 28, safety: 60, quality: 74, language: 6 }, wealth: 3300, skills: ['Tech', 'Energy', 'Tourism', 'Aerospace'] }
};

const special = {
  'US-DC': { tier: 'locked', biome: 'Federal Citadel', boost: { overall: 12, cost: 14, safety: -4 }, wealth: 5200, skills: ['Government', 'Law', 'Policy', 'Cybersecurity'] },
  'US-HI': { tier: 'restricted', biome: 'Island Sanctuary', boost: { cost: 14, overall: 8, quality: 6 }, wealth: 3600, skills: ['Tourism', 'Defense', 'Healthcare', 'Hospitality'] },
  'US-AK': { tier: 'restricted', biome: 'Arctic Frontier', boost: { security: -4, overall: 6, quality: -4 }, wealth: 3400, skills: ['Energy', 'Logistics', 'Fisheries', 'Healthcare'] },
  'US-NY': { tier: 'locked', biome: 'Financial Citadel', boost: { overall: 10, cost: 14 }, wealth: 4800 },
  'US-CA': { tier: 'locked', biome: 'Tech Nexus', boost: { overall: 14, cost: 16 }, wealth: 5200 },
  'US-MA': { tier: 'locked', biome: 'Knowledge Bastion', boost: { overall: 8, cost: 10 }, wealth: 4600, skills: ['Biotech', 'Education', 'Healthcare', 'Finance'] },
  'US-WV': { tier: 'open', biome: 'Mountain Stronghold', boost: { overall: -10, cost: -12, safety: 4 }, wealth: 1900 },
  'US-MS': { tier: 'open', biome: 'Delta Frontier', boost: { overall: -8, cost: -10, safety: -6, quality: -8 }, wealth: 1800 }
};

function clamp(v, lo = 0, hi = 100) {
  return Math.max(lo, Math.min(hi, Math.round(v)));
}

function makeZone(feat) {
  const p = feat.properties || {};
  const iso = String(p.iso_3166_2 || '').toUpperCase();
  const id = iso.toLowerCase();
  const profile = regionProfile[p.region] || regionProfile.South;
  const sp = special[iso] || {};
  const b = profile.base;
  const boost = sp.boost || {};
  // difficulty.cost = COL strain (high in expensive states). UI Affluence is derived from wealth.monthly_usd in the app, not from cost.
  const diff = {
    overall: clamp((b.overall ?? 50) + (boost.overall || 0), 18, 95),
    cost: clamp((b.cost ?? 50) + (boost.cost || 0), 12, 98),
    security: clamp((b.security ?? 28) + (boost.security || 0), 5, 95),
    safety: clamp((b.safety ?? 60) + (boost.safety || 0), 20, 95),
    quality: clamp((b.quality ?? 70) + (boost.quality || 0), 25, 95),
    language: clamp((b.language ?? 6) + (boost.language || 0), 0, 25)
  };
  const monthly = Math.round((sp.wealth || profile.wealth) * (0.92 + (diff.cost - 50) / 250));

  return {
    id,
    name: p.name || iso,
    level: 'state',
    parent: 'us',
    hasChildren: false,
    geo: {
      lat: Number(p.latitude) || 0,
      lng: Number(p.longitude) || 0,
      flag: '🏴',
      region: 'Americas'
    },
    accessTier: sp.tier || profile.tier,
    biome: sp.biome || profile.biome,
    lore: `${p.name || iso} is a major progression zone within the US route, with distinct economy, safety profile, and sector demand.`,
    stats: {
      wealth: { monthly_usd: monthly, annual_usd: monthly * 12 },
      language: { primary: 'English', others: ['Spanish'], test: 'none', level: 'none' },
      skills: { preferred: sp.skills || profile.skills, degreeRequired: false },
      health: 'insurance_required',
      age: { min: null, max: null }
    },
    quests: [
      {
        id: 'fed_work_auth',
        type: 'hard',
        label: 'Federal Work Authorization',
        detail: 'US work visa, permanent residency, or citizenship required for legal employment.',
        options: ['H-1B', 'L-1', 'O-1', 'Employment-based Green Card']
      },
      {
        id: 'settlement',
        type: 'soft',
        label: 'Housing and Local Setup',
        detail: 'Housing competition, transport, and insurance complexity vary heavily by metro area.',
        options: []
      }
    ],
    difficulty: diff,
    population: null,
    currency: 'USD'
  };
}

const toAdd = [];
for (const feat of geo.features) {
  const iso = String(feat.properties?.iso_3166_2 || '').toLowerCase();
  if (!iso.startsWith('us-')) continue;
  if (existing.has(iso)) continue;
  toAdd.push(makeZone(feat));
}

us.zones.push(...toAdd);
us.zones.sort((a, b) => a.id.localeCompare(b.id));
us.meta = us.meta || {};
us.meta.schemaVersion = 2;
us.meta.parent = 'us';
us.meta.updatedAt = '2026-Q2';
us.meta.totalZones = us.zones.length;

fs.writeFileSync(usPath, JSON.stringify(us, null, 2) + '\n', 'utf8');
console.log('added', toAdd.length, 'total', us.zones.length);
