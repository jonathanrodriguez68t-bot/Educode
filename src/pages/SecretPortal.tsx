import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sfx } from '../audio'
import { Confetti } from '../components/RewardToasts'
import { useSave } from '../store'

const spots = [
  { x: 18, y: 22 },
  { x: 70, y: 18 },
  { x: 42, y: 48 },
  { x: 78, y: 62 },
  { x: 22, y: 70 },
]

export function SecretPortal() {
  const nav = useNavigate()
  const save = useSave()
  const sequence = useMemo(() => [0, 2, 4, 1, 3], [])
  const [step, setStep] = useState(0)
  const [lit, setLit] = useState<number | null>(null)
  const [won, setWon] = useState(false)
  const [message, setMessage] = useState('Toca las estrellas en el orden del mapa: 1-3-5-2-4')

  function tap(index: number) {
    if (won) return
    setLit(index)
    if (index === sequence[step]) {
      if (!save.muted) sfx.tap()
      const next = step + 1
      if (next >= sequence.length) {
        setWon(true)
        save.completeSecret('portal-minusculo')
        if (!save.muted) sfx.success()
        setMessage('El portal se abrió.')
      } else {
        setStep(next)
        setMessage(`Bien. Sigue... (${next}/${sequence.length})`)
      }
    } else {
      if (!save.muted) sfx.fail()
      setStep(0)
      setMessage('Se desordenó. Empieza otra vez: 1-3-5-2-4')
    }
    window.setTimeout(() => setLit(null), 220)
  }

  return (
    <section>
      <h1 className="title">Universo de bolsillo</h1>
      <p className="lede">Encontraste un portal minúsculo. Alinea la constelación para cruzarlo.</p>
      <p>{message}</p>
      <div className="panel constellation">
        {spots.map((spot, index) => (
          <button
            key={index}
            className={lit === index ? 'node lit' : 'node'}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            onClick={() => tap(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => nav('/')}>
          Salir del portal
        </button>
      </div>
      {won ? (
        <>
          <Confetti show />
          <div className="modal-screen">
            <div className="modal">
              <h2>Viajaste entre estrellas</h2>
              <p>Ganaste la insignia de viajero y un adorno de portal para tu perfil.</p>
              <button className="btn primary" onClick={() => nav('/perfil')}>
                Ponerlo en mi perfil
              </button>
            </div>
          </div>
        </>
      ) : null}
    </section>
  )
}
