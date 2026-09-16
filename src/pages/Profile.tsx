import { useState } from 'react'
import { banners, badges, colors, decorations, frames, logos, nextRank, rankFor } from '../data'
import { useSave } from '../store'

const tabs = ['colores', 'banners', 'logos', 'marcos', 'adornos', 'insignias'] as const

export function Profile() {
  const save = useSave()
  const rank = rankFor(save.xp)
  const upcoming = nextRank(save.xp)
  const [tab, setTab] = useState<(typeof tabs)[number]>('colores')
  const [name, setName] = useState(save.name)
  const color = colors.find((item) => item.id === save.equipped.color)?.value ?? '#3ddc97'
  const banner = banners.find((item) => item.id === save.equipped.banner)?.className ?? 'banner-pradera'
  const frame = frames.find((item) => item.id === save.equipped.frame)?.className ?? 'frame-basico'
  const logo = logos.find((item) => item.id === save.equipped.logo)

  return (
    <section>
      <article className="panel profile-hero">
        <div className={`banner ${banner}`} />
        <div className="avatar-stage">
          <div className={`avatar ${frame}`} style={{ background: color }}>
            {logo?.glyph ?? '🤖'}
            {save.equipped.decorations.map((id, index) => {
              const deco = decorations.find((item) => item.id === id)
              return (
                <span key={id} className="deco-float" style={{ top: index * 18, right: -10 + index * 12 }}>
                  {deco?.glyph}
                </span>
              )
            })}
          </div>
          <div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                save.setName(name)
              }}
            >
              <input className="name-input" value={name} maxLength={16} onChange={(e) => setName(e.target.value)} />
            </form>
            <h1 className="title" style={{ fontSize: 36, marginTop: 8 }}>
              {rank.glyph} {rank.name}
            </h1>
            <p>
              {save.xp} XP · {save.stars} estrellas · {save.unlocks.badges.length} insignias
            </p>
            {upcoming ? (
              <div>
                <div className="progress">
                  <span style={{ width: `${Math.min(100, ((save.xp - rank.minXp) / (upcoming.minXp - rank.minXp)) * 100)}%` }} />
                </div>
                <p className="hint">
                  Siguiente rango: {upcoming.name} ({upcoming.minXp} XP)
                </p>
              </div>
            ) : (
              <p>Eres el Gran Brujo del Código. El parque entero te conoce.</p>
            )}
          </div>
        </div>
      </article>

      <div className="tabs">
        {tabs.map((item) => (
          <button key={item} className={tab === item ? 'btn sun' : 'btn'} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>

      {tab === 'colores' ? (
        <Grid
          items={colors.map((item) => ({
            id: item.id,
            title: item.name,
            glyph: '🎨',
            hint: item.hint,
            owned: save.unlocks.colors.includes(item.id),
            on: save.equipped.color === item.id,
            use: () => save.equip('color', item.id),
          }))}
        />
      ) : null}
      {tab === 'banners' ? (
        <Grid
          items={banners.map((item) => ({
            id: item.id,
            title: item.name,
            glyph: '🏳️',
            hint: item.hint,
            owned: save.unlocks.banners.includes(item.id),
            on: save.equipped.banner === item.id,
            use: () => save.equip('banner', item.id),
          }))}
        />
      ) : null}
      {tab === 'logos' ? (
        <Grid
          items={logos.map((item) => ({
            id: item.id,
            title: item.name,
            glyph: item.glyph,
            hint: item.hint,
            owned: save.unlocks.logos.includes(item.id),
            on: save.equipped.logo === item.id,
            use: () => save.equip('logo', item.id),
          }))}
        />
      ) : null}
      {tab === 'marcos' ? (
        <Grid
          items={frames.map((item) => ({
            id: item.id,
            title: item.name,
            glyph: '🖼️',
            hint: item.hint,
            owned: save.unlocks.frames.includes(item.id),
            on: save.equipped.frame === item.id,
            use: () => save.equip('frame', item.id),
          }))}
        />
      ) : null}
      {tab === 'adornos' ? (
        <Grid
          items={decorations.map((item) => ({
            id: item.id,
            title: item.name,
            glyph: item.glyph,
            hint: item.hint,
            owned: save.unlocks.decorations.includes(item.id),
            on: save.equipped.decorations.includes(item.id),
            use: () => save.toggleDecoration(item.id),
          }))}
        />
      ) : null}
      {tab === 'insignias' ? (
        <Grid
          items={badges.map((item) => ({
            id: item.id,
            title: item.name,
            glyph: item.glyph,
            hint: save.unlocks.badges.includes(item.id) ? item.story : item.hint,
            owned: save.unlocks.badges.includes(item.id),
            on: false,
            use: () => undefined,
          }))}
        />
      ) : null}

      <p className="hint" style={{ marginTop: 24 }}>
        Las misiones secretas desbloquean colores, logos, banners y adornos. Si quieres empezar de cero, borra tu aventura.
      </p>
      <button
        className="btn warn"
        onClick={() => {
          if (window.confirm('¿Borrar todo el progreso de este navegador?')) save.reset()
        }}
      >
        Reiniciar aventura
      </button>
    </section>
  )
}

function Grid({
  items,
}: {
  items: { id: string; title: string; glyph: string; hint: string; owned: boolean; on: boolean; use: () => void }[]
}) {
  return (
    <div className="inventory">
      {items.map((item) => (
        <button key={item.id} className={item.owned ? 'inventory-card' : 'inventory-card locked'} onClick={() => item.owned && item.use()}>
          <div style={{ fontSize: 28 }}>{item.owned ? item.glyph : '🔒'}</div>
          <strong>{item.title}</strong>
          <p className="hint">{item.owned ? (item.on ? 'Equipado' : item.hint) : item.hint}</p>
        </button>
      ))}
    </div>
  )
}
