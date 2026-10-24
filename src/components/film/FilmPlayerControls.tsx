import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Subtitles, Film, RotateCcw, Music } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface FilmPlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentScene: number; // 0 to 4
  onSelectScene: (index: number) => void;
  sceneProgress: number; // 0 to 1
  onSeekProgress: (totalProgress: number) => void;
  showSubtitles: boolean;
  onToggleSubtitles: () => void;
  isCinemaWidescreen: boolean;
  onToggleWidescreen: () => void;
  onReset: () => void;
}

export const FilmPlayerControls: React.FC<FilmPlayerControlsProps> = ({
  isPlaying,
  onTogglePlay,
  currentScene,
  onSelectScene,
  sceneProgress,
  onSeekProgress,
  showSubtitles,
  onToggleSubtitles,
  isCinemaWidescreen,
  onToggleWidescreen,
  onReset,
}) => {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [volume] = useState(0.8);
  const [hasCustomTrack, setHasCustomTrack] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundEngine.setCustomAudio(file);
      setHasCustomTrack(true);
      if (!isPlaying) {
        onTogglePlay();
      }
    }
  };

  // Overall film progress: (currentScene + sceneProgress) / 5
  const overallProgress = (currentScene + sceneProgress) / 5;

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeekProgress(ratio);
  };

  const handleToggleMute = () => {
    if (isAudioMuted) {
      soundEngine.setVolume(volume);
      setIsAudioMuted(false);
    } else {
      soundEngine.setVolume(0);
      setIsAudioMuted(true);
    }
  };

  const handleNextScene = () => {
    if (currentScene < 4) {
      onSelectScene(currentScene + 1);
    }
  };

  const handlePrevScene = () => {
    if (currentScene > 0) {
      onSelectScene(currentScene - 1);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-6 z-50 select-none pointer-events-auto">
      {/* Selected Element: Compact, Sleek, Floating Minimalist Controller on the Side */}
      <div className="bg-slate-950/85 hover:bg-slate-900/95 backdrop-blur-xl border border-slate-800/80 rounded-full px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)] flex items-center gap-2 transition-all duration-300">
        {/* Play/Pause Mini Button */}
        <button
          onClick={onTogglePlay}
          className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 ${
            isPlaying
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,114,182,0.4)]'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
          title={isPlaying ? 'Jeda Film' : 'Putar Film'}
          aria-label={isPlaying ? 'Pause film' : 'Play film'}
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
        </button>

        {/* Prev / Next Scene Arrows */}
        <div className="flex items-center">
          <button
            onClick={handlePrevScene}
            disabled={currentScene === 0}
            className="p-1 rounded-full text-slate-400 hover:text-slate-200 disabled:opacity-20 disabled:pointer-events-none transition-colors"
            title="Babak Sebelumnya"
            aria-label="Previous scene"
          >
            <SkipBack className="w-3 h-3" />
          </button>
          <button
            onClick={handleNextScene}
            disabled={currentScene === 4}
            className="p-1 rounded-full text-slate-400 hover:text-slate-200 disabled:opacity-20 disabled:pointer-events-none transition-colors"
            title="Babak Berikutnya"
            aria-label="Next scene"
          >
            <SkipForward className="w-3 h-3" />
          </button>
        </div>

        {/* Compact Mini Progress Scrubber */}
        <div
          onClick={handleTimelineClick}
          className="relative w-16 sm:w-20 h-1.5 bg-slate-800 rounded-full cursor-pointer overflow-hidden group flex items-center"
          title="Geser timeline cerita"
        >
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-rose-400 to-amber-300 rounded-full transition-all duration-100"
            style={{ width: `${overallProgress * 100}%` }}
          />
        </div>

        {/* Compact Chapter Indicator */}
        <span className="font-mono text-[10px] text-slate-300 tracking-tighter px-1">
          {currentScene + 1}/5
        </span>

        {/* Subtle Divider */}
        <div className="w-px h-3.5 bg-slate-800" />

        {/* Custom Song Upload Input (Hidden) */}
        <input
          type="file"
          ref={fileInputRef}
          accept="audio/*"
          className="hidden"
          onChange={handleAudioUpload}
        />

        {/* Custom Song Picker Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`p-1 rounded-full transition-colors ${
            hasCustomTrack ? 'text-amber-300 bg-amber-500/20' : 'text-slate-400 hover:text-slate-200'
          }`}
          title={hasCustomTrack ? 'Lagu Kustom Aktif (Klik untuk ganti file)' : 'Pilih/Ganti Lagu Sendiri (.mp3 / .wav)'}
          aria-label="Upload custom music"
        >
          <Music className="w-3 h-3" />
        </button>

        {/* Audio Mute/Unmute */}
        <button
          onClick={handleToggleMute}
          className={`p-1 rounded-full transition-colors ${
            isAudioMuted ? 'text-slate-500 hover:text-slate-300' : 'text-rose-300'
          }`}
          title={isAudioMuted ? 'Nyalakan Musik' : 'Bisukan Musik'}
          aria-label="Toggle mute"
        >
          {isAudioMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
        </button>

        {/* Subtitles Toggle */}
        <button
          onClick={onToggleSubtitles}
          className={`p-1 rounded-full transition-colors ${
            showSubtitles ? 'text-amber-300' : 'text-slate-500 hover:text-slate-300'
          }`}
          title={showSubtitles ? 'Sembunyikan Subtitle' : 'Tampilkan Subtitle'}
          aria-label="Toggle subtitles"
        >
          <Subtitles className="w-3 h-3" />
        </button>

        {/* Widescreen Toggle */}
        <button
          onClick={onToggleWidescreen}
          className={`p-1 rounded-full transition-colors ${
            isCinemaWidescreen ? 'text-blue-300' : 'text-slate-500 hover:text-slate-300'
          }`}
          title={isCinemaWidescreen ? 'Format Normal' : 'Format Bioskop (2.39:1)'}
          aria-label="Toggle widescreen"
        >
          <Film className="w-3 h-3" />
        </button>

        {/* Reset / Replay */}
        <button
          onClick={onReset}
          className="p-1 rounded-full text-slate-400 hover:text-slate-200 transition-colors"
          title="Ulangi dari Awal"
          aria-label="Restart film"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
