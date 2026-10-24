import React from 'react';

interface FilmLetterboxProps {
  currentScene: number; // 0 to 4
  sceneProgress: number; // 0 to 1 inside current scene
  currentTimecode: string;
  isCinemaWidescreen: boolean;
  showSubtitles: boolean;
}

export const FilmLetterbox: React.FC<FilmLetterboxProps> = ({
  currentScene,
  sceneProgress,
  currentTimecode,
  isCinemaWidescreen,
  showSubtitles,
}) => {
  const chapters = [
    {
      chapterNum: "BABAK I",
      timeStr: "23:00 MALAM",
      title: "Menyingkirkan Duniawi",
      desc: "Menutup pekerjaan, melupakan lelah, demi menyapa suaramu.",
    },
    {
      chapterNum: "BABAK II",
      timeStr: "03:30 DINI HARI",
      title: "Menahan Rasa Kantuk",
      desc: "Kelopak mata yang kian sayu, namun jemari enggan menutup panggilan.",
    },
    {
      chapterNum: "BABAK III",
      timeStr: "08:00 PAGI",
      title: "Teleponan Sampai Jam 8 Pagi",
      desc: "Delapan jam terhubung tanpa henti menyapa fajar.",
    },
    {
      chapterNum: "BABAK IV",
      timeStr: "REALITA SUNYI",
      title: "Rasa yang Terhalang Takdir",
      desc: "Saling mencintai sedalam ini... meski tahu kemungkinan besar tak akan bersama.",
    },
    {
      chapterNum: "BABAK V",
      timeStr: "PUNCAK KOSMIK",
      title: "Pelukan Spektral & Janji Jiwa",
      desc: "Jika raga tak dapat satu atap di bumi, jiwa ini telah memelukmu selamanya.",
    },
  ];

  // 1. Narasi Kalimat 1 & Kalimat 2
  const narrativeSubtitles: Record<number, { part1: string; part2: string }> = {
    0: {
      part1: "23:00 malam... Di jam yang sama, kita menutup laptop",
      part2: "Menyingkirkan pekerjaan, melupakan lelah duniawi demi mendengar suaramu.",
    },
    1: {
      part1: "03:30 dini hari... Kelopak mata kian berat dan sayu menahan rasa kantuk.",
      part2: "Tak ada yang rela mematikan panggilan, membiarkan nafas lirih menemani sunyi.",
    },
    2: {
      part1: "08:00 pagi... Fajar merebak serentak di balik kedua jendela kita.",
      part2: "Durasi panggilan menembus delapan jam. Ku seruput kopi yang sudah dingin sambil tersenyum di balik layar.",
    },
    3: {
      part1: "Kita bahkan belum pernah bertemu langsung, belum pernah saling menyentuh jemari.",
      part2: "Saling menyayangi sedalam ini... namun kita tahu, ada jurang kenyataan di depan.",
    },
    4: {
      part1: "Batas dinding dan sekat ribuan kilometer perlahan meluruh ke dalam semesta...",
      part2: "Jika raga tak dapat satu atap di bumi, pelukan batin ini abadi menembus ruang dan waktu.",
    },
  };

  const currentChapter = chapters[currentScene] || chapters[0];
  const currentNarration = narrativeSubtitles[currentScene] || narrativeSubtitles[0];

  // ================= 1. SUDUT KANAN ATAS (SELALU HADIR DENGAN ELEGAN) =================
  const cornerOpacity = Math.min(1, Math.max(0.4, 0.4 + sceneProgress * 0.6));

  // ================= 2. ALUR SUBTITLE: BERGANTIAN LALU HILANG (DIALOG DI SCENE) =================
  // FASE 1: 0.00 s/d 0.36 -> Kalimat Pertama diketik huruf demi huruf lalu bertahan
  // FASE 2: 0.36 s/d 0.68 -> Kalimat Pertama HILANG, digantikan Kalimat Kedua diketik lalu bertahan
  // FASE 3: 0.68 s/d 1.00 -> Subtitle narasi HILANG TOTAL agar tidak dobel dengan dialog di adegan!
  let activeText = "";
  let subtitleOpacity = 1;
  let showCursor = false;

  if (sceneProgress < 0.36) {
    // --- FASE 1: Kalimat Pertama ---
    const p = Math.min(1, Math.max(0, sceneProgress / 0.16));
    const charCount = Math.max(1, Math.floor(currentNarration.part1.length * p));
    activeText = currentNarration.part1.slice(0, charCount);
    showCursor = p < 1;
    if (sceneProgress > 0.32) {
      subtitleOpacity = Math.max(0.1, 1 - (sceneProgress - 0.32) / 0.04);
    } else {
      subtitleOpacity = 1;
    }
  } else if (sceneProgress >= 0.36 && sceneProgress < 0.68) {
    // --- FASE 2: Kalimat Kedua ---
    const p = Math.min(1, Math.max(0, (sceneProgress - 0.36) / 0.16));
    const charCount = Math.max(1, Math.floor(currentNarration.part2.length * p));
    activeText = currentNarration.part2.slice(0, charCount);
    showCursor = p < 1;
    if (sceneProgress > 0.64) {
      subtitleOpacity = Math.max(0, 1 - (sceneProgress - 0.64) / 0.04);
    } else {
      subtitleOpacity = 1;
    }
  } else {
    // --- FASE 3: Subtitle narasi selesai dan hilang total (dialog tunggal muncul di adegan film) ---
    activeText = "";
    subtitleOpacity = 0;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between overflow-hidden select-none">
      {/* Top Subtle Film Header Bar */}
      <div 
        className={`w-full px-6 py-2.5 flex items-center justify-between text-xs transition-all duration-500 ${
          isCinemaWidescreen ? 'h-14 sm:h-16 bg-slate-950/80 backdrop-blur-xs' : 'h-10 sm:h-12 bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 tracking-widest uppercase">
            KISAH KITA · BANDUNG & SUMATERA ? (MAYBE)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-mono text-[11px] tracking-wider px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm border border-white/10">
            {currentTimecode}
          </span>
        </div>
      </div>

      {/* ================= TULISAN OTOMATIS DI SUDUT KANAN ATAS (TANPA BOX, SELALU ADA) ================= */}
      <div
        className="absolute top-12 right-6 sm:top-14 sm:right-10 text-right max-w-sm pointer-events-none transition-opacity duration-500"
        style={{
          opacity: cornerOpacity,
        }}
      >
        {/* Kicker / Waktu (Tanpa Box) */}
        <div className="flex items-center justify-end gap-2 mb-1">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-rose-300 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {currentChapter.chapterNum}
          </span>
          <span className="text-slate-500 text-[10px]">·</span>
          <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-amber-200/90 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {currentChapter.timeStr}
          </span>
        </div>

        {/* Judul Babak (Tanpa Box) */}
        <h2
          className="font-serif-poetic text-2xl sm:text-3xl text-slate-100 font-normal tracking-wide leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
          style={{
            textShadow: '0 2px 14px rgba(0,0,0,0.9), 0 0 25px rgba(244,114,182,0.3)',
          }}
        >
          {currentChapter.title}
        </h2>

        {/* Catatan Puitis Lirih (Tanpa Box) */}
        <p
          className="font-handwriting text-base sm:text-lg text-slate-300/90 font-light mt-1 tracking-wide leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.9)',
          }}
        >
          {currentChapter.desc}
        </p>
      </div>

      {/* ================= SUBTITLE BAWAH (TYPEWRITER BERGANTIAN & DIALOG) ================= */}
      {showSubtitles && activeText && (
        <div className="w-full flex justify-center px-6 pb-6 text-center">
          <div
            className="max-w-2xl px-4 py-2 transition-opacity duration-300"
            style={{ opacity: subtitleOpacity }}
          >
            <p
              className="font-handwriting text-xl sm:text-2xl md:text-3xl text-slate-100 font-medium leading-relaxed tracking-wide"
              style={{
                textShadow: '0 2px 14px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.9), 0 0 25px rgba(244,114,182,0.35)',
              }}
            >
              {activeText}
              {showCursor && (
                <span className="inline-block w-1.5 h-5 ml-1 bg-rose-400 animate-pulse align-middle" />
              )}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Cinema Letterbox Bar if Widescreen */}
      {isCinemaWidescreen && (
        <div className="w-full h-8 sm:h-12 bg-slate-950/90 border-t border-slate-800/40 pointer-events-none" />
      )}
    </div>
  );
};
