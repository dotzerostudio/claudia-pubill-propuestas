# Propuesta F · Alba (B Calidez + el amanecer de C)

Briefing común para los agentes que construyen F. Léelo entero antes de tocar nada.

## Qué ha pedido Claudia (4/11/26, en catalán, resumido fiel)

- Le gusta el estilo de **B Calidez**: la letra, los **bordes redondeados**, que **cambie de color al pulsar cada tema** (el selector «¿Quién viene a terapia?»), las **decoraciones de líneas y círculos**.
- Le gustaría mezclarlo con la animación de **C Amanecer**, aunque teme que no case (B es más infantil y viva, C más seria). Le encanta **«Respira conmigo»** y que **se vaya haciendo de día**, pero **al entrar todo es demasiado oscuro**: quiere otra manera que no sea tan oscura.
- De **D Ventana** le gusta que **la barra esté arriba**.
- En resumen: «sería guay que fuera la de Calidez pero con alguna animación, movimiento o algo así».
- Idea suya: **cada vez que entras en la web ves una reflexión o pregunta distinta**. Sus ejemplos:
  - «Com seria poder veure't per un instant com et veu aquella persona que t'estima?»
  - «Està demostrat que tenir l'hàbit d'agrair augmenta un 20% el benestar percebut» (dato sin fuente: hay que verificarlo o sustituirlo por uno comprobado).
- Que se pueda **cambiar el idioma** de la web.
- «El tema de la animación habrá que ver que no sea saturante.»

## Qué añade Pablo

- Estilo de B + el concepto y la animación del amanecer de C, con **el sol debajo de un hero bonito** (primero un hero de B, luminoso; al bajar, la escena del amanecer).
- Idiomas: **catalán, español e inglés**, en ese orden en el selector (CA · ES · EN).
- Unas **10 reflexiones/preguntas**, verificadas, de alto impacto, inspiradas en las de Claudia y con buen texto.

## Decisiones ya tomadas en el proyecto (no las cambies)

- Sin opiniones de pacientes (publicidad sanitaria y secreto profesional). Sin prensa ni títulos inventados.
- Datos que faltan entre corchetes: [número] de colegiada, [precio], [duración], [teléfono], dirección de la consulta…
- Claudia atiende **en Barcelona o por videollamada**. Línea de presentación aprobada en E: «Hola, soy Claudia. Nos vemos en mi consulta de Barcelona o por videollamada, donde estés más a gusto.»
- Vocabulario de llamadas: barra «Escríbeme»; botón de cada terapia «En qué consiste» (abre el popup con `data-info="clave"`); banda «Pedir una primera sesión»; popup «Pide tu primera sesión»; botón «Pedir cita por WhatsApp». Nada de «Reservar» insistente. La gente va a su ritmo.
- Voz: primera persona, cálida, concreta. Pablo rechazó una línea por «muy muy fría». Sin tics de IA: nada de «no es X, es Y», tríos de adjetivos, «viaje», «sanar», «transformar tu vida», «descubre», guiones largos encadenados, frases-moraleja, mayúsculas en etiquetas, numeración 01/02/03 si no es una secuencia.
- Fotos de personas: son de ejemplo y llevan la etiqueta «Foto de ejemplo». Están en `directions/shared/img/` (people-*.jpg, consulta*.jpg, online-mesa.jpg, podcast.jpg). Nunca pongas una persona de stock como si fuera Claudia.
- Texto legible: cuerpo de 18 px como mínimo, interlineado de 1,6 o más, unas 62–70 letras por línea, contraste AA (mejor 7:1 en texto corrido).

## Archivos y entorno

- Proyecto: `/Users/pablomenjibar/Documents/Claude/Projects/Web Claudia Pubill/`. Páginas en `directions/` (HTML, CSS y JS sin frameworks ni build; fuentes de Google Fonts con `<link>`; se publicará en Cloudflare Pages).
- Bases que hay que leer: `directions/b-calidez.html` (estilo, selector, decoraciones), `directions/c-amanecer.html` (escena del amanecer, «Respira conmigo»), `directions/d-ventana.html` (barra superior), `directions/e-sobremesa.html` (versión más reciente: cómo usa los bloques compartidos y las fotos).
- Módulos compartidos en `directions/shared/`:
  - `booking.js/css`: popup de primera sesión y explicación de cada terapia. Disparadores: `data-book`, `data-book-mode`, `data-service`, `data-info="individual|pareja|familiar|infantojuvenil|neuroevaluacion"`. Se tematiza con variables `--bk-*`.
  - `services.js`: textos de cada terapia y mensajes de WhatsApp.
  - `sections.js/css`: bloques compartidos montados con `<div data-sx="doubts|proof|places|faq|blog|podcast|contact|footer">`; la página marca sus propias secciones con `data-sx-anchor="quien|terapias|como"`; enlaces `data-sx-go`; tema con variables `--sx-*` (ver cabecera de sections.css).
  - `switcher.js`: barra de comparación entre propuestas (se oculta con `?bare`).
  - **Nuevos:** `i18n.js` y `reflections.js` (contratos abajo).
