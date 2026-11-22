export interface ChristmasTrack {
  id: string;
  title: string;
  composer: string;
  tempoBpm: number;
  notes: Array<{ freq: number; durationBeats: number; harmony?: number }>;
}

// MIDI-like frequency helpers (Hz)
const N: Record<string, number> = {
  R: 0,
  C4: 261.63,
  Cs4: 277.18,
  D4: 293.66,
  Eb4: 311.13,
  E4: 329.63,
  F4: 349.23,
  Fs4: 369.99,
  G4: 392.0,
  Ab4: 415.3,
  A4: 440.0,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  Cs5: 554.37,
  D5: 587.33,
  Eb5: 622.25,
  E5: 659.25,
  F5: 698.46,
  Fs5: 739.99,
  G5: 783.99,
  Ab5: 830.61,
  A5: 880.0,
  Bb5: 932.33,
  B5: 987.77,
  C6: 1046.5,
  G3: 196.0,
  A3: 220.0,
  B3: 246.94,
  C3: 130.81,
  F3: 174.61,
  D3: 146.83,
  E3: 164.81,
};

export const CHRISTMAS_TRACKS: ChristmasTrack[] = [
  {
    id: 'silent-night',
    title: 'Cicha Noc',
    composer: 'Pozytywka · F. Gruber',
    tempoBpm: 92,
    notes: [
      { freq: N.G4, durationBeats: 1.5, harmony: N.C4 },
      { freq: N.A4, durationBeats: 0.5 },
      { freq: N.G4, durationBeats: 1.0 },
      { freq: N.E4, durationBeats: 3.0, harmony: N.C4 },
      { freq: N.G4, durationBeats: 1.5, harmony: N.C4 },
      { freq: N.A4, durationBeats: 0.5 },
      { freq: N.G4, durationBeats: 1.0 },
      { freq: N.E4, durationBeats: 3.0, harmony: N.C4 },
      { freq: N.D5, durationBeats: 2.0, harmony: N.G4 },
      { freq: N.D5, durationBeats: 1.0 },
      { freq: N.B4, durationBeats: 3.0, harmony: N.G4 },
      { freq: N.C5, durationBeats: 2.0, harmony: N.E4 },
      { freq: N.C5, durationBeats: 1.0 },
      { freq: N.G4, durationBeats: 3.0, harmony: N.C4 },
      { freq: N.A4, durationBeats: 2.0, harmony: N.F4 },
      { freq: N.A4, durationBeats: 1.0 },
      { freq: N.C5, durationBeats: 1.5, harmony: N.F4 },
      { freq: N.B4, durationBeats: 0.5 },
      { freq: N.A4, durationBeats: 1.0 },
      { freq: N.G4, durationBeats: 1.5, harmony: N.E4 },
      { freq: N.A4, durationBeats: 0.5 },
      { freq: N.G4, durationBeats: 1.0 },
      { freq: N.E4, durationBeats: 3.0, harmony: N.C4 },
      { freq: N.D5, durationBeats: 2.0, harmony: N.G4 },
      { freq: N.D5, durationBeats: 1.0 },
      { freq: N.F5, durationBeats: 1.5, harmony: N.G4 },
      { freq: N.D5, durationBeats: 0.5 },
      { freq: N.B4, durationBeats: 1.0 },
      { freq: N.C5, durationBeats: 3.0, harmony: N.E4 },
      { freq: N.E5, durationBeats: 3.0, harmony: N.C4 },
      { freq: N.C5, durationBeats: 1.5, harmony: N.G4 },
      { freq: N.G4, durationBeats: 0.5 },
      { freq: N.E4, durationBeats: 1.0 },
      { freq: N.G4, durationBeats: 1.5, harmony: N.D4 },
      { freq: N.F4, durationBeats: 0.5 },
      { freq: N.D4, durationBeats: 1.0 },
      { freq: N.C4, durationBeats: 4.0, harmony: N.G3 },
    ],
  },
  {
    id: 'jingle-bells',
    title: 'Dzwonki Sań (Jingle Bells)',
    composer: 'Celesta · J. Pierpont',
    tempoBpm: 146,
    notes: [
      { freq: N.E5, durationBeats: 1, harmony: N.C4 },
      { freq: N.E5, durationBeats: 1 },
      { freq: N.E5, durationBeats: 2, harmony: N.G4 },
      { freq: N.E5, durationBeats: 1, harmony: N.C4 },
      { freq: N.E5, durationBeats: 1 },
      { freq: N.E5, durationBeats: 2, harmony: N.G4 },
      { freq: N.E5, durationBeats: 1, harmony: N.C4 },
      { freq: N.G5, durationBeats: 1 },
      { freq: N.C5, durationBeats: 1.5, harmony: N.E4 },
      { freq: N.D5, durationBeats: 0.5 },
      { freq: N.E5, durationBeats: 4, harmony: N.C4 },
      { freq: N.F5, durationBeats: 1, harmony: N.F4 },
      { freq: N.F5, durationBeats: 1 },
      { freq: N.F5, durationBeats: 1.5 },
      { freq: N.F5, durationBeats: 0.5 },
      { freq: N.F5, durationBeats: 1, harmony: N.C4 },
      { freq: N.E5, durationBeats: 1 },
      { freq: N.E5, durationBeats: 1 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.E5, durationBeats: 1, harmony: N.G4 },
      { freq: N.D5, durationBeats: 1 },
      { freq: N.D5, durationBeats: 1 },
      { freq: N.E5, durationBeats: 1 },
      { freq: N.D5, durationBeats: 2, harmony: N.G4 },
      { freq: N.G5, durationBeats: 2, harmony: N.B4 },
      { freq: N.E5, durationBeats: 1, harmony: N.C4 },
      { freq: N.E5, durationBeats: 1 },
      { freq: N.E5, durationBeats: 2 },
      { freq: N.E5, durationBeats: 1, harmony: N.C4 },
      { freq: N.E5, durationBeats: 1 },
      { freq: N.E5, durationBeats: 2 },
      { freq: N.E5, durationBeats: 1, harmony: N.C4 },
      { freq: N.G5, durationBeats: 1 },
      { freq: N.C5, durationBeats: 1.5 },
      { freq: N.D5, durationBeats: 0.5 },
      { freq: N.E5, durationBeats: 4, harmony: N.C4 },
      { freq: N.F5, durationBeats: 1, harmony: N.F4 },
      { freq: N.F5, durationBeats: 1 },
      { freq: N.F5, durationBeats: 1.5 },
      { freq: N.F5, durationBeats: 0.5 },
      { freq: N.F5, durationBeats: 1, harmony: N.C4 },
      { freq: N.E5, durationBeats: 1 },
      { freq: N.E5, durationBeats: 1 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.G5, durationBeats: 1, harmony: N.G4 },
      { freq: N.G5, durationBeats: 1 },
      { freq: N.F5, durationBeats: 1 },
      { freq: N.D5, durationBeats: 1 },
      { freq: N.C5, durationBeats: 4, harmony: N.C4 },
    ],
  },
  {
    id: 'merry-christmas',
    title: 'We Wish You a Merry Christmas',
    composer: 'Harfa i Dzwonki',
    tempoBpm: 136,
    notes: [
      { freq: N.G4, durationBeats: 1, harmony: N.C4 },
      { freq: N.C5, durationBeats: 1, harmony: N.E4 },
      { freq: N.C5, durationBeats: 0.5 },
      { freq: N.D5, durationBeats: 0.5 },
      { freq: N.C5, durationBeats: 0.5 },
      { freq: N.B4, durationBeats: 0.5 },
      { freq: N.A4, durationBeats: 1, harmony: N.F4 },
      { freq: N.A4, durationBeats: 1 },
      { freq: N.A4, durationBeats: 1 },
      { freq: N.D5, durationBeats: 1, harmony: N.G4 },
      { freq: N.D5, durationBeats: 0.5 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.D5, durationBeats: 0.5 },
      { freq: N.C5, durationBeats: 0.5 },
      { freq: N.B4, durationBeats: 1, harmony: N.G4 },
      { freq: N.G4, durationBeats: 1 },
      { freq: N.G4, durationBeats: 1 },
      { freq: N.E5, durationBeats: 1, harmony: N.C4 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.F5, durationBeats: 0.5 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.D5, durationBeats: 0.5 },
      { freq: N.C5, durationBeats: 1, harmony: N.A4 },
      { freq: N.A4, durationBeats: 1 },
      { freq: N.G4, durationBeats: 0.5 },
      { freq: N.G4, durationBeats: 0.5 },
      { freq: N.A4, durationBeats: 1, harmony: N.F4 },
      { freq: N.D5, durationBeats: 1, harmony: N.G4 },
      { freq: N.B4, durationBeats: 1 },
      { freq: N.C5, durationBeats: 3, harmony: N.C4 },
    ],
  },
  {
    id: 'sugar-plum',
    title: 'Dziadek do Orzechów',
    composer: 'Wieszczka Cukrowa · P. Czajkowski',
    tempoBpm: 112,
    notes: [
      { freq: N.G5, durationBeats: 0.5, harmony: N.E4 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.G5, durationBeats: 1.0 },
      { freq: N.Fs5, durationBeats: 1.0, harmony: N.B4 },
      { freq: N.Eb5, durationBeats: 1.0 },
      { freq: N.E5, durationBeats: 1.0, harmony: N.C4 },
      { freq: N.D5, durationBeats: 0.5 },
      { freq: N.D5, durationBeats: 0.5 },
      { freq: N.D5, durationBeats: 1.0 },
      { freq: N.Cs5, durationBeats: 0.5, harmony: N.A4 },
      { freq: N.Cs5, durationBeats: 0.5 },
      { freq: N.Cs5, durationBeats: 1.0 },
      { freq: N.C5, durationBeats: 0.5, harmony: N.Ab4 },
      { freq: N.C5, durationBeats: 0.5 },
      { freq: N.C5, durationBeats: 1.0 },
      { freq: N.B4, durationBeats: 0.5, harmony: N.G4 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.C5, durationBeats: 0.5 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.B4, durationBeats: 2.0, harmony: N.E4 },
      { freq: N.R, durationBeats: 0.5 },
      { freq: N.E5, durationBeats: 0.5, harmony: N.C4 },
      { freq: N.C5, durationBeats: 0.5 },
      { freq: N.E5, durationBeats: 0.5 },
      { freq: N.G5, durationBeats: 1.0, harmony: N.B4 },
      { freq: N.Fs5, durationBeats: 1.0 },
      { freq: N.E5, durationBeats: 2.0, harmony: N.E4 },
    ],
  },
];

