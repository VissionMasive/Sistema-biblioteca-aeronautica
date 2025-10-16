const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/", async (req,res, next) => {
  try {
    const query = `
      SELECT
        s.id,
        s.creado,
        s.terminado,
        s.status,
        s.mensaje,
        l.nombre AS libro_nombre,
        u.nombre AS usuario_nombre
      FROM public.solicitudes s
      JOIN public.libros l ON s.libro_id = l.id
      JOIN public.usuarios u ON s.usuario_id = u.id
      ORDER BY s.id
    `;
    const { rows } = await db.query(query)
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

module.exports = router