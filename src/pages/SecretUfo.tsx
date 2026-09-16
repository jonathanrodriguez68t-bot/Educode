import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sfx } from '../audio'
import { Confetti } from '../components/RewardToasts'
import { useSave } from '../store'
import { uid } from '../utils'

type Chip = {
  id: string
  x: number
  label: string
  good: boolean
  dur: number
}

const good = ['print', 'if', 'for', 'html', 'css', 'def', 'let']
const bad = ['🐛', 'crash', 'null??', 'error']

export function SecretUfo() {
  const nav = useNavigate()
  const muted = useSave((s) => s.muted)
  const completeSecret = useSave((s) => s.completeSecret)
  const markUfoGame = useSave((s) => s.markUfoGame)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [chips, setChips] = useState<Chip[]>([])
  const [over, setOver] = useState<'win' | 'lose' | null>(null)

  useEffect(() => {
    if (over) return
    const spawn = window.setInterval(() => {
      const nice = Math.random() > 0.32
      const pool = nice ? good : bad
      setChips((current) => [
        ...current.slice(-10),
        {
          id: uid('chip'),
          x: 8 + Math.random() * 78,
          label: pool[Math.floor(Math.random() * pool.length)] ?? 'if',
          good: nice,
          dur: 2.6 + Math.random() * 1.4,
        },
      ])
    }, 650)
    return () => window.clearInterval(spawn)
  }, [over])

  return (
    <section>
      <h1 className="title">Caza códigos 🛸</h1>
      <p className="lede">Toca las palabras de programación. Evita los bugs. Consigue 10 para abrir el tesoro del platillo.</p>
      <p>
        Puntos {score}/10 · Vidas {'❤️'.repeat(Math.max(0, lives))}
      </p>
      <div className="secret-stage">
        {chips.map((chip) => (
          <button
            key={chip.id}
            className={chip.good ? 'falling' : 'falling bad'}
            style={{ left: `${chip.x}%`, ['--dur' as string]: `${chip.dur}s` }}
            onAnimationEnd={() => setChips((current) => current.filter((item) => item.id !== chip.id))}
            onClick={() => {
              setChips((current) => current.filter((item) => item.id !== chip.id))
              if (chip.good) {
                const nextScore = score + 1
                setScore(nextScore)
                if (!muted) sfx.collect()
                if (nextScore >= 10 && over !== 'win') {
                  setOver('win')
                  markUfoGame()
                  completeSecret('cazador-ovni')
                  if (!muted) sfx.success()
                }
              } else {
                const nextLives = lives - 1
                setLives(nextLives)
                if (!muted) sfx.fail()
                if (nextLives <= 0 && over !== 'win') setOver('lose')
              }
            }}
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
                  setScore(0)
                  setLives(3)
                  setChips([])
                  setOver(null)
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
