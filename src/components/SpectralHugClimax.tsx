import React, { useMemo } from 'react';

interface SpectralHugClimaxProps {
  scrollProgress: number; // 0 to 1
}

interface EmberParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  color: string;
  delay: number;
}

export const SpectralHugClimax: React.FC<SpectralHugClimaxProps> = ({ scrollProgress }) => {
  // Climax activation begins at scroll 0.70 and reaches maximum brilliance at 0.90 to 1.00
  const climaxProgress = Math.max(0, Math.min(1, (scrollProgress - 0.70) / 0.25));

  // Particles of longing (partikel cahaya rindu)
  const embers = useMemo<EmberParticle[]>(() => {
    const colors = [
      'rgba(251, 191, 36, ', // gold
      'rgba(244, 114, 182, ', // rose
      'rgba(192, 132, 252, ', // lavender
      'rgba(254, 240, 138, ', // starlight
    ];
    return Array.from({ length: 36 }).map((_, i) => ({
      id: i,
      x: 35 + ((i * 7) % 30), // clustered around center
      y: 35 + ((i * 11) % 40),
      size: 2 + (i % 4) * 1.5,
      speedY: 0.6 + (i % 3) * 0.4,
      speedX: ((i % 5) - 2) * 0.3,
      color: colors[i % colors.length],
      delay: (i * 0.15) % 2.5,
    }));
  }, []);

  if (climaxProgress <= 0.01) return null;

  // Path drawing length calculation for the spectral hug tendrils
  // Tendril 1 starts from left (x: 270, y: 260) and sweeps across center (x: 500, y: 250) to right figure (x: 730, y: 260)
  // Tendril 2 starts from right (x: 730, y: 260) and sweeps across center to left figure (x: 270, y: 260)
  const pathOffset = (1 - climaxProgress) * 1600;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-25 overflow-hidden transition-opacity duration-300"
      style={{ opacity: climaxProgress }}
    >
      {/* Central Warm Bloom Background (Aura Kehangatan yang merekah) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none animate-spectral-bloom"
        style={{
          width: `${300 + climaxProgress * 380}px`,
          height: `${300 + climaxProgress * 380}px`,
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.28) 0%, rgba(244, 114, 182, 0.22) 35%, rgba(147, 51, 234, 0.12) 65%, transparent 80%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Secondary softer enveloping glow over both rooms */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 55%, rgba(254, 215, 170, 0.18) 0%, rgba(244, 114, 182, 0.12) 40%, transparent 75%)',
        }}
      />

      {/* SVG Spectacular Spectral Hug Lines & Ethereal Tendrils */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Left-to-Right Radiant Hug Gradient */}
          <linearGradient id="hugGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.3" />
            <stop offset="35%" stopColor="#c084fc" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#f472b6" stopOpacity="1" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.75" />
          </linearGradient>

          {/* Right-to-Left Radiant Hug Gradient */}
          <linearGradient id="hugGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
            <stop offset="35%" stopColor="#f472b6" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
            <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.75" />
          </linearGradient>

          {/* Intense Light Core Bloom Filter */}
          <filter id="spectralGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="18" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="intenseCenterGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 2 0
            " />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Ethereal Shimmering Ribbons */}
        <g filter="url(#spectralGlowFilter)" opacity="0.6">
          {/* Upper arching arm of light from left to right */}
          <path
            d="
              M 240 360
              C 300 240, 420 180, 500 220
              C 580 260, 680 260, 760 360
            "
            stroke="url(#hugGradLeft)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="1600"
            strokeDashoffset={pathOffset}
          />

          {/* Lower embracing arm from right to left */}
          <path
            d="
              M 760 380
              C 700 480, 580 500, 500 460
              C 420 420, 320 440, 240 380
            "
            stroke="url(#hugGradRight)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="1600"
            strokeDashoffset={pathOffset}
          />
        </g>

        {/* Core Sharp Luminous Hug tendrils (The Embrace That Reaches Each Other) */}
        <g filter="url(#spectralGlowFilter)">
          {/* Tendril 1: Left Figure's reaching arm & warmth embracing the Right Figure */}
          <path
            d="
              M 240 360
              C 290 320, 360 280, 440 290
              C 500 298, 540 340, 580 345
              C 640 350, 710 330, 770 365
              C 810 390, 790 430, 730 430
              C 690 430, 670 410, 680 380
            "
            stroke="url(#hugGradLeft)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1600"
            strokeDashoffset={pathOffset}
          />

          {/* Tendril 2: Right Figure's reaching arm & warmth embracing the Left Figure */}
          <path
            d="
              M 760 360
              C 710 320, 640 280, 560 290
              C 500 298, 460 340, 420 345
              C 360 350, 290 330, 230 365
              C 190 390, 210 430, 270 430
              C 310 430, 330 410, 320 380
            "
            stroke="url(#hugGradRight)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="1600"
            strokeDashoffset={pathOffset}
          />

          {/* Center Intertwining Infinity Knot of Light */}
          <path
            d="
              M 440 350
              C 460 310, 540 310, 560 350
              C 580 390, 500 410, 500 350
              C 500 290, 420 310, 440 350
              Z
            "
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeDasharray="1600"
            strokeDashoffset={pathOffset * 0.8}
            fill="none"
          />

          {/* Secondary delicate threads of light dancing around the figures */}
          <path
            d="
              M 250 340
              C 340 380, 440 380, 500 360
              C 560 340, 660 340, 750 340
            "
            stroke="rgba(254, 215, 226, 0.85)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1600"
            strokeDashoffset={pathOffset}
          />
        </g>

        {/* Center Glowing Heart-Core of Spiritual Reunion */}
        <g filter="url(#intenseCenterGlow)">
          <circle
            cx="500"
            cy="350"
            r={18 + climaxProgress * 22}
            fill="rgba(255, 248, 230, 0.95)"
          />
          <circle
            cx="500"
            cy="350"
            r={35 + climaxProgress * 45}
            fill="rgba(251, 191, 36, 0.4)"
          />
          <circle
            cx="500"
            cy="350"
            r={65 + climaxProgress * 75}
            fill="rgba(244, 114, 182, 0.25)"
          />
        </g>
      </svg>

      {/* Longing Stardust Particles Floating in the Hug Field */}
      <div className="absolute inset-0 pointer-events-none">
        {embers.map((p) => {
          const opacity = Math.min(1, climaxProgress * 1.3);
          return (
            <div
              key={p.id}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: `${p.color}${opacity * 0.9})`,
                boxShadow: `0 0 8px ${p.color}0.8)`,
                animationDuration: `${2 + (p.id % 3)}s`,
                animationDelay: `${p.delay}s`,
                transform: `scale(${0.7 + climaxProgress * 0.6})`,
              }}
            />
          );
        })}
      </div>

      {/* Final Silent Climax Epilogue (at 0.92 - 1.0 scroll) */}
      {scrollProgress > 0.92 && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center z-40 transition-opacity duration-700 max-w-lg px-4"
          style={{
            opacity: Math.min(1, (scrollProgress - 0.92) / 0.08),
          }}
        >
          <p
            className="font-serif-poetic italic text-lg sm:text-xl text-rose-100/90 tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            style={{ textShadow: '0 0 25px rgba(251,191,36,0.5)' }}
          >
            "Jarak mungkin memisahkan raga... tapi rasa ini telah sampai dan memelukmu sehangat mentari."
          </p>
        </div>
      )}
    </div>
  );
};
