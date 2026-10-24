import React from 'react';

interface FilmScene3Props {
  sceneProgress: number; // 0 to 1 inside scene 3
}

export const FilmScene3_DawnCall: React.FC<FilmScene3Props> = ({ sceneProgress }) => {
  // Dawn transition from dark to glowing golden morning across BOTH rooms simultaneously
  const dawnGlow = Math.min(1, sceneProgress * 1.3);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Background Dawn Atmosphere: Simultaneous Golden Morning breaking */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 70%, rgba(245, 158, 11, ${0.15 + dawnGlow * 0.25}) 0%, rgba(244, 114, 182, ${0.1 + dawnGlow * 0.15}) 40%, rgba(15, 23, 42, 0.95) 100%)`,
        }}
      />

      {/* Sunbeams shining into both windows */}
      <div 
        className="absolute -top-12 left-10 w-96 h-[500px] bg-gradient-to-b from-amber-200/15 via-amber-400/5 to-transparent pointer-events-none rotate-12 blur-2xl transform origin-top-left"
        style={{ opacity: dawnGlow }}
      />
      <div 
        className="absolute -top-12 right-10 w-96 h-[500px] bg-gradient-to-b from-amber-200/15 via-amber-400/5 to-transparent pointer-events-none -rotate-12 blur-2xl transform origin-top-right"
        style={{ opacity: dawnGlow }}
      />

      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="dawnGlow3" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient id="sunDawnGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* TIME STAMP: 08:00 AM (EXACT SAME TIME IN BOTH ROOMS - TELEPONAN SAMPE JAM 8 PAGI) */}
        <text x="180" y="70" fill="#fde68a" fontSize="24" fontFamily="monospace" fontWeight="300" letterSpacing="3">
          08:00 AM <tspan fill="#d97706" fontSize="14">· FAJAR PAGI</tspan>
        </text>
        <text x="660" y="70" fill="#fde68a" fontSize="24" fontFamily="monospace" fontWeight="300" letterSpacing="3">
          08:00 AM <tspan fill="#d97706" fontSize="14">· MENTARI TERBIT</tspan>
        </text>

        {/* Call duration indicator badge in the middle */}
        <g transform="translate(500, 70)">
          <rect x="-85" y="-18" width="170" height="26" rx="13" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="1" />
          <circle cx="-65" cy="-5" r="3.5" fill="#10b981" className="animate-ping" />
          <circle cx="-65" cy="-5" r="3.5" fill="#10b981" />
          <text x="5" y="-1" fill="#fef3c7" fontSize="12" fontFamily="monospace" textAnchor="middle" letterSpacing="1">
            DURASI 08:42:19
          </text>
        </g>

        {/* Central Divider Line */}
        <line
          x1="500"
          y1="90"
          x2="500"
          y2="520"
          stroke="rgba(245, 158, 11, 0.25)"
          strokeDasharray="6 6"
          strokeWidth="1.5"
        />

        {/* ================= SISI KIRI: KAMAR DENGAN JENDELA FAJAR & SILUET TERSENYUM ================= */}
        <g id="dawnLeft">
          {/* Morning Window Left */}
          <rect x="120" y="110" width="120" height="150" rx="4" fill="#1e293b" stroke="#78350f" strokeWidth="2" opacity="0.8" />
          {/* Sun outside window */}
          <circle cx="210" cy="160" r="30" fill="url(#sunDawnGrad)" opacity={dawnGlow} />
          {/* Window Panes */}
          <line x1="180" y1="110" x2="180" y2="260" stroke="#78350f" strokeWidth="1.5" />
          <line x1="120" y1="185" x2="240" y2="185" stroke="#78350f" strokeWidth="1.5" />

          {/* Morning birds flying in distance */}
          <path d="M 140 140 Q 146 135 152 140 Q 158 135 164 140" stroke="#fef3c7" strokeWidth="1.2" fill="none" opacity={dawnGlow} />
          <path d="M 160 155 Q 165 150 170 155 Q 175 150 180 155" stroke="#fde68a" strokeWidth="1" fill="none" opacity={dawnGlow} />

          {/* Bed & Silhouette 1 waking up smiling to the voice */}
          <line x1="80" y1="460" x2="440" y2="460" stroke="#451a03" strokeWidth="2.5" />
          {/* Curled silhouette smiling */}
          <path
            d="
              M 150 410
              C 145 365, 185 340, 215 350
              C 245 360, 275 375, 295 405
              C 325 420, 365 430, 385 450
              C 345 465, 265 465, 205 455
              Z
            "
            fill="#1c1917"
            stroke="#fbbf24"
            strokeWidth="2"
          />

          {/* Hand holding phone close to ear/lips */}
          <path d="M 185 390 C 200 400, 215 405, 235 400" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Phone illuminated with morning glow */}
          <rect
            x="185"
            y="368"
            width="10"
            height="18"
            rx="2"
            transform="rotate(25 190 377)"
            fill="#fef3c7"
            stroke="#f59e0b"
            strokeWidth="1.2"
            filter="url(#dawnGlow3)"
          />

          {/* Blanket bathed in morning sun */}
          <path
            d="M 230 435 C 270 445, 330 445, 370 435"
            stroke="#f59e0b"
            strokeWidth="1.8"
            strokeOpacity="0.8"
          />
        </g>

        {/* ================= SISI KANAN: MENYEDUHKAN KOPI HANGAT SAMBIL TETAP MENDENGARKAN ================= */}
        <g id="dawnRight">
          {/* Morning Window Right */}
          <rect x="760" y="110" width="120" height="150" rx="4" fill="#1e293b" stroke="#78350f" strokeWidth="2" opacity="0.8" />
          <circle cx="790" cy="160" r="30" fill="url(#sunDawnGrad)" opacity={dawnGlow} />
          <line x1="820" y1="110" x2="820" y2="260" stroke="#78350f" strokeWidth="1.5" />
          <line x1="760" y1="185" x2="880" y2="185" stroke="#78350f" strokeWidth="1.5" />

          {/* Birds Right */}
          <path d="M 830 140 Q 836 135 842 140 Q 848 135 854 140" stroke="#fef3c7" strokeWidth="1.2" fill="none" opacity={dawnGlow} />

          {/* Table with Fresh Steaming Morning Coffee */}
          <line x1="560" y1="460" x2="920" y2="460" stroke="#451a03" strokeWidth="2.5" />
          <rect x="580" y="380" width="70" height="80" rx="3" fill="#1c1917" stroke="#78350f" strokeWidth="1.5" />

          {/* Steaming Coffee Mug */}
          <ellipse cx="615" cy="378" rx="15" ry="4" fill="#292524" stroke="#d97706" strokeWidth="1.2" />
          <path d="M 605 376 C 605 362, 625 362, 625 376 Z" fill="#78350f" stroke="#fbbf24" strokeWidth="1.4" />
          {/* Cup handle */}
          <path d="M 625 366 C 632 366, 632 374, 625 374" stroke="#fbbf24" strokeWidth="1.4" />

          {/* Rising Steam Curves */}
          <path
            d="M 612 358 C 608 344, 618 334, 613 320"
            stroke="rgba(254, 243, 199, 0.75)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="animate-steam"
          />
          <path
            d="M 618 359 C 622 346, 614 336, 619 322"
            stroke="rgba(251, 191, 36, 0.6)"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="animate-steam"
            style={{ animationDelay: '0.8s' }}
          />

          {/* Silhouette 2 Sitting up in Bed, holding phone & mug, smiling */}
          <path
            d="
              M 800 460
              C 790 410, 775 370, 770 340
              C 768 315, 750 300, 735 300
              C 720 300, 710 315, 715 335
              C 720 350, 725 380, 720 410
              L 680 460
              Z
            "
            fill="#1c1917"
            stroke="#f59e0b"
            strokeWidth="2"
          />

          {/* Arm holding phone to ear */}
          <path d="M 730 335 C 720 345, 705 355, 700 340" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />
          <rect
            x="695"
            y="325"
            width="10"
            height="18"
            rx="2"
            transform="rotate(-20 700 334)"
            fill="#fef3c7"
            stroke="#f59e0b"
            strokeWidth="1.2"
            filter="url(#dawnGlow3)"
          />
        </g>

        {/* Morning Dialogue in SVG (Appears at sceneProgress >= 0.70 with typewriter after subtitle vanishes) */}
        {sceneProgress >= 0.70 && (
          (() => {
            const fullText = '"Selamat pagi... kita berhasil lewatin malam lagi, berdua."';
            const p = Math.min(1, Math.max(0, (sceneProgress - 0.70) / 0.18));
            const charCount = Math.floor(fullText.length * p);
            const typedText = fullText.slice(0, charCount);
            const opacity = sceneProgress > 0.94 ? Math.max(0, 1 - (sceneProgress - 0.94) / 0.05) : 1;
            return (
              <g opacity={opacity}>
                <text
                  x="500"
                  y="249"
                  fill="#fef3c7"
                  fontSize="20"
                  fontFamily="Caveat, cursive"
                  textAnchor="middle"
                  letterSpacing="0.6"
                  filter="url(#dawnGlow3)"
                >
                  {typedText}
                </text>
              </g>
            );
          })()
        )}
      </svg>
    </div>
  );
};
