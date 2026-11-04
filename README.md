# Claudia Pubill · Propuestas de web

Seis propuestas de diseño para la web de Claudia Pubill, psicóloga en Barcelona y por videollamada. Es la misma colección que se compartió como artefacto de revisión.

- `directions/index.html`: resumen y comparación de las seis.
- `directions/a-respira.html` … `directions/f-alba.html`: cada propuesta.
- `directions/shared/`: módulos compartidos (popup de primera sesión, bloques, idiomas, reflexiones) e imágenes.
- `_notes/`: notas de trabajo, briefing de F y fuentes verificadas de las reflexiones.
- `CLAUDE.md` / `AGENTS.md`: guía del proyecto para agentes (el mismo contenido en los dos).

F · Alba está en catalán, español e inglés. A–E están solo en español.

## Verlo en local

Es HTML estático sin build. Desde la raíz:

```bash
python3 -m http.server 8000 --directory directions
```

y abre http://localhost:8000.

La web final, solo con F, está en el repositorio `claudia-pubill-web`.
