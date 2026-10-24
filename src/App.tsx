import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { FilmScene1_NightCall } from './components/film/FilmScene1_NightCall';
import { FilmScene2_SleepyCall } from './components/film/FilmScene2_SleepyCall';
import { FilmScene3_DawnCall } from './components/film/FilmScene3_DawnCall';
import { FilmScene4_BitterReality } from './components/film/FilmScene4_BitterReality';
import { FilmScene5_AstralEmbrace } from './components/film/FilmScene5_AstralEmbrace';
import { FilmLetterbox } from './components/film/FilmLetterbox';
import { FilmPlayerControls } from './components/film/FilmPlayerControls';
import { soundEngine } from './audio/soundEngine';

export default function App() {
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [sceneProgress, setSceneProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true); // Starts autoplaying like a film
  const [isCinemaWidescreen, setIsCinemaWidescreen] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef<number>(0);
  const totalFilmProgress = useRef<number>(0); // 0 to 5

  // Film playback loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        // Duration per scene: ~22 seconds for gentle, emotional reading pace
        const sceneDurationSec = 22;
        const delta = dt / sceneDurationSec;

        totalFilmProgress.current = Math.min(4.999, totalFilmProgress.current + delta);
        if (totalFilmProgress.current >= 4.99) {
          setIsPlaying(false);
        }
      }

      const activeScene = Math.floor(totalFilmProgress.current);
      const activeProgress = totalFilmProgress.current - activeScene;

      setCurrentScene(activeScene);
      setSceneProgress(activeProgress);

      // Sound ambiance based on scene
      if (activeScene === 2 || activeScene === 3) {
        soundEngine.setBirdsActive(true);
      } else {
        soundEngine.setBirdsActive(false);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Start sound on first user interaction if not already running
  useEffect(() => {
    const startAudio = () => {
      if (!soundEngine.getIsPlaying()) {
        soundEngine.play();
      }
    };
    window.addEventListener('click', startAudio, { once: true });
    window.addEventListener('keydown', startAudio, { once: true });
    window.addEventListener('touchstart', startAudio, { once: true });
    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('keydown', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, []);

  // Handle Wheel Scroll (allows stepping through the film reel frame-by-frame)
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (isPlaying) setIsPlaying(false);
    const delta = e.deltaY * 0.0018;
    totalFilmProgress.current = Math.max(0, Math.min(4.999, totalFilmProgress.current + delta));
  }, [isPlaying]);

  // Handle Touch Swipe on Mobile/Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isPlaying) setIsPlaying(false);
    const currentY = e.touches[0].clientY;
    const delta = (touchStartY.current - currentY) * 0.004;
    touchStartY.current = currentY;
    totalFilmProgress.current = Math.max(0, Math.min(4.999, totalFilmProgress.current + delta));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // User Actions
  const handleTogglePlay = () => {
    if (!isPlaying) {
      if (!soundEngine.getIsPlaying()) {
        soundEngine.play();
      }
      if (totalFilmProgress.current >= 4.95) {
        totalFilmProgress.current = 0;
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handleSelectScene = (sceneIdx: number) => {
    totalFilmProgress.current = sceneIdx + 0.01;
    setCurrentScene(sceneIdx);
    setSceneProgress(0.01);
  };

  const handleSeekProgress = (ratio: number) => {
    totalFilmProgress.current = Math.max(0, Math.min(4.999, ratio * 5));
  };

  const handleReset = () => {
    totalFilmProgress.current = 0;
    setCurrentScene(0);
    setSceneProgress(0);
    setIsPlaying(true);
  };

  // Format Timecode: e.g. "00:45 / 01:50"
  const totalSeconds = Math.floor((totalFilmProgress.current / 5) * 110);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const timecodeStr = `0${mins}:${secs < 10 ? '0' : ''}${secs} / 01:50`;

  return (
    <main
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="relative w-screen h-screen bg-[#02050e] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Living Celestial Night Sky Background */}
      <StarfieldCanvas scrollProgress={totalFilmProgress.current / 5} />

      {/* Main Cinematic Film Screen Canvas */}
      <div
        className={`relative transition-all duration-700 overflow-hidden flex items-center justify-center ${
          isCinemaWidescreen
            ? 'w-full max-w-[1400px] aspect-[2.39/1] max-h-[85vh] rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.95)]'
            : 'w-full max-w-[1150px] aspect-[4/3] max-h-[94vh] rounded-[28px] border-8 border-slate-900/90 shadow-[0_0_90px_rgba(0,0,0,0.9)]'
        }`}
        style={{
          boxShadow: '0 25px 90px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(147, 51, 234, 0.15)',
        }}
      >
        {/* Render Active Animated SVG Film Scene */}
        <div className="absolute inset-0 w-full h-full">
          {currentScene === 0 && <FilmScene1_NightCall sceneProgress={sceneProgress} />}
          {currentScene === 1 && <FilmScene2_SleepyCall sceneProgress={sceneProgress} />}
          {currentScene === 2 && <FilmScene3_DawnCall sceneProgress={sceneProgress} />}
          {currentScene === 3 && <FilmScene4_BitterReality sceneProgress={sceneProgress} />}
          {currentScene === 4 && <FilmScene5_AstralEmbrace sceneProgress={sceneProgress} />}
        </div>

        {/* Film Letterbox Bars & Subtitles */}
        <FilmLetterbox
          currentScene={currentScene}
          sceneProgress={sceneProgress}
          currentTimecode={timecodeStr}
          isCinemaWidescreen={isCinemaWidescreen}
          showSubtitles={showSubtitles}
        />

        {/* Cinematic Film Vignette */}
        <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_100px_rgba(2,5,14,0.7)]" />
      </div>

      {/* Floating Interactive Film Player Controls */}
      <FilmPlayerControls
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        currentScene={currentScene}
        onSelectScene={handleSelectScene}
        sceneProgress={sceneProgress}
        onSeekProgress={handleSeekProgress}
        showSubtitles={showSubtitles}
        onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
        isCinemaWidescreen={isCinemaWidescreen}
        onToggleWidescreen={() => setIsCinemaWidescreen(!isCinemaWidescreen)}
        onReset={handleReset}
      />
    </main>
  );
}
