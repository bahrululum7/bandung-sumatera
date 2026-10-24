import React from 'react';

interface FilmScene4Props {
  sceneProgress: number; // 0 to 1 inside scene 4
}

export const FilmScene4_BitterReality: React.FC<FilmScene4Props> = ({ sceneProgress }) => {
  // Crack expansion as scene progresses
  const crackLength = Math.min(1, sceneProgress * 1.5);
  // Tear shimmer opacity
  const tearOpacity = Math.min(1, Math.max(0, (sceneProgress - 0.3) * 2));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Deep moody indigo-slate ambiance */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(30, 41, 59, 0.45) 0%, rgba(2, 6, 23, 0.98) 100%)',
        }}
      />

      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="glassBarrierGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>

          <filter id="crackGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Cinematic Header Text: The Reality */}
        <text x="500" y="65" fill="#94a3b8" fontSize="18" fontFamily="monospace" fontWeight="300" textAnchor="middle" letterSpacing="4">
          REALITA YANG KITA TAHU
        </text>

        {/* Giant Glass Screen Barrier in the Middle */}
        <rect x="480" y="80" width="40" height="440" rx="12" fill="url(#glassBarrierGlow)" stroke="rgba(148, 163, 184, 0.25)" strokeWidth="1.5" />

        {/* Faint Geographic Contour / Flight Map lines between them */}
        <g stroke="rgba(100, 116, 139, 0.2)" strokeWidth="1" strokeDasharray="3 4">
          <path d="M 180 200 C 300 240, 400 180, 480 220" />
          <path d="M 520 220 C 620 260, 720 200, 820 230" />
          <path d="M 150 350 C 280 390, 390 340, 480 360" />
          <path d="M 520 360 C 640 400, 750 350, 850 380" />
        </g>

        {/* SISI KIRI: Siluet mencondongkan badan ke kaca layar, tangan menyentuh kaca */}
        <g id="figureLeftGlass">
          <path
            d="
              M 260 480
              C 280 440, 320 390, 350 360
              C 380 330, 420 300, 440 300
              C 455 300, 465 315, 460 330
              C 450 350, 420 380, 380 430
              L 350 480
              Z
            "
            fill="#0f172a"
            stroke="#60a5fa"
            strokeWidth="1.8"
          />
          {/* Hand reaching out directly flat against the center glass pane at y:330 */}
          <path
            d="
              M 435 320
              C 450 320, 470 322, 478 322
              M 438 326
              C 455 326, 472 328, 479 328
              M 438 333
              C 455 333, 472 334, 479 334
            "
            stroke="#93c5fd"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Tear streak falling in silhouette */}
          <line
            x1="452"
            y1="316"
            x2="452"
            y2="330"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={tearOpacity}
          />
        </g>

        {/* SISI KANAN: Siluet mencondongkan badan ke kaca layar, tangan menyentuh posisi yang sama */}
        <g id="figureRightGlass">
          <path
            d="
              M 740 480
              C 720 440, 680 390, 650 360
              C 620 330, 580 300, 560 300
              C 545 300, 535 315, 540 330
              C 550 350, 580 380, 620 430
              L 650 480
              Z
            "
            fill="#0f172a"
            stroke="#f472b6"
            strokeWidth="1.8"
          />
          {/* Hand reaching out flat against the glass pane at y:330 */}
          <path
            d="
              M 565 320
              C 550 320, 530 322, 521 322
              M 562 326
              C 545 326, 528 328, 521 328
              M 562 333
              C 545 333, 528 334, 521 334
            "
            stroke="#fbcfe8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Tear streak Right */}
          <line
            x1="548"
            y1="316"
            x2="548"
            y2="330"
            stroke="#f472b6"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={tearOpacity}
          />
        </g>

        {/* Retakan Kaca & Batas Takdir (The Delicate Fracture of Distance) */}
        <g filter="url(#crackGlow)">
          {/* Point of touch between the two hands: x: 500, y: 328 */}
          <circle cx="500" cy="328" r="8" fill="rgba(255, 255, 255, 0.7)" />
          <circle cx="500" cy="328" r="16" stroke="rgba(244, 114, 182, 0.4)" strokeWidth="1" fill="none" />

          {/* Fractures expanding across glass */}
          <path
            d="
              M 500 328
              L 496 290 L 504 250 L 498 210 L 502 160
              M 500 328
              L 505 365 L 494 405 L 502 450 L 498 490
              M 500 328
              L 485 315 L 470 325
              M 500 328
              L 515 340 L 530 335
            "
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="400"
            strokeDashoffset={(1 - crackLength) * 400}
          />
        </g>

        {/* Poetic dialogue in Scene 4 (Appears at sceneProgress >= 0.70 with typewriter after subtitle vanishes) */}
        {sceneProgress >= 0.70 && (
          (() => {
            const line1 = '"Kita gak pernah ketemu, saling sayang begitu dalam... tapi kita tahu,"';
            const line2 = '"kemungkinan besar dunia dan takdir tak akan membiarkan kita bersama."';
            
            // First half of dialogue (0.70 to 0.82)
            const p1 = Math.min(1, Math.max(0, (sceneProgress - 0.70) / 0.12));
            const charCount1 = Math.floor(line1.length * p1);
            const typedLine1 = line1.slice(0, charCount1);

            // Second half of dialogue (0.82 to 0.94)
            const p2 = Math.min(1, Math.max(0, (sceneProgress - 0.82) / 0.12));
            const charCount2 = Math.floor(line2.length * p2);
            const typedLine2 = line2.slice(0, charCount2);

            const opacity = sceneProgress > 0.95 ? Math.max(0, 1 - (sceneProgress - 0.95) / 0.04) : 1;

            return (
              <g opacity={opacity}>
                <text x="500" y="498" fill="#f8fafc" fontSize="18" fontFamily="Caveat, cursive" textAnchor="middle" filter="url(#crackGlow)">
                  {typedLine1}
                </text>
                {p2 > 0 && (
                  <text x="500" y="522" fill="#fda4af" fontSize="18" fontFamily="Caveat, cursive" textAnchor="middle" filter="url(#crackGlow)">
                    {typedLine2}
                  </text>
                )}
              </g>
            );
          })()
        )}
      </svg>
    </div>
  );
};
