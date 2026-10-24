import React, { useMemo } from 'react';

interface LeftRoomProps {
  scrollProgress: number; // 0 to 1
}

export const LeftRoom: React.FC<LeftRoomProps> = ({ scrollProgress }) => {
  // SVG line drawing progression (drawn faster in initial 0 to 0.7 scroll)
  const drawProgress = Math.min(1, Math.max(0, scrollProgress * 1.5));
  // Stroke dash offset calculation
  const dashOffset = (1 - drawProgress) * 1000;

  // Raindrops simulation array for the window
  const raindrops = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: 12 + ((i * 7) % 76),
      y: (i * 19) % 95,
      length: 12 + (i % 5) * 6,
      speed: 1.8 + (i % 4) * 0.7,
      delay: (i * 0.23) % 3,
      opacity: 0.25 + (i % 3) * 0.2,
    }));
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 select-none overflow-hidden">
      {/* Ambient Room Lighting: Deep midnight navy / indigo with cool rain mist */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse at 30% 65%, rgba(30, 58, 138, 0.22) 0%, rgba(15, 23, 42, 0.45) 50%, rgba(4, 7, 17, 0.85) 100%)',
        }}
      />

      {/* Room Header Info: Time & Mood */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl sm:text-3xl font-light text-blue-200 tracking-wider drop-shadow-[0_0_12px_rgba(147,197,253,0.6)]">
              04:00
            </span>
            <span className="text-xs uppercase tracking-widest text-blue-400/80 font-mono">
              AM
            </span>
          </div>
          <span className="text-xs tracking-wider text-slate-400/90 font-light mt-0.5">
            Dini Hari · Malam Dingin
          </span>
        </div>

        {/* Rain Window Accent */}
        <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-lg border border-blue-900/40 bg-slate-950/60 backdrop-blur-md overflow-hidden shadow-inner group">
          {/* Window Frame Panes */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none border border-blue-500/10">
            <div className="border-r border-b border-blue-400/20" />
            <div className="border-b border-blue-400/20" />
            <div className="border-r border-blue-400/20" />
            <div />
          </div>

          {/* Falling Raindrops on Glass */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {raindrops.map((drop) => (
              <line
                key={drop.id}
                x1={`${drop.x}%`}
                y1={`${drop.y}%`}
                x2={`${drop.x + 2}%`}
                y2={`${drop.y + drop.length}%`}
                stroke="rgba(186, 230, 253, 0.65)"
                strokeWidth="1.2"
                strokeLinecap="round"
                className="animate-pulse"
                style={{
                  opacity: drop.opacity,
                  animationDuration: `${drop.speed}s`,
                }}
              />
            ))}
          </svg>

          {/* Faint Streetlight Reflection in Rain */}
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-blue-500/20 blur-xl pointer-events-none" />
        </div>
      </div>

      {/* Main Vector Illustration & Silhouette of Person Curled Up */}
      <div className="relative z-10 w-full h-72 sm:h-80 md:h-96 my-auto flex items-center justify-center">
        <svg
          viewBox="0 0 600 450"
          className="w-full h-full max-h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft phone glow gradient */}
            <radialGradient id="phoneGlowNight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#818cf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
            </radialGradient>

            {/* Bedside soft moonlight lamp gradient */}
            <radialGradient id="lampGlowNight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#4338ca" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>

            {/* Stroke glow filter */}
            <filter id="nightLineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#93c5fd" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background Ambient Lamp Glow */}
          <circle cx="90" cy="180" r="110" fill="url(#lampGlowNight)" />

          {/* Bedside Table & Lamp */}
          <g
            stroke="#64748b"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
          >
            {/* Lamp base and pole */}
            <path d="M 60 270 L 120 270" stroke="#94a3b8" />
            <path d="M 90 270 L 90 190" stroke="#94a3b8" />
            <path d="M 75 190 L 105 190 L 98 165 L 82 165 Z" stroke="#cbd5e1" fill="rgba(224, 231, 255, 0.08)" />
            {/* Table legs */}
            <path d="M 50 270 L 130 270 L 130 350 M 50 270 L 50 350" stroke="#475569" strokeWidth="1.4" />
            {/* Clock on table */}
            <rect x="68" y="250" width="22" height="18" rx="3" stroke="#94a3b8" fill="#090d1a" />
            <circle cx="79" cy="259" r="1" fill="#93c5fd" />
          </g>

          {/* Bed Frame and Headboard */}
          <path
            d="M 110 330 L 520 330 M 130 260 L 130 360 M 500 300 L 500 360"
            stroke="#334155"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
          />

          {/* Mattress and Fluffy Pillows */}
          <g
            stroke="#93c5fd"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
            filter="url(#nightLineGlow)"
          >
            {/* Mattress curve */}
            <path d="M 125 320 C 180 318, 440 318, 510 320" stroke="#475569" />

            {/* Back pillow resting on headboard */}
            <path
              d="M 135 295 C 135 260, 165 245, 195 250 C 215 255, 220 280, 215 300 C 190 305, 150 302, 135 295 Z"
              stroke="#64748b"
              fill="rgba(30, 41, 59, 0.3)"
            />

            {/* Hugged pillow under person's arm */}
            <path
              d="M 230 285 C 220 265, 255 255, 290 265 C 315 272, 325 295, 305 308 C 270 318, 240 305, 230 285 Z"
              stroke="#94a3b8"
              fill="rgba(51, 65, 85, 0.35)"
            />
          </g>

          {/* Siluet Manusia Meringkuk Memeluk Bantal & Memegang Ponsel */}
          {/* Body Silhouette fill for intimacy */}
          <path
            d="
              M 195 275
              C 190 240, 220 220, 245 225
              C 260 228, 275 238, 280 250
              C 305 240, 345 245, 370 260
              C 410 285, 430 330, 420 345
              C 400 365, 360 355, 340 330
              C 330 315, 320 305, 300 300
              C 280 320, 230 325, 205 305
              Z
            "
            fill="rgba(15, 23, 42, 0.85)"
          />

          {/* Detailed Artistic SVG Line Art of Person Curled Up */}
          <g
            stroke="#93c5fd"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
            filter="url(#nightLineGlow)"
          >
            {/* Head and curled neck posture */}
            <path d="M 205 270 C 195 252, 205 230, 230 228 C 255 225, 268 240, 260 258 C 252 272, 238 276, 225 274" />

            {/* Hair strands soft contour */}
            <path d="M 215 238 C 225 230, 245 228, 258 235" stroke="#60a5fa" strokeWidth="1.5" />
            <path d="M 205 250 C 208 242, 218 235, 228 235" stroke="#60a5fa" strokeWidth="1.4" />

            {/* Curled back (spine curvature) */}
            <path d="M 255 245 C 285 240, 340 248, 375 270 C 410 295, 422 335, 408 348" />

            {/* Bent knees curled up towards chest */}
            <path d="M 408 348 C 390 358, 355 352, 335 328 C 315 305, 290 295, 275 295" />

            {/* Lower legs and relaxed feet */}
            <path d="M 390 352 C 405 355, 425 352, 435 342" stroke="#64748b" strokeWidth="1.8" />

            {/* Arm curled hugging the pillow */}
            <path d="M 245 268 C 255 280, 270 292, 295 292 C 315 292, 322 280, 310 272" />

            {/* Second arm holding phone close to eyes/pillow */}
            <path d="M 235 275 C 230 290, 240 300, 258 298 C 270 296, 282 288, 285 275" />

            {/* Delicate hand fingers grasping phone */}
            <path d="M 285 273 C 288 268, 293 268, 295 272" stroke="#bfdbfe" strokeWidth="1.8" />
          </g>

          {/* Blanket Folds Covering Lower Body */}
          <path
            d="
              M 270 310
              C 300 315, 330 325, 370 320
              C 410 315, 450 328, 485 330
              C 460 350, 400 358, 340 355
              C 300 352, 275 335, 270 310
              Z
            "
            fill="rgba(30, 58, 138, 0.25)"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
          />
          {/* Blanket wrinkles */}
          <path
            d="M 315 325 C 340 335, 375 335, 410 328 M 350 338 C 380 345, 420 342, 450 335"
            stroke="#60a5fa"
            strokeWidth="1.2"
            strokeOpacity="0.6"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
          />

          {/* Smartphone & Glowing Screen in Hand */}
          {/* Screen Aura glow */}
          <circle cx="295" cy="270" r="38" fill="url(#phoneGlowNight)" className="animate-phone-night" />

          {/* Phone rectangle */}
          <rect
            x="288"
            y="256"
            width="12"
            height="22"
            rx="2.5"
            transform="rotate(18 294 267)"
            fill="#dbeafe"
            stroke="#93c5fd"
            strokeWidth="1.4"
            className="drop-shadow-[0_0_10px_rgba(191,219,254,0.95)]"
          />

          {/* Face illumination reflection arc */}
          <path
            d="M 235 258 C 242 262, 252 263, 260 260"
            stroke="#bfdbfe"
            strokeWidth="2"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />

          {/* Light beam from phone towards face */}
          <polygon
            points="292,260 248,252 252,268 296,274"
            fill="rgba(191, 219, 254, 0.12)"
          />
        </svg>
      </div>

      {/* Room Footer Status: Emotional micro-detail */}
      <div className="relative z-10 flex items-center justify-between text-xs text-slate-400/80 pt-2 border-t border-blue-900/20">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
          <span className="font-mono text-[11px] text-blue-300">Panggilan berjalan: 04:12:38</span>
        </div>
        <span className="font-serif-poetic italic text-slate-400">"Tidurlah... aku masih di sini..."</span>
      </div>
    </div>
  );
};
