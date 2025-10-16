const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/",  async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, nombre, email FROM public.usuarios WHERE role = 'alumno'");
    if (rows.length === 0) return res.status(404).json({ error: "No hay usuarios"})
    res.status(200).json(rows)
  } catch (err) {
    console.error("Error fetching users:", err)
    res.status(500).json({ error: "Error al obtener usuarios"})
  }
})

router.get("/:id", async (req, res) => {
  const {id} = req.params
  try {
    const { rows } = await db.query("SELECT id, nombre, email, role FROM public.usuarios WHERE id = $1", [id])
    if (rows.length === 0 ) return res.status(404).json({ error: "Usuario no encontrado"})
    res.status(200).json(rows[0])
  } catch (err) {
    console.error("Error fetching user by ID:", err)
    res.status(500).json({ error: "Error al encontrar el usario" })
  }
})

module.exports = router;