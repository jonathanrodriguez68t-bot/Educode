import { useMemo, useState } from 'react'
import type { BugLevel, CssLevel, HtmlLevel, MazeLevel, OrderLevel, QuizLevel } from '../types'
import { shuffle } from '../utils'

type Done = { onWin: () => void; onFail?: () => void }

export function OrderGame({ level, onWin }: { level: OrderLevel } & Done) {
  const solution = level.blocks.join('\n')
  const [items, setItems] = useState(() => {
    let mixed = shuffle(level.blocks)
    if (mixed.join('\n') === solution) mixed = [...mixed].reverse()
    return mixed
  })
  const [selected, setSelected] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  function tap(index: number) {
    if (selected === null) {
      setSelected(index)
      return
    }
    const next = [...items]
    const a = next[selected]
    next[selected] = next[index] as string
    next[index] = a as string
    setItems(next)
    setSelected(null)
  }

  return (
    <div>
      <p>{level.intro}</p>
      {items.map((item, index) => (
        <button key={`${item}-${index}`} className={selected === index ? 'block selected' : 'block'} onClick={() => tap(index)}>
          {index + 1}. {item}
        </button>
      ))}
      <p className="hint">Toca un bloque y luego otro para intercambiarlos.</p>
      <div className="row">
        <button
          className="btn primary"
          onClick={() => {
            if (items.join('\n') === solution) onWin()
            else setMessage(`Casi... ${level.hint}`)
          }}
        >
          Revisar orden
        </button>
      </div>
      {message ? <p>{message}</p> : null}
    </div>
  )
}

export function BugGame({ level, onWin }: { level: BugLevel } & Done) {
  const [picked, setPicked] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  return (
    <div>
      <p>{level.intro}</p>
      <div className="code-frame">
        {level.lines.map((line, index) => {
          const status = picked === index ? (line.bug ? 'code-line bug-ok' : 'code-line bug-bad') : 'code-line'
          return (
            <button
              key={line.text}
              className={status}
              onClick={() => {
                setPicked(index)
                if (line.bug) {
                  setMessage(line.why ?? '¡Ese era el error!')
                  window.setTimeout(onWin, 650)
                } else {
                  setMessage('Esa línea está bien. Sigue buscando el error.')
                }
              }}
            >
              {index + 1} {line.text}
            </button>
          )
        })}
      </div>
      <p className="hint">{level.hint}</p>
      {message ? <p>{message}</p> : null}
    </div>
  )
}

export function QuizGame({ level, onWin }: { level: QuizLevel } & Done) {
  const [picked, setPicked] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  return (
    <div>
      <p>{level.intro}</p>
      <h3>{level.question}</h3>
      {level.code ? <pre className="code-frame">{level.code}</pre> : null}
      {level.options.map((option, index) => (
        <button
          key={option}
          className={picked === index ? 'choice selected' : 'choice'}
          onClick={() => {
            setPicked(index)
            if (index === level.answer) {
              setMessage(level.explain)
              window.setTimeout(onWin, 700)
            } else {
              setMessage(`Esa no es. ${level.hint}`)
            }
          }}
        >
          {option}
        </button>
      ))}
      {message ? <p>{message}</p> : null}
    </div>
  )
}

export function HtmlGame({ level, onWin }: { level: HtmlLevel } & Done) {
  const [placed, setPlaced] = useState<string[]>([])
  const [message, setMessage] = useState('')

  function add(id: string) {
    if (placed.includes(id)) return
    setPlaced([...placed, id])
  }

  const preview = placed
    .map((id) => level.pieces.find((piece) => piece.id === id))
    .filter((piece) => piece != null)

  return (
    <div>
      <p>{level.intro}</p>
      <p>
        <strong>Meta:</strong> {level.goal}
      </p>
      <div className="html-preview">
        {preview.length === 0 ? <span className="hint">Aquí se arma tu página.</span> : null}
        {preview.map((piece) => {
          if (piece.kind === 'h1') return <h1 key={piece.id}>{piece.text}</h1>
          if (piece.kind === 'p') return <p key={piece.id}>{piece.text}</p>
          if (piece.kind === 'button') return <button key={piece.id} className="btn">{piece.text}</button>
          if (piece.kind === 'ul') return <ul key={piece.id}><li>{piece.text}</li></ul>
          return <div key={piece.id}>🖼️ {piece.text}</div>
        })}
      </div>
      <div className="row">
        {level.pieces.map((piece) => (
          <button key={piece.id} className="btn" disabled={placed.includes(piece.id)} onClick={() => add(piece.id)}>
            {piece.kind}: {piece.text}
          </button>
        ))}
        <button className="btn" onClick={() => setPlaced([])}>
          Limpiar
        </button>
        <button
          className="btn primary"
          onClick={() => {
            if (placed.join() === level.solution.join()) onWin()
            else setMessage(`Todavía no. ${level.hint}`)
          }}
        >
          Publicar página
        </button>
      </div>
      {message ? <p>{message}</p> : null}
    </div>
  )
}

