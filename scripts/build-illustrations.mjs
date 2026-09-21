/**
 * Generates the SVG illustrations in public/images/.
 *
 * These are drawn here rather than sourced as stock photos so that every
 * illustration depicts the thing the page is actually about, weighs a few KB,
 * and carries no licence obligation. Run `node scripts/build-illustrations.mjs`
 * after changing anything below.
 *
 * To use real photographs instead, see scripts/fetch-photos.mjs.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/images');
mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 800;

/** Brand palette, matching tailwind.config.ts. */
const C = {
  deep: '#123736',
  brand: '#1c6663',
  mid: '#27807b',
  light: '#73bcb5',
  pale: '#d4ebe8',
  wash: '#eef7f6',
  accent: '#f2760c',
  accentPale: '#fed7aa',
  cream: '#fbf8f3',
  wood: '#8a6440',
  woodDark: '#6b4c31',
  ink: '#12211f',
};

const defs = (id, from, to, angle = 'x1="0" y1="0" x2="0" y2="1"') =>
  `<linearGradient id="${id}" ${angle}><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`;

/** Shared room backdrop: floor, wall, soft light pool. */
function backdrop(wallTop, wallBottom, floor) {
  return `
  <rect width="${W}" height="${H}" fill="url(#wall)"/>
  <rect y="596" width="${W}" height="${H - 596}" fill="${floor}"/>
  <ellipse cx="600" cy="610" rx="470" ry="120" fill="${C.wash}" opacity=".5"/>
  <circle cx="930" cy="180" r="230" fill="#ffffff" opacity=".28"/>`;
}

/**
 * A three-seat sofa. `palette` sets body/cushion/shadow, `feet` the leg style.
 */
function sofa({ x = 600, y = 470, s = 1, body, cushion, seam, feet = C.woodDark }) {
  return `<g transform="translate(${x} ${y}) scale(${s}) translate(-600 -470)">
    <ellipse cx="600" cy="628" rx="360" ry="34" fill="${C.ink}" opacity=".13"/>
    <rect x="272" y="300" width="656" height="196" rx="34" fill="${body}"/>
    <rect x="296" y="322" width="608" height="150" rx="22" fill="${cushion}"/>
    <path d="M600 322v150" stroke="${seam}" stroke-width="5" stroke-linecap="round" opacity=".55"/>
    <path d="M448 322v150M752 322v150" stroke="${seam}" stroke-width="4" stroke-linecap="round" opacity=".32"/>
    <rect x="256" y="452" width="688" height="112" rx="30" fill="${body}"/>
    <rect x="286" y="470" width="628" height="78" rx="20" fill="${cushion}"/>
    <path d="M495 470v78M705 470v78" stroke="${seam}" stroke-width="5" stroke-linecap="round" opacity=".5"/>
    <rect x="212" y="336" width="96" height="232" rx="44" fill="${body}"/>
    <rect x="892" y="336" width="96" height="232" rx="44" fill="${body}"/>
    <rect x="228" y="356" width="64" height="120" rx="30" fill="${cushion}" opacity=".55"/>
    <rect x="908" y="356" width="64" height="120" rx="30" fill="${cushion}" opacity=".55"/>
    <rect x="276" y="560" width="26" height="46" rx="10" fill="${feet}"/>
    <rect x="898" y="560" width="26" height="46" rx="10" fill="${feet}"/>
    <rect x="586" y="560" width="26" height="40" rx="10" fill="${feet}" opacity=".7"/>
  </g>`;
}

function armchair({ x, y, s = 1, body, cushion, seam }) {
  return `<g transform="translate(${x} ${y}) scale(${s}) translate(-600 -470)">
    <ellipse cx="600" cy="622" rx="190" ry="24" fill="${C.ink}" opacity=".12"/>
    <rect x="462" y="318" width="276" height="188" rx="30" fill="${body}"/>
    <rect x="484" y="338" width="232" height="146" rx="20" fill="${cushion}"/>
    <rect x="448" y="462" width="304" height="104" rx="28" fill="${body}"/>
    <rect x="474" y="480" width="252" height="70" rx="18" fill="${cushion}"/>
    <rect x="410" y="348" width="80" height="216" rx="38" fill="${body}"/>
    <rect x="710" y="348" width="80" height="216" rx="38" fill="${body}"/>
    <path d="M600 338v146" stroke="${seam}" stroke-width="4" opacity=".4" stroke-linecap="round"/>
    <rect x="452" y="560" width="24" height="44" rx="10" fill="${C.woodDark}"/>
    <rect x="724" y="560" width="24" height="44" rx="10" fill="${C.woodDark}"/>
  </g>`;
}

