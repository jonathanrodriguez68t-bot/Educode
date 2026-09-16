import type {
  Badge,
  BannerCosmetic,
  ColorCosmetic,
  DecorationCosmetic,
  FrameCosmetic,
  LogoCosmetic,
  Rank,
  SecretMission,
  World,
} from './types'

export const ranks: Rank[] = [
  { id: 'semilla', name: 'Semilla de Código', minXp: 0, glyph: '🌱' },
  { id: 'explorador', name: 'Explorador', minXp: 80, glyph: '🧭' },
  { id: 'cadete', name: 'Cadete Código', minXp: 200, glyph: '🚀' },
  { id: 'piloto', name: 'Piloto Pixel', minXp: 400, glyph: '🛸' },
  { id: 'estrella', name: 'Estrella Syntax', minXp: 700, glyph: '⭐' },
  { id: 'maestro', name: 'Maestro Algoritmo', minXp: 1100, glyph: '🧠' },
  { id: 'brujo', name: 'Gran Brujo del Código', minXp: 1600, glyph: '🧙' },
]

export const colors: ColorCosmetic[] = [
  { id: 'aurora', name: 'Aurora', value: '#3ddc97', hint: 'Color inicial' },
  { id: 'coral', name: 'Coral juguetón', value: '#ff6b7d', hint: 'Color inicial' },
  { id: 'cielo', name: 'Cielo limón', value: '#4cc9f0', hint: 'Color inicial' },
  { id: 'nebulosa', name: 'Nebulosa', value: '#b388ff', hint: 'Misión del platillo volador' },
  { id: 'sol', name: 'Oro solar', value: '#ffc43d', hint: 'Recoge estrellas del cielo' },
  { id: 'menta', name: 'Menta mágica', value: '#7cffd0', hint: 'Cristal escondido' },
  { id: 'noche', name: 'Medianoche', value: '#6ea8ff', hint: 'Cambia el cielo varias veces' },
  { id: 'cometa', name: 'Llama de cometa', value: '#ff8a4c', hint: 'Toca el cometa' },
  { id: 'campeon', name: 'Arcoíris campeón', value: '#ff5ad5', hint: 'Termina todos los mundos' },
]

export const banners: BannerCosmetic[] = [
  { id: 'pradera', name: 'Pradera', className: 'banner-pradera', hint: 'Banner inicial' },
  { id: 'galaxia', name: 'Galaxia secreta', className: 'banner-galaxia', hint: 'Completa el juego del OVNI' },
  { id: 'arcoiris', name: 'Arcoíris oculto', className: 'banner-arcoiris', hint: 'Toca el logo de EDUCODE' },
  { id: 'campeon', name: 'Banner de campeón', className: 'banner-campeon', hint: 'Completa todos los mundos' },
]

export const logos: LogoCosmetic[] = [
  { id: 'pixel', name: 'Logo Pixel', glyph: '🤖', hint: 'Acaricia a Pixel' },
  { id: 'cristal', name: 'Logo cristal', glyph: '💎', hint: 'Encuentra el cristal' },
  { id: 'cohete', name: 'Logo cohete', glyph: '🚀', hint: 'Termina un mundo entero' },
  { id: 'corona', name: 'Logo corona', glyph: '👑', hint: 'Llega al rango Estrella Syntax' },
]

export const decorations: DecorationCosmetic[] = [
  { id: 'corazon', name: 'Corazones', glyph: '💕', hint: 'Acaricia a Pixel' },
  { id: 'estela', name: 'Estela de estrellas', glyph: '✨', hint: 'Recoge estrellas del cielo' },
  { id: 'chispas', name: 'Chispas mágicas', glyph: '🌟', hint: 'Toca el logo muchas veces' },
  { id: 'portal', name: 'Mini portal', glyph: '🌀', hint: 'Encuentra el portal diminuto' },
  { id: 'fuego', name: 'Fuego de cometa', glyph: '🔥', hint: 'Toca el cometa' },
  { id: 'trofeo', name: 'Trofeo flotante', glyph: '🏆', hint: 'Gana 8 insignias' },
]

