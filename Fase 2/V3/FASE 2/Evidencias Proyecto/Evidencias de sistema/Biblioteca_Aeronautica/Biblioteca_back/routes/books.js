const express = require("express");
const router = express.Router();
const db = require("../db");
const {  devovlerLibro, solicitarLibro } = require("../servicios/libreria");

router.get("/", async (req, res, next) => {
  const { nombre, categoria, autor, anno, idioma, editorial } = req.query;
  try {
    const limit = parseInt(req.query.limit) || 100;
    let query = `SELECT
            l.id as libro_id,
            l.nombre,
            l.descripcion,
            l.stock,
            l.autor,
            COALESCE(
            json_agg(
                json_build_object('id', c.id, 'nombre', c.nombre)
            ) FILTER (WHERE c.id IS NOT NULL),
             '[]'
        ) AS categorias
        FROM public.libros l
        LEFT JOIN public.libros_categorias lc ON l.id = lc.libro_id
        LEFT JOIN public.categorias c ON lc.categoria_id = c.id
        `;
    const conditions = [];
    const values = [];

    function addFilter(column, value) {
      if (value && value.trim() !== "") {
        values.push(value.trim());
        conditions.push(
          `($${values.length}::text IS NULL OR ${column} ILIKE ('%' || $${values.length}::text || '%'))`
        );
      }
    }

    addFilter("l.nombre", nombre);
    addFilter("c.nombre", categoria);
    addFilter("l.autor", autor);
    addFilter("l.anno::text", anno);
    addFilter("l.idioma", idioma);
    addFilter("l.editorial", editorial);

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    query += " GROUP BY l.id ORDER BY l.id";

    values.push(limit);

    query += ` LIMIT $${values.length}`;

    console.log(query, values);

    const { rows } = await db.query(query, values);

    res.json(rows);
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const { rows } = await db.query(
      "INSERT INTO public.libros (nombre, descripcion) values ($1,$2)",
      [req.body.nombre, req.body.descripcion]
    );
    res.status(201);
  } catch (err) {
    next(err);
  }
});
router.post("/solicitar/:libroid/:userid", async (req, res) => {
  const { libroid, userid } = req.params;
  try {
    const result = await solicitarLibro(userid, libroid);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/:libroid/devolver/:userid", async (req, res) => {
  const { libroid, userid } = req.params;
  try {
    const result = await devovlerLibro(userid, libroid);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await db.query(
      `
      SELECT
        l.id as libro_id,
        l.nombre,
        l.descripcion,
        l.stock,
        l.autor,
        l.anno,
        l.idioma,
        l.editorial,
        COALESCE(
          json_agg(
            json_build_object('id', c.id, 'nombre', c.nombre)
          ) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS categorias
      FROM public.libros l
      LEFT JOIN public.libros_categorias lc ON l.id = lc.libro_id
      LEFT JOIN public.categorias c ON lc.categoria_id = c.id
      WHERE l.id = $1
      GROUP BY l.id
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    const libro = { ...rows[0], id: rows[0].libro_id };
    delete libro.libro_id;

    res.json(libro);
  } catch (err) {
    console.error("Error al obtener libro:", err);
    res.status(500).json({ message: "Error al obtener detalles del libro" });
  }
});
module.exports = router;