/** Upholstery hand tool with hose, used in the steam and process art. */
function wand({ x, y, r = -22, scale = 1 }) {
  return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${scale})">
    <path d="M0 0 C 70 -40 150 -70 250 -66" stroke="${C.deep}" stroke-width="17" fill="none" stroke-linecap="round" opacity=".92"/>
    <path d="M0 0 C 70 -40 150 -70 250 -66" stroke="${C.mid}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <rect x="-96" y="-22" width="104" height="44" rx="16" fill="${C.deep}"/>
    <rect x="-140" y="-34" width="56" height="68" rx="12" fill="${C.accent}"/>
    <rect x="-134" y="-24" width="16" height="48" rx="7" fill="#ffffff" opacity=".35"/>
  </g>`;
}

/** Rising steam / mist curls. */
function steam(points, color = '#ffffff', op = '.75') {
  return points
    .map(
      ([x, y, sc]) =>
        `<path transform="translate(${x} ${y}) scale(${sc})" d="M0 0c-16-22 14-34 0-58s10-36 0-56" stroke="${color}" stroke-width="9" fill="none" stroke-linecap="round" opacity="${op}"/>`,
    )
    .join('');
}

function sparkles(points) {
  return points
    .map(
      ([x, y, s]) =>
        `<path transform="translate(${x} ${y}) scale(${s})" d="M0-26c3 16 7 20 23 23-16 3-20 7-23 23-3-16-7-20-23-23 16-3 20-7 23-23z" fill="${C.accent}" opacity=".9"/>`,
    )
    .join('');
}

function svg(inner, extraDefs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
<defs>${defs('wall', C.wash, '#ffffff')}${extraDefs}</defs>
${inner}
</svg>`;
}

