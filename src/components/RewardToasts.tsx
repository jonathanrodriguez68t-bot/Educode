import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useSave } from '../store'

export function RewardToasts() {
  const toasts = useSave((s) => s.toasts)
  const dismissToast = useSave((s) => s.dismissToast)

  useEffect(() => {
    if (toasts.length === 0) return
    const first = toasts[0]
    if (!first) return
    const timer = window.setTimeout(() => dismissToast(first.id), 3200)
    return () => window.clearTimeout(timer)
  }, [toasts, dismissToast])

  return (
    <div className="toasts" aria-live="polite">
      <AnimatePresence>
        {toasts.slice(0, 3).map((toast) => (
          <motion.button
            key={toast.id}
            className="toast"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40 }}
            onClick={() => dismissToast(toast.id)}
          >
            <strong>
              {toast.glyph} {toast.title}
            </strong>
            <div>{toast.body}</div>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function Confetti({ show }: { show: boolean }) {
  if (!show) return null
  const bits = Array.from({ length: 24 }, (_, i) => i)
  const colors = ['#ff6b7d', '#ffc43d', '#3ddc97', '#4cc9f0', '#b388ff']
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((bit) => (
        <i
          key={bit}
          style={{
            left: `${4 + bit * 4}%`,
            background: colors[bit % colors.length],
            animationDelay: `${bit * 0.03}s`,
            transform: `rotate(${bit * 18}deg)`,
          }}
        />
      ))}
    </div>
  )
}
