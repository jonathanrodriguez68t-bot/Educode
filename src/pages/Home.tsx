import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { CloudArt, CometArt, CrystalArt, PortalArt, UfoArt } from '../art'
import { sfx } from '../audio'
import { Pixel } from '../components/Pixel'
import { worlds } from '../data'
import { useSave } from '../store'

type SkyCtx = {
  sky: 'night' | 'day'
  setSky: Dispatch<SetStateAction<'night' | 'day'>>
}

const islandSpot = [
  { left: '8%', top: '16%' },
  { left: '70%', top: '12%' },
  { left: '12%', top: '48%' },
  { left: '66%', top: '46%' },
  { left: '38%', top: '22%' },
]

export function Home() {
  const nav = useNavigate()
  const save = useSave()
  const { sky, setSky } = useOutletContext<SkyCtx>()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [ufo, setUfo] = useState(false)
  const [comet, setComet] = useState(false)
  const [cloudOpen, setCloudOpen] = useState(false)
  const [stars, setStars] = useState(() => makeStars())

  useEffect(() => {
    let alive = true
    let appearTimer = 0
    let hideTimer = 0

    const appear = () => {
      if (!alive) return
      setUfo(true)
      if (!useSave.getState().muted) sfx.ufo()
      hideTimer = window.setTimeout(() => {
        if (alive) setUfo(false)
        appearTimer = window.setTimeout(appear, 14000 + Math.random() * 12000)
      }, 9000)
    }

    appearTimer = window.setTimeout(appear, 4500)
    return () => {
      alive = false
      window.clearTimeout(appearTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => setComet(true), 22000)
    return () => window.clearInterval(id)
  }, [])

  const parallax = useMemo(() => ({ x: mouse.x * 12, y: mouse.y * 8 }), [mouse])

  return (
    <section
      className="hero-sky"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setMouse({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        })
      }}
    >
      <button
        className="sky-toggle"
        onClick={() => {
          setSky((prev) => (prev === 'day' ? 'night' : 'day'))
          save.toggleSky()
          if (!save.muted) sfx.tap()
        }}
        aria-label="Cambiar día y noche"
      >
        {sky === 'day' ? '🌙' : '☀️'}
      </button>

      <motion.div style={{ x: parallax.x, y: parallax.y }} className="ground" />

      {worlds.map((world, index) => {
        const spot = islandSpot[index] ?? islandSpot[0]
        const done = world.levels.filter((level) => save.completedLevels.includes(level.id)).length
        return (
          <motion.button
            key={world.id}
            className="island"
            style={{ left: spot.left, top: spot.top, animationDelay: `${index * 0.35}s` }}
            whileHover={{ scale: 1.04, rotate: -1.5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (!save.muted) sfx.tap()
              nav(`/mundos/${world.id}`)
            }}
          >
            <div style={{ fontSize: 32 }}>{world.glyph}</div>
            <b>{world.name}</b>
            <span>{world.tagline}</span>
            <span>
              {done}/{world.levels.length} misiones
            </span>
          </motion.button>
        )
      })}

      {stars.map((star) => (
        <button
          key={star.id}
          className="sky-star"
          style={{ left: star.left, top: star.top }}
          onClick={() => {
            save.bumpSkyStar()
            if (!save.muted) sfx.collect()
            setStars((current) => [...current.filter((item) => item.id !== star.id), ...makeStars(1)])
          }}
          aria-label="Recoger estrella"
        >
          ⭐
        </button>
      ))}

      <div className="fat-cloud" style={{ left: '40%', top: '6%' }}>
        <button style={{ background: 'transparent', border: 0, padding: 0 }} onClick={() => setCloudOpen(true)} aria-label="Nube sospechosa">
          <CloudArt />
        </button>
        {cloudOpen || save.completedSecrets.includes('cristal-oculto') ? (
          <button
            className="crystal"
            style={{ left: '58px', top: '28px' }}
            onClick={() => {
              save.completeSecret('cristal-oculto')
              if (!save.muted) sfx.success()
            }}
            aria-label="Cristal escondido"
          >
            <CrystalArt />
          </button>
        ) : null}
      </div>

      <AnimatePresence>
        {ufo ? (
          <motion.button
            className="ufo"
            initial={{ x: -120, y: 40, opacity: 0 }}
            animate={{ x: ['-18vw', '18vw', '48vw', '78vw', '108vw'], y: [40, 90, 30, 110, 50], opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 8.5, ease: 'easeInOut' }}
            onClick={() => {
              if (!save.muted) sfx.ufo()
              nav('/secreto/ovni')
            }}
            aria-label="Platillo volador secreto"
          >
            <UfoArt />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {comet ? (
          <motion.button
            className="comet"
            initial={{ x: 640, y: -20, opacity: 0 }}
            animate={{ x: -80, y: 180, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.4, ease: 'linear' }}
            onAnimationComplete={() => setComet(false)}
            onClick={() => {
              save.completeSecret('cometa-fugaz')
              if (!save.muted) sfx.collect()
              setComet(false)
            }}
            aria-label="Cometa fugaz"
          >
            <CometArt />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <button
        className="mini-portal"
        onClick={() => {
          if (!save.muted) sfx.tap()
          nav('/secreto/portal')
        }}
        aria-label="Portal diminuto"
      >
        <PortalArt />
      </button>

      <div className="pixel-wrap">
        <Pixel speak={`Hola ${save.name}. El parque está vivo: toca, busca y juega.`} />
      </div>
    </section>
  )
}

function makeStars(count = 6) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${Date.now()}-${i}-${Math.random()}`,
    left: `${8 + Math.random() * 84}%`,
    top: `${10 + Math.random() * 55}%`,
  }))
}
