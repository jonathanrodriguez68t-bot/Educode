import { motion } from 'framer-motion'

const letters = [
  { ch: 'E', color: '#ff5a7a' },
  { ch: 'D', color: '#ff9a3c' },
  { ch: 'U', color: '#ffd93d' },
  { ch: 'C', color: '#3ddc97' },
  { ch: 'O', color: '#4cc9f0', face: true },
  { ch: 'D', color: '#7b6cff' },
  { ch: 'E', color: '#ff5ad5' },
]

export function EducodeLogo({ onSecret }: { onSecret: () => void }) {
  return (
    <button className="welcome-brand" onClick={onSecret} aria-label="Bienvenido a EDUCODE">
      <span className="welcome-label">Bienvenido a</span>
      <span className="welcome-letters">
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter.ch}-${index}`}
            className={letter.face ? 'logo-letter logo-face' : 'logo-letter'}
            style={{ color: letter.color }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.12, ease: 'easeInOut' }}
          >
            {letter.face ? 'O' : letter.ch}
            {letter.face ? (
              <span className="logo-face-draw" aria-hidden="true">
                <i />
                <i />
                <b />
              </span>
            ) : null}
          </motion.span>
        ))}
      </span>
    </button>
  )
}
