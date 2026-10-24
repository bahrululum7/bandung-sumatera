/**
 * Web Audio API Engine for "That's Us" by Anson Seabra
 * Plays custom user audio files from public/song.mp3 with full GitHub Pages path support.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isRainActive = false;
  private isBirdsActive = false;
  private volume = 0.8;
  private masterGainNode: GainNode | null = null;
  private rainGainNode: GainNode | null = null;
  private songIntervalId: number | null = null;
  private analyzerNode: AnalyserNode | null = null;
  private rainSource: AudioNode | null = null;
  private birdTimerId: number | null = null;

  // Custom audio element for user's own MP3/WAV file
  private customAudio: HTMLAudioElement | null = null;
  private hasCustomAudio = false;

  constructor() {
  if (typeof window !== 'undefined') {
    // Langsung gunakan hasil import dari Vite
    this.customAudio = new Audio(songFile);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    this.hasCustomAudio = true;
    this.customAudio.load();
  }
}
  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyzerNode = this.ctx.createAnalyser();
      this.analyzerNode.fftSize = 64;

      this.masterGainNode.connect(this.analyzerNode);
      this.analyzerNode.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Load custom user audio file from input or URL
  public setCustomAudio(fileOrUrl: File | string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    const url = typeof fileOrUrl === 'string' ? fileOrUrl : URL.createObjectURL(fileOrUrl);
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    this.hasCustomAudio = true;

    if (this.isPlaying) {
      if (this.songIntervalId) {
        clearInterval(this.songIntervalId);
        this.songIntervalId = null;
      }
      this.customAudio.play().catch(() => {});
    }
  }

  // Play a realistic felt acoustic piano note (Fallback synth)
  private playPianoNote(freq: number, time: number, duration: number, velocity: number = 0.6) {
    if (!this.ctx || !this.masterGainNode) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const osc3 = this.ctx.createOscillator();

    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq, time);

    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 2, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(1800, freq * 3.5), time);
    filter.frequency.exponentialRampToValueAtTime(Math.max(220, freq * 1.2), time + duration);

    const attack = 0.015;
    const peak = velocity * 0.45;
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.linearRampToValueAtTime(peak, time + attack);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGainNode);

    osc1.start(time);
    osc2.start(time);
    osc3.start(time);

    osc1.stop(time + duration);
    osc2.stop(time + duration);
    osc3.stop(time + duration);
  }

  // Soft warm cello pad note
  private playCelloPad(freq: number, time: number, duration: number, velocity: number = 0.25) {
    if (!this.ctx || !this.masterGainNode) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, time);

    const attack = 0.6;
    const release = 0.8;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(velocity * 0.2, time + attack);
    gain.gain.setValueAtTime(velocity * 0.2, time + duration - release);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(time);
    osc.stop(time + duration);
  }

  private startArrangement() {
    if (!this.ctx) return;

    const noteFreq: Record<string, number> = {
      D2: 73.42, G2: 98.00, A2: 110.00, B2: 123.47,
      D3: 146.83, E3: 164.81, 'F#3': 185.00, G3: 196.00,
      A3: 220.00, B3: 246.94, 'C#4': 277.18, D4: 293.66,
      E4: 329.63, 'F#4': 369.99, G4: 392.00, A4: 440.00,
      B4: 493.88, 'C#5': 554.37, D5: 587.33,
    };

    const bpm = 74;
    const beat = 60 / bpm;
    const barDuration = beat * 4;

    const scheduleSequence = () => {
      if (!this.ctx || !this.isPlaying || this.hasCustomAudio) return;
      const now = this.ctx.currentTime + 0.05;

      this.playCelloPad(noteFreq['D2'], now, barDuration * 0.95, 0.28);
      this.playPianoNote(noteFreq['D3'], now, 2.5, 0.55);
      this.playPianoNote(noteFreq['F#4'], now + beat * 1.5, 2.0, 0.55);
    };

    scheduleSequence();
    const totalCycleMs = barDuration * 8 * 1000;
    this.songIntervalId = window.setInterval(() => {
      if (this.isPlaying && !this.hasCustomAudio) {
        scheduleSequence();
      }
    }, totalCycleMs);
  }

  // Soothing rain ambient
  private startRainNoise() {
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
      b6 = white * 0.115926;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);

    this.rainGainNode = this.ctx.createGain();
    this.rainGainNode.gain.setValueAtTime(0.06, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(this.rainGainNode);
    if (this.masterGainNode) {
      this.rainGainNode.connect(this.masterGainNode);
    }

    noiseSource.start();
    this.rainSource = noiseSource;
    this.isRainActive = true;
  }

  // Gentle morning bird chirps for dawn scenes
  private triggerBirdChirp() {
    if (!this.ctx || !this.masterGainNode || !this.isBirdsActive) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    const baseFreq = 2600 + Math.random() * 600;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 800, now + 0.08);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.masterGainNode);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  public setBirdsActive(active: boolean) {
    this.isBirdsActive = active;
    if (active && !this.birdTimerId) {
      this.birdTimerId = window.setInterval(() => {
        if (this.isBirdsActive && Math.random() > 0.4) {
          this.triggerBirdChirp();
        }
      }, 3500);
    } else if (!active && this.birdTimerId) {
      clearInterval(this.birdTimerId);
      this.birdTimerId = null;
    }
  }

  public togglePlay(): boolean {
    this.init();
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Putar lagu kustom secara langsung tanpa fallback ke piano synthesizer
    if (this.hasCustomAudio && this.customAudio) {
      this.customAudio.play().catch((err) => {
        console.warn("Audio play blocked or failed:", err);
      });
    } else {
      this.startArrangement();
    }

    if (!this.isRainActive) {
      this.startRainNoise();
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.songIntervalId) {
      clearInterval(this.songIntervalId);
      this.songIntervalId = null;
    }
    this.setBirdsActive(false);
  }

  public toggleRain(): boolean {
    if (!this.isRainActive) {
      this.init();
      this.startRainNoise();
      return true;
    } else {
      if (this.rainGainNode && this.ctx) {
        this.rainGainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      this.isRainActive = false;
      return false;
    }
  }

  public setVolume(vol: number) {
    this.volume = vol;
    if (this.customAudio) {
      this.customAudio.volume = vol;
    }
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsRainActive(): boolean {
    return this.isRainActive;
  }
}

export const soundEngine = new SoundEngine();
