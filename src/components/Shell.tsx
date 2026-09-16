import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type FormEvent } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { sfx } from '../audio'
import { colors, nextRank, rankFor } from '../data'
import { useSave } from '../store'
import { RewardToasts } from './RewardToasts'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/mundos', label: 'Mundos' },
  { to: '/misiones', label: 'Misiones' },
  { to: '/perfil', label: 'Perfil' },
]

export function Shell() {
  const location = useLocation()
  const save = useSave()
  const rank = rankFor(save.xp)
  const upcoming = nextRank(save.xp)
  const accent = colors.find((color) => color.id === save.equipped.color)?.value ?? '#3ddc97'
  const [sky, setSky] = useState<'night' | 'day'>('night')
  const [name, setName] = useState(save.name)

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
  }, [accent])

  useEffect(() => {
    sfx.resume()
  }, [location.pathname])

  const day = sky === 'day' && location.pathname === '/'

  return (
    <div className={day ? 'shell day' : 'shell'}>
      <div className="bg-stars" aria-hidden="true">
        {Array.from({ length: 36 }, (_, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 19) % 90}%`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
      <header className="topbar">
        <button
          className="brand"
          onClick={() => {
            save.tapLogo()
            if (!save.muted) sfx.tap()
          }}
          aria-label="EDUCODE, toca para un secreto"
        >
          <span className="brand-mark">👾</span>
          <span>
            <span className="brand-title">EDUCODE</span>
            <span className="brand-sub">parque de código</span>
          </span>
        </button>
        <nav className="nav">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hud">
          <span className="stat-chip">⭐ {save.stars}</span>
          <span className="stat-chip">
            {rank.glyph} {save.xp} XP
          </span>
          <button className="icon-btn" onClick={() => save.toggleMute()} aria-label={save.muted ? 'Activar sonido' : 'Silenciar'}>
            {save.muted ? '🔇' : '🔊'}
          </button>
        </div>
      </header>
      {upcoming && location.pathname !== '/' ? (
        <div className="page" style={{ paddingBottom: 0 }}>
          <div className="progress" title="Progreso de rango">
            <span style={{ width: `${Math.min(100, (save.xp / upcoming.minXp) * 100)}%` }} />
          </div>
        </div>
      ) : null}
      <main className="page">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <Outlet context={{ sky, setSky }} />
          </motion.div>
        </AnimatePresence>
      </main>
      <RewardToasts />
      {!save.hasOnboarded ? (
        <div className="modal-screen">
          <form
            className="modal"
            onSubmit={(event: FormEvent) => {
              event.preventDefault()
              save.finishOnboarding(name)
              if (!save.muted) sfx.success()
            }}
          >
            <div style={{ fontSize: 42 }}>🤖</div>
            <h2 className="title" style={{ fontSize: 34 }}>
              ¡Hola, explorador!
            </h2>
            <p>Soy Pixel. En EDUCODE se aprende a programar jugando. ¿Cómo quieres que te llame?</p>
            <input className="name-input" value={name} maxLength={16} onChange={(e) => setName(e.target.value)} placeholder="Tu apodo" />
            <div className="row" style={{ marginTop: 14 }}>
              <button className="btn primary" type="submit">
                ¡Entrar al parque!
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}
