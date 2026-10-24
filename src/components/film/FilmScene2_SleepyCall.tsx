import React from 'react';

interface FilmScene2Props {
  sceneProgress: number; // 0 to 1 inside scene 2
}

export const FilmScene2_SleepyCall: React.FC<FilmScene2Props> = ({ sceneProgress }) => {
  // Eye droop animation (sleepiness): eyelids closing and opening softly
  const eyeClosure = Math.sin(sceneProgress * Math.PI * 4) * 0.4 + 0.5;
  // Head nod (terkulai lelah karena menahan kantuk)
  const headNod = Math.sin(sceneProgress * Math.PI * 2.5) * 5;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Deep midnight room gradient with soft moonlight glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(30, 27, 75, 0.45) 0%, rgba(4, 7, 18, 0.98) 100%)',
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
          <filter id="softGlow2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* TIME STAMP: 03:30 AM (EXACT SAME TIME IN BOTH ROOMS) */}
        <text x="180" y="70" fill="#94a3b8" fontSize="24" fontFamily="monospace" fontWeight="300" letterSpacing="3">
          03:30 AM <tspan fill="#64748b" fontSize="14">· KELOPAK SAYU</tspan>
        </text>
        <text x="660" y="70" fill="#94a3b8" fontSize="24" fontFamily="monospace" fontWeight="300" letterSpacing="3">
          03:30 AM <tspan fill="#64748b" fontSize="14">· MENAHAN KANTUK</tspan>
        </text>

        {/* Center Divider Line */}
        <line
          x1="500"
          y1="80"
          x2="500"
          y2="520"
          stroke="rgba(148, 163, 184, 0.2)"
          strokeDasharray="6 6"
          strokeWidth="1.5"
        />

        {/* ================= SISI KIRI (KAMAR 1: MERINGKUK DI RANJANG, MENAHAN KANTUK) ================= */}
        <g id="bedLeft">
          {/* Bed Base */}
          <line x1="80" y1="460" x2="440" y2="460" stroke="#334155" strokeWidth="2.5" />
          <path d="M 100 370 L 100 480 M 420 420 L 420 480" stroke="#1e293b" strokeWidth="3" />

          {/* Pillow and Bed Mattress */}
          <ellipse cx="150" cy="410" rx="35" ry="18" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />

          {/* Siluet Manusia Meringkuk Memeluk Bantal dengan Kepala Sedikit Terkulai */}
          <g transform={`translate(0, ${headNod})`}>
            {/* Curled Body and Blanket */}
            <path
              d="
                M 150 410
                C 140 370, 180 345, 210 355
                C 240 365, 270 380, 290 410
                C 320 425, 360 435, 380 455
                C 340 470, 260 470, 200 460
                Z
              "
              fill="#0f172a"
              stroke="#60a5fa"
              strokeWidth="2"
            />

            {/* Hugged Pillow */}
            <path
              d="M 180 405 C 190 380, 220 370, 240 385 C 255 395, 250 420, 230 425 C 205 430, 185 425, 180 405 Z"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="1.5"
            />

            {/* Arm cuddling pillow & holding phone against cheek */}
            <path
              d="M 180 390 C 195 400, 210 405, 230 400"
              stroke="#93c5fd"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Detailed Head & Drooping Heavy Eyelid */}
            <circle cx="170" cy="375" r="16" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.8" />
            {/* Heavy sleepy eye closing and reopening */}
            <path
              d={`M 163 375 Q 168 ${375 + eyeClosure * 4} 173 375`}
              stroke="#93c5fd"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />

            {/* Phone illuminated next to cheek */}
            <rect
              x="180"
              y="368"
              width="10"
              height="18"
              rx="2"
              transform="rotate(25 185 377)"
              fill="#dbeafe"
              stroke="#60a5fa"
              strokeWidth="1.2"
              filter="url(#softGlow2)"
            />
          </g>

          {/* Blanket wrinkles */}
          <path d="M 230 440 C 260 450, 310 448, 350 440" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.6" />
        </g>

        {/* ================= SISI KANAN (KAMAR 2: MERINGKUK DI RANJANG, MENAHAN KANTUK) ================= */}
        <g id="bedRight">
          {/* Bed Base Right */}
          <line x1="560" y1="460" x2="920" y2="460" stroke="#334155" strokeWidth="2.5" />
          <path d="M 900 370 L 900 480 M 580 420 L 580 480" stroke="#1e293b" strokeWidth="3" />

          {/* Pillow Right */}
          <ellipse cx="850" cy="410" rx="35" ry="18" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />

          {/* Siluet Manusia Meringkuk Menghadap ke Kiri */}
          <g transform={`translate(0, ${headNod * 0.9})`}>
            {/* Curled Body and Blanket Right */}
            <path
              d="
                M 850 410
                C 860 370, 820 345, 790 355
                C 760 365, 730 380, 710 410
                C 680 425, 640 435, 620 455
                C 660 470, 740 470, 800 460
                Z
              "
              fill="#0f172a"
              stroke="#f472b6"
              strokeWidth="2"
            />

            {/* Hugged Pillow Right */}
            <path
              d="M 820 405 C 810 380, 780 370, 760 385 C 745 395, 750 420, 770 425 C 795 430, 815 425, 820 405 Z"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="1.5"
            />

            {/* Arm cuddling pillow & holding phone close to ear */}
            <path
              d="M 820 390 C 805 400, 790 405, 770 400"
              stroke="#fbcfe8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Detailed Head & Drooping Heavy Eyelid Right */}
            <circle cx="830" cy="375" r="16" fill="#0f172a" stroke="#f472b6" strokeWidth="1.8" />
            <path
              d={`M 827 375 Q 832 ${375 + eyeClosure * 4} 837 375`}
              stroke="#fbcfe8"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />

            {/* Phone illuminated Right */}
            <rect
              x="810"
              y="368"
              width="10"
              height="18"
              rx="2"
              transform="rotate(-25 815 377)"
              fill="#fce7f3"
              stroke="#f472b6"
              strokeWidth="1.2"
              filter="url(#softGlow2)"
            />
          </g>

          {/* Blanket wrinkles Right */}
          <path d="M 770 440 C 740 450, 690 448, 650 440" stroke="#ec4899" strokeWidth="1.5" strokeOpacity="0.6" />
        </g>

        {/* Soft breathing soundwaves between them */}
        <g opacity="0.6">
          <circle cx="500" cy="390" r="12" stroke="rgba(244, 114, 182, 0.4)" strokeWidth="1.5" fill="none" className="animate-ping" style={{ animationDuration: '3s' }} />
          <path
            d="M 230 400 C 320 370, 410 410, 500 390 C 590 370, 680 410, 770 400"
            stroke="rgba(244, 114, 182, 0.5)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        </g>

        {/* Intimate dialogue floating (Appears at sceneProgress >= 0.70 with typewriter after subtitle vanishes) */}
        {sceneProgress >= 0.70 && (
          (() => {
            const fullText = '"Matamu udah berat banget ya... Jangan dimatikan dulu ya, biarin suaramu temani aku."';
            const p = Math.min(1, Math.max(0, (sceneProgress - 0.70) / 0.18));
            const charCount = Math.floor(fullText.length * p);
            const typedText = fullText.slice(0, charCount);
            const opacity = sceneProgress > 0.94 ? Math.max(0, 1 - (sceneProgress - 0.94) / 0.05) : 1;
            return (
              <g opacity={opacity}>
                <text
                  x="500"
                  y="249"
                  fill="#f8fafc"
                  fontSize="19"
                  fontFamily="Caveat, cursive"
                  textAnchor="middle"
                  letterSpacing="0.6"
                  filter="url(#softGlow2)"
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
