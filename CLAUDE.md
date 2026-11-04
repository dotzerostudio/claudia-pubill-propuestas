# Web de Claudia Pubill

> `CLAUDE.md` y `AGENTS.md` tienen siempre el mismo contenido. Si cambias uno, copia el cambio al otro.

Web de Claudia Pubill, psicóloga en Barcelona y por videollamada. Atiende a niños, adolescentes, familias, parejas y adultos, y hace neuroevaluaciones. Objetivo: que la gente la conozca y pida una primera sesión con calma, sin presión.

## Estado

- `directions/` tiene seis propuestas de diseño (A Respira, B Calidez, C Amanecer, D Ventana, E Sobremesa, F Alba) y `index.html`, que las compara.
- **F · Alba** (`f-alba.html`) es la que se está desarrollando. Viene del feedback de Claudia: estilo de B, el amanecer de C en una sección completa bajo el hero, barra fija arriba, una reflexión distinta en cada visita e idiomas CA · ES · EN.
- Cuando Claudia apruebe una dirección: sistema de diseño (tokens.css, componentes, guía corta), web real y publicación en Cloudflare Pages desde GitHub. Ella la editará con Antigravity.
- GitHub (privados, cuenta dotzerostudio): `claudia-pubill-propuestas` es esta carpeta (las seis propuestas). `claudia-pubill-web` es la web F sola: se genera en `web-f/`, que tiene su propio git y este repositorio ignora. Si cambias F en `directions/`, cópialo también a `web-f/`: `f-alba.html` pasa a `index.html` sin la línea de `switcher.js`.
- Historial y pendientes: `_notes/RESUME.md`. Briefing de F: `_notes/brief-F.md`. Fuentes de las reflexiones: `_notes/reflexiones-fuentes.md`.

## Técnica

- HTML, CSS y JavaScript sin frameworks ni paso de build. Fuentes de Google Fonts con `<link>`. En Cloudflare Pages: sin comando de build, carpeta de salida `directions`.
- Módulos compartidos en `directions/shared/`:
  - `i18n.js`: idiomas `ca`, `es` y `en`. Orden de elección: `?lang=`, la última elección guardada, el idioma del navegador y, si no, `es`. En el HTML: `data-i18n="clave"`, `data-i18n-attr="alt:clave"` y botones `data-lang="ca|es|en"`. Si falta una clave en ca o en, se muestra el español. Lo que se pinta con JavaScript se repinta en `CLAUDIA_I18N.onChange`.
  - `f-strings.js`: todos los textos de F en es, ca y en, con las mismas claves.
  - `services.js`: textos de cada terapia y mensajes de WhatsApp (namespaces `svc` y `msg`).
  - `booking.js/css`: el popup «Pide tu primera sesión» y «En qué consiste» (namespace `bk`). Disparadores: `data-book`, `data-book-mode`, `data-service` y `data-info="individual|pareja|familiar|infantojuvenil|neuroevaluacion"`. El calendario es de ejemplo hasta que exista `window.CLAUDIA.calLink` (Cal.com).
  - `sections.js/css`: bloques compartidos montados con `<div data-sx="doubts|proof|places|faq|blog|podcast|contact|footer">` (namespace `sx`). Se tematizan con las variables `--sx-*`.
  - `reflections.js`: 10 reflexiones (preguntas y datos con fuente). Las de tipo dato llevan siempre la fuente y el DOI.
  - `switcher.js`: barra para comparar propuestas. No forma parte de la web final y se oculta con `?bare`.
- Las páginas A–E no cargan `i18n.js` y se quedan en español; los módulos siguen funcionando sin él.
- Imágenes en `directions/shared/img/`:
  - Reales: `claudia.jpg` y `consulta-*.jpg` (la consulta). Van sin la etiqueta «Foto de ejemplo».
  - De stock, `people-*.jpg`: son de ejemplo y llevan la etiqueta. La atribución está pendiente de verificar en `CREDITS.md`.
  - Generadas: `consulta.jpg`, `consulta-2.jpg`, `online-mesa.jpg`, `podcast.jpg` y `e-sobremesa.jpg`.

## Reglas de contenido

- Voz cálida, en primera persona y concreta. Nada que suene a IA: sin «no es X, es Y», tríos de adjetivos, «viaje», «sanar», «transformar», frases-moraleja ni guiones largos encadenados.
- Publicidad sanitaria: no se prometen resultados, no hay opiniones de pacientes y no se dice «está demostrado» sin una fuente comprobada.
- Llamadas a la acción tranquilas. «Escríbeme», «En qué consiste», «Pedir una primera sesión», «Pide tu primera sesión», «Pedir cita por WhatsApp». Nada de insistir con «Reservar».
- Los datos que faltan van entre corchetes: [número] de colegiada, [precio], [duración], [teléfono], dirección de la consulta…
- Catalán natural de Barcelona, de tú. Inglés británico, cálido y sencillo. Cada idioma se escribe como si fuera el original.

## Diseño

- Texto del cuerpo de 18 px o más, interlineado de 1,6 o más y contraste AA como mínimo.
- Funciona desde 375 px sin scroll horizontal: en móvil, `scrollWidth` debe ser igual a `clientWidth`.
- Foco del teclado visible.
- Con `prefers-reduced-motion` no se mueve nada.
- Animaciones con calma: solo `transform` y `opacity`, una vez por elemento, y nunca esconder contenido si falla JavaScript.
- Revisión de diseño: `~/.claude/plugins/cache/impeccable/impeccable/4.3.1/skills/impeccable/scripts/impeccable detect directions/<archivo>.html --no-advisory`, desde la raíz del proyecto.

## Entorno local (macOS)

- El servidor de vista previa no puede leer `~/Documents`. Se trabaja con un espejo en el scratchpad de la sesión: `rsync -a directions/ <scratchpad>/site/`, servido por la configuración «directions» de `.claude/launch.json` en el puerto 4173. La ruta del scratchpad cambia en cada sesión.
- Para capturas, Chrome sin ventana: `--headless=new --window-size=1440,900 --screenshot`.