export const frames: FrameCosmetic[] = [
  { id: 'basico', name: 'Marco suave', className: 'frame-basico', hint: 'Marco inicial' },
  { id: 'lunar', name: 'Marco lunar', className: 'frame-lunar', hint: 'Cambia el cielo día y noche' },
  { id: 'pixelado', name: 'Marco pixel', className: 'frame-pixel', hint: 'Completa el Taller de Bloques' },
]

export const badges: Badge[] = [
  { id: 'primer-codigo', name: 'Primer código', glyph: '🥇', hint: 'Termina tu primer juego', story: 'Escribiste tu primera idea en código.' },
  { id: 'python', name: 'Domador Python', glyph: '🐍', hint: 'Completa Planeta Python', story: 'Hiciste amistad con las serpientes del código.' },
  { id: 'javascript', name: 'Chispa JavaScript', glyph: '⚡', hint: 'Completa Jungla JavaScript', story: 'Hiciste que las cosas reaccionaran.' },
  { id: 'html', name: 'Arquitecto HTML', glyph: '🏰', hint: 'Completa Castillo HTML', story: 'Construiste páginas como castillos.' },
  { id: 'css', name: 'Pintor CSS', glyph: '🎨', hint: 'Completa Océano CSS', story: 'Le diste color y forma al mundo.' },
  { id: 'bloques', name: 'Pensador de bloques', glyph: '🧩', hint: 'Completa el Taller de Bloques', story: 'Aprendiste a pensar paso a paso.' },
  { id: 'piloto-estelar', name: 'Piloto estelar', glyph: '🛸', hint: 'Gana el juego secreto del OVNI', story: 'Alcanzaste un platillo y volaste con él.' },
  { id: 'viajero', name: 'Viajero del portal', glyph: '🌀', hint: 'Completa el mini universo oculto', story: 'Encontraste un atajo entre estrellas.' },
  { id: 'coleccionista', name: 'Coleccionista', glyph: '🎒', hint: 'Consigue 8 insignias', story: 'Tu mochila brilla con recuerdos.' },
  { id: 'campeon-total', name: 'Campeón EDUCODE', glyph: '🏅', hint: 'Completa todos los mundos', story: 'Recorriste cada isla del parque.' },
]

export const secrets: SecretMission[] = [
  {
    id: 'cazador-ovni',
    title: 'El platillo curioso',
    whisper: 'A veces el cielo no está tan vacío como parece.',
    reveal: 'Tocaste el platillo volador y ganaste su juego secreto.',
    reward: { xp: 120, stars: 8, badges: ['piloto-estelar'], colors: ['nebulosa'], banners: ['galaxia'] },
  },
  {
    id: 'amistad-pixel',
    title: 'Amigo de Pixel',
    whisper: 'A un robot también le gusta que lo saluden.',
    reveal: 'Acariciaste a Pixel 5 veces.',
    reward: { xp: 40, stars: 3, logos: ['pixel'], decorations: ['corazon'] },
  },
  {
    id: 'recolector',
    title: 'Lluvia de estrellas',
    whisper: 'Si algo parpadea, quizá quiera jugar contigo.',
    reveal: 'Recogiste 12 estrellas en el inicio.',
    reward: { xp: 50, stars: 4, colors: ['sol'], decorations: ['estela'] },
  },
  {
    id: 'toque-magico',
    title: 'El nombre encantado',
    whisper: 'El título de la página guarda un secreto.',
    reveal: 'Tocaste el logo EDUCODE 8 veces.',
    reward: { xp: 45, stars: 3, banners: ['arcoiris'], decorations: ['chispas'] },
  },
  {
    id: 'guardian-cielo',
    title: 'Guardián del cielo',
    whisper: 'El sol y la luna se turnan si sabes pedirles el cambio.',
    reveal: 'Cambiaste el cielo 3 veces.',
    reward: { xp: 45, stars: 3, colors: ['noche'], frames: ['lunar'] },
  },
  {
    id: 'cristal-oculto',
    title: 'Cristal entre nubes',
    whisper: 'Una nube gorda esconde algo que brilla.',
    reveal: 'Encontraste el cristal escondido.',
    reward: { xp: 55, stars: 4, logos: ['cristal'], colors: ['menta'] },
  },
  {
    id: 'portal-minusculo',
    title: 'Portal diminuto',
    whisper: 'En una esquina casi invisible hay un atajo.',
    reveal: 'Entraste al portal secreto y alineaste las estrellas.',
    reward: { xp: 90, stars: 6, badges: ['viajero'], decorations: ['portal'] },
  },
  {
    id: 'cometa-fugaz',
    title: 'Deseo de cometa',
    whisper: 'Si ves una raya de fuego, pídele un deseo… o tócala.',
    reveal: 'Alcanzaste un cometa fugaz.',
    reward: { xp: 40, stars: 3, colors: ['cometa'], decorations: ['fuego'] },
  },
]

