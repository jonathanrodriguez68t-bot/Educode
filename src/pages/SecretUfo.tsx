import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sfx } from '../audio'
import { Confetti } from '../components/RewardToasts'
import { useSave } from '../store'
import { uid } from '../utils'

type Chip = {
  id: string
  x: number
  y: number
  label: string
  good: boolean
}

const good = ['print', 'if', 'for', 'html', 'css', 'def', 'let']
const bad = ['🐛', 'crash', 'error']
const GOAL = 8

export function SecretUfo() {
  const nav = useNavigate()
  const muted = useSave((s) => s.muted)
  const completeSecret = useSave((s) => s.completeSecret)
  const markUfoGame = useSave((s) => s.markUfoGame)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(4)
  const [chips, setChips] = useState<Chip[]>([])
  const [over, setOver] = useState<'win' | 'lose' | null>(null)
  const [last, setLast] = useState('Toca una palabra blanca.')
  const scoreRef = useRef(0)
  const livesRef = useRef(4)
  const overRef = useRef<'win' | 'lose' | null>(null)
  const grabbed = useRef(new Set<string>())

  useEffect(() => {
    if (over) return
    const spawn = window.setInterval(() => {
      const nice = Math.random() > 0.22
      const pool = nice ? good : bad
      const chip: Chip = {
        id: uid('chip'),
        x: 8 + Math.random() * 72,
        y: 12 + Math.random() * 62,
        label: pool[Math.floor(Math.random() * pool.length)] ?? 'if',
        good: nice,
      }
      setChips((current) => [...current.slice(-7), chip])
      window.setTimeout(() => {
        setChips((current) => current.filter((item) => item.id !== chip.id))
      }, 3200)
    }, 900)
    return () => window.clearInterval(spawn)
  }, [over])

  function grab(id: string, label: string, nice: boolean) {
    if (overRef.current || grabbed.current.has(id)) return
    grabbed.current.add(id)
    setChips((current) => current.filter((item) => item.id !== id))
    if (nice) {
      scoreRef.current += 1
      setScore(scoreRef.current)
      setLast(`¡Bien! ${label}  (${scoreRef.current}/${GOAL})`)
      if (!muted) sfx.collect()
      if (scoreRef.current >= GOAL) {
        overRef.current = 'win'
        setOver('win')
        markUfoGame()
        completeSecret('cazador-ovni')
        if (!muted) sfx.success()
      }
    } else {
      livesRef.current -= 1
      setLives(livesRef.current)
      setLast('Eso era un bug. Toca las palabras blancas.')
      if (!muted) sfx.fail()
      if (livesRef.current <= 0) {
        overRef.current = 'lose'
        setOver('lose')
      }
    }
  }

  return (
    <section>
      <h1 className="title">Caza códigos 🛸</h1>
      <p className="lede">El platillo tira palabras. Toca las blancas de programación y deja los bugs rojos. Llega a {GOAL}.</p>
      <p>
        Puntos {score}/{GOAL} · Vidas {'❤️'.repeat(Math.max(0, lives))}
      </p>
      <p className="hint">{last}</p>
      <div
        className="secret-stage"
        onClick={(event) => {
          const target = (event.target as HTMLElement).closest('button[data-chip-id]')
          if (!target) return
          const id = target.getAttribute('data-chip-id')
          const label = target.getAttribute('data-label') ?? ''
          const nice = target.getAttribute('data-good') === '1'
          if (id) grab(id, label, nice)
        }}
      >
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={chip.good ? 'falling' : 'falling bad'}
            style={{ left: `${chip.x}%`, top: `${chip.y}%` }}
            data-chip-id={chip.id}
            data-label={chip.label}
            data-good={chip.good ? '1' : '0'}
          >
            {chip.label}
          </button>
        ))}
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn" onClick={() => nav('/')}>
          Volver al cielo
        </button>
      </div>
      {over === 'win' ? <Confetti show /> : null}
      {over ? (
        <div className="modal-screen">
          <div className="modal">
            <h2>{over === 'win' ? '¡El platillo te eligió!' : 'El platillo se escapó'}</h2>
            <p>{over === 'win' ? 'Ganaste color nebulosa, banner galaxia y la insignia de piloto estelar.' : 'No pasa nada. Los secretos vuelven a aparecer.'}</p>
            <div className="row">
              <button className="btn primary" onClick={() => nav('/perfil')}>
                Ver recompensas
              </button>
              <button
                className="btn"
                onClick={() => {
                  grabbed.current.clear()
                  scoreRef.current = 0
                  livesRef.current = 4
                  overRef.current = null
                  setScore(0)
                  setLives(4)
                  setChips([])
                  setOver(null)
                  setLast('Toca una palabra blanca.')
                }}
              >
                Jugar otra vez
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
