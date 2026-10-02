/* Standalone decorative vectors for the TEDU AI & DS presentation. */
(function () {
  'use strict';
  let count = 0;
  const lime = '#b6ff6e', teal = '#52e8dc', white = '#f1fff8';
  const dots = (points, radius, color, extra = '') => points.map(([x,y]) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" ${extra}/>`).join('');
  function shell(kind, viewBox, content) {
    const id = `dv-${kind}-${++count}`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="deck-vector deck-vector-${kind}" aria-hidden="true" focusable="false" style="display:block;width:100%;height:100%;overflow:visible"><defs>
      <linearGradient id="${id}-line" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${lime}"/><stop offset="1" stop-color="${teal}"/></linearGradient>
      <radialGradient id="${id}-glow"><stop stop-color="${teal}" stop-opacity=".15"/><stop offset=".45" stop-color="${teal}" stop-opacity=".065"/><stop offset="1" stop-color="${teal}" stop-opacity="0"/></radialGradient>
      <linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${lime}" stop-opacity=".13"/><stop offset=".5" stop-color="${teal}" stop-opacity=".025"/><stop offset="1" stop-color="${teal}" stop-opacity=".09"/></linearGradient>
      <filter id="${id}-light" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="3.8"/></filter>
      <style>
        .${id}-signal{stroke-dasharray:2 34 2 170;animation:${id}-travel 9s linear infinite}
        .${id}-orbit{transform-box:fill-box;transform-origin:center;animation:${id}-turn 38s linear infinite}
        .${id}-orbit-reverse{transform-box:fill-box;transform-origin:center;animation:${id}-turn 47s linear infinite reverse}
        .${id}-breathe{animation:${id}-breath 4.8s ease-in-out infinite}
        .${id}-pulse{animation:${id}-pulse 5.6s ease-in-out infinite}
        .${id}-lift{animation:${id}-lift 6.4s ease-in-out infinite}
        @keyframes ${id}-travel{to{stroke-dashoffset:-416}}
        @keyframes ${id}-turn{to{transform:rotate(360deg)}}
        @keyframes ${id}-breath{0%,100%{opacity:.55}50%{opacity:1}}
        @keyframes ${id}-pulse{0%,100%{stroke-opacity:.15}50%{stroke-opacity:.58}}
        @keyframes ${id}-lift{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @media(prefers-reduced-motion:reduce){.${id}-signal,.${id}-orbit,.${id}-orbit-reverse,.${id}-breathe,.${id}-pulse,.${id}-lift{animation:none!important}}
      </style>
    </defs>${content(id)}</svg>`;
  }
  function journey() {
    return shell('journey', '0 0 1600 320', id => {
      const centers = [200,600,1000,1400];
      const connectors = [
        'M 282 150 C 365 150 396 150 518 150',
        'M 682 150 C 765 150 796 150 918 150',
        'M 1082 150 C 1165 150 1196 150 1318 150'
      ];
      const rails = connectors.map((d,i) => `<path d="${d}" fill="none" stroke="${teal}" stroke-opacity=".20" stroke-width="1.3"/><path d="${d}" fill="none" stroke="url(#${id}-line)" stroke-width="3" stroke-linecap="round" class="${id}-signal" style="animation-delay:-${i*2}s"/>`).join('');
      const rings = centers.map((x,i) => `<g transform="translate(${x} 150)"><circle r="128" fill="url(#${id}-glow)"/><circle r="84" fill="#030b09" fill-opacity=".75" stroke="${teal}" stroke-opacity=".12"/><circle r="74" fill="url(#${id}-glass)" stroke="url(#${id}-line)" stroke-opacity=".52"/><circle r="84" fill="none" stroke="${i%2?teal:lime}" stroke-opacity=".8" stroke-width="2" stroke-dasharray="26 236" class="${id}-orbit" style="animation-delay:-${i*9}s"/><circle r="91" fill="none" stroke="${teal}" stroke-opacity=".10" stroke-dasharray="1 9"/><circle cy="-84" r="3" fill="${i%2?teal:lime}"/></g>`).join('');
      return `<g>${rails}${rings}
        <g transform="translate(200 150)">
          <circle r="49" fill="none" stroke="${teal}" stroke-opacity=".34" stroke-dasharray="1 6" class="${id}-orbit-reverse"/>
          <ellipse rx="44" ry="19" fill="none" stroke="${teal}" stroke-opacity=".52" transform="rotate(-38)"/><ellipse rx="44" ry="19" fill="none" stroke="${lime}" stroke-opacity=".42" transform="rotate(38)"/>
          <circle r="15" fill="${lime}" opacity=".35" filter="url(#${id}-light)" class="${id}-breathe"/><path d="M 0 -21 L 18 -10 L 18 11 L 0 22 L -18 11 L -18 -10 Z" fill="url(#${id}-glass)" stroke="${lime}" stroke-width="1.4"/><path d="M -18 -10 L 0 1 L 18 -10 M 0 1 L 0 22" fill="none" stroke="${lime}" stroke-opacity=".5"/><circle r="3.5" fill="${white}"/>
        </g>
        <g transform="translate(600 150)">
          <path d="M -37 -28 L 35 -31 L 43 29 L -28 40 Z M -37 -28 L 43 29 M 35 -31 L -28 40 M -37 -28 L 0 1 L -28 40 M 35 -31 L 0 1 L 43 29" fill="none" stroke="${teal}" stroke-opacity=".42"/>
          ${dots([[-37,-28],[35,-31],[43,29],[-28,40]],12,'#071813',`stroke="${teal}" stroke-width="1.5"`)}
          ${dots([[-37,-28],[35,-31],[43,29],[-28,40]],4,teal)}
          <circle cx="0" cy="1" r="18" fill="url(#${id}-glass)" stroke="${lime}"/><circle cy="1" r="6" fill="${lime}" class="${id}-breathe"/>
          <circle cx="-37" cy="-28" r="19" fill="none" stroke="${teal}" stroke-opacity=".2" class="${id}-pulse"/>
          <circle cx="43" cy="29" r="19" fill="none" stroke="${teal}" stroke-opacity=".2" class="${id}-pulse" style="animation-delay:-2s"/>
        </g>
        <g transform="translate(1000 150)"><g class="${id}-lift">
          <path d="M 0 -45 L 39 -22 L 39 23 L 0 47 L -39 23 L -39 -22 Z" fill="url(#${id}-glass)" stroke="${teal}" stroke-width="1.5"/>
          <path d="M -39 -22 L 0 1 L 39 -22 M 0 1 L 0 47" stroke="${lime}" stroke-width="1.5" fill="none"/>
          <path d="M 0 -45 L 0 1 M -39 23 L 0 1 L 39 23" stroke="${teal}" stroke-opacity=".25" fill="none"/>
          <path d="M -29 -16 L 0 -33 L 29 -16 L 0 1 Z" fill="${lime}" fill-opacity=".13"/><path d="M -29 1 L 0 18 L 29 1" fill="none" stroke="${lime}" stroke-opacity=".55" class="${id}-breathe"/>
          ${dots([[0,-45],[39,-22],[39,23],[0,47],[-39,23],[-39,-22]],2.5,white)}
        </g></g>
        <g transform="translate(1400 150)">
          <path d="M -43 -32 L 43 -32 L 43 25 L -43 25 Z" fill="url(#${id}-glass)" stroke="${teal}" stroke-width="1.5"/>
          <path d="M -31 13 L -14 -3 L 0 5 L 19 -15 L 31 -8" fill="none" stroke="${lime}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M 0 25 L 0 42 M -17 42 L 17 42" stroke="${teal}" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M -56 -12 L -61 -12 M 56 -12 L 61 -12 M 0 -44 L 0 -51 M -43 -43 L -47 -47 M 43 -43 L 47 -47" stroke="${lime}" stroke-width="2" stroke-linecap="round" class="${id}-breathe"/>
          ${dots([[-31,13],[19,-15]],3.5,lime)}
        </g>
        <path d="M 99 271 L 1501 271" stroke="${teal}" stroke-opacity=".08"/>
        ${centers.map(x=>`<path d="M ${x} 261 V 281" stroke="${teal}" stroke-opacity=".27"/>`).join('')}
      </g>`;
    });
  }
  function bridges() {
    return shell('bridges', '0 0 800 650', id => {
      const paths = [
        'M 335 285 C 253 240 280 165 174 151',
        'M 466 285 C 548 240 523 165 626 151',
        'M 466 365 C 548 410 523 489 626 499',
        'M 335 365 C 253 410 280 489 174 499'
      ];
      const nodes = [[130,150],[670,150],[670,500],[130,500]];
      const rails = paths.map((d,i)=>`<path d="${d}" fill="none" stroke="${teal}" stroke-opacity=".2" stroke-width="1.5"/><path d="${d}" fill="none" stroke="url(#${id}-line)" stroke-width="3" stroke-linecap="round" class="${id}-signal" style="animation-delay:-${i*1.7}s"/>`).join('');
      return `<circle cx="400" cy="325" r="288" fill="url(#${id}-glow)"/>
        <ellipse cx="400" cy="325" rx="298" ry="242" fill="none" stroke="${teal}" stroke-opacity=".055"/>
        <ellipse cx="400" cy="325" rx="238" ry="286" fill="none" stroke="${teal}" stroke-opacity=".065" transform="rotate(30 400 325)"/>
        ${rails}
        <g transform="translate(400 325)">
          <circle r="113" fill="none" stroke="${teal}" stroke-opacity=".2" stroke-dasharray="1 11"/>
          <circle r="105" fill="none" stroke="${lime}" stroke-opacity=".3" stroke-dasharray="32 298" class="${id}-orbit"/>
          <circle r="92" fill="#030b09" fill-opacity=".85" stroke="${teal}" stroke-opacity=".25"/>
          <circle r="79" fill="url(#${id}-glass)" stroke="url(#${id}-line)" stroke-opacity=".65"/>
          <path d="M 0 -54 L 47 -27 L 47 27 L 0 54 L -47 27 L -47 -27 Z M 0 -54 L 0 54 M -47 -27 L 47 27 M -47 27 L 47 -27" fill="none" stroke="${teal}" stroke-opacity=".37"/>
          <path d="M 0 -54 L 47 27 L -47 27 Z M 0 54 L 47 -27 L -47 -27 Z" fill="none" stroke="${lime}" stroke-opacity=".27"/>
          ${dots([[0,-54],[47,-27],[47,27],[0,54],[-47,27],[-47,-27]],5,teal)}
          <circle r="25" fill="${lime}" opacity=".2" filter="url(#${id}-light)" class="${id}-breathe"/>
          <path d="M 0 -23 L 20 -11.5 L 20 11.5 L 0 23 L -20 11.5 L -20 -11.5 Z" fill="#11291d" stroke="${lime}" stroke-width="1.6"/>
          <path d="M 0 -12 L 10.5 -6 L 10.5 6 L 0 12 L -10.5 6 L -10.5 -6 Z" fill="${lime}"/>
        </g>
        ${nodes.map(([x,y],i)=>`<g transform="translate(${x} ${y})"><circle r="63" fill="url(#${id}-glow)"/><circle r="48" fill="#07130f" stroke="${i%2?teal:lime}" stroke-opacity=".45"/><circle r="55" fill="none" stroke="${teal}" stroke-opacity=".12"/><circle cx="${i%2?-48:48}" r="4" fill="${i%2?teal:lime}"/><circle r="63" fill="none" stroke="${teal}" stroke-opacity=".1" stroke-dasharray="2 28" class="${id}-orbit-reverse" style="animation-delay:-${i*5}s"/></g>`).join('')}
        <g transform="translate(130 150)" fill="none" stroke="${lime}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M 0 -17 C -9 -23 -17 -22 -24 -18 V 19 C -14 15 -7 17 0 22 C 7 17 14 15 24 19 V -18 C 17 -22 9 -23 0 -17 V 22"/><path d="M -17 -10 L -8 -8 M -17 -1 L -8 1 M 8 -8 L 17 -10 M 8 1 L 17 -1" opacity=".4"/></g>
        <g transform="translate(670 150)" fill="none" stroke="${teal}" stroke-width="1.7"><ellipse rx="27" ry="11" transform="rotate(33)"/><ellipse rx="27" ry="11" transform="rotate(-33)"/><ellipse rx="11" ry="27"/><circle r="4" fill="${teal}"/></g>
        <g transform="translate(670 500)" fill="none" stroke="${lime}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M -22 23 V 10 H -8 V -3 H 6 V -17 H 23 M 12 -27 L 23 -17 L 12 -7"/><path d="M -22 30 H 25" opacity=".35"/></g>
        <g transform="translate(130 500)" fill="none" stroke="${teal}" stroke-width="1.7" stroke-linejoin="round"><path d="M 0 -27 L 25 -13.5 L 25 14 L 0 28 L -25 14 L -25 -13.5 Z M -25 -13.5 L 0 0 L 25 -13.5 M 0 0 V 28"/><path d="M -11 -19 L 13 -5.5 V 10" opacity=".45"/></g>`;
    });
  }
  function horizons() {
    return shell('horizons', '0 0 1600 400', id => {
      const waves = [
        'M -60 350 C 275 342 367 240 705 248 S 1191 414 1660 162',
        'M -60 380 C 281 380 351 250 705 272 S 1213 421 1660 214',
        'M -60 310 C 265 310 383 221 705 216 S 1204 351 1660 107',
        'M -60 267 C 266 270 393 188 705 180 S 1240 297 1660 60'
      ];
      return `<ellipse cx="1080" cy="195" rx="485" ry="210" fill="url(#${id}-glow)"/>
        ${waves.map((d,i)=>`<path d="${d}" fill="none" stroke="url(#${id}-line)" stroke-opacity="${.065+i*.025}" stroke-width="1"/>`).join('')}
        <path d="${waves[2]}" fill="none" stroke="${teal}" stroke-opacity=".42" stroke-width="2.5" stroke-linecap="round" class="${id}-signal"/>
        ${dots([[238,278],[633,218],[1046,250],[1395,218]],3.5,lime,`class="${id}-breathe"`)}
        <path d="M 0 391 H 1600" fill="none" stroke="${teal}" stroke-opacity=".07"/>`;
    });
  }
  window.DeckVisuals = Object.freeze({journey, bridges, horizons});
})();
