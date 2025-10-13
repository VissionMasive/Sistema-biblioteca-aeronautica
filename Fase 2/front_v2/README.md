
# Biblioteca ETA — Frontend v5

Cambios solicitados:
- **/alumnos** y **/docentes**: se quitaron las casillas “Biblioteca y horarios”, “Talleres y eventos” y “Consultas frecuentes”.
- Nuevas casillas en **Alumnos**: **Normativa Estudiantil**, **Documentos Técnicos**, **Reglamentación** (junto a Catálogo).
- Nuevas casillas en **Docentes**: **Normativa Docente**, **Documentos Técnicos**, **Reglamentación** (junto a Catálogo).
- Páginas nuevas con interfaz tipo catálogo:
  - `/normativa-estudiantil` (PDFs oficiales para estudiantes)
  - `/normativa-docente` (PDF docente)
  - `/documentos-tecnicos` (resoluciones, calendario, compendio, MEI)
  - `/reglamentacion` (leyes externas)
- **Carrusel** de Home: se aumentó la altura (ahora `h-72 md:h-96`).

## Correr
```bash
npm i
npm run dev
```
Abre: http://localhost:5173
