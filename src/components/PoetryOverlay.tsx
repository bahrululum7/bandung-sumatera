import React from 'react';

interface PoetryOverlayProps {
  scrollProgress: number; // 0 to 1
}

interface Stanza {
  id: number;
  text: string[];
  subtext?: string;
  start: number;
  peak: number;
  end: number;
}

export const PoetryOverlay: React.FC<PoetryOverlayProps> = ({ scrollProgress }) => {
  const stanzas: Stanza[] = [
    {
      id: 1,
      text: [
        "Di antara dua ruang yang tak pernah seirama...",
        "Di sini aku menolak lelap di dinginnya malam,",
        "sementara di sana, pagimu baru saja terjaga."
      ],
      subtext: "04:00 AM & 08:00 AM",
      start: 0.0,
      peak: 0.08,
      end: 0.16,
    },
    {
      id: 2,
      text: [
        "Menahan kantuk di balik layar ponsel yang temaram.",
        "Mendengarkan nafas lirihmu saat dunia terlelap,",
        "menemani sunyi hingga fajar menjemput."
      ],
      subtext: "Suara di seberang samudra",
      start: 0.16,
      peak: 0.24,
      end: 0.32,
    },
    {
      id: 3,
      text: [
        "Kita sejenak melupakan lelah dan hiruk-pikuk duniawi,",
        "hanya demi mencuri waktu yang tak seberapa...",
        "sekadar melampiaskan rasa kangen yang tak pernah reda."
      ],
      subtext: "Mengabaikan penat",
      start: 0.32,
      peak: 0.40,
      end: 0.48,
    },
    {
      id: 4,
      text: [
        "Belum pernah jemari kita saling bertaut erat,",
        "belum pernah mata ini menatapmu tanpa sekat kaca.",
        "Namun entah bagaimana, hatiku selalu merasa pulang padamu."
      ],
      subtext: "Raga yang belum bersua",
      start: 0.48,
      peak: 0.56,
      end: 0.64,
    },
    {
      id: 5,
      text: [
        "Kita tahu takdir masa depan belum tentu mempertemukan kita,",
        "mungkin esok masih penuh rahasia dan tanya...",
        "Namun detik ini, cintaku padamu begitu utuh dan nyata."
      ],
      subtext: "Ikhlas dalam mencintai",
      start: 0.64,
      peak: 0.70,
      end: 0.76,
    },
  ];

  // Calculate opacity for a stanza based on scroll
  const getStanzaOpacity = (stanza: Stanza) => {
    if (scrollProgress < stanza.start || scrollProgress > stanza.end) return 0;
    if (scrollProgress <= stanza.peak) {
      return (scrollProgress - stanza.start) / (stanza.peak - stanza.start);
    } else {
      return 1 - (scrollProgress - stanza.peak) / (stanza.end - stanza.peak);
    }
  };

  // If past 0.76, all poetry fades out COMPLETELY leaving pure cinematic visual climax!
  const isPostPoetry = scrollProgress > 0.76;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center p-6 text-center select-none">
      {/* Active poetic stanzas */}
      {!isPostPoetry &&
        stanzas.map((stanza) => {
          const opacity = getStanzaOpacity(stanza);
          if (opacity <= 0.01) return null;

          return (
            <div
              key={stanza.id}
              className="absolute max-w-xl mx-auto px-6 py-6 transition-transform duration-300 transform"
              style={{
                opacity: opacity,
                transform: `translateY(${(1 - opacity) * 12}px) scale(${0.96 + opacity * 0.04})`,
              }}
            >
              {stanza.subtext && (
                <span className="inline-block text-[11px] sm:text-xs font-serif-poetic tracking-widest uppercase text-rose-300/70 mb-3 drop-shadow">
                  {stanza.subtext}
                </span>
              )}

              <div className="space-y-2 sm:space-y-3">
                {stanza.text.map((line, idx) => (
                  <p
                    key={idx}
                    className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-slate-100 font-medium leading-relaxed tracking-wide drop-shadow-[0_2px_18px_rgba(0,0,0,0.95)]"
                    style={{
                      textShadow: '0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(244,114,182,0.3)',
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}

      {/* Gentle helper hint at the very beginning if user hasn't scrolled */}
      {scrollProgress < 0.05 && (
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400/80 transition-opacity duration-500"
          style={{ opacity: 1 - scrollProgress * 15 }}
        >
          <span className="text-[11px] font-light tracking-widest uppercase">
            Gulir perlahan ke bawah untuk menyusuri cerita
          </span>
          <div className="w-4 h-7 rounded-full border border-slate-500/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-slate-300 animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
};
