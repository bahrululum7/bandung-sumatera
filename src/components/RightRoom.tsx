import React from 'react';

interface RightRoomProps {
  scrollProgress: number; // 0 to 1
}

export const RightRoom: React.FC<RightRoomProps> = ({ scrollProgress }) => {
  // SVG line drawing progression
  const drawProgress = Math.min(1, Math.max(0, scrollProgress * 1.5));
  const dashOffset = (1 - drawProgress) * 1000;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 md:p-10 select-none overflow-hidden">
      {/* Ambient Room Lighting: Warm golden amber / morning sunbeam glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(ellipse at 70% 65%, rgba(180, 83, 9, 0.22) 0%, rgba(69, 26, 3, 0.45) 50%, rgba(12, 7, 5, 0.85) 100%)',
        }}
      />

      {/* Sunbeam Light Shaft Streaming through Morning Window */}
      <div 
        className="absolute -top-10 right-10 w-64 h-96 bg-gradient-to-b from-amber-200/15 via-amber-400/8 to-transparent pointer-events-none -rotate-25 blur-xl transform origin-top-right"
      />

      {/* Room Header Info: Time & Morning Sun Window */}
      <div className="relative z-10 flex items-start justify-between">
        {/* Sun Window Accent */}
        <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-lg border border-amber-800/40 bg-stone-950/60 backdrop-blur-md overflow-hidden shadow-inner order-2 sm:order-1">
          {/* Window Panes */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none border border-amber-500/15">
            <div className="border-r border-b border-amber-400/20" />
            <div className="border-b border-amber-400/20" />
            <div className="border-r border-amber-400/20" />
            <div />
          </div>

          {/* Morning Sun Disk Rising in Distance */}
          <div className="absolute top-2 right-4 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-rose-300 opacity-80 blur-sm pointer-events-none" />
          <div className="absolute top-3 right-5 w-8 h-8 rounded-full bg-amber-100/90 pointer-events-none" />

          {/* Sun Rays across window glass */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-300/10 to-amber-200/25 pointer-events-none" />
        </div>

        {/* Time and Mood */}
        <div className="flex flex-col items-end order-1 sm:order-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono">
              AM
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-light text-amber-200 tracking-wider drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
              08:00
            </span>
          </div>
          <span className="text-xs tracking-wider text-amber-200/70 font-light mt-0.5">
            Pagi Hari · Mentari Cerah
          </span>
        </div>
      </div>

      {/* Main Vector Illustration & Silhouette of Person Curled Up with Morning Coffee */}
      <div className="relative z-10 w-full h-72 sm:h-80 md:h-96 my-auto flex items-center justify-center">
        <svg
          viewBox="0 0 600 450"
          className="w-full h-full max-h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Phone screen morning glow */}
            <radialGradient id="phoneGlowMorning" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
            </radialGradient>

            {/* Steaming Coffee Warm Glow */}
            <radialGradient id="coffeeSteamGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fde68a" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#d97706" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>

            {/* Stroke glow filter morning gold */}
            <filter id="morningLineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#f59e0b" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Bed Frame and Headboard on Right */}
          <path
            d="M 80 330 L 490 330 M 100 300 L 100 360 M 470 260 L 470 360"
            stroke="#451a03"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
          />

          {/* Steaming Coffee Cup on Bedside Table (Right side corner) */}
          <g
            stroke="#d97706"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
          >
            {/* Table */}
            <path d="M 480 280 L 560 280 L 560 360 M 480 280 L 480 360" stroke="#78350f" strokeWidth="1.5" />
            
            {/* Saucer and Coffee Ceramic Cup */}
            <ellipse cx="520" cy="278" rx="22" ry="5" stroke="#f59e0b" fill="#1c1917" />
            <path d="M 508 276 C 508 262, 532 262, 532 276 Z" stroke="#fbbf24" fill="rgba(120, 53, 15, 0.6)" />
            {/* Cup handle */}
            <path d="M 532 266 C 540 266, 540 274, 532 274" stroke="#fbbf24" strokeWidth="1.5" />
            {/* Coffee liquid surface */}
            <ellipse cx="520" cy="265" rx="9" ry="2.5" fill="#451a03" />
          </g>

          {/* Animated Rising Steam Curves from Coffee Cup */}
          <g filter="url(#morningLineGlow)" className="animate-steam">
            <path
              d="M 517 258 C 514 246, 523 238, 518 226 C 514 214, 521 204, 517 194"
              stroke="rgba(254, 243, 199, 0.75)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 524 259 C 527 248, 519 240, 525 228 C 530 216, 523 206, 527 196"
              stroke="rgba(251, 191, 36, 0.6)"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          {/* Subtle warm glow around coffee */}
          <circle cx="520" cy="260" r="45" fill="url(#coffeeSteamGlow)" />

          {/* Pillows on Bed */}
          <g
            stroke="#fbbf24"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
            filter="url(#morningLineGlow)"
          >
            {/* Headboard main pillow */}
            <path
              d="M 465 295 C 465 260, 435 245, 405 250 C 385 255, 380 280, 385 300 C 410 305, 450 302, 465 295 Z"
              stroke="#b45309"
              fill="rgba(69, 26, 3, 0.3)"
            />
            {/* Hugged pillow facing towards the left */}
            <path
              d="M 370 285 C 380 265, 345 255, 310 265 C 285 272, 275 295, 295 308 C 330 318, 360 305, 370 285 Z"
              stroke="#f59e0b"
              fill="rgba(120, 53, 15, 0.35)"
            />
          </g>

          {/* Siluet Manusia Meringkuk Menghadap ke Kiri (Menuju Pasangannya) */}
          {/* Body Silhouette fill for depth */}
          <path
            d="
              M 405 275
              C 410 240, 380 220, 355 225
              C 340 228, 325 238, 320 250
              C 295 240, 255 245, 230 260
              C 190 285, 170 330, 180 345
              C 200 365, 240 355, 260 330
              C 270 315, 280 305, 300 300
              C 320 320, 370 325, 395 305
              Z
            "
            fill="rgba(28, 19, 13, 0.88)"
          />

          {/* Detailed Artistic SVG Line Art of Person Curled Up in Morning */}
          <g
            stroke="#fbbf24"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
            filter="url(#morningLineGlow)"
          >
            {/* Head and curled neck posture facing left */}
            <path d="M 395 270 C 405 252, 395 230, 370 228 C 345 225, 332 240, 340 258 C 348 272, 362 276, 375 274" />

            {/* Hair softly illuminated by morning sun */}
            <path d="M 385 238 C 375 230, 355 228, 342 235" stroke="#fde68a" strokeWidth="1.6" />
            <path d="M 395 250 C 392 242, 382 235, 372 235" stroke="#fde68a" strokeWidth="1.4" />

            {/* Curled back (spine curvature) */}
            <path d="M 345 245 C 315 240, 260 248, 225 270 C 190 295, 178 335, 192 348" />

            {/* Bent knees curled up towards chest */}
            <path d="M 192 348 C 210 358, 245 352, 265 328 C 285 305, 310 295, 325 295" />

            {/* Feet resting softly on bed */}
            <path d="M 210 352 C 195 355, 175 352, 165 342" stroke="#92400e" strokeWidth="1.8" />

            {/* Arm curled gently hugging pillow / chest */}
            <path d="M 355 268 C 345 280, 330 292, 305 292 C 285 292, 278 280, 290 272" />

            {/* Second arm holding phone close to ear/mouth */}
            <path d="M 365 275 C 370 290, 360 300, 342 298 C 330 296, 318 288, 315 275" />

            {/* Fingers holding phone */}
            <path d="M 315 273 C 312 268, 307 268, 305 272" stroke="#fde68a" strokeWidth="1.8" />
          </g>

          {/* Morning Blanket Folds Covering Lower Body */}
          <path
            d="
              M 330 310
              C 300 315, 270 325, 230 320
              C 190 315, 150 328, 115 330
              C 140 350, 200 358, 260 355
              C 300 352, 325 335, 330 310
              Z
            "
            fill="rgba(120, 53, 15, 0.28)"
            stroke="#d97706"
            strokeWidth="1.5"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
          />
          <path
            d="M 285 325 C 260 335, 225 335, 190 328 M 250 338 C 220 345, 180 342, 150 335"
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeOpacity="0.6"
            strokeDasharray="1000"
            strokeDashoffset={dashOffset}
          />

          {/* Smartphone & Glowing Screen in Hand */}
          {/* Screen Morning Aura Glow */}
          <circle cx="305" cy="270" r="38" fill="url(#phoneGlowMorning)" className="animate-phone-morning" />

          {/* Phone rectangle */}
          <rect
            x="300"
            y="256"
            width="12"
            height="22"
            rx="2.5"
            transform="rotate(-18 306 267)"
            fill="#fef3c7"
            stroke="#fbbf24"
            strokeWidth="1.4"
            className="drop-shadow-[0_0_10px_rgba(251,191,36,0.95)]"
          />

          {/* Face warm illumination reflection arc */}
          <path
            d="M 365 258 C 358 262, 348 263, 340 260"
            stroke="#fde68a"
            strokeWidth="2"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />

          {/* Light beam from phone towards face */}
          <polygon
            points="308,260 352,252 348,268 304,274"
            fill="rgba(254, 243, 199, 0.15)"
          />
        </svg>
      </div>

      {/* Room Footer Status */}
      <div className="relative z-10 flex items-center justify-between text-xs text-amber-200/80 pt-2 border-t border-amber-900/20">
        <span className="font-serif-poetic italic text-amber-200/90">"Selamat pagi, duniaku..."</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-amber-300">Baterai: 88%</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
      </div>
    </div>
  );
};
