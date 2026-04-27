'use strict';
/**
 * Phase 1: zone data from data/zones/*.json (childrenFile), registry, id-based drill-down.
 * Open via a local HTTP server (page URL directory must contain data/zones/).
 */
const DATA_BASE = 'data/zones/';
const GEO_BASE = 'data/geo/';

let countriesData = null;
let worldGeo = null;
/** US state/province polygons (iso_3166_2 e.g. US-CA) — loaded when drilling into United States. */
let usAdmin1Geo = null;
/** @type {Map<string, object>} */
const zoneRegistry = new Map();

function normalizeZonesPayload(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.zones)) return data.zones;
  return [];
}

function registerZones(zones) {
  for (const z of zones) zoneRegistry.set(z.id, z);
}

async function fetchZoneFile(filename) {
  const res = await fetch(DATA_BASE + filename, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${filename} → HTTP ${res.status}`);
  return res.json();
}

function showDataError(msg) {
  const el = document.getElementById('data-error');
  if (el) {
    el.textContent = msg;
    el.classList.add('visible');
  }
}

function hideDataError() {
  const el = document.getElementById('data-error');
  if (el) el.classList.remove('visible');
}

async function ensureCountries() {
  if (countriesData) return;
  const data = await fetchZoneFile('countries.json');
  countriesData = data;
  registerZones(normalizeZonesPayload(data));
}

async function loadWorldGeojson() {
  try {
    const res = await fetch(GEO_BASE + 'ne_110m_admin_0_countries.geojson', { cache: 'force-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    worldGeo = await res.json();
  } catch (err) {
    console.warn('World land GeoJSON not available:', err);
    worldGeo = null;
  }
}

async function ensureUsAdmin1Geo() {
  if (usAdmin1Geo) return;
  try {
    const res = await fetch(GEO_BASE + 'us-admin1-110m.geojson', { cache: 'force-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    usAdmin1Geo = await res.json();
  } catch (err) {
    console.warn('US admin-1 GeoJSON not available:', err);
    usAdmin1Geo = null;
  }
}

function syncGlobeDetailLevel() {
  if (viewParentId === null) {
    currentLevel = 'world';
  } else {
    const first = activeZones[0];
    currentLevel = first && first.level === 'city' ? 'city' : 'country';
  }
}

async function loadWorld() {
  await ensureCountries();
  hideDataError();
  viewParentId = null;
  activeZones = countriesData.zones;
  usAdmin1Geo = null;
  syncGlobeDetailLevel();
  updateBreadcrumb();
  updateListPanel();
  updateHeaderStats();
}

async function loadChildrenOf(parentId) {
  const parent = zoneRegistry.get(parentId);
  if (!parent || !parent.hasChildren) return;
  const file = `${parent.childrenFile}.json`;
  try {
    const data = await fetchZoneFile(file);
    const zones = normalizeZonesPayload(data);
    if (!zones.length) {
      showDataError(`Empty zone list: ${file}`);
      return;
    }
    registerZones(zones);
    viewParentId = parentId;
    activeZones = zones;
    if (parentId === 'us' || String(parentId).startsWith('us-')) await ensureUsAdmin1Geo();
    syncGlobeDetailLevel();
    updateBreadcrumb();
    updateListPanel();
    hideDataError();
  } catch (err) {
    console.error(err);
    showDataError(`Failed to load ${file}: ${err.message}`);
  }
}

function ancestorChain(zoneId) {
  const rev = [];
  let id = zoneId;
  while (id) {
    const z = zoneRegistry.get(id);
    if (!z) break;
    rev.push(z);
    id = z.parent;
  }
  return rev.reverse();
}

function updateHeaderStats() {
  const zs = countriesData?.zones || [];
  const elTotal = document.getElementById('stat-zones');
  const elOpen = document.getElementById('stat-open');
  const elAvg = document.getElementById('stat-avg');
  if (!elTotal) return;
  elTotal.textContent = String(zs.length);
  elOpen.textContent = String(zs.filter(z => z.accessTier === 'open').length);
  const avg = zs.length
    ? Math.round(zs.reduce((a, z) => a + placeReadinessFromZone(z), 0) / zs.length)
    : 0;
  elAvg.textContent = String(avg);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// GLOBE RENDERER
// ══════════════════════════════════════════════════════

const canvas = document.getElementById('globe-canvas');
const ctx = canvas.getContext('2d');
let W, H, CX, CY, R;

let rotation = { x: 0.3, y: -0.5 };
let targetRotation = { x: 0.3, y: -0.5 };
let isDragging = false;
let lastMouse = { x: 0, y: 0 };
let dragStartMouse = { x: 0, y: 0 };
let dragTravelPx = 0;
let zoom = 1;
let targetZoom = 1;
let autoRotate = false;
let animFrame;

let currentLevel = 'world';
let viewParentId = null;
let activeZones = [];
let hoveredZone = null;

/** Per-drawGlobe memo so land/polygons don’t recompute readiness repeatedly. */
let readinessMemoFrame = null;

function memoPlaceReadiness(zone) {
  if (!zone) return 0;
  if (!readinessMemoFrame) return placeReadinessFromZone(zone);
  if (readinessMemoFrame.has(zone.id)) return readinessMemoFrame.get(zone.id);
  const v = placeReadinessFromZone(zone);
  readinessMemoFrame.set(zone.id, v);
  return v;
}

/**
 * When drilled into a parent, nudge hue by sibling rank (sorted by readiness) so
 * neighboring sub-zones read as a subtle gradient while staying tied to score.
 */
function siblingHueShift(zone) {
  if (viewParentId == null || !zone || activeZones.length < 2) return 0;
  const sorted = [...activeZones].sort(
    (a, b) => memoPlaceReadiness(a) - memoPlaceReadiness(b) || String(a.id).localeCompare(String(b.id))
  );
  const n = sorted.length;
  if (n < 2) return 0;
  const idx = sorted.findIndex(z => z.id === zone.id);
  if (idx < 0) return 0;
  const u = (idx / (n - 1)) - 0.5;
  return u * 16;
}

function hslToRgb(h, s, l) {
  h = ((((h % 360) + 360) % 360) / 360) * 6;
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 1) [r, g, b] = [c, x, 0];
  else if (h < 2) [r, g, b] = [x, c, 0];
  else if (h < 3) [r, g, b] = [0, c, x];
  else if (h < 4) [r, g, b] = [0, x, c];
  else if (h < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = l - c / 2;
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

/** Smooth readiness palette: low = deep red, high = green (HSL). */
function readinessToRgb(score, hueShift = 0) {
  const t = Math.max(0, Math.min(100, Number(score) || 0)) / 100;
  const h = Math.max(-14, Math.min(132, t * 118 + hueShift));
  const s = 0.74 + t * 0.12;
  const light = 0.34 + t * 0.3;
  return hslToRgb(h, s, light);
}

function readinessFillRgba(zone, alpha) {
  if (!zone) return `rgba(20,50,80,${alpha})`;
  const sc = memoPlaceReadiness(zone);
  const { r, g, b } = readinessToRgb(sc, siblingHueShift(zone));
  return `rgba(${r},${g},${b},${alpha})`;
}

function readinessGlowRgba(zone, alpha) {
  const { r, g, b } = readinessToRgb(memoPlaceReadiness(zone), siblingHueShift(zone));
  return `rgba(${r},${g},${b},${alpha})`;
}

function readinessHex(score, hueShift = 0) {
  const { r, g, b } = readinessToRgb(score, hueShift);
  const h = n => n.toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

function zoneIdFromIso2(iso) {
  if (!iso || iso === '-99') return null;
  const t = String(iso).trim().toUpperCase();
  if (t === 'GB' && zoneRegistry.has('gb')) return 'gb';
  const lower = t.toLowerCase();
  return zoneRegistry.has(lower) ? lower : null;
}

/** ISO_A2 for the country context when viewing sub-national zones (e.g. US states → US). */
function activeCountryIso2() {
  if (viewParentId == null) return null;
  const p = zoneRegistry.get(viewParentId);
  if (!p) return null;
  if (p.level === 'country') return p.id === 'gb' ? 'GB' : p.id.toUpperCase();
  if (p.level === 'state' || p.level === 'city') {
    const c = p.parent ? zoneRegistry.get(p.parent) : null;
    if (c?.level === 'country') return c.id === 'gb' ? 'GB' : c.id.toUpperCase();
    const gp = p.parent ? zoneRegistry.get(p.parent) : null;
    if (gp?.level === 'state' && gp.parent) {
      const cc = zoneRegistry.get(gp.parent);
      if (cc?.level === 'country') return cc.id === 'gb' ? 'GB' : cc.id.toUpperCase();
    }
  }
  return null;
}

function hoveredCountryIso2() {
  if (!hoveredZone || hoveredZone.level !== 'country') return null;
  return hoveredZone.id === 'gb' ? 'GB' : hoveredZone.id.toUpperCase();
}

function traceGeoRing(ctx, ring) {
  // Higher sampling density to avoid jagged polygon borders on long rings.
  // Previous coarse decimation caused visible "sawtooth" edges at many view angles.
  const step =
    ring.length > 1600 ? Math.ceil(ring.length / 700) :
      ring.length > 900 ? Math.ceil(ring.length / 560) :
        ring.length > 500 ? Math.ceil(ring.length / 420) :
          1;
  let first = true;
  let moved = false;
  let segments = 0;
  let visiblePoints = 0;
  for (let i = 0; i < ring.length; i += step) {
    const pair = ring[i];
    const lng = pair[0];
    const lat = pair[1];
    const p = project(lat, lng);
    if (!p.visible) {
      first = true;
      continue;
    }
    visiblePoints++;
    if (first) {
      ctx.moveTo(p.x, p.y);
      first = false;
      moved = true;
      segments++;
    } else {
      ctx.lineTo(p.x, p.y);
    }
  }
  return {
    moved,
    fragmented: segments > 1,
    segments,
    visiblePoints
  };
}

/**
 * 0–1 multiplier: fades fill before the limb so fill isn’t toggled on/off from fragmented paths.
 * Cheap ring sample — not geodesic-exact but stabilizes color at the globe edge.
 */
function ringLimbFillAlpha(ring) {
  const nRing = ring.length;
  if (!nRing) return 0;
  const stride = Math.max(1, Math.floor(nRing / 56));
  let vis = 0;
  let tot = 0;
  for (let i = 0; i < nRing; i += stride) {
    const pair = ring[i];
    const p = project(pair[1], pair[0]);
    tot++;
    if (p.visible) vis++;
  }
  if (!tot) return 0;
  const f = vis / tot;
  if (f <= 0.22) return 0;
  if (f >= 0.62) return 1;
  const t = (f - 0.22) / (0.62 - 0.22);
  return t * t;
}

function drawWorldLandmass(ctx) {
  if (!worldGeo?.features) return;

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const focusIso = activeCountryIso2();
  const hoverIso = hoveredCountryIso2();

  for (const feat of worldGeo.features) {
    const iso2 = feat.properties?.ISO_A2;
    const zid = zoneIdFromIso2(iso2);
    const zone = zid ? zoneRegistry.get(zid) : null;
    const g = feat.geometry;
    if (!g) continue;

    const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
    for (const poly of polys) {
      const outer = poly[0];
      if (!outer?.length) continue;

      const isFocus = focusIso && iso2 === focusIso;
      const isHover = hoverIso && iso2 === hoverIso;
      const isHi = isFocus || isHover;

      ctx.beginPath();
      const fillInfo = traceGeoRing(ctx, outer);
      const limbMul = ringLimbFillAlpha(outer);
      const badSplit = fillInfo.fragmented && fillInfo.segments > 2;
      // Fill when we have a coherent patch; limbMul fades near the terminator to reduce color flicker.
      if (fillInfo.moved && !badSplit && fillInfo.visiblePoints >= 3 && limbMul > 0.035) {
        ctx.closePath();
        const a0 = isHover ? 0.38 : isFocus ? 0.28 : 0.17;
        const a = a0 * limbMul * (fillInfo.fragmented ? 0.82 : 1);
        ctx.fillStyle = zone ? readinessFillRgba(zone, a) : `rgba(8,22,40,${0.2 * limbMul})`;
        ctx.fill();
      }

      ctx.beginPath();
      const strokeInfo = traceGeoRing(ctx, outer);
      if (strokeInfo.moved) {
        if (!strokeInfo.fragmented) ctx.closePath();
        ctx.strokeStyle = isHover ? 'rgba(220,246,255,0.9)' : isFocus ? 'rgba(180,230,255,0.65)' : 'rgba(95,160,215,0.42)';
        ctx.lineWidth = isHover ? 1.6 : isFocus ? 1.15 : 0.65;
        ctx.stroke();
      }
    }
  }
}

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  CX = W / 2;
  CY = H / 2;
  R = Math.min(W, H) * 0.36 * zoom;
}

// Project lat/lng to canvas x/y
function project(lat, lng) {
  const latRad = lat * Math.PI / 180;
  const lngRad = lng * Math.PI / 180;
  const rx = rotation.x, ry = rotation.y;

  // 3D sphere coords (standard lon/lat orientation)
  let x3 = Math.cos(latRad) * Math.sin(lngRad);
  let y3 = Math.sin(latRad);
  let z3 = Math.cos(latRad) * Math.cos(lngRad);

  // Rotate Y
  const cosY = Math.cos(ry), sinY = Math.sin(ry);
  let x4 = x3 * cosY - z3 * sinY;
  let z4 = x3 * sinY + z3 * cosY;

  // Rotate X
  const cosX = Math.cos(rx), sinX = Math.sin(rx);
  let y4 = y3 * cosX - z4 * sinX;
  let z5 = y3 * sinX + z4 * cosX;

  // Slightly lenient limb: fewer horizon “blinks” than a hard z-cut alone (still culls back face).
  const visible = z5 > -0.16;
  const scale = (z5 + 1.5) / 2.5;

  return {
    x: CX + x4 * R,
    y: CY - y4 * R,
    z: z5,
    visible,
    scale
  };
}

/** Inverse orthographic pick: screen → lat/lng on front hemisphere (null if off globe / back). */
function screenToLatLng(mx, my) {
  R = Math.min(W, H) * 0.36 * zoom;
  const x4 = (mx - CX) / R;
  const y4 = -(my - CY) / R;
  const d2 = x4 * x4 + y4 * y4;
  if (d2 > 1.0001) return null;
  const z5 = Math.sqrt(Math.max(0, 1 - d2));
  const rx = rotation.x;
  const ry = rotation.y;
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const yb = y4 * cosX + z5 * sinX;
  const zb = -y4 * sinX + z5 * cosX;
  const xb = x4;
  const x3 = xb * cosY + zb * sinY;
  const z3 = -xb * sinY + zb * cosY;
  const y3 = yb;
  const lat = (Math.asin(Math.max(-1, Math.min(1, y3))) * 180) / Math.PI;
  let lng = (Math.atan2(x3, z3) * 180) / Math.PI;
  while (lng < -180) lng += 360;
  while (lng > 180) lng -= 360;
  const vis = project(lat, lng);
  if (!vis.visible) return null;
  return { lat, lng };
}

/**
 * Euler angles (radians) matching project(): first Ry(ry), then Rx(rx) on unit sphere
 * from (lat,lng), so the point ends on the view axis (x=0, y=0, +z front).
 */
function rotationToFaceLatLng(lat, lng) {
  const latRad = lat * Math.PI / 180;
  let lngRad = lng * Math.PI / 180;
  while (lngRad > Math.PI) lngRad -= 2 * Math.PI;
  while (lngRad < -Math.PI) lngRad += 2 * Math.PI;

  const x3 = Math.cos(latRad) * Math.sin(lngRad);
  const y3 = Math.sin(latRad);
  const z3 = Math.cos(latRad) * Math.cos(lngRad);

  const ry = Math.atan2(x3, z3);
  const z4 = x3 * Math.sin(ry) + z3 * Math.cos(ry);
  const rx = Math.atan2(y3, z4);

  return {
    x: Math.max(-1.4, Math.min(1.4, rx)),
    y: ry
  };
}

/** Pick equivalent ry within ±π of current for shortest spin. */
function shortestLongitudeTarget(currentRy, targetRy) {
  let t = targetRy;
  while (t - currentRy > Math.PI) t -= 2 * Math.PI;
  while (t - currentRy < -Math.PI) t += 2 * Math.PI;
  return t;
}

function pointInRing(lng, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];
    const denom = yj - yi;
    if (Math.abs(denom) < 1e-12) continue;
    const crosses = (yi > lat) !== (yj > lat);
    const xInt = ((xj - xi) * (lat - yi)) / denom + xi;
    if (crosses && lng < xInt) inside = !inside;
  }
  return inside;
}

function pointInPolygonCoords(lng, lat, coordinates) {
  const outer = coordinates[0];
  if (!outer?.length) return false;
  if (!pointInRing(lng, lat, outer)) return false;
  for (let h = 1; h < coordinates.length; h++) {
    const hole = coordinates[h];
    if (hole?.length && pointInRing(lng, lat, hole)) return false;
  }
  return true;
}

function pointInGeometry(lng, lat, geom) {
  if (!geom) return false;
  if (geom.type === 'Polygon') return pointInPolygonCoords(lng, lat, geom.coordinates);
  if (geom.type === 'MultiPolygon') {
    for (const poly of geom.coordinates) {
      if (pointInPolygonCoords(lng, lat, poly)) return true;
    }
  }
  return false;
}

function findWorldCountryZoneAtLatLng(lat, lng) {
  if (!worldGeo?.features) return null;
  for (let fi = worldGeo.features.length - 1; fi >= 0; fi--) {
    const feat = worldGeo.features[fi];
    if (!pointInGeometry(lng, lat, feat.geometry)) continue;
    const zid = zoneIdFromIso2(feat.properties?.ISO_A2);
    return zid ? zoneRegistry.get(zid) : null;
  }
  return null;
}

function usIso3166FromZoneId(zid) {
  const parts = String(zid).split('-');
  if (parts.length < 2 || parts[0] !== 'us') return null;
  return `US-${parts[1].toUpperCase()}`;
}

function findUsStateZoneAtLatLng(lat, lng, allowedIds) {
  if (!usAdmin1Geo?.features) return null;
  const allow = allowedIds instanceof Set ? allowedIds : new Set(allowedIds);
  for (let fi = usAdmin1Geo.features.length - 1; fi >= 0; fi--) {
    const feat = usAdmin1Geo.features[fi];
    const iso = feat.properties?.iso_3166_2;
    if (!iso || !iso.startsWith('US-')) continue;
    const zid = iso.toLowerCase();
    if (!allow.has(zid)) continue;
    if (!pointInGeometry(lng, lat, feat.geometry)) continue;
    return zoneRegistry.get(zid) || null;
  }
  return null;
}

function findUsAdmin1FeatureByIso3166(iso3166) {
  if (!usAdmin1Geo?.features || !iso3166) return null;
  const u = String(iso3166).toUpperCase();
  return usAdmin1Geo.features.find(f => f.properties?.iso_3166_2 === u) || null;
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const Rk = 6371;
  const toR = x => (x * Math.PI) / 180;
  const dlat = toR(lat2 - lat1);
  const dlng = toR(lng2 - lng1);
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dlng / 2) ** 2;
  return 2 * Rk * Math.asin(Math.min(1, Math.sqrt(a)));
}

function findNearestActiveZone(lat, lng, maxKm) {
  let best = null;
  let bestD = Infinity;
  for (const z of activeZones) {
    const d = haversineKm(lat, lng, z.geo.lat, z.geo.lng);
    if (d < bestD) {
      bestD = d;
      best = z;
    }
  }
  return bestD <= maxKm ? best : null;
}

function pickZoneFromLandOrDot(mx, my) {
  const ll = screenToLatLng(mx, my);
  if (ll) {
    if (viewParentId === null) {
      const z = findWorldCountryZoneAtLatLng(ll.lat, ll.lng);
      if (z) return z;
    } else if (viewParentId === 'us' && usAdmin1Geo) {
      const allowed = new Set(activeZones.map(z => z.id));
      const z = findUsStateZoneAtLatLng(ll.lat, ll.lng, allowed);
      if (z) return z;
    } else {
      const parent = zoneRegistry.get(viewParentId);
      const iso3166 =
        parent && String(parent.id).startsWith('us-') ? usIso3166FromZoneId(parent.id) : null;
      if (iso3166 && usAdmin1Geo) {
        const feat = findUsAdmin1FeatureByIso3166(iso3166);
        if (feat && pointInGeometry(ll.lng, ll.lat, feat.geometry)) {
          const near = findNearestActiveZone(ll.lat, ll.lng, 220);
          if (near) return near;
        }
      }
      const nearWide = findNearestActiveZone(ll.lat, ll.lng, 380);
      if (nearWide) return nearWide;
    }
  }
  R = Math.min(W, H) * 0.36 * zoom;
  let closest = null;
  let closestDist = Infinity;
  for (const zone of activeZones) {
    const p = project(zone.geo.lat, zone.geo.lng);
    if (!p.visible) continue;
    const d = Math.hypot(mx - p.x, my - p.y);
    const hitR = realmMarkerBaseRadius(p.scale) * 1.5 + 9;
    if (d < hitR && d < closestDist) {
      closestDist = d;
      closest = zone;
    }
  }
  return closest;
}

function drawUsAdmin1Overlay(ctx) {
  if (!usAdmin1Geo?.features || !viewParentId) return;

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const vp = viewParentId;
  const activeIdSet = new Set(activeZones.map(z => z.id));
  const singleStateIso = vp !== 'us' && vp.startsWith('us-') ? usIso3166FromZoneId(vp) : null;

  for (const feat of usAdmin1Geo.features) {
    const iso = feat.properties?.iso_3166_2;
    if (!iso || !iso.startsWith('US-')) continue;
    if (singleStateIso && iso !== singleStateIso) continue;

    const zid = iso.toLowerCase();
    const zone = zoneRegistry.get(zid);
    const isHover = hoveredZone && hoveredZone.id === zid;
    const g = feat.geometry;
    if (!g) continue;

    const polys = g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : [];
    const isHi = (singleStateIso && iso === singleStateIso) || isHover;

    for (const poly of polys) {
      const outer = poly[0];
      if (!outer?.length) continue;

      ctx.beginPath();
      const fillInfo = traceGeoRing(ctx, outer);
      const limbMul = ringLimbFillAlpha(outer);
      const badSplit = fillInfo.fragmented && fillInfo.segments > 2;
      if (fillInfo.moved && !badSplit && fillInfo.visiblePoints >= 3 && limbMul > 0.035) {
        ctx.closePath();
        const frag = fillInfo.fragmented ? 0.82 : 1;
        if (vp === 'us') {
          if (activeIdSet.has(zid) && zone) {
            ctx.fillStyle = readinessFillRgba(zone, (isHover ? 0.38 : 0.24) * limbMul * frag);
          } else {
            ctx.fillStyle = `rgba(6,18,36,${0.1 * limbMul})`;
          }
        } else {
          ctx.fillStyle = zone
            ? readinessFillRgba(zone, (isHover ? 0.38 : 0.26) * limbMul * frag)
            : `rgba(15,40,65,${0.2 * limbMul})`;
        }
        ctx.fill();
      }

      ctx.beginPath();
      const strokeInfo = traceGeoRing(ctx, outer);
      if (strokeInfo.moved) {
        if (!strokeInfo.fragmented) ctx.closePath();
        ctx.strokeStyle = isHover ? 'rgba(220,246,255,0.9)' : isHi ? 'rgba(195,238,255,0.6)' : 'rgba(100,170,220,0.36)';
        ctx.lineWidth = isHover ? 1.45 : isHi ? 1.05 : 0.55;
        ctx.stroke();
      }
    }
  }
}

function difficultyToColor(score) {
  if (score <= 30) return '#22c55e';
  if (score <= 50) return '#84cc16';
  if (score <= 65) return '#f59e0b';
  if (score <= 80) return '#f97316';
  return '#ef4444';
}

/** Clamp to 0–100 integer for display meters. */
function clampScore(raw) {
  const n = Math.round(Number(raw));
  return Math.max(0, Math.min(100, Number.isFinite(n) ? n : 0));
}

/** Affluence 0–100 from est. monthly USD (log scale). Uses `stats.wealth.monthly_usd`, not `difficulty.cost` (which is COL *strain* and inversely correlates with typical “rich country” in data). */
const AFFLUENCE_LOG_MIN = Math.log10(400);
const AFFLUENCE_LOG_MAX = Math.log10(9000);

function affluenceFromMonthlyUsd(monthlyUsd) {
  const m = Number(monthlyUsd);
  if (!Number.isFinite(m) || m < 1) return 0;
  const x = Math.log10(m);
  const t = (x - AFFLUENCE_LOG_MIN) / (AFFLUENCE_LOG_MAX - AFFLUENCE_LOG_MIN);
  return clampScore(t * 100);
}

/** Same five inputs as the readiness bars (all 0–100, higher = better). */
function readinessFactorValues(zone) {
  const diff = zone?.difficulty;
  if (!diff) {
    return { affluence: 0, security: 0, safety: 0, quality: 0, languageEase: 0 };
  }
  return {
    affluence: affluenceFromMonthlyUsd(zone.stats?.wealth?.monthly_usd),
    security: clampScore(diff.security),
    safety: clampScore(diff.safety),
    quality: clampScore(diff.quality),
    languageEase: clampScore(100 - diff.language)
  };
}

/** Overall place readiness: average of the five factor scores (matches the ring and the bars). */
function placeReadinessFromZone(zone) {
  const f = readinessFactorValues(zone);
  return clampScore((f.affluence + f.security + f.safety + f.quality + f.languageEase) / 5);
}

function zoneCode(zone) {
  const parts = String(zone.id || '').split('-');
  if (zone.level === 'country' || parts.length === 1) return String(zone.id || '').toUpperCase();
  const tail = parts[parts.length - 1].toUpperCase();
  return tail.length > 3 ? tail.slice(0, 3) : tail;
}

function zoneCategoryIcon(zone) {
  return scoreToZoneLevel(zone.difficulty).icon;
}

/**
 * Pins used to scale as `* zoom` like the globe disc, so at high zoom they stayed as large
 * relative to small regions (e.g. two SV zones). Grow sublinearly so geography stays readable.
 */
function realmTokenZoomScale() {
  return Math.pow(Math.max(0.52, zoom), 0.5);
}

/** Screen-space base radius for a realm token at this zoom / level / density (pixels). */
function realmMarkerBaseRadius(posScale) {
  const crowdedInner = viewParentId != null && activeZones.length > 28;
  const densityScale =
    currentLevel === 'world' && activeZones.length > 120
      ? 0.76
      : currentLevel === 'world' && activeZones.length > 85
        ? 0.86
        : 1;
  let baseR =
    (currentLevel === 'world' ? 10 : currentLevel === 'country' ? 11 : 9) *
    densityScale *
    posScale *
    realmTokenZoomScale();
  if (crowdedInner) baseR *= 0.8;
  return baseR;
}

function drawGlobe() {
  ctx.clearRect(0, 0, W, H);
  R = Math.min(W, H) * 0.36 * zoom;

  // Starfield
  ctx.fillStyle = 'rgba(255,255,255,0.0)';

  // Globe base sphere
  const sphereGrad = ctx.createRadialGradient(
    CX - R * 0.2, CY - R * 0.2, R * 0.05,
    CX, CY, R
  );
  sphereGrad.addColorStop(0, '#0a1a2e');
  sphereGrad.addColorStop(0.5, '#060c18');
  sphereGrad.addColorStop(1, '#020408');

  ctx.beginPath();
  ctx.arc(CX, CY, R, 0, Math.PI * 2);
  ctx.fillStyle = sphereGrad;
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(CX, CY, R, 0, Math.PI * 2);
  ctx.clip();

  // Latitude lines
  for (let lat = -60; lat <= 60; lat += 30) {
    ctx.beginPath();
    let first = true;
    for (let lng = -180; lng <= 180; lng += 5) {
      const p = project(lat, lng);
      if (!p.visible) { first = true; continue; }
      if (first) { ctx.moveTo(p.x, p.y); first = false; }
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = 'rgba(60,120,180,0.12)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Longitude lines
  for (let lng = -180; lng < 180; lng += 30) {
    ctx.beginPath();
    let first = true;
    for (let lat = -90; lat <= 90; lat += 5) {
      const p = project(lat, lng);
      if (!p.visible) { first = true; continue; }
      if (first) { ctx.moveTo(p.x, p.y); first = false; }
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = 'rgba(60,120,180,0.08)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Equator
  ctx.beginPath();
  let firstEq = true;
  for (let lng = -180; lng <= 180; lng += 3) {
    const p = project(0, lng);
    if (!p.visible) { firstEq = true; continue; }
    if (firstEq) { ctx.moveTo(p.x, p.y); firstEq = false; }
    else ctx.lineTo(p.x, p.y);
  }
  ctx.strokeStyle = 'rgba(60,180,255,0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();

  readinessMemoFrame = new Map();
  drawWorldLandmass(ctx);
  drawUsAdmin1Overlay(ctx);

  // Sort zones by depth for correct layering
  const zonesWithPos = activeZones.map(z => {
    const p = project(z.geo.lat, z.geo.lng);
    return { zone: z, pos: p };
  }).filter(z => z.pos.visible).sort((a, b) => a.pos.z - b.pos.z);

  // Draw zones
  for (const { zone, pos } of zonesWithPos) {
    const isHovered = hoveredZone === zone;
    const baseR = realmMarkerBaseRadius(pos.scale);
    const ringRgb = readinessToRgb(memoPlaceReadiness(zone), siblingHueShift(zone));

    // Outer glow (readiness-colored)
    if (isHovered) {
      const glowGrad = ctx.createRadialGradient(pos.x, pos.y, baseR * 0.3, pos.x, pos.y, baseR * 2.2);
      glowGrad.addColorStop(0, readinessGlowRgba(zone, isHovered ? 0.48 : 0.32));
      glowGrad.addColorStop(1, readinessGlowRgba(zone, 0));
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, baseR * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad;
      ctx.fill();
    }

    // Realm token: readiness-tinted core + gold filigree ring
    const tokenR = Math.max(2.85, baseR * 0.92);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, tokenR, 0, Math.PI * 2);
    const core = ctx.createRadialGradient(
      pos.x - tokenR * 0.35,
      pos.y - tokenR * 0.35,
      tokenR * 0.12,
      pos.x,
      pos.y,
      tokenR
    );
    core.addColorStop(
      0,
      `rgba(${Math.min(255, ringRgb.r + 70)},${Math.min(255, ringRgb.g + 45)},${Math.min(255, ringRgb.b + 30)},0.42)`
    );
    core.addColorStop(
      0.55,
      `rgba(${Math.round(ringRgb.r * 0.35)},${Math.round(ringRgb.g * 0.28)},${Math.round(ringRgb.b * 0.32)},0.88)`
    );
    core.addColorStop(1, 'rgba(10,6,14,0.96)');
    ctx.fillStyle = core;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, tokenR + 1.1, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(200, 155, 80, 0.4)';
    ctx.lineWidth = 0.85;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, tokenR, 0, Math.PI * 2);
    ctx.strokeStyle = isHovered
      ? `rgba(${ringRgb.r},${ringRgb.g},${ringRgb.b},0.95)`
      : `rgba(${ringRgb.r},${ringRgb.g},${ringRgb.b},0.72)`;
    ctx.lineWidth = isHovered ? 1.85 : 1.35;
    ctx.stroke();

    const icon = zoneCategoryIcon(zone);
    const iconFont = Math.max(7, Math.min(14, Math.round(5.5 + baseR * 0.42)));
    ctx.font = `${iconFont}px 'Rajdhani'`;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(252, 245, 230, 0.96)';
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = 3;
    ctx.fillText(icon, pos.x, pos.y + iconFont * 0.34);
    ctx.shadowBlur = 0;

    // Label (stable, simple, no ranking jitter)
    if (isHovered) {
      ctx.font = `600 ${Math.round(Math.max(9, Math.min(13, baseR * 0.95)))}px Cinzel`;
      ctx.fillStyle = 'rgba(248, 236, 210, 0.98)';
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 4;
      ctx.fillText(zone.name, pos.x, pos.y - baseR - 5);
      ctx.shadowBlur = 0;
    }

    // Flag intentionally omitted from always-on map markers; code-in-diamond handles readability.
  }

  readinessMemoFrame = null;
  ctx.restore();

  // Globe rim (outside clip)
  const borderGrad = ctx.createRadialGradient(CX, CY, R - 4, CX, CY, R + 4);
  borderGrad.addColorStop(0, 'rgba(180, 130, 70, 0.55)');
  borderGrad.addColorStop(0.5, 'rgba(120, 82, 48, 0.28)');
  borderGrad.addColorStop(1, 'rgba(80, 50, 30, 0)');
  ctx.beginPath();
  ctx.arc(CX, CY, R, 0, Math.PI * 2);
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Globe highlight
  const highlightGrad = ctx.createRadialGradient(
    CX - R * 0.3, CY - R * 0.35, 0,
    CX - R * 0.1, CY - R * 0.1, R * 0.7
  );
  highlightGrad.addColorStop(0, 'rgba(220, 180, 120, 0.07)');
  highlightGrad.addColorStop(1, 'rgba(220, 180, 120, 0)');
  ctx.beginPath();
  ctx.arc(CX, CY, R, 0, Math.PI * 2);
  ctx.fillStyle = highlightGrad;
  ctx.fill();
}

// ══════════════════════════════════════════════════════
// ANIMATION LOOP
// ══════════════════════════════════════════════════════

function animate() {
  animFrame = requestAnimationFrame(animate);

  // Smooth rotation lerp
  rotation.x += (targetRotation.x - rotation.x) * 0.08;
  rotation.y += (targetRotation.y - rotation.y) * 0.08;
  zoom += (targetZoom - zoom) * 0.08;

  if (autoRotate && !isDragging) {
    targetRotation.y += 0.003;
  }

  drawGlobe();
}

// ══════════════════════════════════════════════════════
// MOUSE / TOUCH INTERACTION
// ══════════════════════════════════════════════════════

function getMouseZone(mx, my) {
  return pickZoneFromLandOrDot(mx, my);
}

function getHoverZone(mx, my) {
  const ll = screenToLatLng(mx, my);
  if (ll) {
    if (viewParentId === null) {
      const z = findWorldCountryZoneAtLatLng(ll.lat, ll.lng);
      if (z) return z;
    } else if (viewParentId === 'us' && usAdmin1Geo) {
      const allowed = new Set(activeZones.map(z => z.id));
      const z = findUsStateZoneAtLatLng(ll.lat, ll.lng, allowed);
      if (z) return z;
    }
  }

  // Marker fallback for sub-levels or missing polygon coverage.
  let closest = null;
  let closestDist = Infinity;
  for (const zone of activeZones) {
    const p = project(zone.geo.lat, zone.geo.lng);
    if (!p.visible) continue;
    const d = Math.hypot(mx - p.x, my - p.y);
    const hitR = realmMarkerBaseRadius(p.scale) * 1.12 + 5;
    if (d < hitR && d < closestDist) {
      closestDist = d;
      closest = zone;
    }
  }
  return closest;
}

canvas.addEventListener('mousedown', e => {
  isDragging = true;
  lastMouse = { x: e.clientX, y: e.clientY };
  dragStartMouse = { x: e.clientX, y: e.clientY };
  dragTravelPx = 0;
});

canvas.addEventListener('mousemove', e => {
  if (isDragging) {
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    dragTravelPx += Math.hypot(dx, dy);
    targetRotation.y += dx * 0.005;
    targetRotation.x += dy * 0.005;
    targetRotation.x = Math.max(-1.4, Math.min(1.4, targetRotation.x));
    lastMouse = { x: e.clientX, y: e.clientY };
    hoveredZone = null;
    hideTooltip();
  } else {
    const mx = e.clientX;
    const my = e.clientY;
    const zone = getHoverZone(mx, my);
    if (zone !== hoveredZone) {
      hoveredZone = zone;
      if (zone) {
        showTooltip(zone, mx, my);
        canvas.style.cursor = 'pointer';
      } else {
        hideTooltip();
        canvas.style.cursor = 'crosshair';
      }
    } else if (zone) {
      moveTooltip(mx, my);
    }
  }
});

canvas.addEventListener('mouseup', e => {
  if (!isDragging) return;
  const totalMove = Math.max(
    dragTravelPx,
    Math.hypot(e.clientX - dragStartMouse.x, e.clientY - dragStartMouse.y)
  );
  isDragging = false;
  if (totalMove < 7) {
    const mx = e.clientX;
    const my = e.clientY;
    const zone = getMouseZone(mx, my);
    if (zone) {
      const ll = screenToLatLng(mx, my);
      void selectZoneById(zone.id, ll ?? undefined);
    } else if (viewParentId !== null) {
      void navigateUpOneLayer();
    } else {
      closePanel();
    }
  }
});

canvas.addEventListener('click', e => {
  // Handled in mouseup
});

canvas.addEventListener('wheel', e => {
  e.preventDefault();
  targetZoom = Math.max(0.55, Math.min(5.6, targetZoom - e.deltaY * 0.001));
}, { passive: false });

// Touch
let touchStart = null;
canvas.addEventListener('touchstart', e => {
  if (e.touches.length === 1) {
    isDragging = true;
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    lastMouse = { ...touchStart };
    dragTravelPx = 0;
  }
});

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  if (e.touches.length === 1 && isDragging) {
    const dx = e.touches[0].clientX - lastMouse.x;
    const dy = e.touches[0].clientY - lastMouse.y;
    dragTravelPx += Math.hypot(dx, dy);
    targetRotation.y += dx * 0.005;
    targetRotation.x += dy * 0.005;
    lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
}, { passive: false });

canvas.addEventListener('touchend', e => {
  if (touchStart) {
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    const totalMove = Math.max(dragTravelPx, Math.hypot(dx, dy));
    if (totalMove < 12) {
      const mx = e.changedTouches[0].clientX;
      const my = e.changedTouches[0].clientY;
      const zone = getMouseZone(mx, my);
      if (zone) {
        const ll = screenToLatLng(mx, my);
        void selectZoneById(zone.id, ll ?? undefined);
      } else if (viewParentId !== null) {
        void navigateUpOneLayer();
      } else {
        closePanel();
      }
    }
  }
  isDragging = false;
  touchStart = null;
});

// ══════════════════════════════════════════════════════
// ZONE NAVIGATION
// ══════════════════════════════════════════════════════

function greatCircleDeg(lat1, lng1, lat2, lng2) {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  let Δλ = ((lng2 - lng1) * Math.PI) / 180;
  if (Δλ > Math.PI) Δλ -= 2 * Math.PI;
  if (Δλ < -Math.PI) Δλ += 2 * Math.PI;
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(Math.min(1, Math.max(0, a))), Math.sqrt(Math.max(0, 1 - a)));
  return (c * 180) / Math.PI;
}

/** 3D mean on unit sphere — stable “middle” of many zone pins. */
function centroidLatLngGeographic(zones) {
  let x = 0;
  let y = 0;
  let z = 0;
  for (const q of zones) {
    const φ = (q.geo.lat * Math.PI) / 180;
    const λ = (q.geo.lng * Math.PI) / 180;
    x += Math.cos(φ) * Math.cos(λ);
    y += Math.cos(φ) * Math.sin(λ);
    z += Math.sin(φ);
  }
  const n = Math.max(1, zones.length);
  x /= n;
  y /= n;
  z /= n;
  const hyp = Math.sqrt(x * x + y * y);
  const lat = (Math.atan2(z, hyp) * 180) / Math.PI;
  const lng = (Math.atan2(y, x) * 180) / Math.PI;
  return { lat, lng };
}

/** Angular radius (deg) covering all zones from their centroid + padding. */
function angularRadiusDegFromZones(zones) {
  if (!zones || !zones.length) return 10;
  const c = centroidLatLngGeographic(zones);
  let max = 0;
  for (const q of zones) {
    const d = greatCircleDeg(c.lat, c.lng, q.geo.lat, q.geo.lng);
    if (d > max) max = d;
  }
  return Math.min(Math.max(max, 0.12) * 1.22 + 0.32, 88);
}

/** Map geographic spread to orthographic zoom so small realms (e.g. SV) fill the disc. */
function targetZoomForChildSpread(spanDeg) {
  const s = Math.max(0.18, spanDeg);
  let raw;
  if (s <= 3) raw = 3.1 / s ** 0.76;
  else if (s <= 22) raw = 5 / s + 0.85;
  else raw = 1.12;
  return Math.max(1.1, Math.min(5.6, raw));
}

function applyGlobeFitToActiveZones(zones) {
  if (!zones || !zones.length) return;
  const span = angularRadiusDegFromZones(zones);
  targetZoom = targetZoomForChildSpread(span);
  const c = centroidLatLngGeographic(zones);
  focusLatLng(c.lat, c.lng);
}

async function selectZoneById(zoneId, focusLatLng = null) {
  const zone = zoneRegistry.get(zoneId);
  if (!zone) return;
  document.getElementById('instructions').classList.add('hidden');
  if (zone.hasChildren && viewParentId !== zone.id) {
    await loadChildrenOf(zone.id);
    showPanel(zone);
    applyGlobeFitToActiveZones(activeZones);
    if (focusLatLng != null) {
      focusLatLng(focusLatLng.lat, focusLatLng.lng);
    }
    return;
  }
  showPanel(zone);

  const lat = focusLatLng != null ? focusLatLng.lat : zone.geo.lat;
  const lng = focusLatLng != null ? focusLatLng.lng : zone.geo.lng;
  const face = rotationToFaceLatLng(lat, lng);
  targetRotation.x = face.x;
  targetRotation.y = shortestLongitudeTarget(targetRotation.y, face.y);
}

function focusLatLng(lat, lng) {
  const face = rotationToFaceLatLng(lat, lng);
  targetRotation.x = face.x;
  targetRotation.y = shortestLongitudeTarget(targetRotation.y, face.y);
}

function closePanelOnly() {
  document.getElementById('zone-panel').classList.remove('open');
}

async function navigateUpOneLayer() {
  if (viewParentId === null) {
    document.getElementById('zone-panel').classList.remove('open');
    return;
  }
  const currentParent = zoneRegistry.get(viewParentId);
  if (!currentParent) {
    await loadWorld();
    targetZoom = 1;
    document.getElementById('zone-panel').classList.remove('open');
    return;
  }
  if (!currentParent.parent) {
    await loadWorld();
    targetZoom = 1.05;
    focusLatLng(currentParent.geo.lat, currentParent.geo.lng);
    document.getElementById('zone-panel').classList.remove('open');
    return;
  }
  const parent = zoneRegistry.get(currentParent.parent);
  await loadChildrenOf(currentParent.parent);
  applyGlobeFitToActiveZones(activeZones);
  if (parent) focusLatLng(parent.geo.lat, parent.geo.lng);
  document.getElementById('zone-panel').classList.remove('open');
}

async function drillDownById(zoneId, focusLatLng = null) {
  const zone = zoneRegistry.get(zoneId);
  if (!zone || !zone.hasChildren) return;
  closePanelOnly();
  await loadChildrenOf(zone.id);
  applyGlobeFitToActiveZones(activeZones);
  if (focusLatLng != null) {
    focusLatLng(focusLatLng.lat, focusLatLng.lng);
  }
}

async function navigateToWorld() {
  closePanelOnly();
  targetZoom = 1;
  targetRotation = { x: 0.3, y: -0.5 };
  await loadWorld();
}

function resetGlobe() {
  targetRotation = { x: 0.3, y: -0.5 };
  targetZoom = 1;
}

function toggleAutoRotate() {
  autoRotate = !autoRotate;
  document.getElementById('btn-auto').style.color = autoRotate ? 'var(--accent-gold)' : '';
}

// ══════════════════════════════════════════════════════
// PANEL
// ══════════════════════════════════════════════════════

function showPanel(zone) {
  const tier = zone.accessTier;
  const diff = zone.difficulty;

  const zoneLevel = scoreToZoneLevel(diff);
  const factors = readinessFactorValues(zone);
  const readinessBars = [
    { label: 'Affluence', val: factors.affluence },
    { label: 'Security', val: factors.security },
    { label: 'Safety', val: factors.safety },
    { label: 'Quality of life', val: factors.quality },
    { label: 'Language ease', val: factors.languageEase }
  ];
  const readiness = placeReadinessFromZone(zone);
  const readinessColor = readinessHex(readiness);
  const threatColor = difficultyToColor(100 - diff.safety);

  const healthLabels = {
    none: 'None required',
    basic: 'Basic health coverage',
    insurance_required: 'Health insurance required',
    proof_required: 'Proof of coverage required'
  };

  const langDisplay = zone.stats.language.level !== 'none'
    ? `${zone.stats.language.primary} — ${zone.stats.language.test} ${zone.stats.language.level} required`
    : `${zone.stats.language.primary} ${zone.stats.language.others.length ? '+ ' + zone.stats.language.others.join(', ') : ''}`;

  const circumference = 2 * Math.PI * 24;
  const dashOffset = circumference - (readiness / 100) * circumference;

  const questsHTML = zone.quests.map(q => `
    <div class="quest-item quest-${q.type}">
      <div class="quest-header">
        <span class="quest-type quest-type-${q.type}">${q.type.toUpperCase()}</span>
        <span class="quest-label">${escapeHtml(q.label)}</span>
      </div>
      <div class="quest-detail">${escapeHtml(q.detail)}</div>
      ${q.options.length > 0 ? `
        <div class="quest-options">
          ${q.options.map(o => `<span class="quest-option">${escapeHtml(o)}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');

  const diffBars = readinessBars.map(b => {
    const c = readinessHex(b.val);
    return `
      <div class="diff-bar-row">
        <div class="diff-bar-label">${b.label}</div>
        <div class="diff-bar-track">
          <div class="diff-bar-fill" style="width:${b.val}%;background:linear-gradient(90deg,rgba(255,255,255,0.07),${c})"></div>
        </div>
        <div class="diff-bar-val" style="color:${c}">${b.val}</div>
      </div>
    `;
  }).join('');

  const preferredSkills = zone.stats.skills.preferred.slice(0, 4).map(s =>
    `<span class="quest-option">${escapeHtml(s)}</span>`
  ).join('');

  const pvpTag = diff.safety <= 15
    ? `<div class="danger-tag" style="border-color:${threatColor};color:${threatColor}">☣️ BLACKSITE ZONE · HERE BE MONSTERS</div>`
    : diff.safety <= 30
      ? `<div class="danger-tag" style="border-color:${threatColor};color:${threatColor}">⚔️ PVP ZONE · EXPECT CHAOS</div>`
      : '';

  const ageReq = (zone.stats.age.min || zone.stats.age.max)
    ? `${zone.stats.age.min ? `Min ${zone.stats.age.min}` : 'No min'} — ${zone.stats.age.max ? `Max ${zone.stats.age.max}` : 'No max'}`
    : 'No restriction';

  document.getElementById('panel-content').innerHTML = `
    <div class="panel-header">
      <span class="panel-flag">${zone.geo.flag || (zone.level === 'city' ? '🏙️' : '🗺️')}</span>
      <div class="panel-level-badge">
        ${zone.level.toUpperCase()} · ${zone.geo.region || ''}
      </div>
      <div class="panel-name">${escapeHtml(zone.name)}</div>
      <div class="panel-biome">⟡ ${escapeHtml(zone.biome)}</div>
      <div class="tier-badge tier-${tier}">
        ${tier === 'open' ? '🟢' : tier === 'restricted' ? '🟡' : tier === 'locked' ? '🔴' : '⛔'}
        ${tier.toUpperCase()} ZONE
      </div>
      ${pvpTag}
    </div>

    <div class="panel-lore">"${escapeHtml(zone.lore)}"</div>

    <div class="panel-section">
      <div class="section-title">Realm readiness</div>
      <div class="diff-overall">
        <div class="diff-ring">
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="4"/>
            <circle cx="28" cy="28" r="24" fill="none"
              stroke="${readinessColor}" stroke-width="4"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${dashOffset}"
              stroke-linecap="round"/>
          </svg>
          <div class="diff-ring-val" style="color:${readinessColor}">${readiness}</div>
        </div>
        <div class="diff-overall-info">
          <div class="zone-level-label" style="color:${readinessColor}">${zoneLevel.icon} ${zoneLevel.label}</div>
          <div class="zone-level-bracket">${zoneLevel.mmoBracket}</div>
        </div>
      </div>
      <div class="diff-bars-hint">Overall is the average of the five factors (higher is better). Expedition tier (e.g. Iron Pass) still reflects authored difficulty strain in the data.</div>
      <div class="diff-bars">${diffBars}</div>
    </div>

    <div class="panel-section">
      <div class="section-title">Hero requirements</div>
      <div class="stat-grid">
        <div class="stat-item">
          <div class="stat-icon">💰</div>
          <div class="stat-info">
            <div class="stat-name">WEALTH</div>
            <div class="stat-val">$${zone.stats.wealth.monthly_usd.toLocaleString()}/month</div>
            <div class="stat-sub">Est. cost of living · $${zone.stats.wealth.annual_usd.toLocaleString()}/year</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🗣️</div>
          <div class="stat-info">
            <div class="stat-name">LANGUAGE</div>
            <div class="stat-val">${langDisplay}</div>
            ${zone.stats.language.test !== 'none' ? `<div class="stat-sub">Test: ${zone.stats.language.test}</div>` : ''}
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">⚔️</div>
          <div class="stat-info">
            <div class="stat-name">SKILLS</div>
            <div class="stat-val">
              <div class="quest-options" style="margin:0">${preferredSkills}</div>
            </div>
            <div class="stat-sub">${zone.stats.skills.degreeRequired ? '🎓 Degree often required' : '🎓 Degree not mandatory'}</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🏥</div>
          <div class="stat-info">
            <div class="stat-name">HEALTH</div>
            <div class="stat-val">${healthLabels[zone.stats.health] || zone.stats.health}</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🎂</div>
          <div class="stat-info">
            <div class="stat-name">AGE</div>
            <div class="stat-val">${ageReq}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-section">
      <div class="section-title">Quests &amp; trials</div>
      <div class="quest-list">${questsHTML}</div>
    </div>

    <div class="panel-footer">
      <div class="footer-stat">👥 <span>${formatPop(zone.population)}</span></div>
      <div class="footer-stat">💱 <span>${escapeHtml(zone.currency)}</span></div>
      <div class="footer-stat">📡 <span>Schema v${countriesData?.meta?.schemaVersion ?? 1} · ${escapeHtml(countriesData?.meta?.updatedAt || '—')}</span></div>
    </div>
  `;

  document.getElementById('zone-panel').classList.add('open');
}

function closePanel() {
  if (viewParentId !== null) {
    void navigateUpOneLayer();
    return;
  }
  closePanelOnly();
}

// ══════════════════════════════════════════════════════
// BREADCRUMB
// ══════════════════════════════════════════════════════

function updateBreadcrumb() {
  const bc = document.getElementById('breadcrumb');
  const sepRoot = document.getElementById('bc-sep-root');
  const trail = document.getElementById('bc-trail');
  if (!bc || !trail) return;

  if (viewParentId === null) {
    bc.classList.remove('visible');
    if (sepRoot) sepRoot.style.display = 'none';
    trail.innerHTML = '';
    return;
  }

  bc.classList.add('visible');
  if (sepRoot) sepRoot.style.display = 'inline';

  const nodes = ancestorChain(viewParentId);
  const parts = [];
  for (let i = 0; i < nodes.length; i++) {
    const z = nodes[i];
    const isLast = i === nodes.length - 1;
    const label = `${z.geo.flag ? z.geo.flag + ' ' : ''}${escapeHtml(z.name)}`;
    if (isLast) {
      parts.push(`<span class="bc-item current">${label}</span>`);
    } else {
      parts.push(
        `<span class="bc-item" data-crumb-parent="${escapeHtml(z.id)}">${label}</span>`
      );
    }
    if (!isLast) parts.push('<span class="bc-sep">/</span>');
  }
  trail.innerHTML = parts.join(' ');
  trail.querySelectorAll('[data-crumb-parent]').forEach(el => {
    el.addEventListener('click', () => {
      const pid = el.getAttribute('data-crumb-parent');
      if (pid) void loadChildrenOf(pid);
    });
  });
}

// ══════════════════════════════════════════════════════
// ZONE LIST
// ══════════════════════════════════════════════════════

function toggleList() {
  document.getElementById('zone-list').classList.toggle('open');
}

function updateListPanel() {
  renderList(activeZones);
}

function renderList(zones) {
  const container = document.getElementById('zone-list-items');
  container.innerHTML = zones.map(z => {
    const r = placeReadinessFromZone(z);
    const dotHex = readinessHex(r, siblingHueShift(z));
    return `
      <div class="list-item" onclick="void window.selectZoneById('${z.id}');toggleList()">
        <div class="list-item-dot" style="background:${dotHex};box-shadow:0 0 8px ${dotHex}"></div>
        <div class="list-item-flag">${z.geo.flag || '🗺️'}</div>
        <div class="list-item-info">
          <div class="list-item-name">${escapeHtml(z.name)}</div>
          <div class="list-item-sub">${escapeHtml(z.biome)} · ${escapeHtml(z.accessTier.toUpperCase())}</div>
        </div>
        <div class="list-item-diff" style="color:${readinessHex(r)}">${r}</div>
      </div>
    `;
  }).join('');
}

function filterList(query) {
  const q = query.toLowerCase();
  const filtered = activeZones.filter(z =>
    z.name.toLowerCase().includes(q) ||
    z.biome.toLowerCase().includes(q) ||
    z.accessTier.includes(q)
  );
  renderList(filtered);
}

// ══════════════════════════════════════════════════════
// TOOLTIP
// ══════════════════════════════════════════════════════

const tooltipEl = document.getElementById('tooltip');

function showTooltip(zone, x, y) {
  const tierLabel = { open: '🟢 OPEN ZONE', restricted: '🟡 RESTRICTED', locked: '🔴 LOCKED ZONE', fortress: '⛔ FORTRESS' };
  const zl = scoreToZoneLevel(zone.difficulty);
  const r = placeReadinessFromZone(zone);
  const tipHue = readinessHex(r, siblingHueShift(zone));
  tooltipEl.innerHTML = `
    <span class="tt-flag">${zone.geo.flag || '🗺️'}</span>
    <div class="tt-name">${zl.icon} ${escapeHtml(zone.name)}</div>
    <div class="tt-tier" style="color:${tipHue}">${tierLabel[zone.accessTier]}</div>
    <div class="tt-diff" style="color:${tipHue}">Place score ${r} · $${zone.stats.wealth.monthly_usd.toLocaleString()}/mo</div>
  `;
  moveTooltip(x, y);
  tooltipEl.classList.add('visible');
}

function moveTooltip(x, y) {
  const offsetX = x + 16 + 200 > W ? -220 : 16;
  const offsetY = y + 10 + 80 > H ? -90 : 10;
  tooltipEl.style.left = (x + offsetX) + 'px';
  tooltipEl.style.top = (y + offsetY) + 'px';
}

function hideTooltip() {
  tooltipEl.classList.remove('visible');
}

// ══════════════════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════════════════

function scoreToZoneLevel(score) {
  const overall = typeof score === 'object' ? score.overall : score;
  const danger = typeof score === 'object' ? 100 - score.safety : 0;
  if (danger >= 85) return { icon: '☣️', label: 'Blight March', mmoBracket: 'EXCLUSIONARY · NO CONFIRMED SAFE CORRIDORS' };
  if (danger >= 70) return { icon: '⚔️', label: 'Contested Ground', mmoBracket: 'VOLATILE SECURITY · TRAVEL UNDER ADVISORY' };
  if (overall <= 20) return { icon: '🌱', label: 'Harbor Calm', mmoBracket: 'LOW STRAIN · IDEAL FIRST LANDFALL' };
  if (overall <= 40) return { icon: '🧭', label: 'Caravan Road', mmoBracket: 'MODERATE STRAIN · ROUTINE KIT & PAPERWORK' };
  if (overall <= 60) return { icon: '🛡️', label: 'Citadel Approach', mmoBracket: 'HIGH STRAIN · STACKED REQUIREMENTS' };
  if (overall <= 80) return { icon: '🔥', label: 'Iron Pass', mmoBracket: 'SEVERE STRAIN · VETERAN-GRADE PREPARATION' };
  return { icon: '💀', label: 'Apex March', mmoBracket: 'EXTREME STRAIN · CHARTER-ONLY TERRITORY' };
}

function formatPop(n) {
  if (!n) return 'N/A';
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return n.toString();
}

window.selectZoneById = selectZoneById;
window.drillDownById = drillDownById;
window.navigateToWorld = navigateToWorld;
window.toggleList = toggleList;
window.filterList = filterList;
window.closePanel = closePanel;
window.resetGlobe = resetGlobe;
window.toggleAutoRotate = toggleAutoRotate;

// ══════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════

window.addEventListener('resize', resize);
resize();
animate();

async function bootstrap() {
  try {
    await loadWorld();
    await loadWorldGeojson();
  } catch (err) {
    console.error(err);
    showDataError(`Atlas data failed to load: ${err.message}. Use a local web server from this folder.`);
  }
  setTimeout(() => {
    document.getElementById('loading').classList.add('fade');
    setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
    }, 800);
  }, 600);
}

bootstrap();
