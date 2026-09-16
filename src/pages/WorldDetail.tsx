import { Link, useParams } from 'react-router-dom'
import { worldById } from '../data'
import { useSave } from '../store'

export function WorldDetail() {
  const { worldId = '' } = useParams()
  const world = worldById(worldId)
  const completed = useSave((s) => s.completedLevels)

  if (!world) {
    return (
      <section className="panel">
        <h1>Esa isla se esfumó</h1>
        <Link className="btn" to="/mundos">
          Volver
        </Link>
      </section>
    )
  }

  return (
    <section>
      <p>
        <Link className="btn" to="/mundos">
          ← Islas
        </Link>
      </p>
      <h1 className="title">
        {world.glyph} {world.name}
      </h1>
      <p className="lede">{world.lesson}</p>
      <div className="grid" style={{ marginTop: 18, maxWidth: 720 }}>
        {world.levels.map((level, index) => {
          const locked = index > 0 && !completed.includes(world.levels[index - 1]?.id ?? '')
          const done = completed.includes(level.id)
          return (
            <Link
              key={level.id}
              className={locked ? 'level-card locked' : 'level-card'}
              to={locked ? '#' : `/jugar/${world.id}/${level.id}`}
              onClick={(event) => {
                if (locked) event.preventDefault()
              }}
              aria-disabled={locked}
            >
              <h3>
                {done ? '✅' : locked ? '🔒' : '▶️'} {level.title}
              </h3>
              <p>{level.intro}</p>
              <p className="hint">
                +{level.xp} XP · {level.type}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
