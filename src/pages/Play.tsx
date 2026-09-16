import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { sfx } from '../audio'
import { Confetti } from '../components/RewardToasts'
import { levelById, worldById } from '../data'
import { BugGame, CssGame, HtmlGame, MazeGame, OrderGame, QuizGame } from '../games/Games'
import { useSave } from '../store'

export function Play() {
  const { worldId = '', levelId = '' } = useParams()
  const world = worldById(worldId)
  const level = levelById(worldId, levelId)
  const save = useSave()
  const nav = useNavigate()
  const [wonFor, setWonFor] = useState<string | null>(null)
  const [freshWin, setFreshWin] = useState(false)
  const won = wonFor === levelId

  if (!world || !level) {
    return (
      <section className="panel">
        <p>No encuentro ese juego.</p>
        <Link className="btn" to="/mundos">
          Volver a las islas
        </Link>
      </section>
    )
  }

  const index = world.levels.findIndex((item) => item.id === level.id)
  const next = world.levels[index + 1]

  function win() {
    if (won || !world || !level) return
    const isNew = !save.completedLevels.includes(level.id)
    setWonFor(levelId)
    setFreshWin(isNew)
    if (!save.muted) sfx.success()
    if (isNew) save.completeLevel(world.id, level.id, level.xp)
  }

  return (
    <section className="play-layout">
      <article className="panel">
        <p className="hint">
          {world.glyph} {world.name} · misión {index + 1}
        </p>
        <h1 className="title" style={{ fontSize: 40 }}>
          {level.title}
        </h1>
        {level.type === 'order' ? <OrderGame key={level.id} level={level} onWin={win} /> : null}
        {level.type === 'bug' ? <BugGame key={level.id} level={level} onWin={win} /> : null}
        {level.type === 'quiz' ? <QuizGame key={level.id} level={level} onWin={win} /> : null}
        {level.type === 'html' ? <HtmlGame key={level.id} level={level} onWin={win} /> : null}
        {level.type === 'css' ? <CssGame key={level.id} level={level} onWin={win} /> : null}
        {level.type === 'maze' ? <MazeGame key={level.id} level={level} onWin={win} /> : null}
      </article>
      <aside className="panel">
        <h3>Consejo de Pixel</h3>
        <p>{level.hint}</p>
        <p>
          Recompensa: <strong>+{level.xp} XP</strong> y estrellas para tu perfil.
        </p>
        <div className="row">
          <Link className="btn" to={`/mundos/${world.id}`}>
            Salir
          </Link>
        </div>
      </aside>
      {won ? (
        <>
          <Confetti show />
          <div className="modal-screen">
            <div className="modal">
              <div style={{ fontSize: 48 }}>🎉</div>
              <h2>¡Lo lograste, {save.name}!</h2>
              <p>{freshWin ? 'Sumaste experiencia y tesoros.' : 'Ya tenías esta misión, pero puedes volver a jugar cuando quieras.'}</p>
              <div className="row">
                {next ? (
                  <button className="btn primary" onClick={() => nav(`/jugar/${world.id}/${next.id}`)}>
                    Siguiente misión
                  </button>
                ) : (
                  <button className="btn primary" onClick={() => nav('/perfil')}>
                    Ver mi perfil
                  </button>
                )}
                <button className="btn" onClick={() => nav(`/mundos/${world.id}`)}>
                  Volver a la isla
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </section>
  )
}
