// Minimal Web Audio API helper for chiptune-ish SE and simple BGM loop.
// No external audio assets required.

type Ctx = AudioContext;
let ctx: Ctx | null = null;
let masterGain: GainNode | null = null;
let bgmNode: { stop: () => void } | null = null;
let enabled = false;

function ensureCtx(): Ctx {
  if (!ctx) {
    const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    ctx = new AC();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.12;
    masterGain.connect(ctx.destination);
  }
  return ctx!;
}

export function setAudioEnabled(on: boolean) {
  enabled = on;
  if (!on && bgmNode) {
    bgmNode.stop();
    bgmNode = null;
  }
  try {
    localStorage.setItem('kmg.audio', on ? '1' : '0');
  } catch {}
}

export function isAudioEnabled() {
  return enabled;
}

export function loadAudioPref(): boolean {
  try {
    const v = localStorage.getItem('kmg.audio');
    enabled = v === '1';
  } catch {}
  return enabled;
}

export function blip(freq = 880, dur = 0.08, type: OscillatorType = 'square') {
  if (!enabled) return;
  const c = ensureCtx();
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = 0;
  g.gain.linearRampToValueAtTime(0.4, c.currentTime + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
  osc.connect(g);
  g.connect(masterGain!);
  osc.start();
  osc.stop(c.currentTime + dur + 0.02);
}

export function chord(freqs: number[], dur = 0.25) {
  freqs.forEach((f, i) => setTimeout(() => blip(f, dur, 'triangle'), i * 40));
}

export function sparkleSe() {
  chord([1200, 1600, 2000], 0.12);
}

export function pickupSe() {
  chord([660, 990, 1320], 0.1);
}

export function startBgm() {
  if (!enabled) return;
  stopBgm();
  const c = ensureCtx();
  const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 587.33];
  let i = 0;
  const interval = setInterval(() => {
    if (!enabled) {
      clearInterval(interval);
      return;
    }
    const f = notes[i % notes.length];
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'square';
    osc.frequency.value = f;
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(0.08, c.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.25);
    osc.connect(g);
    g.connect(masterGain!);
    osc.start();
    osc.stop(c.currentTime + 0.3);
    i++;
  }, 300);
  bgmNode = { stop: () => clearInterval(interval) };
}

export function stopBgm() {
  if (bgmNode) {
    bgmNode.stop();
    bgmNode = null;
  }
}
