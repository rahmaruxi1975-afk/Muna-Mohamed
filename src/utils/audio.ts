/**
 * Web Audio API synthesizer for Muna Dashboard
 * Synthesizes pure melodic chimes and celebration fanfare without external MP3 dependencies
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playGentleChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Arpeggio note E5 (659.25Hz) transitioning to G#5 (830.61Hz)
    osc.frequency.setValueAtTime(659.25, now);
    osc.frequency.exponentialRampToValueAtTime(830.61, now + 0.15);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  } catch (e) {
    console.warn('Audio playback error', e);
  }
}

export function playCelebrationFanfare() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [
      { freq: 523.25, time: 0.0, dur: 0.2 }, // C5
      { freq: 659.25, time: 0.15, dur: 0.2 }, // E5
      { freq: 783.99, time: 0.3, dur: 0.25 }, // G5
      { freq: 1046.5, time: 0.5, dur: 0.7 }, // C6
    ];

    notes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.freq, now + n.time);

      gain.gain.setValueAtTime(0, now + n.time);
      gain.gain.linearRampToValueAtTime(0.25, now + n.time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + n.time + n.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.time);
      osc.stop(now + n.time + n.dur);
    });
  } catch (e) {
    console.warn('Fanfare playback error', e);
  }
}

export function playSleepReminderChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Soft relaxing low-frequency chime
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now); // A4
    osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.4); // E4

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.2);
  } catch (e) {
    console.warn('Sleep chime error', e);
  }
}

/**
 * Text-to-Speech pronunciation helper using native browser Web Speech API
 */
export function speakEnglishText(text: string, rate: number = 1.0, onEnd?: () => void): boolean {
  try {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported on this device/browser');
      return false;
    }

    window.speechSynthesis.cancel(); // Stop any currently playing audio

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = Math.max(0.6, Math.min(rate, 1.5));
    utterance.pitch = 1.0;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Female')));
    if (enVoice) {
      utterance.voice = enVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    if (onEnd) onEnd();
    return false;
  }
}

export function stopEnglishSpeech(): void {
  try {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } catch (e) {
    console.warn('Error stopping speech synthesis:', e);
  }
}
