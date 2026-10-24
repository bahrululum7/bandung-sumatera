import React from 'react';

interface CenterDividerProps {
  scrollProgress: number; // 0 to 1
}

export const CenterDivider: React.FC<CenterDividerProps> = ({ scrollProgress }) => {
  // At climax (scroll > 0.75), the divider dissolves and disappears completely as the light hug penetrates!
  const dividerOpacity = Math.max(0, 1 - scrollProgress * 1.35);

  return (
    <div
      className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px pointer-events-none z-20 flex flex-col items-center justify-between py-12 transition-opacity duration-500"
      style={{ opacity: dividerOpacity }}
    >
      {/* Top subtle distance badge */}
      <div className="flex flex-col items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800/80 shadow-lg text-[10px] tracking-widest uppercase text-slate-400">
        <span className="font-mono text-slate-300">1.840 KM</span>
      </div>

      {/* Vertical Dashed Line with subtle glowing shimmer */}
      <div className="flex-1 w-px my-4 border-l border-dashed border-slate-500/30 relative">
        <div 
          className="absolute inset-y-0 -left-1 w-2 bg-gradient-to-b from-blue-500/10 via-purple-500/15 to-amber-500/10 blur-xs"
        />
      </div>

      {/* Middle symbolic icon or coordinates */}
      <div className="p-1 rounded-full bg-slate-900/80 border border-slate-700/50 text-slate-400 text-[9px] font-mono tracking-tighter">
        4h apart
      </div>

      {/* Lower dashed stretch */}
      <div className="flex-1 w-px my-4 border-l border-dashed border-slate-500/30" />

      {/* Bottom marker */}
      <div className="text-[9px] font-mono text-slate-500/80 tracking-widest uppercase">
        LDR
      </div>
    </div>
  );
};
