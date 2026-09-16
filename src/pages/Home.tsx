import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction, type ReactNode } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import {
  BrushArt,
  CometArt,
  CrystalArt,
  GearArt,
  LaptopArt,
  PadArt,
  PlayArt,
  PortalArt,
  PuzzleArt,
  RocketArt,
  SnakeArt,
  TabletArt,
  UfoArt,
} from '../art'
import { sfx } from '../audio'
import { Pixel } from '../components/Pixel'
import { firstPlayable } from '../data'
import { useSave } from '../store'

type SkyCtx = {
  sky: 'night' | 'day'
  setSky: Dispatch<SetStateAction<'night' | 'day'>>
}

const orbits = [
  { id: 'html', Comp: TabletArt, label: 'Castillo HTML', to: '/mundos/html', angle: 210 },
  { id: 'play', Comp: PlayArt, label: 'Jugar ahora', to: 'first', angle: 18 },
  { id: 'js', Comp: LaptopArt, label: 'Jungla JavaScript', to: '/mundos/javascript', angle: 148 },
  { id: 'css', Comp: GearArt, label: 'Océano CSS', to: '/mundos/css', angle: 78 },
  { id: 'brush', Comp: BrushArt, label: 'Pinta tu perfil', to: '/perfil', angle: 300 },
]

