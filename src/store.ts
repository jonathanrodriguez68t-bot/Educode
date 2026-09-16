import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { badges, cosmeticName, rankFor, secrets, starterUnlocks, worldCompleteRewards, worlds } from './data'
import type { Equipped, Reward, SaveState, Toast, Unlocks } from './types'
import { uid, unique } from './utils'

type Store = SaveState & {
  toasts: Toast[]
  setName: (name: string) => void
  finishOnboarding: (name: string) => void
  toggleMute: () => void
  dismissToast: (id: string) => void
  completeLevel: (worldId: string, levelId: string, xp: number) => boolean
  completeSecret: (id: string) => boolean
  bumpSkyStar: () => void
  petPixel: () => void
  tapLogo: () => void
  toggleSky: () => void
  markUfoGame: () => void
  equip: (slot: keyof Equipped, id: string) => void
  toggleDecoration: (id: string) => void
  reset: () => void
}

const initialSave = (): SaveState => ({
  name: 'Explorador',
  xp: 0,
  stars: 0,
  hasOnboarded: false,
  muted: false,
  completedLevels: [],
  completedSecrets: [],
  unlocks: {
    badges: [...starterUnlocks.badges],
    colors: [...starterUnlocks.colors],
    banners: [...starterUnlocks.banners],
    logos: [...starterUnlocks.logos],
    decorations: [...starterUnlocks.decorations],
    frames: [...starterUnlocks.frames],
  },
  equipped: {
    color: 'aurora',
    banner: 'pradera',
    logo: '',
    decorations: [],
    frame: 'basico',
  },
  stats: {
    skyStars: 0,
    pixelPets: 0,
    logoTaps: 0,
    skyToggles: 0,
    ufoGames: 0,
  },
})

function mergeUnlocks(current: Unlocks, reward: Reward): { unlocks: Unlocks; news: Toast[] } {
  const news: Toast[] = []
  const unlocks: Unlocks = {
    badges: unique(current.badges, reward.badges),
    colors: unique(current.colors, reward.colors),
    banners: unique(current.banners, reward.banners),
    logos: unique(current.logos, reward.logos),
    decorations: unique(current.decorations, reward.decorations),
    frames: unique(current.frames, reward.frames),
  }

  const kinds = [
    ['badges', '¡Insignia nueva!', 'badges'],
    ['colors', '¡Color para tu perfil!', 'colors'],
    ['banners', '¡Banner desbloqueado!', 'banners'],
    ['logos', '¡Logo nuevo!', 'logos'],
    ['decorations', '¡Decoración nueva!', 'decorations'],
    ['frames', '¡Marco nuevo!', 'frames'],
  ] as const

  for (const [key, title, table] of kinds) {
    for (const id of reward[key] ?? []) {
      if (!current[key].includes(id)) {
        news.push({
          id: uid(key),
          title,
          body: cosmeticName(table, id),
          glyph: key === 'badges' ? (badges.find((badge) => badge.id === id)?.glyph ?? '🏅') : '🎁',
        })
      }
    }
  }

  return { unlocks, news }
}

function withMilestones(unlocks: Unlocks, xp: number, completedLevels: string[]): Reward {
  const extra: Reward = {}
  const add = (list: keyof Reward, id: string) => {
    if (list === 'xp' || list === 'stars') return
    const already = unlocks[list as keyof Unlocks]
    if (already.includes(id)) return
    extra[list] = unique(extra[list] ?? [], [id])
  }

  if (completedLevels.length >= 1) add('badges', 'primer-codigo')
  if (xp >= 700) add('logos', 'corona')

  const allDone = worlds.every((world) => world.levels.every((level) => completedLevels.includes(level.id)))
  if (allDone) {
    add('badges', 'campeon-total')
    add('colors', 'campeon')
    add('banners', 'campeon')
  }

  const badgeCount = unique(unlocks.badges, extra.badges ?? []).length
  if (badgeCount >= 8) {
    add('badges', 'coleccionista')
    add('decorations', 'trofeo')
  }

  return extra
}

