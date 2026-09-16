import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { worlds } from '../data'
import { useSave } from '../store'

export function Worlds() {
  const completed = useSave((s) => s.completedLevels)
  return (
    <section>
      <h1 className="title">Islas del conocimiento</h1>
      <p className="lede">Cada isla enseña un lenguaje o una forma de pensar. Entra, juega y colecciona insignias.</p>
      <div className="grid worlds-grid" style={{ marginTop: 18 }}>
        {worlds.map((world, index) => {
          const done = world.levels.filter((level) => completed.includes(level.id)).length
          return (
            <motion.div key={world.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
              <Link className="island-card" to={`/mundos/${world.id}`} style={{ display: 'block', boxShadow: `8px 8px 0 ${world.accent}` }}>
                <div style={{ fontSize: 36 }}>{world.glyph}</div>
                <h2>{world.name}</h2>
                <p>{world.tagline}</p>
                <div className="progress">
                  <span style={{ width: `${(done / world.levels.length) * 100}%`, background: world.accent }} />
                </div>
                <p className="hint">
                  {done}/{world.levels.length} juegos · {world.language}
                </p>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