export const worlds: World[] = [
  {
    id: 'python',
    name: 'Planeta Python',
    language: 'Python',
    tagline: 'Habla con la serpiente espacial',
    accent: '#3ddc97',
    glow: 'rgba(61, 220, 151, 0.45)',
    glyph: '🐍',
    lesson: 'Python sirve para dar órdenes claras a la computadora, una debajo de otra.',
    levels: [
      {
        type: 'order',
        id: 'py-1',
        title: 'Primer saludo',
        xp: 30,
        intro: 'En Python, cada línea es un paso. Pon los pasos en el orden correcto.',
        hint: 'Primero el comentario, luego los dos saludos.',
        blocks: ['# Un saludo', 'print("Hola, mundo")', 'print("¡A programar!")'],
      },
      {
        type: 'quiz',
        id: 'py-2',
        title: '¿Qué hace print?',
        xp: 25,
        intro: 'print es como la voz de Python: muestra un mensaje en la pantalla.',
        hint: 'Piensa en un megáfono.',
        question: '¿Qué hace print("Hola")?',
        code: 'print("Hola")',
        options: ['Borra el texto', 'Muestra la palabra Hola', 'Cierra el juego', 'Cambia el color'],
        answer: 1,
        explain: 'print muestra en pantalla lo que va entre comillas.',
      },
      {
        type: 'order',
        id: 'py-3',
        title: 'Cajas con nombre',
        xp: 35,
        intro: 'Una variable es una cajita con nombre. Primero guardas, después usas.',
        hint: 'Guarda el nombre, guarda la edad y luego imprímelo.',
        blocks: ['nombre = "Luna"', 'edad = 10', 'print(nombre)'],
      },
      {
        type: 'bug',
        id: 'py-4',
        title: 'Paréntesis perdido',
        xp: 35,
        intro: 'Los bugs son errores. Busca la línea que Python no puede leer.',
        hint: 'A print le gustan los paréntesis de abrir y cerrar.',
        lines: [
          { text: 'nombre = "Leo"' },
          { text: 'print(nombre', bug: true, why: 'Falta el paréntesis de cierre ).' },
          { text: 'print("Listo")' },
        ],
      },
      {
        type: 'quiz',
        id: 'py-5',
        title: 'Si esto, entonces aquello',
        xp: 40,
        intro: 'Un if pregunta algo. Si la respuesta es sí, hace un camino.',
        hint: '10 es mayor que 8.',
        question: 'Si edad vale 10, ¿qué se imprime?',
        code: 'edad = 10\nif edad > 8:\n    print("Puedes jugar")',
        options: ['Nada', 'Puedes jugar', 'Error', '8'],
        answer: 1,
        explain: 'Como 10 > 8 es verdadero, Python entra al if y muestra el mensaje.',
      },
    ],
  },
  {
    id: 'javascript',
    name: 'Jungla JavaScript',
    language: 'JavaScript',
    tagline: 'Haz que la página cobre vida',
    accent: '#ffc43d',
    glow: 'rgba(255, 196, 61, 0.42)',
    glyph: '⚡',
    lesson: 'JavaScript es el lenguaje que usa la web para reaccionar cuando tocas, escribes o juegas.',
    levels: [
      {
        type: 'order',
        id: 'js-1',
        title: 'Hablar en la consola',
        xp: 30,
        intro: 'console.log es el print de la selva JavaScript.',
        hint: 'Declara el mensaje y luego muéstralo.',
        blocks: ['const mensaje = "¡Hola jungla!"', 'console.log(mensaje)'],
      },
      {
        type: 'bug',
        id: 'js-2',
        title: 'Nombre imposible',
        xp: 35,
        intro: 'Los nombres de las variables no pueden empezar con un número.',
        hint: 'Busca un nombre que empiece mal.',
        lines: [
          { text: 'let puntos = 0' },
          { text: 'let 1vida = 3', bug: true, why: 'Una variable no puede empezar con número.' },
          { text: 'puntos = puntos + 1' },
        ],
      },
      {
        type: 'quiz',
        id: 'js-3',
        title: 'Máquina de funciones',
        xp: 35,
        intro: 'Una función es una receta que puedes usar muchas veces.',
        hint: 'function saluda() { ... }',
        question: '¿Qué es una función?',
        options: [
          'Un color de la página',
          'Una receta de código que se puede repetir',
          'Un error elegante',
          'Un tipo de imagen',
        ],
        answer: 1,
        explain: 'Las funciones empaquetan pasos para reutilizarlos.',
      },
      {
        type: 'order',
        id: 'js-4',
        title: 'Crear y llamar',
        xp: 40,
        intro: 'Primero se crea la función y después se llama con paréntesis.',
        hint: 'La llamada va al final.',
        blocks: ['function saltar() {', '  console.log("Boing")', '}', 'saltar()'],
      },
    ],
  },
  {
    id: 'html',
    name: 'Castillo HTML',
    language: 'HTML',
    tagline: 'Construye la estructura de una página',
    accent: '#ff8a4c',
    glow: 'rgba(255, 138, 76, 0.4)',
    glyph: '🏰',
    lesson: 'HTML son las piezas de una página: títulos, párrafos, imágenes y botones.',
    levels: [
      {
        type: 'quiz',
        id: 'html-1',
        title: '¿Qué es HTML?',
        xp: 25,
        intro: 'HTML no calcula como Python. Organiza el contenido.',
        hint: 'Piensa en ladrillos, no en matemáticas.',
        question: 'HTML sirve para...',
        options: [
          'Pintar exactamente los colores',
          'Estructurar el contenido de una página',
          'Guardar fotos en la luna',
          'Hacer sonar un tambor',
        ],
        answer: 1,
        explain: 'HTML arma el esqueleto: qué es un título, qué es un párrafo, qué es un botón.',
      },
      {
        type: 'html',
        id: 'html-2',
        title: 'Cartel del gato',
        xp: 40,
        intro: 'Arma una mini página: primero el título, luego el párrafo.',
        hint: 'El h1 es el letrero grande. El p es el texto normal.',
        goal: 'Un título que diga “Mi gato” y debajo un párrafo.',
        pieces: [
          { id: 'h1', kind: 'h1', text: 'Mi gato' },
          { id: 'p', kind: 'p', text: 'Le gusta saltar.' },
          { id: 'btn', kind: 'button', text: 'Borrar todo' },
        ],
        solution: ['h1', 'p'],
      },
      {
        type: 'bug',
        id: 'html-3',
        title: 'Etiqueta abierta',
        xp: 35,
        intro: 'Las etiquetas HTML casi siempre se abren y se cierran.',
        hint: 'Busca un h1 que nunca se cierra.',
        lines: [
          { text: '<h1>Bienvenida</h1>' },
          { text: '<p>Hoy construimos castillos.</p>' },
          { text: '<h1>Torre norte', bug: true, why: 'Falta </h1> para cerrar el título.' },
        ],
      },
      {
        type: 'html',
        id: 'html-4',
        title: 'Botón del reino',
        xp: 40,
        intro: 'Ahora añade un botón debajo del título.',
        hint: 'Título primero, botón después. La lista no hace falta.',
        goal: 'Título “Misión” y un botón “¡Entrar!”.',
        pieces: [
          { id: 'h1', kind: 'h1', text: 'Misión' },
          { id: 'button', kind: 'button', text: '¡Entrar!' },
          { id: 'ul', kind: 'ul', text: 'manzana, pera' },
          { id: 'img', kind: 'img', text: 'dragón.png' },
        ],
        solution: ['h1', 'button'],
      },
    ],
  },
  {
    id: 'css',
    name: 'Océano CSS',
    language: 'CSS',
    tagline: 'Pinta y da forma a todo',
    accent: '#6ea8ff',
    glow: 'rgba(110, 168, 255, 0.42)',
    glyph: '🌊',
    lesson: 'CSS decide colores, tamaños y formas. Es el vestuario de la página.',
    levels: [
      {
        type: 'quiz',
        id: 'css-1',
        title: 'El pincel de la web',
        xp: 25,
        intro: 'Si HTML es el cuerpo, CSS es la ropa.',
        hint: 'Color, tamaño, redondez...',
        question: '¿Para qué sirve CSS?',
        options: [
          'Para crear cuentas de usuario',
          'Para cambiar el estilo visual',
          'Para apagar la computadora',
          'Para traducir al español',
        ],
        answer: 1,
        explain: 'CSS cambia cómo se ve: color, tamaño, bordes y posición.',
      },
      {
        type: 'css',
        id: 'css-2',
        title: 'Circulo coral',
        xp: 40,
        intro: 'Iguala la figura fantasma eligiendo color, redondez y tamaño.',
        hint: 'Un círculo es muy redondo.',
        target: { color: '#ff6b7d', radius: '50%', size: '110px' },
        colors: [
          { label: 'Coral', value: '#ff6b7d' },
          { label: 'Menta', value: '#3ddc97' },
          { label: 'Noche', value: '#15204a' },
        ],
        radii: [
          { label: 'Cuadrado', value: '12px' },
          { label: 'Círculo', value: '50%' },
        ],
        sizes: [
          { label: 'Chico', value: '70px' },
          { label: 'Grande', value: '110px' },
        ],
      },
      {
        type: 'css',
        id: 'css-3',
        title: 'Carta redonda',
        xp: 40,
        intro: 'Ahora pinta una carta azul suave, grandota y con esquinas amables.',
        hint: 'No tiene que ser un círculo perfecto.',
        target: { color: '#6ea8ff', radius: '28px', size: '120px' },
        colors: [
          { label: 'Sol', value: '#ffc43d' },
          { label: 'Azul', value: '#6ea8ff' },
          { label: 'Rosa', value: '#ff5ad5' },
        ],
        radii: [
          { label: 'Suave', value: '28px' },
          { label: 'Círculo', value: '50%' },
        ],
        sizes: [
          { label: 'Mediano', value: '80px' },
          { label: 'Enorme', value: '120px' },
        ],
      },
      {
        type: 'quiz',
        id: 'css-4',
        title: 'background-color',
        xp: 30,
        intro: 'background-color pinta el fondo de una caja.',
        hint: 'Fondo = lo de atrás.',
        question: 'Si pones background-color: gold, ¿qué cambia?',
        options: ['El idioma', 'El fondo de la caja', 'El volumen', 'La fecha'],
        answer: 1,
        explain: 'background-color colorea el fondo.',
      },
    ],
  },
  {
    id: 'bloques',
    name: 'Taller de Bloques',
    language: 'Pensamiento computacional',
    tagline: 'Piensa como una programadora o un programador',
    accent: '#b388ff',
    glow: 'rgba(179, 136, 255, 0.45)',
    glyph: '🧩',
    lesson: 'Antes del lenguaje está el orden: algoritmos, bucles y decisiones.',
    levels: [
      {
        type: 'order',
        id: 'bk-1',
        title: 'Rutina de héroe',
        xp: 30,
        intro: 'Un algoritmo es una receta de pasos. Ordénala.',
        hint: 'Nadie programa sin despertar primero.',
        blocks: ['Despertar', 'Abrir EDUCODE', 'Elegir un mundo', '¡Jugar!'],
      },
      {
        type: 'maze',
        id: 'bk-2',
        title: 'Camino corto',
        xp: 40,
        intro: 'Programa al robot: avanza hasta el cristal. Mira la flechita.',
        hint: 'Si apunta hacia arriba, pulsa Avanzar varias veces.',
        rows: 4,
        cols: 4,
        start: [3, 1],
        goal: [0, 1],
        walls: [
          [2, 0],
          [2, 2],
          [1, 3],
        ],
        facing: 0,
      },
      {
        type: 'quiz',
        id: 'bk-3',
        title: '¿Qué es un bucle?',
        xp: 30,
        intro: 'Un bucle repite algo sin copiarlo mil veces.',
        hint: 'Repetir, repetir, repetir.',
        question: 'Un bucle sirve para...',
        options: ['Borrar el código', 'Repetir instrucciones', 'Apagar el monitor', 'Cambiar tu nombre'],
        answer: 1,
        explain: 'Los bucles repiten un grupo de pasos.',
      },
      {
        type: 'maze',
        id: 'bk-4',
        title: 'Rodea el muro',
        xp: 45,
        intro: 'Hay un muro en medio. Gira a tiempo o el robot se choca.',
        hint: 'Sube, gira, avanza y vuelve a apuntar al cristal.',
        rows: 5,
        cols: 5,
        start: [4, 2],
        goal: [0, 2],
        walls: [
          [2, 2],
          [1, 1],
          [1, 3],
        ],
        facing: 0,
      },
      {
        type: 'order',
        id: 'bk-5',
        title: 'Repite con estilo',
        xp: 35,
        intro: 'Cuando algo se repite, un bucle queda más limpio que copiar y pegar.',
        hint: 'Abre el bucle, pon el paso y ciérralo.',
        blocks: ['repetir 3 veces:', '    saltar()', 'fin'],
      },
    ],
  },
]

