import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = path.join(root, "worldzone.html");
let h = fs.readFileSync(p, "utf8");
const a = h.indexOf('<div id="tooltip"></div>');
const s = h.indexOf("<script>", a);
const e = h.indexOf("</script>", s);
if (s < 0 || e < 0) throw new Error("script markers not found");
h =
  h.slice(0, s) +
  '<script src="worldzone-app.js" defer></script>' +
  h.slice(e + "</script>".length);
fs.writeFileSync(p, h);
console.log("Inline script replaced, bytes removed:", e - s);
