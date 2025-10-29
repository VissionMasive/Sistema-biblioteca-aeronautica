const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const query = `
      SELECT
        s.id,
        to_char(s.creado AT TIME ZONE 'America/Santiago', 'DD-MM-YYYY') AS creado,
        to_char(s.terminado AT TIME ZONE 'America/Santiago', 'DD-MM-YYYY') AS terminado,
        s.status,
        s.mensaje,
        l.nombre AS libro_nombre,
        u.nombre AS usuario_nombre
      FROM public.solicitudes s
      JOIN public.libros l ON s.libro_id = l.id
      JOIN public.usuarios u ON s.usuario_id = u.id
      ORDER BY s.id
    `;
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.get("/usuario/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validación básica del ID
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    const querySolicitudes = `
      SELECT
        s.id,
        to_char(s.creado    AT TIME ZONE 'America/Santiago', 'DD-MM-YYYY') AS creado,
        to_char(s.terminado AT TIME ZONE 'America/Santiago', 'DD-MM-YYYY') AS terminado,
        s.status,
        s.mensaje,
        l.nombre AS libro_nombre,
        u.nombre AS usuario_nombre
      FROM public.solicitudes s
      JOIN public.libros   l ON s.libro_id   = l.id
      JOIN public.usuarios u ON s.usuario_id = u.id
      WHERE s.usuario_id = $1
      ORDER BY s.creado DESC, s.id DESC
    `;

    const { rows } = await db.query(querySolicitudes, [id]);

    if (rows.length === 0) {
      // No tiene solicitudes, devolvemos solo el nombre
      const userQuery = "SELECT nombre AS usuario_nombre FROM public.usuarios WHERE id=$1";
      const { rows: userRows } = await db.query(userQuery, [id]);

      if (userRows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // 🔹 devolvemos un arreglo con un solo objeto (nombre del usuario)
      return res.json(userRows);
    }

    // 🔹 si tiene solicitudes, devolvemos las solicitudes normales
    return res.json(rows);

  } catch (err) {
    next(err);
  }
});


router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { status, mensaje, terminado } = req.body;

  try {
    const fields = [];
    const values = [];
    let index = 1;

    // Solo agregamos los campos que realmente vienen en el body
    if (status) {
      fields.push(`status = $${index++}`);
      values.push(status);
    }

    if (mensaje) {
      fields.push(`mensaje = $${index++}`);
      values.push(mensaje);
    }

    if (terminado) {
      fields.push(`terminado = $${index++}`);
      values.push(terminado);
    }

    if (fields.length === 0) {
      return res
        .status(400)
        .json({ message: "No se proporcionaron campos para actualizar." });
    }

    // Armamos el query dinÃ¡micamente
    const query = `
      UPDATE public.solicitudes
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING *;
    `;
    values.push(id);

    const { rows } = await db.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Solicitud no encontrada." });
    }

    res.json({
      message: "Solicitud actualizada correctamente.",
      solicitud: rows[0],
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
