import { secrets, worlds } from '../data'
import { useSave } from '../store'

export function Missions() {
  const save = useSave()
  return (
    <section>
      <h1 className="title">Misiones</h1>
      <p className="lede">Hay misiones de las islas y otras que no aparecen en ningún menú. Si escuchas un rumor, explora.</p>

      <h2>Aprendizaje</h2>
      <div className="grid">
        {worlds.map((world) => {
          const done = world.levels.filter((level) => save.completedLevels.includes(level.id)).length
          return (
            <article key={world.id} className="mission-card">
              <h3>
                {world.glyph} {world.name}
              </h3>
              <div className="progress">
                <span style={{ width: `${(done / world.levels.length) * 100}%`, background: world.accent }} />
              </div>
              <p>
                {done === world.levels.length ? 'Completada. Insignia lista en tu perfil.' : `${done}/${world.levels.length} juegos por conquistar.`}
              </p>
            </article>
          )
        })}
      </div>

      <h2>Rumores secretos</h2>
      <div className="grid">
        {secrets.map((mission) => {
          const done = save.completedSecrets.includes(mission.id)
          return (
            <article key={mission.id} className="mission-card">
              <h3>{done ? mission.title : '???'}</h3>
              <p>{done ? mission.reveal : mission.whisper}</p>
              <p className="hint">{done ? 'Recompensa entregada' : 'Sigue explorando el parque'}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
