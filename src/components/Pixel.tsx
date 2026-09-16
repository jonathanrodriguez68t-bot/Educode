import { useState } from 'react'
import { sfx } from '../audio'
import { PixelArt } from '../art'
import { useSave } from '../store'

const lines = [
  '¡Hola! Toca las islas para aprender.',
  'Dicen que un platillo vuela por aquí...',
  'Si ves algo brillar, ¡tócalo!',
  'Acaríciame otra vez y cuento un secreto.',
  'Los bugs no muerden. Solo se corrigen.',
]

type PixelProps = {
  size?: number
  speak?: string
}

export function Pixel({ size = 150, speak }: PixelProps) {
  const petPixel = useSave((s) => s.petPixel)
  const muted = useSave((s) => s.muted)
  const [phrase, setPhrase] = useState(speak ?? lines[0])
  const [bounce, setBounce] = useState(false)

  return (
    <button
      className="pixel-btn"
      style={{ width: size, background: 'transparent', border: 0, padding: 0 }}
      onClick={() => {
        petPixel()
        if (!muted) sfx.pet()
        setBounce(true)
        setPhrase(lines[Math.floor(Math.random() * lines.length)] ?? lines[0])
        window.setTimeout(() => setBounce(false), 280)
      }}
      aria-label="Acariciar a Pixel"
    >
      <div className="speech">{phrase}</div>
      <div style={{ transform: bounce ? 'scale(1.08) rotate(-4deg)' : 'scale(1)', transition: 'transform 0.22s cubic-bezier(.2,1.4,.3,1)' }}>
        <PixelArt />
      </div>
    </button>
  )
}
