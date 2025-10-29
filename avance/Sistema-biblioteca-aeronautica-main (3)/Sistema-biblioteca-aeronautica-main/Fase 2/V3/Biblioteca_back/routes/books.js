const express = require("express");
const router = express.Router();
const db = require("../db");
const {  devovlerLibro, solicitarLibro } = require("../servicios/libreria");

router.get("/", async (req, res, next) => {
  const { nombre, categoria, autor, anno, idioma, editorial } = req.query;
  try {
    const limit = parseInt(req.query.limit) || 100;
    let query = `
      SELECT
        l.id AS libro_id,
        l.nombre,
        l.descripcion,
        l.stock,
        a.nombre AS autor_nombre,
        e.nombre AS editorial_nombre,
        l.anno,
        l.idioma,
        COALESCE(
          json_agg(
            json_build_object('id', c.id, 'nombre', c.nombre)
          ) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS categorias
      FROM public.libros l
      LEFT JOIN public.libros_categorias lc ON l.id = lc.libro_id
      LEFT JOIN public.categorias c ON lc.categoria_id = c.id
      LEFT JOIN public.autores a ON l.autor = a.id
      LEFT JOIN public.editoriales e ON l.editorial = e.id
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

    // Filtros
    addFilter("l.nombre", nombre);
    addFilter("c.nombre", categoria);
    addFilter("a.nombre", autor);        // ← ahora filtra por nombre del autor real
    addFilter("l.anno::text", anno);
    addFilter("l.idioma", idioma);
    addFilter("e.nombre", editorial);    // ← ahora filtra por nombre del editorial real

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    query += " GROUP BY l.id, a.nombre, e.nombre ORDER BY l.id";

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
    let {
      nombre,
      descripcion,
      stock,
      editorial,
      autor,
      anno,
      idioma,
      categoriaId,
      categoria
    } = req.body;

    if (!nombre || !descripcion) {
      return res.status(400).json({ message: "nombre y descripcion son obligatorios" });
    }

    nombre = String(nombre).trim();
    descripcion = String(descripcion).trim();
    idioma = idioma ? String(idioma).trim() : null;
    stock = Number.isFinite(Number(stock)) ? Math.max(0, Number(stock)) : 0;
    editorial = Number.isFinite(Number(editorial)) ? Number(editorial) : null;
    autor = Number.isFinite(Number(autor)) ? Number(autor) : null;

    if (anno != null && String(anno).trim() !== "") {
      const s = String(anno).trim();
      if (/^\d{4}$/.test(s)) anno = `${s}-01-01`;
      else if (/^\d{4}-\d{2}-\d{2}$/.test(s)) anno = s;
      else anno = null;
    } else {
      anno = null;
    }

    // Inserta el libro en la tabla principal
    const { rows: libroRows } = await db.query(
      `
      INSERT INTO public.libros
        (nombre, descripcion, stock, editorial, autor, anno, idioma)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, nombre, descripcion, stock, editorial, autor, anno, idioma
      `,
      [nombre, descripcion, stock, editorial, autor, anno, idioma]
    );

    const libro = libroRows[0];

    // Vincular categoría (opcional)
    if (categoriaId || categoria) {
      let catId = null;

      if (Number.isFinite(Number(categoriaId))) {
        catId = Number(categoriaId);
      } else if (categoria && String(categoria).trim() !== "") {
        const { rows: catRows } = await db.query(
          `SELECT id FROM public.categorias WHERE LOWER(nombre)=LOWER($1) LIMIT 1`,
          [categoria.trim()]
        );

        if (catRows.length) {
          catId = catRows[0].id;
        } else {
          const { rows: newCat } = await db.query(
            `INSERT INTO public.categorias (nombre) VALUES ($1) RETURNING id`,
            [categoria.trim()]
          );
          catId = newCat[0].id;
        }
      }

      if (catId) {
        await db.query(
          `
          INSERT INTO public.libros_categorias (libro_id, categoria_id)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
          `,
          [libro.id, catId]
        );
      }
    }

    res.status(201).json({ message: "Libro agregado correctamente", libro });
  } catch (err) {
    console.error("Error al crear libro:", err);
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
        l.id AS libro_id,
        l.nombre,
        l.descripcion,
        l.stock,
        -- autor/editorial: id + nombre
        l.autor     AS autor_id,
        a.nombre    AS autor_nombre,
        l.editorial AS editorial_id,
        e.nombre    AS editorial_nombre,

        l.anno,
        l.idioma,

        COALESCE(
          json_agg(
            json_build_object('id', c.id, 'nombre', c.nombre)
          ) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS categorias
      FROM public.libros l
      LEFT JOIN public.libros_categorias lc ON l.id = lc.libro_id
      LEFT JOIN public.categorias c        ON lc.categoria_id = c.id
      LEFT JOIN public.autores a           ON l.autor     = a.id
      LEFT JOIN public.editoriales e       ON l.editorial = e.id
      WHERE l.id = $1
      GROUP BY l.id, a.nombre, e.nombre
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    // normalizamos "id"
    const libro = { ...rows[0], id: rows[0].libro_id };
    delete libro.libro_id;

    res.json(libro);
  } catch (err) {
    console.error("Error al obtener libro:", err);
    res.status(500).json({ message: "Error al obtener detalles del libro" });
  }
});

module.exports = router;
