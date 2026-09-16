import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, type FormEvent } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { sfx } from '../audio'
import { logos } from '../data'
import { useSave } from '../store'
import { EducodeLogo } from './Logo'
import { RewardToasts } from './RewardToasts'

const links = [
  { to: '/mundos', label: 'ITINERARIO' },
  { to: '/', label: 'EDUCODE' },
  { to: '/misiones', label: 'INSIGNIAS' },
]

export function Shell() {
  const location = useLocation()
  const save = useSave()
  const [sky, setSky] = useState<'night' | 'day'>('day')
  const [name, setName] = useState(save.name)
  const glyph = logos.find((item) => item.id === save.equipped.logo)?.glyph ?? '👤'
  const home = location.pathname === '/'

  useEffect(() => {
    sfx.resume()
  }, [location.pathname])

  return (
    <div className={home ? 'shell hub' : 'shell'}>
      <div className="bg-stars" aria-hidden="true">
        {Array.from({ length: 40 }, (_, i) => (
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
      <header className="topbar hub-topbar">
        <EducodeLogo
          onSecret={() => {
            save.tapLogo()
            if (!save.muted) sfx.tap()
          }}
        />
        <nav className="hub-nav">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => (isActive ? 'hub-nav-link active' : 'hub-nav-link')}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hub-end">
          {home ? null : (
            <button className="hub-speaker header-speaker" onClick={() => save.toggleMute()} aria-label={save.muted ? 'Activar sonido' : 'Silenciar'}>
              {save.muted ? '🔇' : '🔊'}
            </button>
          )}
          <NavLink to="/perfil" className="hub-avatar" aria-label="Tu perfil">
            <span>{glyph}</span>
          </NavLink>
        </div>
      </header>
      <main className={home ? 'page hub-page' : 'page'}>
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
            <div style={{ fontSize: 42 }}>🐍</div>
            <h2 className="title" style={{ fontSize: 34 }}>
              ¡Bienvenido a EDUCODE!
            </h2>
            <p>Un parque para aprender a programar jugando. ¿Cómo quieres que te llamemos?</p>
            <input className="name-input" value={name} maxLength={16} onChange={(e) => setName(e.target.value)} placeholder="Tu apodo" />
            <div className="row" style={{ marginTop: 14 }}>
              <button className="btn primary" type="submit">
                ¡Jugar y aprender!
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}
