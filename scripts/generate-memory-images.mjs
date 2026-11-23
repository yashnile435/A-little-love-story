import fs from "fs";
import path from "path";
import zlib from "zlib";

// Generate standalone valid PNG buffer using pure Node.js zlib
function createPngBuffer(width, height, getPixel) {
  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    raw[y * rowSize] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x / width, y / height);
      const offset = y * rowSize + 1 + x * 4;
      raw[offset] = Math.max(0, Math.min(255, Math.round(r)));
      raw[offset + 1] = Math.max(0, Math.min(255, Math.round(g)));
      raw[offset + 2] = Math.max(0, Math.min(255, Math.round(b)));
      raw[offset + 3] = Math.max(0, Math.min(255, Math.round(a !== undefined ? a : 255)));
    }
  }

  const idatData = zlib.deflateSync(raw);

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (-(crc & 1) & 0xedb88320);
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, "ascii");
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // 8 bits per channel
  ihdr[9] = 6;  // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    header,
    chunk("IHDR", ihdr),
    chunk("IDAT", idatData),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

// Generate aesthetic romantic memory SVG cards
function createMemorySvg(title, subtitle, colorA, colorB, symbol, date) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorA}"/>
      <stop offset="100%" stop-color="${colorB}"/>
    </linearGradient>
    <radialGradient id="sunGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="600" height="450" fill="url(#bgGrad)" rx="16"/>
  <rect width="600" height="450" fill="url(#sunGlow)"/>

  <!-- Subtle Vignette Frame -->
  <rect x="15" y="15" width="570" height="420" rx="12" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="4 4"/>

  <!-- Decorative Botanical & Geometric Accents -->
  <circle cx="500" cy="80" r="45" fill="#ffffff" fill-opacity="0.08"/>
  <circle cx="100" cy="380" r="70" fill="#ffffff" fill-opacity="0.06"/>
  <path d="M40 50 Q 80 40 100 80 T 140 120" stroke="#ffffff" stroke-opacity="0.2" fill="none" stroke-width="1.5"/>
  <path d="M560 400 Q 520 410 500 370 T 460 330" stroke="#ffffff" stroke-opacity="0.2" fill="none" stroke-width="1.5"/>

  <!-- Central Symbol -->
  <g transform="translate(300, 180)" filter="url(#softGlow)">
    <circle cx="0" cy="0" r="54" fill="#ffffff" fill-opacity="0.25"/>
    <circle cx="0" cy="0" r="44" fill="#ffffff" fill-opacity="0.4"/>
    <text x="0" y="16" font-size="44" text-anchor="middle" fill="#4a1525" opacity="0.85">${symbol}</text>
  </g>

  <!-- Title & Subtitle in SVG Typography -->
  <text x="300" y="280" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="600" fill="#3b0d19" text-anchor="middle" letter-spacing="0.5">
    ${title}
  </text>
  <text x="300" y="315" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="400" fill="#541424" opacity="0.85" text-anchor="middle" font-style="italic">
    "${subtitle}"
  </text>
  <text x="300" y="348" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#93223f" opacity="0.7" text-anchor="middle" letter-spacing="1.5">
    • ${date} •
  </text>
</svg>`;
}

const memoriesKatherine = [
  {
    file: "memory-01",
    title: "Golden Hour Glow",
    subtitle: "The light caught your smile in the sweetest way",
    colorA: "#ffd6df",
    colorB: "#fed7aa",
    symbol: "☀",
    date: "2025-10-14",
    r1: 255, g1: 214, b1: 223,
    r2: 254, g2: 215, b2: 170
  },
  {
    file: "memory-02",
    title: "Stolen Coffee Whispers",
    subtitle: "A rainy coffee date where hours felt like seconds",
    colorA: "#ffe4e6",
    colorB: "#fbcfe8",
    symbol: "☕",
    date: "2025-11-03",
    r1: 255, g1: 228, b1: 230,
    r2: 251, g2: 207, b2: 232
  },
  {
    file: "memory-03",
    title: "Under the Constellations",
    subtitle: "Walking quietly beneath thousands of shining stars",
    colorA: "#fce7f3",
    colorB: "#e0e7ff",
    symbol: "✨",
    date: "2025-12-24",
    r1: 252, g1: 231, b1: 243,
    r2: 224, g2: 231, b2: 255
  },
  {
    file: "memory-04",
    title: "First Roadtrip Detour",
    subtitle: "The scenic coastal highway with music in the air",
    colorA: "#fed7aa",
    colorB: "#fda4af",
    symbol: "🌊",
    date: "2026-01-18",
    r1: 254, g1: 215, b1: 170,
    r2: 253, g2: 164, b2: 175
  }
];

const memoriesSaras = [
  {
    file: "memory-01",
    title: "Quiet Morning Brew",
    subtitle: "Early sunbeams and the warmth of shared coffee",
    colorA: "#ffedd5",
    colorB: "#fecdd3",
    symbol: "☕",
    date: "2025-09-28",
    r1: 255, g1: 237, b1: 213,
    r2: 254, g2: 205, b2: 211
  },
  {
    file: "memory-02",
    title: "The Scenic Mountain Detour",
    subtitle: "Getting lost on purpose along winding pine trails",
    colorA: "#e0e7ff",
    colorB: "#fce7f3",
    symbol: "⛰",
    date: "2025-11-19",
    r1: 224, g1: 231, b1: 255,
    r2: 252, g2: 231, b2: 243
  },
  {
    file: "memory-03",
    title: "Celebration Under the Sky",
    subtitle: "New Year fireworks illuminating harbor waters",
    colorA: "#fbcfe8",
    colorB: "#fed7aa",
    symbol: "🎆",
    date: "2025-12-31",
    r1: 251, g1: 207, b1: 232,
    r2: 254, g2: 215, b2: 170
  },
  {
    file: "memory-04",
    title: "Bookshop Hideaway",
    subtitle: "Whispering poetry recommendations in quiet aisles",
    colorA: "#fef3c7",
    colorB: "#fce7f3",
    symbol: "📖",
    date: "2026-02-14",
    r1: 254, g1: 243, b1: 199,
    r2: 252, g2: 231, b2: 243
  }
];

function generateSet(folder, list) {
  const dir = path.resolve("public/memories", folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const item of list) {
    // 1. Generate SVG version
    const svgContent = createMemorySvg(item.title, item.subtitle, item.colorA, item.colorB, item.symbol, item.date);
    fs.writeFileSync(path.join(dir, `${item.file}.svg`), svgContent, "utf8");

    // 2. Generate PNG version
    const pngBuf = createPngBuffer(400, 300, (u, v) => {
      const r = item.r1 * (1 - v) + item.r2 * v + Math.sin(u * Math.PI) * 15;
      const g = item.g1 * (1 - v) + item.g2 * v;
      const b = item.b1 * (1 - v) + item.b2 * v;
      return [r, g, b, 255];
    });
    fs.writeFileSync(path.join(dir, `${item.file}.png`), pngBuf);
    
    // Also save .jpg copy for maximum format compatibility
    fs.writeFileSync(path.join(dir, `${item.file}.jpg`), pngBuf);

    console.log(`Generated assets for ${folder}/${item.file} (SVG + PNG + JPG)`);
  }
}

generateSet("katherine", memoriesKatherine);
generateSet("saras", memoriesSaras);
console.log("All memory assets generated successfully!");
