let ctx: AudioContext | null = null

function audioContext(): AudioContext | null {
  const AudioCtor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioCtor) return null
  ctx ??= new AudioCtor()
  return ctx
}

function tone(frequency: number, duration: number, type: OscillatorType, gainValue: number, delay = 0) {
  const audio = audioContext()
  if (!audio) return
  const start = audio.currentTime + delay
  const oscillator = audio.createOscillator()
  const gain = audio.createGain()
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  oscillator.connect(gain)
  gain.connect(audio.destination)
  oscillator.start(start)
  oscillator.stop(start + duration + 0.02)
}

export const sfx = {
  resume() {
    void audioContext()?.resume()
  },
  tap() {
    tone(520, 0.08, 'triangle', 0.05)
  },
  collect() {
    tone(740, 0.09, 'sine', 0.05)
    tone(980, 0.12, 'sine', 0.04, 0.07)
  },
  success() {
    tone(523, 0.12, 'triangle', 0.06)
    tone(659, 0.12, 'triangle', 0.06, 0.09)
    tone(784, 0.18, 'triangle', 0.07, 0.18)
  },
  fail() {
    tone(220, 0.18, 'sine', 0.05)
    tone(174, 0.22, 'triangle', 0.04, 0.08)
  },
  ufo() {
    tone(390, 0.2, 'sawtooth', 0.03)
    tone(510, 0.24, 'sawtooth', 0.025, 0.12)
  },
  pet() {
    tone(640, 0.1, 'sine', 0.045)
    tone(860, 0.14, 'sine', 0.04, 0.08)
  },
}
