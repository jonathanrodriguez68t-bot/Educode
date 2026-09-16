export type Reward = {
  xp?: number
  stars?: number
  badges?: string[]
  colors?: string[]
  banners?: string[]
  logos?: string[]
  decorations?: string[]
  frames?: string[]
}

export type Cosmetic = {
  id: string
  name: string
  hint: string
}

export type ColorCosmetic = Cosmetic & { value: string }
export type BannerCosmetic = Cosmetic & { className: string }
export type LogoCosmetic = Cosmetic & { glyph: string }
export type DecorationCosmetic = Cosmetic & { glyph: string }
export type FrameCosmetic = Cosmetic & { className: string }
export type Badge = Cosmetic & { glyph: string; story: string }

export type Rank = {
  id: string
  name: string
  minXp: number
  glyph: string
}

export type OrderLevel = {
  type: 'order'
  id: string
  title: string
  xp: number
  intro: string
  hint: string
  blocks: string[]
}

export type BugLevel = {
  type: 'bug'
  id: string
  title: string
  xp: number
  intro: string
  hint: string
  lines: { text: string; bug?: boolean; why?: string }[]
}

export type QuizLevel = {
  type: 'quiz'
  id: string
  title: string
  xp: number
  intro: string
  hint: string
  question: string
  code?: string
  options: string[]
  answer: number
  explain: string
}

export type HtmlLevel = {
  type: 'html'
  id: string
  title: string
  xp: number
  intro: string
  hint: string
  goal: string
  pieces: { id: string; kind: 'h1' | 'p' | 'img' | 'button' | 'ul'; text: string }[]
  solution: string[]
}

export type CssLevel = {
  type: 'css'
  id: string
  title: string
  xp: number
  intro: string
  hint: string
  target: { color: string; radius: string; size: string }
  colors: { label: string; value: string }[]
  radii: { label: string; value: string }[]
  sizes: { label: string; value: string }[]
}

export type MazeLevel = {
  type: 'maze'
  id: string
  title: string
  xp: number
  intro: string
  hint: string
  rows: number
  cols: number
  start: [number, number]
  goal: [number, number]
  walls: [number, number][]
  facing: 0 | 1 | 2 | 3
}

export type Level = OrderLevel | BugLevel | QuizLevel | HtmlLevel | CssLevel | MazeLevel

export type World = {
  id: string
  name: string
  language: string
  tagline: string
  accent: string
  glow: string
  glyph: string
  lesson: string
  levels: Level[]
}

export type SecretMission = {
  id: string
  title: string
  whisper: string
  reveal: string
  reward: Reward
}

export type Toast = {
  id: string
  title: string
  body: string
  glyph: string
}

export type Equipped = {
  color: string
  banner: string
  logo: string
  decorations: string[]
  frame: string
}

export type Unlocks = {
  badges: string[]
  colors: string[]
  banners: string[]
  logos: string[]
  decorations: string[]
  frames: string[]
}

export type Stats = {
  skyStars: number
  pixelPets: number
  logoTaps: number
  skyToggles: number
  ufoGames: number
}

export type SaveState = {
  name: string
  xp: number
  stars: number
  hasOnboarded: boolean
  muted: boolean
  completedLevels: string[]
  completedSecrets: string[]
  unlocks: Unlocks
  equipped: Equipped
  stats: Stats
}
