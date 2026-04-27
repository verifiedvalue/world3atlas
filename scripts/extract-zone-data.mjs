/**
 * Re-export embedded const COUNTRIES / US_* from an HTML file into data/zones/.
 * worldzone.html no longer embeds data — keep a backup HTML with those consts, or
 * edit this script to read from JSON if you only need transforms.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "worldzone.html"), "utf8");

function sliceConst(afterName, nextMarker) {
  const start = html.indexOf(`const ${afterName} = `);
  if (start < 0) throw new Error("missing " + afterName);
  const bodyStart = start + `const ${afterName} = `.length;
  const end = html.indexOf(nextMarker, bodyStart);
  if (end < 0) throw new Error("missing marker after " + afterName);
  return html.slice(bodyStart, end).trim();
}

function parseJsonObject(raw) {
  let s = raw.trim();
  if (s.endsWith(";")) s = s.slice(0, -1).trim();
  return JSON.parse(s);
}

/** Array const may be followed by comments before the next `const`; cut at first `];` (JSON ends at `]`). */
function parseJsonArray(raw) {
  raw = raw.trim();
  const semi = raw.indexOf("];");
  if (semi < 0) throw new Error("Expected ]; in array literal");
  return JSON.parse(raw.slice(0, semi + 1));
}

const countries = parseJsonObject(sliceConst("COUNTRIES", "const US_REGIONS"));
countries.meta.schemaVersion = 2;
countries.meta.totalZones = countries.zones.length;

const usZones = parseJsonArray(sliceConst("US_REGIONS", "const US_CA_CITIES"));
const usCaZones = parseJsonArray(sliceConst("US_CA_CITIES", "const canvas = "));

const outDir = path.join(root, "data", "zones");
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(
  path.join(outDir, "countries.json"),
  JSON.stringify(countries, null, 2)
);
fs.writeFileSync(
  path.join(outDir, "us.json"),
  JSON.stringify({ meta: { schemaVersion: 2, parent: "us" }, zones: usZones }, null, 2)
);
fs.writeFileSync(
  path.join(outDir, "us-ca.json"),
  JSON.stringify({ meta: { schemaVersion: 2, parent: "us-ca" }, zones: usCaZones }, null, 2)
);

console.log("Wrote countries + us + us-ca");
