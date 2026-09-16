# EDUCODE

Parque web para que niñas y niños de **8 a 12 años** aprendan a programar jugando.

El repositorio empezó solo con un título. Esta versión ya es una plataforma jugable: islas de Python, JavaScript, HTML, CSS y pensamiento computacional, un cielo interactivo, misiones secretas, recompensas para el perfil y animaciones suaves.

## Qué puede hacer un niño aquí

- Elegir un apodo y explorar un cielo con islas que se pueden tocar.
- Aprender con juegos cortos: ordenar código, cazar bugs, quizzes, armar HTML, pintar con CSS y programar un robot.
- Desbloquear **XP, rango, estrellas, insignias, colores, banners, logos, marcos y decoraciones**.
- Encontrar secretos en el inicio: platillo volador, cometa, cristal en una nube, portal diminuto, acariciar a Pixel, tocar el logo, cambiar el cielo y recoger estrellas.
- Guardar el progreso en el navegador (cada amigo tiene su propia aventura al abrir el enlace).

## Cómo correrlo en tu computadora

Necesitas Node.js 22 o similar.

```bash
npm install
npm run dev
```

Abre la URL que imprime Vite (por ejemplo `http://localhost:5173`).

## Cómo subirlo a la nube y mandarle el link a un amigo

La página es estática: no necesita base de datos. Elige **una** de estas opciones.

### 1. Vercel (la más simple)

1. Entra a [vercel.com](https://vercel.com) con tu cuenta de GitHub.
2. Pulsa **Add New → Project** y elige el repositorio `Educode`.
3. Deja los valores por defecto (`npm run build`, carpeta `dist`) y despliega.
4. Vercel te da un enlace tipo `https://educode-algo.vercel.app`. Ese es el que compartes.

Este repo ya incluye `vercel.json` para que las rutas funcionen.

### 2. Netlify

1. Entra a [netlify.com](https://netlify.com).
2. **Add new site → Import an existing project** y conecta GitHub.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Comparte el enlace `https://algo.netlify.app`.

También puedes arrastrar la carpeta `dist` a [Netlify Drop](https://app.netlify.com/drop) después de correr `npm run build`.

### 3. GitHub Pages (gratis con este mismo repo)

El archivo `.github/workflows/pages.yml` publica el sitio cuando hay un push a `main`.

1. En GitHub: **Settings → Pages**.
2. En **Source** elige **GitHub Actions**.
3. Junta este código en `main` (o deja que el workflow corra).
4. El enlace queda así: `https://<tu-usuario>.github.io/Educode/`

## Rumores secretos (para ti, no para el niño)

- Un platillo cruza el cielo de vez en cuando. Si le das clic, hay un minijuego. Al ganarlo hay insignia, color y banner.
- Pixel, el robot, quiere que lo toquen varias veces.
- Las estrellas del inicio se pueden recoger.
- El logo **EDUCODE** de arriba esconde un banner.
- El sol/luna cambia el cielo. Hazlo varias veces.
- Una nube esconde un cristal.
- Abajo a la derecha hay un portal casi invisible.
- A veces pasa un cometa.

## Notas para papás y maestros

- No hay cuentas ni contraseñas. El progreso vive en `localStorage` de ese navegador.
- Si alguien borra los datos del sitio, se reinicia la aventura.
- Los sonidos se pueden silenciar con el botón 🔊.
- La interfaz está en español; el código de los ejercicios está en el idioma real (Python, JavaScript, HTML, CSS), que es como se escribe de verdad.

## Scripts

- `npm run dev` — desarrollo
- `npm run build` — empaquetar para la nube
- `npm run preview` — probar el empaquetado
- `npm run lint` — revisión rápida del código