export const worldCompleteRewards: Record<string, { badge: string; extra: string[] }> = {
  python: { badge: 'python', extra: ['cohete'] },
  javascript: { badge: 'javascript', extra: ['cohete'] },
  html: { badge: 'html', extra: ['cohete'] },
  css: { badge: 'css', extra: ['cohete'] },
  bloques: { badge: 'bloques', extra: ['cohete'] },
}

export const starterUnlocks = {
  badges: [] as string[],
  colors: ['aurora', 'coral', 'cielo'],
  banners: ['pradera'],
  logos: [] as string[],
  decorations: [] as string[],
  frames: ['basico'],
}

export function rankFor(xp: number): Rank {
  return [...ranks].reverse().find((rank) => xp >= rank.minXp) ?? ranks[0]
}

export function nextRank(xp: number): Rank | null {
  return ranks.find((rank) => rank.minXp > xp) ?? null
}

export function worldById(id: string): World | undefined {
  return worlds.find((world) => world.id === id)
}

export function levelById(worldId: string, levelId: string) {
  const world = worldById(worldId)
  return world?.levels.find((level) => level.id === levelId)
}

export function cosmeticName(kind: 'colors' | 'banners' | 'logos' | 'decorations' | 'frames' | 'badges', id: string) {
  const tables = { colors, banners, logos, decorations, frames, badges }
  return tables[kind].find((item) => item.id === id)?.name ?? id
}
