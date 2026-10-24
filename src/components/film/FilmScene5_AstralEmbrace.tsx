import React, { useMemo } from 'react';

interface FilmScene5Props {
  sceneProgress: number; // 0 to 1 inside scene 5
}

interface Stardust {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

export const FilmScene5_AstralEmbrace: React.FC<FilmScene5Props> = ({ sceneProgress }) => {
  // Embrace tightness & light bloom progression
  const bloomStrength = Math.min(1, sceneProgress * 1.4);
  const ribbonOffset = (1 - Math.min(1, sceneProgress * 1.2)) * 1200;

  // Stardust longing particles
  const particles = useMemo<Stardust[]>(() => {
    const colors = ['#fde68a', '#f472b6', '#c084fc', '#ffffff'];
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: 35 + ((i * 7) % 30),
      y: 20 + ((i * 13) % 60),
      size: 1.5 + (i % 4) * 1.5,
      speed: 2 + (i % 3) * 1.5,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Majestic Cosmic Nebula Bloom Background */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(244, 114, 182, ${0.18 * bloomStrength}) 0%, rgba(251, 191, 36, ${0.14 * bloomStrength}) 35%, rgba(99, 102, 241, ${0.12 * bloomStrength}) 60%, rgba(2, 6, 23, 0.98) 100%)`,
        }}
      />

      {/* Central Radiance Pulse */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none animate-spectral-bloom"
        style={{
          width: `${320 + bloomStrength * 260}px`,
          height: `${320 + bloomStrength * 260}px`,
          background: 'radial-gradient(circle, rgba(254, 240, 138, 0.35) 0%, rgba(244, 114, 182, 0.25) 45%, rgba(147, 51, 234, 0.1) 75%, transparent 85%)',
          filter: 'blur(30px)',
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
          <linearGradient id="astralRibbonLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#f472b6" stopOpacity="1" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="astralRibbonRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#f472b6" stopOpacity="1" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.95" />
          </linearGradient>

          <filter id="spectralHugFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur1" />
            <feGaussianBlur stdDeviation="15" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Starlight field in SVG */}
        <g opacity={bloomStrength}>
          <circle cx="200" cy="120" r="1.5" fill="#fef08a" />
          <circle cx="280" cy="190" r="1.2" fill="#fbcfe8" />
          <circle cx="750" cy="110" r="1.6" fill="#fef08a" />
          <circle cx="820" cy="180" r="1.2" fill="#bfdbfe" />
          <circle cx="500" cy="90" r="2" fill="#ffffff" />
        </g>

        {/* ================= DUA SILUET BERTEMU DI TENGAH & SALING MEMELUK ERAT ================= */}
        {/* Figure 1 (from Left) stepping into the center: x ~ 460 */}
        <g id="figureLeftEmbrace" transform={`translate(${(sceneProgress * 40)}, 0)`}>
          {/* Siluet Tubuh Merengkuh */}
          <path
            d="
              M 420 480
              C 430 430, 440 370, 450 320
              C 455 290, 475 270, 490 270
              C 498 270, 505 278, 508 290
              C 502 330, 480 370, 470 430
              L 460 480
              Z
            "
            fill="#0f172a"
            stroke="#93c5fd"
            strokeWidth="2"
          />
          {/* Arm Wrapping Around Figure 2's Back/Shoulder */}
          <path
            d="
              M 465 315
              C 480 300, 510 300, 530 315
              C 545 325, 545 345, 530 360
            "
            stroke="#bfdbfe"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#spectralHugFilter)"
          />
        </g>

        {/* Figure 2 (from Right) stepping into the center: x ~ 540 */}
        <g id="figureRightEmbrace" transform={`translate(${-(sceneProgress * 40)}, 0)`}>
          {/* Siluet Tubuh Merengkuh Balik */}
          <path
            d="
              M 580 480
              C 570 430, 560 370, 550 320
              C 545 290, 525 270, 510 270
              C 502 270, 495 278, 492 290
              C 498 330, 520 370, 530 430
              L 540 480
              Z
            "
            fill="#0f172a"
            stroke="#f472b6"
            strokeWidth="2"
          />
          {/* Arm Wrapping Around Figure 1's Waist/Back */}
          <path
            d="
              M 535 325
              C 520 340, 490 350, 470 340
              C 455 330, 455 310, 470 295
            "
            stroke="#fbcfe8"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#spectralHugFilter)"
          />
        </g>

        {/* ================= SULUR-SULUR CAHAYA PELUKAN SPEKTRAL (SPECTRAL EMBRACE RIBBONS) ================= */}
        <g filter="url(#spectralHugFilter)">
          {/* Ribbon 1: Arching from left around both lovers */}
          <path
            d="
              M 300 420
              C 380 260, 450 200, 500 220
              C 550 240, 620 260, 700 420
            "
            stroke="url(#astralRibbonLeft)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="1200"
            strokeDashoffset={ribbonOffset}
          />

          {/* Ribbon 2: Arching beneath their embrace */}
          <path
            d="
              M 700 450
              C 620 540, 550 560, 500 530
              C 450 500, 380 520, 300 450
            "
            stroke="url(#astralRibbonRight)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="1200"
            strokeDashoffset={ribbonOffset}
          />

          {/* Spiral light loop wrapping their chest/hearts in an infinity loop */}
          <path
            d="
              M 460 330
              C 475 285, 525 285, 540 330
              C 555 375, 500 395, 500 330
              C 500 265, 445 285, 460 330
              Z
            "
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="800"
            strokeDashoffset={ribbonOffset * 0.6}
          />
        </g>

        {/* Central Luminous Heart Spark */}
        <circle cx="500" cy="320" r={16 + bloomStrength * 14} fill="rgba(255, 255, 255, 0.9)" filter="url(#spectralHugFilter)" />
        <circle cx="500" cy="320" r={36 + bloomStrength * 24} fill="rgba(251, 191, 36, 0.35)" />

        {/* Grand Final Inscription (Appears at sceneProgress >= 0.70 with typewriter after subtitle vanishes) */}
        {sceneProgress >= 0.70 && (
          (() => {
            const line1 = '"Mungkin takdir tak pernah mengizinkan raga kita bersatu di dunia ini..."';
            const line2 = '"Namun di setiap helaan nafas dan semesta malam kita, cinta ini selamanya utuh."';

            const p1 = Math.min(1, Math.max(0, (sceneProgress - 0.70) / 0.12));
            const charCount1 = Math.floor(line1.length * p1);
            const typedLine1 = line1.slice(0, charCount1);

            const p2 = Math.min(1, Math.max(0, (sceneProgress - 0.82) / 0.12));
            const charCount2 = Math.floor(line2.length * p2);
            const typedLine2 = line2.slice(0, charCount2);

            return (
              <g>
                <text x="500" y="525" fill="#fef08a" fontSize="20" fontFamily="Caveat, cursive" textAnchor="middle" letterSpacing="0.8">
                  {typedLine1}
                </text>
                {p2 > 0 && (
                  <text x="500" y="555" fill="#ffffff" fontSize="22" fontFamily="Caveat, cursive" textAnchor="middle" fontWeight="600" letterSpacing="1">
                    {typedLine2}
                  </text>
                )}
              </g>
            );
          })()
        )}
      </svg>

      {/* Floating Longing Stardust Embers */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}`,
              animationDuration: `${p.speed}s`,
              opacity: bloomStrength * 0.85,
            }}
          />
        ))}
      </div>
    </div>
  );
};