export function CssGame({ level, onWin }: { level: CssLevel } & Done) {
  const [color, setColor] = useState(level.colors[0]?.value ?? '#ff6b7d')
  const [radius, setRadius] = useState(level.radii[0]?.value ?? '12px')
  const [size, setSize] = useState(level.sizes[0]?.value ?? '70px')
  const [message, setMessage] = useState('')

  return (
    <div>
      <p>{level.intro}</p>
      <div className="row" style={{ justifyContent: 'center' }}>
        <div>
          <div className="hint">Fantasma</div>
          <div
            className="ghost-shape"
            style={{
              ['--size' as string]: level.target.size,
              ['--radius' as string]: level.target.radius,
              background: level.target.color,
              opacity: 0.35,
            }}
          />
        </div>
        <div>
          <div className="hint">Tu figura</div>
          <div className="live-shape" style={{ background: color, borderRadius: radius, width: size, height: size }} />
        </div>
      </div>
      <div className="row">
        {level.colors.map((item) => (
          <button key={item.value} className={color === item.value ? 'chip on' : 'chip'} onClick={() => setColor(item.value)}>
            color: {item.label}
          </button>
        ))}
        {level.radii.map((item) => (
          <button key={item.value} className={radius === item.value ? 'chip on' : 'chip'} onClick={() => setRadius(item.value)}>
            radio: {item.label}
          </button>
        ))}
        {level.sizes.map((item) => (
          <button key={item.value} className={size === item.value ? 'chip on' : 'chip'} onClick={() => setSize(item.value)}>
            tamaño: {item.label}
          </button>
        ))}
      </div>
      <button
        className="btn primary"
        onClick={() => {
          if (color === level.target.color && radius === level.target.radius && size === level.target.size) onWin()
          else setMessage(`Aún no coincide. ${level.hint}`)
        }}
      >
        Comparar
      </button>
      {message ? <p>{message}</p> : null}
    </div>
  )
}

const deltas: [number, number][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

export function MazeGame({ level, onWin }: { level: MazeLevel } & Done) {
  const [program, setProgram] = useState<string[]>([])
  const [runner, setRunner] = useState({ row: level.start[0], col: level.start[1], facing: level.facing, crashed: false, won: false })
  const [message, setMessage] = useState('Arma los pasos y pulsa Play.')
  const walls = useMemo(() => new Set(level.walls.map(([r, c]) => `${r},${c}`)), [level.walls])

  function play() {
    let row = level.start[0]
    let col = level.start[1]
    let facing = level.facing
    let crashed = false
    for (const command of program) {
      if (command === 'left') facing = ((facing + 3) % 4) as 0 | 1 | 2 | 3
      if (command === 'right') facing = ((facing + 1) % 4) as 0 | 1 | 2 | 3
      if (command === 'go') {
        const delta = deltas[facing] ?? deltas[0]
        const nextRow = row + delta[0]
        const nextCol = col + delta[1]
        const outside = nextRow < 0 || nextCol < 0 || nextRow >= level.rows || nextCol >= level.cols
        if (outside || walls.has(`${nextRow},${nextCol}`)) {
          crashed = true
          break
        }
        row = nextRow
        col = nextCol
      }
    }
    const won = !crashed && row === level.goal[0] && col === level.goal[1]
    setRunner({ row, col, facing, crashed, won })
    if (won) {
      setMessage('¡Llegaste al cristal!')
      window.setTimeout(onWin, 500)
    } else if (crashed) {
      setMessage('¡Auch! Había un muro o el borde. Cambia los pasos.')
    } else {
      setMessage('Aún no llegas. Mira hacia dónde apunta el robot.')
    }
  }

  return (
    <div>
      <p>{level.intro}</p>
      <div className="maze" style={{ gridTemplateColumns: `repeat(${level.cols}, 1fr)` }}>
        {Array.from({ length: level.rows * level.cols }, (_, i) => {
          const row = Math.floor(i / level.cols)
          const col = i % level.cols
          const wall = walls.has(`${row},${col}`)
          const goal = row === level.goal[0] && col === level.goal[1]
          const here = row === runner.row && col === runner.col
          const arrows = ['▲', '▶', '▼', '◀']
          return (
            <div key={i} className={wall ? 'cell wall' : goal ? 'cell goal' : 'cell'}>
              {here ? arrows[runner.facing] : goal ? '💎' : ''}
            </div>
          )
        })}
      </div>
      <div className="row">
        <button className="btn" onClick={() => setProgram([...program, 'go'])}>
          Avanzar
        </button>
        <button className="btn" onClick={() => setProgram([...program, 'left'])}>
          Girar ↺
        </button>
        <button className="btn" onClick={() => setProgram([...program, 'right'])}>
          Girar ↻
        </button>
        <button className="btn" onClick={() => setProgram(program.slice(0, -1))}>
          Borrar último
        </button>
        <button className="btn" onClick={() => setProgram([])}>
          Vaciar
        </button>
        <button className="btn primary" onClick={play}>
          Play
        </button>
      </div>
      <p className="hint">
        Programa: {program.length === 0 ? 'vacío' : program.map((step) => (step === 'go' ? 'avanzar' : step === 'left' ? '↺' : '↻')).join(' · ')}
      </p>
      <p>{message}</p>
    </div>
  )
}