export const useSave = create<Store>()(
  persist(
    (set, get) => ({
      ...initialSave(),
      toasts: [],
      setName: (name) => set({ name: name.trim().slice(0, 16) || 'Explorador' }),
      finishOnboarding: (name) =>
        set({
          name: name.trim().slice(0, 16) || 'Explorador',
          hasOnboarded: true,
        }),
      toggleMute: () => set({ muted: !get().muted }),
      dismissToast: (id) => set({ toasts: get().toasts.filter((toast) => toast.id !== id) }),
      completeLevel: (worldId, levelId, xp) => {
        const state = get()
        if (state.completedLevels.includes(levelId)) return false
        const completedLevels = unique(state.completedLevels, [levelId])
        let reward: Reward = { xp, stars: 2, badges: [] }
        const world = worlds.find((item) => item.id === worldId)
        const finishedWorld = world?.levels.every((level) => completedLevels.includes(level.id))
        if (finishedWorld && world) {
          const pack = worldCompleteRewards[world.id]
          if (pack) {
            reward = {
              ...reward,
              xp: (reward.xp ?? 0) + 50,
              stars: (reward.stars ?? 0) + 5,
              badges: unique(reward.badges ?? [], [pack.badge]),
              logos: pack.extra,
            }
          }
        }

        const merged = mergeUnlocks(state.unlocks, reward)
        const mile = withMilestones(merged.unlocks, state.xp + (reward.xp ?? 0), completedLevels)
        const finalMerge = mergeUnlocks(merged.unlocks, mile)
        const oldRank = rankFor(state.xp)
        const newXp = state.xp + (reward.xp ?? 0) + (mile.xp ?? 0)
        const newRank = rankFor(newXp)
        const toasts = [...merged.news, ...finalMerge.news]
        if (oldRank.id !== newRank.id) {
          toasts.push({
            id: uid('rank'),
            title: '¡Subiste de rango!',
            body: `${newRank.glyph} ${newRank.name}`,
            glyph: newRank.glyph,
          })
        }

        set({
          completedLevels,
          xp: newXp,
          stars: state.stars + (reward.stars ?? 0),
          unlocks: finalMerge.unlocks,
          toasts: [...state.toasts, ...toasts],
        })
        return true
      },
      completeSecret: (id) => {
        const state = get()
        if (state.completedSecrets.includes(id)) return false
        const mission = secrets.find((item) => item.id === id)
        if (!mission) return false
        const merged = mergeUnlocks(state.unlocks, mission.reward)
        const newXp = state.xp + (mission.reward.xp ?? 0)
        const mile = withMilestones(merged.unlocks, newXp, state.completedLevels)
        const finalMerge = mergeUnlocks(merged.unlocks, mile)
        const oldRank = rankFor(state.xp)
        const totalXp = newXp + (mile.xp ?? 0)
        const newRank = rankFor(totalXp)
        const toasts: Toast[] = [
          {
            id: uid('secret'),
            title: '¡Misión secreta!',
            body: mission.title,
            glyph: '🤫',
          },
          ...merged.news,
          ...finalMerge.news,
        ]
        if (oldRank.id !== newRank.id) {
          toasts.push({
            id: uid('rank'),
            title: '¡Subiste de rango!',
            body: `${newRank.glyph} ${newRank.name}`,
            glyph: newRank.glyph,
          })
        }
        set({
          completedSecrets: unique(state.completedSecrets, [id]),
          xp: totalXp,
          stars: state.stars + (mission.reward.stars ?? 0),
          unlocks: finalMerge.unlocks,
          toasts: [...state.toasts, ...toasts],
        })
        return true
      },
      bumpSkyStar: () => {
        const stats = { ...get().stats, skyStars: get().stats.skyStars + 1 }
        set({ stats, stars: get().stars + 1 })
        if (stats.skyStars >= 12) get().completeSecret('recolector')
      },
      petPixel: () => {
        const stats = { ...get().stats, pixelPets: get().stats.pixelPets + 1 }
        set({ stats })
        if (stats.pixelPets >= 5) get().completeSecret('amistad-pixel')
      },
      tapLogo: () => {
        const stats = { ...get().stats, logoTaps: get().stats.logoTaps + 1 }
        set({ stats })
        if (stats.logoTaps >= 8) get().completeSecret('toque-magico')
      },
      toggleSky: () => {
        const stats = { ...get().stats, skyToggles: get().stats.skyToggles + 1 }
        set({ stats })
        if (stats.skyToggles >= 3) get().completeSecret('guardian-cielo')
      },
      markUfoGame: () => set({ stats: { ...get().stats, ufoGames: get().stats.ufoGames + 1 } }),
      equip: (slot, id) => {
        if (slot === 'decorations') return
        set({ equipped: { ...get().equipped, [slot]: id } })
      },
      toggleDecoration: (id) => {
        const equipped = get().equipped.decorations
        const decorations = equipped.includes(id) ? equipped.filter((item) => item !== id) : [...equipped, id].slice(0, 3)
        set({ equipped: { ...get().equipped, decorations } })
      },
      reset: () => set({ ...initialSave(), toasts: [] }),
    }),
    {
      name: 'educode-save-v1',
      partialize: (state) => ({
        name: state.name,
        xp: state.xp,
        stars: state.stars,
        hasOnboarded: state.hasOnboarded,
        muted: state.muted,
        completedLevels: state.completedLevels,
        completedSecrets: state.completedSecrets,
        unlocks: state.unlocks,
        equipped: state.equipped,
        stats: state.stats,
      }),
    },
  ),
)
