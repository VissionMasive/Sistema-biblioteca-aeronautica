const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, nombre FROM public.categorias ORDER BY id");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;