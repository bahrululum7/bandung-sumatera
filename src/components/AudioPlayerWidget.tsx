import React, { useState, useEffect } from 'react';
import { soundEngine } from '../audio/soundEngine';
import { Volume2, VolumeX, CloudRain, Music, Play, Pause, Sparkles } from 'lucide-react';

interface AudioPlayerWidgetProps {
  isAutoPlay: boolean;
  onToggleAutoPlay: () => void;
}

export const AudioPlayerWidget: React.FC<AudioPlayerWidgetProps> = ({
  isAutoPlay,
  onToggleAutoPlay,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isRainActive, setIsRainActive] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [waveHeights, setWaveHeights] = useState<number[]>([4, 8, 14, 8, 5]);

  const handleTogglePlay = () => {
    const newState = soundEngine.togglePlay();
    setIsPlaying(newState);
    setIsRainActive(soundEngine.getIsRainActive());
  };

  const handleToggleRain = () => {
    const state = soundEngine.toggleRain();
    setIsRainActive(state);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  // Animate sound waves when playing
  useEffect(() => {
    let animId: number;
    const updateWave = () => {
      if (isPlaying) {
        setWaveHeights([
          Math.floor(Math.random() * 10 + 4),
          Math.floor(Math.random() * 16 + 6),
          Math.floor(Math.random() * 20 + 8),
          Math.floor(Math.random() * 14 + 5),
          Math.floor(Math.random() * 9 + 4),
        ]);
      } else {
        setWaveHeights([3, 4, 3, 4, 3]);
      }
      animId = requestAnimationFrame(updateWave);
    };

    const interval = setInterval(updateWave, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2 select-none">
      {/* Floating Pill Container with Glassmorphism */}
      <div className="relative flex items-center bg-slate-950/80 hover:bg-slate-900/90 backdrop-blur-xl border border-slate-700/40 rounded-full px-3 py-2 shadow-2xl transition-all duration-300">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
            isPlaying
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_12px_rgba(244,114,182,0.4)]'
              : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-600/30'
          }`}
          title={isPlaying ? 'Jeda Musik' : 'Putar "That\'s Us" - Anson Seabra'}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        {/* Track Title and Waveform */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-3 px-2.5 cursor-pointer"
        >
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-medium text-slate-200 tracking-wide flex items-center gap-1.5">
              <Music className="w-3 h-3 text-rose-400" />
              That's Us
            </span>
            <span className="text-[9px] text-slate-400 font-light">Anson Seabra</span>
          </div>

          {/* Soundwave bars */}
          <div className="flex items-end gap-0.5 h-4 w-7 px-1">
            {waveHeights.map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isPlaying ? 'bg-gradient-to-t from-rose-500 to-amber-300' : 'bg-slate-600'
                }`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>

        {/* Collapsible Quick Settings */}
        {isExpanded && (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700/50 animate-fadeIn">
            {/* Rain Sound Toggle */}
            <button
              onClick={handleToggleRain}
              className={`p-1.5 rounded-full transition-colors ${
                isRainActive
                  ? 'text-blue-300 bg-blue-500/20'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Suara Gemericik Hujan (04:00 AM)"
            >
              <CloudRain className="w-3.5 h-3.5" />
            </button>

            {/* Volume range slider */}
            <div className="flex items-center gap-1">
              {volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-14 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Auto-Play Story Button ("Nonton Otomatis") */}
      <button
        onClick={onToggleAutoPlay}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-xl border text-xs font-light tracking-wider transition-all duration-300 shadow-xl ${
          isAutoPlay
            ? 'bg-amber-500/20 border-amber-500/40 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
            : 'bg-slate-950/70 border-slate-700/40 text-slate-400 hover:text-slate-200'
        }`}
        title="Alur otomatis bergulir perlahan seperti film"
      >
        <Sparkles className={`w-3 h-3 ${isAutoPlay ? 'text-amber-300 animate-spin' : ''}`} />
        <span className="hidden sm:inline text-[11px] font-sans">
          {isAutoPlay ? 'Auto Story Aktif' : 'Nonton Otomatis'}
        </span>
      </button>
    </div>
  );
};
