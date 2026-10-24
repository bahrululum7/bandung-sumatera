import React from 'react';

interface FilmScene1Props {
  sceneProgress: number; // 0 to 1 inside scene 1
}

export const FilmScene1_NightCall: React.FC<FilmScene1Props> = ({ sceneProgress }) => {
  // Laptop lid closing animation
  const laptopLidAngle = Math.min(1, sceneProgress * 2.2); // 0 (open) to 1 (closed)
  // Call connected state
  const isConnected = sceneProgress > 0.45;
  // Audio waveform pulse
  const waveOpacity = isConnected ? Math.min(1, (sceneProgress - 0.45) * 3) : 0;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Dark midnight background with subtle blue/violet aura */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.6) 0%, rgba(3, 7, 18, 0.95) 100%)',
        }}
      />

      {/* SVG Cinematic Vector Canvas */}
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full max-h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="phoneConnectGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f472b6" stopOpacity="1" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
          </linearGradient>

          <filter id="neonGlow1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Both Rooms have the EXACT SAME TIME: 23:00 MALAM */}
        <text x="180" y="70" fill="#94a3b8" fontSize="24" fontFamily="monospace" fontWeight="300" letterSpacing="3">
          23:00 PM <tspan fill="#64748b" fontSize="14">· KAMAR BAHRUL</tspan>
        </text>
        <text x="660" y="70" fill="#94a3b8" fontSize="24" fontFamily="monospace" fontWeight="300" letterSpacing="3">
          23:00 PM <tspan fill="#64748b" fontSize="14">· KAMAR VINA</tspan>
        </text>

        {/* Central Vertical Division (Same time, different places) */}
        <line
          x1="500"
          y1="80"
          x2="500"
          y2="520"
          stroke="rgba(100, 116, 139, 0.25)"
          strokeDasharray="6 6"
          strokeWidth="1.5"
        />

        {/* ================= SISI KIRI (KAMAR 1: MENUTUP LAPTOP & TUGAS) ================= */}
        <g id="roomLeft">
          {/* Work Desk */}
          <line x1="80" y1="440" x2="420" y2="440" stroke="#475569" strokeWidth="2.5" />
          <line x1="120" y1="440" x2="120" y2="540" stroke="#334155" strokeWidth="2" />
          <line x1="380" y1="440" x2="380" y2="540" stroke="#334155" strokeWidth="2" />

          {/* Stacks of books/papers being pushed aside */}
          <rect x="130" y="415" width="45" height="8" rx="1.5" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <rect x="132" y="424" width="48" height="8" rx="1.5" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <rect x="128" y="432" width="54" height="8" rx="1.5" fill="#334155" stroke="#475569" strokeWidth="1" />

          {/* Laptop Base */}
          <rect x="220" y="432" width="90" height="7" rx="2" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
          {/* Laptop Lid (closes dynamically as user advances scene) */}
          <g transform={`rotate(${-laptopLidAngle * 82} 265 432)`}>
            <rect x="222" y="360" width="86" height="72" rx="3" fill="#0f172a" stroke="#94a3b8" strokeWidth="1.6" />
            {/* Screen glow fading as it closes */}
            <rect
              x="226"
              y="364"
              width="78"
              height="64"
              rx="2"
              fill="#38bdf8"
              opacity={Math.max(0, 0.8 - laptopLidAngle * 0.9)}
            />
          </g>

          {/* Silhouette 1 Sitting at Desk, Reaching for Phone */}
          {/* Chair */}
          <path d="M 320 370 L 320 490 M 320 440 L 360 440" stroke="#334155" strokeWidth="3" />
          {/* Body Silhouette */}
          <path
            d="
              M 350 490
              C 340 450, 335 410, 340 370
              C 342 345, 360 330, 375 330
              C 390 330, 400 345, 395 365
              C 390 380, 385 410, 390 440
              L 410 490
              Z
            "
            fill="#0f172a"
            stroke="#60a5fa"
            strokeWidth="1.5"
          />
          {/* Arm holding phone to ear */}
          <path
            d="
              M 360 365
              C 350 375, 335 385, 330 370
              C 328 355, 340 345, 355 345
            "
            stroke="#93c5fd"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Left Phone glowing */}
          <rect
            x="345"
            y="336"
            width="12"
            height="22"
            rx="2.5"
            fill="#bfdbfe"
            stroke="#60a5fa"
            strokeWidth="1.5"
            className="drop-shadow-[0_0_8px_rgba(96,165,250,0.9)]"
          />
        </g>

        {/* ================= SISI KANAN (KAMAR 2: MENYINGKIRKAN KESIBUKAN & ANGKAT TELEPON) ================= */}
        <g id="roomRight">
          {/* Work Desk Right */}
          <line x1="580" y1="440" x2="920" y2="440" stroke="#475569" strokeWidth="2.5" />
          <line x1="620" y1="440" x2="620" y2="540" stroke="#334155" strokeWidth="2" />
          <line x1="880" y1="440" x2="880" y2="540" stroke="#334155" strokeWidth="2" />

          {/* Work binder & notebook closed */}
          <rect x="800" y="422" width="60" height="18" rx="2" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />

          {/* Silhouette 2 Leaning back in chair with phone to ear */}
          <path
            d="
              M 650 490
              C 660 450, 665 410, 660 370
              C 658 345, 640 330, 625 330
              C 610 330, 600 345, 605 365
              C 610 380, 615 410, 610 440
              L 590 490
              Z
            "
            fill="#0f172a"
            stroke="#f472b6"
            strokeWidth="1.5"
          />
          {/* Arm holding phone to ear */}
          <path
            d="
              M 640 365
              C 650 375, 665 385, 670 370
              C 672 355, 660 345, 645 345
            "
            stroke="#fbcfe8"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Right Phone glowing */}
          <rect
            x="643"
            y="336"
            width="12"
            height="22"
            rx="2.5"
            fill="#fbcfe8"
            stroke="#f472b6"
            strokeWidth="1.5"
            className="drop-shadow-[0_0_8px_rgba(244,114,182,0.9)]"
          />
        </g>

        {/* ================= JALUR SUARA & FREKUENSI AUDIO MENGHUBUNGKAN KEDUANYA ================= */}
        {isConnected && (
          <g filter="url(#neonGlow1)" opacity={waveOpacity}>
            {/* Dynamic Sound Wave connecting Phone 1 (350, 345) to Phone 2 (650, 345) */}
            <path
              d="
                M 360 348
                C 390 320, 420 380, 450 330
                C 475 290, 500 400, 525 330
                C 555 380, 585 320, 615 350
                L 645 348
              "
              stroke="url(#phoneConnectGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="800"
              strokeDashoffset={(1 - (sceneProgress - 0.45) * 1.8) * 800}
            />

            {/* Little voice ripples */}
            <circle cx="500" cy="340" r="16" stroke="rgba(244, 114, 182, 0.6)" strokeWidth="1.5" fill="none" className="animate-ping" />
            <circle cx="500" cy="340" r="5" fill="#fbcfe8" />
          </g>
        )}

        {/* Dialogue / Whisper in SVG (Appears at sceneProgress >= 0.70 with typewriter after subtitle vanishes) */}
        {sceneProgress >= 0.70 && (
          (() => {
            const fullText = '"Halo... akhirnya bisa dengar suaramu."';
            const p = Math.min(1, Math.max(0, (sceneProgress - 0.70) / 0.16));
            const charCount = Math.floor(fullText.length * p);
            const typedText = fullText.slice(0, charCount);
            const opacity = sceneProgress > 0.94 ? Math.max(0, 1 - (sceneProgress - 0.94) / 0.05) : 1;
            return (
              <g opacity={opacity}>
                <text
                  x="500"
                  y="266"
                  fill="#ffffff"
                  fontSize="22"
                  fontFamily="Caveat, cursive"
                  textAnchor="middle"
                  letterSpacing="0.8"
                  filter="url(#neonGlow1)"
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