const images = {
  /* Homepage hero: a clean, inviting living-room sofa mid-treatment. */
  hero: svg(
    backdrop(C.wash, '#fff', C.cream) +
      `<rect x="150" y="150" width="210" height="150" rx="12" fill="none" stroke="${C.pale}" stroke-width="10"/>
       <circle cx="255" cy="205" r="26" fill="${C.light}" opacity=".7"/>
       <path d="M170 288l58-64 42 42 34-30 46 52z" fill="${C.mid}" opacity=".55"/>` +
      sofa({ x: 620, y: 452, s: 1.02, body: C.brand, cushion: C.light, seam: C.deep }) +
      steam([[430, 330, 1.05], [500, 300, .8], [770, 318, .95], [845, 344, .72]]) +
      wand({ x: 880, y: 430, r: -18, scale: 1 }) +
      sparkles([[350, 250, 1], [960, 300, .8], [300, 470, .65]]),
  ),

  /* Steam / hot water extraction. */
  steam: svg(
    backdrop(C.wash, '#fff', C.cream) +
      sofa({ x: 600, y: 462, s: 1, body: C.mid, cushion: C.pale, seam: C.brand }) +
      steam([[360, 344, 1.15], [440, 306, .9], [700, 312, 1], [800, 348, .8], [880, 320, .6]]) +
      wand({ x: 905, y: 452, r: -16, scale: 1.08 }) +
      `<g opacity=".8">${sparkles([[300, 270, .9], [960, 250, .7]])}</g>
       <path d="M250 660h700" stroke="${C.pale}" stroke-width="8" stroke-linecap="round" opacity=".8"/>`,
  ),

  /* Low-moisture dry cleaning: foam and a soft brush, no water. */
  dry: svg(
    backdrop(C.wash, '#fff', C.cream) +
      sofa({ x: 600, y: 462, s: 1, body: '#5a4a63', cushion: '#8d7a97', seam: '#3c3042' }) +
      `<g>
        <circle cx="400" cy="330" r="30" fill="#fff" opacity=".85"/>
        <circle cx="452" cy="300" r="20" fill="#fff" opacity=".7"/>
        <circle cx="366" cy="292" r="16" fill="#fff" opacity=".6"/>
        <circle cx="760" cy="316" r="26" fill="#fff" opacity=".8"/>
        <circle cx="806" cy="290" r="16" fill="#fff" opacity=".6"/>
      </g>
      <g transform="translate(880 400) rotate(-20)">
        <rect x="-70" y="-18" width="140" height="36" rx="16" fill="${C.woodDark}"/>
        <rect x="-62" y="16" width="124" height="20" rx="8" fill="${C.cream}"/>
        <g stroke="${C.cream}" stroke-width="5" stroke-linecap="round">
          <path d="M-50 34v20M-28 34v22M-6 34v22M16 34v22M38 34v20"/>
        </g>
      </g>` +
      sparkles([[320, 250, .95], [980, 290, .7]]),
  ),

  /* Leather: warmer palette, conditioning cloth. */
  leather: svg(
    backdrop(C.wash, '#fff', C.cream) +
      sofa({ x: 600, y: 462, s: 1, body: '#7b4a2c', cushion: '#a4693f', seam: '#5b3520', feet: '#3f2a1a' }) +
      `<g opacity=".5" stroke="#5b3520" stroke-width="3" fill="none">
        <path d="M340 380c40 12 70-8 110 4M700 392c44 10 76-10 118 2M380 500c50 12 84-10 130 4"/>
      </g>
      <g transform="translate(872 396) rotate(-14)">
        <rect x="-64" y="-48" width="128" height="96" rx="18" fill="${C.cream}"/>
        <rect x="-48" y="-32" width="96" height="64" rx="12" fill="${C.accentPale}" opacity=".8"/>
      </g>
      <g transform="translate(266 300)">
        <rect x="-40" y="-60" width="80" height="120" rx="18" fill="${C.accent}"/>
        <rect x="-18" y="-84" width="36" height="28" rx="8" fill="${C.woodDark}"/>
        <rect x="-28" y="-30" width="56" height="52" rx="8" fill="#ffffff" opacity=".45"/>
      </g>` +
      sparkles([[960, 250, .8], [330, 480, .6]]),
  ),

  /* Combined carpet + sofa. */
  combined: svg(
    backdrop(C.wash, '#fff', C.cream) +
      `<g transform="translate(600 650)">
        <rect x="-430" y="-52" width="860" height="104" rx="18" fill="${C.pale}"/>
        <rect x="-404" y="-34" width="808" height="68" rx="12" fill="${C.wash}"/>
        <g stroke="${C.light}" stroke-width="6" stroke-linecap="round" opacity=".85">
          <path d="M-340 -14h680M-340 14h680"/>
        </g>
      </g>` +
      sofa({ x: 470, y: 430, s: .82, body: C.brand, cushion: C.light, seam: C.deep }) +
      armchair({ x: 900, y: 452, s: .78, body: C.mid, cushion: C.pale, seam: C.brand }) +
      steam([[300, 330, .8], [640, 316, .75]]) +
      wand({ x: 320, y: 470, r: 14, scale: .8 }) +
      sparkles([[760, 250, .85], [190, 280, .6]]),
  ),

  /* Sofa bed: mechanism open, mattress exposed. */
  sofabed: svg(
    backdrop(C.wash, '#fff', C.cream) +
      `<ellipse cx="600" cy="660" rx="400" ry="34" fill="${C.ink}" opacity=".12"/>
       <rect x="228" y="300" width="360" height="200" rx="30" fill="${C.brand}"/>
       <rect x="252" y="322" width="312" height="156" rx="20" fill="${C.light}"/>
       <rect x="196" y="332" width="80" height="232" rx="36" fill="${C.brand}"/>
       <g transform="translate(0 6)">
         <rect x="470" y="470" width="540" height="42" rx="14" fill="${C.deep}"/>
         <rect x="452" y="418" width="576" height="66" rx="20" fill="#ffffff"/>
         <rect x="452" y="418" width="576" height="66" rx="20" fill="${C.pale}" opacity=".7"/>
         <g stroke="${C.light}" stroke-width="5" stroke-linecap="round" opacity=".9">
           <path d="M520 430v42M600 430v42M680 430v42M760 430v42M840 430v42M920 430v42"/>
         </g>
         <rect x="700" y="404" width="120" height="22" rx="10" fill="${C.accentPale}"/>
       </g>
       <rect x="500" y="512" width="26" height="54" rx="10" fill="${C.woodDark}"/>
       <rect x="960" y="512" width="26" height="54" rx="10" fill="${C.woodDark}"/>
       <rect x="226" y="560" width="26" height="46" rx="10" fill="${C.woodDark}"/>` +
      steam([[400, 318, .85], [640, 360, .7]]) +
      sparkles([[900, 300, .85], [300, 250, .65]]),
  ),

  /* Commercial: a run of banquette seating and a task chair. */
  commercial: svg(
    backdrop(C.wash, '#fff', C.cream) +
      `<g>
        <rect x="140" y="330" width="600" height="150" rx="20" fill="${C.brand}"/>
        <rect x="160" y="350" width="560" height="112" rx="14" fill="${C.mid}"/>
        <g stroke="${C.deep}" stroke-width="5" opacity=".45" stroke-linecap="round">
          <path d="M300 350v112M440 350v112M580 350v112"/>
        </g>
        <rect x="132" y="470" width="616" height="74" rx="18" fill="${C.deep}"/>
        <rect x="152" y="486" width="576" height="44" rx="12" fill="${C.mid}"/>
      </g>
      <g transform="translate(940 420)">
        <ellipse cx="0" cy="190" rx="110" ry="20" fill="${C.ink}" opacity=".13"/>
        <rect x="-70" y="-120" width="140" height="150" rx="28" fill="${C.deep}"/>
        <rect x="-54" y="-104" width="108" height="118" rx="20" fill="${C.light}" opacity=".5"/>
        <rect x="-86" y="26" width="172" height="44" rx="18" fill="${C.deep}"/>
        <rect x="-10" y="64" width="20" height="74" fill="${C.deep}"/>
        <g stroke="${C.deep}" stroke-width="14" stroke-linecap="round">
          <path d="M0 140l-70 42M0 140l70 42M0 140v46"/>
        </g>
      </g>
      <g transform="translate(180 210)">
        <rect x="-40" y="-52" width="240" height="104" rx="16" fill="#ffffff" opacity=".85"/>
        <g stroke="${C.light}" stroke-width="10" stroke-linecap="round">
          <path d="M-14 -20h150M-14 6h190M-14 32h110"/>
        </g>
      </g>` +
      sparkles([[790, 250, .9]]),
  ),

  /* Process / method diagram art used on the homepage. */
  process: svg(
    backdrop(C.wash, '#fff', C.cream) +
      `<g transform="translate(600 400)">
        <circle r="250" fill="none" stroke="${C.pale}" stroke-width="20"/>
        <circle r="250" fill="none" stroke="${C.mid}" stroke-width="20" stroke-linecap="round"
          stroke-dasharray="1050 1570" transform="rotate(-90)"/>
      </g>` +
      sofa({ x: 600, y: 452, s: .62, body: C.brand, cushion: C.light, seam: C.deep }) +
      steam([[470, 370, .7], [720, 366, .62]]) +
      `<g fill="${C.deep}" font-family="system-ui,sans-serif" font-weight="700">
        <circle cx="600" cy="150" r="34" fill="${C.accent}"/>
        <circle cx="850" cy="400" r="34" fill="${C.mid}"/>
        <circle cx="600" cy="650" r="34" fill="${C.mid}"/>
        <circle cx="350" cy="400" r="34" fill="${C.mid}"/>
      </g>`,
  ),

  /* Fabric swatch grid, used beside the fabric compatibility table. */
  fabrics: svg(
    `<rect width="${W}" height="${H}" fill="url(#wall)"/>` +
      [
        ['#3f6f8f', 'Cotton'],
        ['#5a4a63', 'Velvet'],
        ['#c2b49a', 'Linen'],
        ['#7b4a2c', 'Leather'],
        ['#27807b', 'Polyester'],
        ['#8d95a3', 'Microfibre'],
      ]
        .map((entry, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const x = 150 + col * 320;
          const y = 160 + row * 300;
          return `<g transform="translate(${x} ${y})">
            <rect width="260" height="220" rx="24" fill="${entry[0]}"/>
            <g opacity=".22" stroke="#ffffff" stroke-width="4">
              ${Array.from({ length: 9 }, (_, k) => `<path d="M${18 + k * 28} 0v220"/>`).join('')}
              ${Array.from({ length: 7 }, (_, k) => `<path d="M0 ${16 + k * 30}h260"/>`).join('')}
            </g>
            <rect x="18" y="18" width="70" height="14" rx="7" fill="#ffffff" opacity=".6"/>
          </g>`;
        })
        .join(''),
  ),

  /* Quote / contact art. */
  quote: svg(
    backdrop(C.wash, '#fff', C.cream) +
      `<g transform="translate(600 380)">
        <rect x="-230" y="-250" width="460" height="500" rx="34" fill="#ffffff"/>
        <rect x="-230" y="-250" width="460" height="86" rx="34" fill="${C.brand}"/>
        <rect x="-230" y="-206" width="460" height="42" fill="${C.brand}"/>
        <g stroke="${C.pale}" stroke-width="16" stroke-linecap="round">
          <path d="M-180 -110h300M-180 -50h360M-180 10h240M-180 70h330M-180 130h190"/>
        </g>
        <rect x="-180" y="180" width="220" height="56" rx="28" fill="${C.accent}"/>
      </g>
      <g transform="translate(940 520)">
        <rect x="-70" y="-120" width="140" height="240" rx="26" fill="${C.deep}"/>
        <rect x="-56" y="-100" width="112" height="180" rx="12" fill="${C.light}"/>
        <circle cx="0" cy="96" r="12" fill="${C.pale}"/>
      </g>` +
      sparkles([[300, 220, .9], [980, 250, .7]]),
  ),
};

for (const [name, markup] of Object.entries(images)) {
  writeFileSync(`${OUT}/${name}.svg`, markup.replace(/\n\s*/g, ' ').trim() + '\n');
}

console.log(`Wrote ${Object.keys(images).length} illustrations to public/images/`);