class ChristmasMusicPlayer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private isPlaying = false;
  private currentTrackId = CHRISTMAS_TRACKS[0].id;
  private noteIndex = 0;
  private timerId: number | null = null;
  private volume = 0.45;
  private listeners = new Set<() => void>();

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      trackId: this.currentTrackId,
      volume: this.volume,
    };
  }

  private ensureAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;

      // Subtle warm delay for music-box / parlor resonance
      this.delayNode = this.ctx.createDelay(0.6);
      this.delayNode.delayTime.value = 0.28;
      const delayFeedback = this.ctx.createGain();
      delayFeedback.gain.value = 0.24;
      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 1800;

      this.delayNode.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(this.delayNode);
      delayFilter.connect(this.masterGain);

      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  private playBellNote(freq: number, durationSec: number, velocity = 0.26) {
    if (!this.ctx || !this.masterGain || !this.delayNode || freq <= 0) return;

    const now = this.ctx.currentTime;

    // Primary warm sine tone (celesta fundamental)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Gentle triangle harmonic (bell shimmer)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();

    const release = Math.min(Math.max(durationSec * 1.4, 0.55), 2.2);

    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.exponentialRampToValueAtTime(velocity, now + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + release);

    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.exponentialRampToValueAtTime(velocity * 0.14, now + 0.008);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + release * 0.45);

    osc1.connect(gain1);
    osc2.connect(gain2);

    gain1.connect(this.masterGain);
    gain1.connect(this.delayNode);
    gain2.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + release + 0.05);
    osc2.stop(now + release + 0.05);
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;
    const track =
      CHRISTMAS_TRACKS.find((t) => t.id === this.currentTrackId) || CHRISTMAS_TRACKS[0];
    const step = track.notes[this.noteIndex % track.notes.length];
    const beatSec = 60 / track.tempoBpm;
    const durationSec = step.durationBeats * beatSec;

    if (step.freq > 0) {
      this.playBellNote(step.freq, durationSec, 0.25);
    }
    if (step.harmony && step.harmony > 0) {
      this.playBellNote(step.harmony, durationSec * 1.3, 0.11);
    }

    this.noteIndex = (this.noteIndex + 1) % track.notes.length;
    this.timerId = window.setTimeout(() => this.scheduleNextNote(), durationSec * 1000);
  }

  public play() {
    this.ensureAudioContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();
    this.scheduleNextNote();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setTrack(trackId: string) {
    this.currentTrackId = trackId;
    this.noteIndex = 0;
    if (this.isPlaying) {
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.scheduleNextNote();
    }
    this.notify();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }
}

export const musicPlayer = new ChristmasMusicPlayer();
