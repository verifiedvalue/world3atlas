/**
 * One-time migration: difficulty.access (entry strain, high = harder) →
 * difficulty.security (readiness 0–100, higher = better) = round(100 − access).
 */
import fs from 'node:fs';
import path from 'node:path';

const zonesDir = path.join(process.cwd(), 'data', 'zones');
let files = 0;
let zones = 0;

for (const name of fs.readdirSync(zonesDir)) {
  if (!name.endsWith('.json') || name === 'schema.json') continue;
  const fp = path.join(zonesDir, name);
  const raw = fs.readFileSync(fp, 'utf8');
  const j = JSON.parse(raw);
  let changed = false;
  for (const z of j.zones || []) {
    const d = z.difficulty;
    if (!d || d.access == null) continue;
    if (d.security != null) {
      delete d.access;
      changed = true;
      continue;
    }
    const a = Number(d.access);
    d.security = Math.max(0, Math.min(100, Math.round(Number.isFinite(a) ? 100 - a : 0)));
    delete d.access;
    changed = true;
    zones++;
  }
  if (changed) {
    fs.writeFileSync(fp, JSON.stringify(j, null, 2) + '\n', 'utf8');
    console.log(name);
    files++;
  }
}
console.log('Done. Files:', files, 'zones migrated:', zones);