export function Home() {
  const nav = useNavigate()
  const save = useSave()
  const { sky, setSky } = useOutletContext<SkyCtx>()
  const [ufo, setUfo] = useState(false)
  const [comet, setComet] = useState(false)
  const [puzzleOpen, setPuzzleOpen] = useState(false)
  const [stars, setStars] = useState(() => makeStars())
  const first = firstPlayable(save.completedLevels)

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
        appearTimer = window.setTimeout(appear, 16000 + Math.random() * 10000)
      }, 9000)
    }
    appearTimer = window.setTimeout(appear, 7000)
    return () => {
      alive = false
      window.clearTimeout(appearTimer)
      window.clearTimeout(hideTimer)
    }
  }, [])

  const goFirst = () => nav(`/jugar/${first.worldId}/${first.levelId}`)

  const orbitNodes = useMemo(
    () =>
      orbits.map((item) => {
        const rad = (item.angle * Math.PI) / 180
        return {
          ...item,
          x: 50 + Math.cos(rad) * 46.5,
          y: 50 + Math.sin(rad) * 46.5,
        }
      }),
    [],
  )

  return (
    <section className={sky === 'night' ? 'hub-stage is-night' : 'hub-stage'}>
      {stars.map((star) => (
        <button
          key={star.id}
          className="hub-spark"
          style={{ left: star.left, top: star.top }}
          onClick={() => {
            save.bumpSkyStar()
            if (!save.muted) sfx.collect()
            setStars((current) => [...current.filter((item) => item.id !== star.id), ...makeStars(1)])
          }}
          aria-label="Estrella"
        />
      ))}

      <div className="hub-col hub-col-left">
        <div className="hub-ufo-park">
          <motion.button
            className="hub-prop hub-ufo-park-btn"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => {
              if (!save.muted) sfx.ufo()
              nav('/secreto/ovni')
            }}
            aria-label="Platillo volador"
          >
            <UfoArt />
          </motion.button>
        </div>
        <HubChip>7-9 Años</HubChip>
        <HubBtn className="hub-btn violet" onClick={() => nav('/mundos/bloques')}>
          🧩 Aprende con Bloques
        </HubBtn>
        <HubBtn className="hub-btn cyan" onClick={() => nav('/perfil')}>
          🎨 Crea tu Personaje
        </HubBtn>
      </div>

      <div className="hub-planet-wrap">
        <motion.button
          className="hub-planet"
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => {
            setSky((prev) => (prev === 'day' ? 'night' : 'day'))
            save.toggleSky()
            if (!save.muted) sfx.tap()
          }}
          aria-label="Planeta EDUCODE"
        >
          <div className="hub-core">
            <p>¡Juega y Aprende!</p>
            <motion.div animate={{ rotate: [0, 6, -4, 0] }} transition={{ duration: 5, repeat: Infinity }}>
              <SnakeArt />
            </motion.div>
          </div>
        </motion.button>

        <div className="hub-orbit">
          {orbitNodes.map((item) => (
            <motion.button
              key={item.id}
              className="hub-orbit-item"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              whileHover={{ scale: 1.12, rotate: -8 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                if (!save.muted) sfx.tap()
                if (item.to === 'first') goFirst()
                else nav(item.to)
              }}
              aria-label={item.label}
            >
              <item.Comp />
            </motion.button>
          ))}
        </div>

        <div className="hub-pixel">
          <Pixel size={88} speak={`¡Hola ${save.name}!`} quiet />
        </div>
      </div>

      <div className="hub-col hub-col-right">
        <div className="hub-rocket-park">
          <motion.button
            className="hub-prop hub-rocket-btn"
            animate={{ y: [0, -12, 0], rotate: [8, 14, 8] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => {
              save.completeSecret('cometa-fugaz')
              if (!save.muted) sfx.collect()
              setComet(true)
            }}
            aria-label="Cohete"
          >
            <RocketArt />
          </motion.button>
        </div>
        <HubChip>10-11 Años</HubChip>
        <HubBtn className="hub-btn white" onClick={() => nav('/mundos/python')}>
          Aventuras de Código Python
        </HubBtn>
        <HubBtn className="hub-btn white" onClick={() => nav('/mundos/javascript')}>
          Desafío de Circuitos
        </HubBtn>
        <HubBtn className="hub-btn orange" onClick={goFirst}>
          🎮 Tu Primer Juego
        </HubBtn>
      </div>

      <motion.div
        className="hub-prop hub-puzzle"
        animate={{ rotate: [-8, 6, -8] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <button className="hub-puzzle-hit" onClick={() => setPuzzleOpen(true)} aria-label="Pieza de rompecabezas">
          <PuzzleArt />
        </button>
        {puzzleOpen || save.completedSecrets.includes('cristal-oculto') ? (
          <button
            className="hub-crystal"
            onClick={() => {
              save.completeSecret('cristal-oculto')
              if (!save.muted) sfx.success()
            }}
            aria-label="Cristal escondido"
          >
            <CrystalArt />
          </button>
        ) : null}
      </motion.div>

      <motion.div className="hub-prop hub-pad" animate={{ y: [0, -10, 0] }} transition={{ duration: 3.4, repeat: Infinity }}>
        <PadArt />
      </motion.div>

      <button
        className="hub-speaker"
        onClick={() => save.toggleMute()}
        aria-label={save.muted ? 'Activar sonido' : 'Silenciar'}
      >
        {save.muted ? '🔇' : '🔊'}
      </button>

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

      <AnimatePresence>
        {ufo ? (
          <motion.button
            className="ufo"
            initial={{ x: '-20vw', y: 30, opacity: 0 }}
            animate={{ x: '110vw', y: [30, 70, 20], opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 8.8, ease: 'easeInOut' }}
            onClick={() => nav('/secreto/ovni')}
            aria-label="Platillo secreto"
          >
            <UfoArt />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {comet ? (
          <motion.button
            className="comet"
            initial={{ x: '70vw', y: -30, opacity: 0 }}
            animate={{ x: '-20vw', y: 160, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.8, ease: 'linear' }}
            onAnimationComplete={() => setComet(false)}
            aria-label="Cometa"
          >
            <CometArt />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

function HubChip({ children }: { children: ReactNode }) {
  return <div className="hub-chip">{children}</div>
}

function HubBtn({ className, children, onClick }: { className: string; children: ReactNode; onClick: () => void }) {
  const muted = useSave((s) => s.muted)
  return (
    <motion.button
      className={className}
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.96, y: 0 }}
      onClick={() => {
        if (!muted) sfx.tap()
        onClick()
      }}
    >
      {children}
    </motion.button>
  )
}

function makeStars(count = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${Date.now()}-${i}-${Math.random()}`,
    left: `${6 + Math.random() * 88}%`,
    top: `${8 + Math.random() * 70}%`,
  }))
}