- Hook «Fact-Forcing Gate»: la primera vez que escribes o editas cada archivo (y el primer Bash) te lo deniega y pide datos (quién lo usa, qué cambia, la instrucción literal). Escríbelos en tu respuesta y repite la misma llamada.
- Vista previa: el servidor de previsualización no puede leer `~/Documents` (privacidad de macOS). Hay un espejo en el scratchpad: `rsync -a "<proyecto>/directions/" "/private/tmp/claude-501/-Users-pablomenjibar-Documents-Claude-Projects-Web-Claudia-Pubill/c1d69d96-d12d-47b9-8563-c91cebabba9d/scratchpad/site/"` (créalo si no existe) y se sirve con la configuración «directions» de `.claude/launch.json` (puerto 4173). Para capturas sin el panel: Chrome headless (`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --virtual-time-budget=7000 --window-size=1440,900 --screenshot=out.png URL`).
- Detector de diseño (desde la raíz del proyecto): `~/.claude/plugins/cache/impeccable/impeccable/4.3.1/skills/impeccable/scripts/impeccable detect directions/<archivo>.html --no-advisory`. Corrige lo real; si es un falso positivo, `... hooks ignore-value <regla> "*" --file directions/<archivo>.html --reason "..."`.

## Contrato de idioma: `shared/i18n.js` (ya escrito, no lo cambies sin avisar)

- Se carga el primero, con `defer`. Expone `window.CLAUDIA_I18N` con `lang` ('ca'|'es'|'en'), `locale` ('ca-ES'|'es-ES'|'en-GB'), `names`, `t(clave, vars)`, `add(lang, obj)`, `apply(raiz)`, `onChange(fn)` y `setLang(l)`.
- `t` admite rutas con puntos dentro de objetos y cae al español si falta una clave en ca/en.
- En el HTML: `data-i18n="clave"` (texto; úsalo solo en elementos sin hijos), `data-i18n-html="clave"` (HTML propio), `data-i18n-attr="aria-label:clave;alt:otra"`. Botones del selector: `<button data-lang="ca">CA</button>` etc.; el activo recibe `aria-pressed="true"`.
- Claves `meta.title` y `meta.description` cambian el título y la descripción de la página.
- Lo que se pinta con JS (bloques, popup, reflexiones) se vuelve a pintar en `CLAUDIA_I18N.onChange`.
- El español es la fuente; ca y en se traducen después (otro agente). Si una clave falta en ca/en se ve en español: nunca se rompe.

## Contrato de reflexiones: `shared/reflections.js` (ya escrito)

- `window.CLAUDIA_REFLECT` con `items`, `pick(aud)`, `text(item)`, `sourceLine(item)`, `uiText('label'|'other'|'otherLong'|'source')`.
- `aud` usa estos identificadores: `child`, `teen`, `family`, `couple`, `adult`. La página traduce las opciones de su selector a ellos.
- Ahora solo trae la pregunta de Claudia; la lista final de unas 10 llega después (investigación + redacción).
- Comportamiento: al entrar se muestra una que no sea la última que vio esa persona; el botón «Otra» enseña otra sin repetir en esa visita; tras elegir en el selector, «Otra» prefiere las de esa persona. Los datos (`kind: 'fact'`) enseñan debajo su fuente en pequeño.

## Estructura de F (orden de la página)

1. **Barra superior fija**, como la de D: logo-nombre, enlaces (Quién soy, Terapias, Cómo trabajo, Preguntas), selector de idioma CA · ES · EN y «Escríbeme». En móvil, compacta y usable con el pulgar.
2. **Hero de B**, luminoso desde el primer segundo (nada oscuro al entrar): titular grande en Young Serif, la línea de presentación de Barcelona, el selector «¿Quién viene a terapia?» que cambia el color de la página y el mensaje, decoraciones de líneas y círculos con un movimiento lento y tranquilo, y la **tarjeta de reflexión** (etiqueta pequeña, la frase grande, botón «Otra», fuente si es un dato; `aria-live="polite"`; reserva altura para que no salte el diseño al cambiar).
3. **Debajo del hero, el amanecer**: una escena ligada al scroll donde el cielo pasa de un malva-melocotón suave (nunca azul noche ni negro) a la luz cálida del día y el sol sube entre colinas redondeadas (formas de B). Dentro, **«Respira conmigo»** (círculo que guía la respiración: 4 s tomar aire, 6 s soltarlo, con texto). Cuando ha amanecido, el resto de la página sigue en la paleta luminosa de B.
4. Terapias (cinco, con «En qué consiste» → `data-info`), Quién soy, Cómo trabajo, los bloques compartidos (`data-sx`), la banda «Pedir una primera sesión» y el pie.

Movimiento: una escena principal (el amanecer) y poco más. Solo `transform`/`opacity`, sin sonido, sin parallax en cada sección, sin entradas que deslizan cada bloque. Con `prefers-reduced-motion`, todo quieto y la escena en su estado de día. Que no sature.

## Quién hace qué

- **Diseño y página** (agente de diseño): `directions/f-alba.html`, `directions/shared/f-strings.js` (todos los textos de la página en `CLAUDIA_I18N.add('es', {...})`, más `add('ca', {})` y `add('en', {})` vacíos), miniatura `directions/previews/f.png` (1440×900). No toques otros archivos de `shared/`.
- **Módulos compartidos trilingües** (agente de integración): `booking.js`, `services.js`, `sections.js` (y su CSS si hace falta) leen sus textos de `CLAUDIA_I18N`, con el español actual intacto, y se repintan al cambiar de idioma. Las páginas A–E no cargan `i18n.js` y deben verse exactamente igual que hoy.
- **Fuentes** (agente de investigación): verificar datos para las reflexiones → `_notes/reflexiones-fuentes.md`.
- **Traducción y redacción** (después): catalán e inglés de todo, y la lista final de reflexiones.
- La sesión principal integra, revisa, actualiza `index.html` y `switcher.js` y publica.
