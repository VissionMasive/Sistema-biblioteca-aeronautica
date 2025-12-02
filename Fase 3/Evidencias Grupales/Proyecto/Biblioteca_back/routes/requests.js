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
        l.portada_url,
        u.nombre AS usuario_nombre
      FROM public.solicitudes s
      JOIN public.libros   l ON s.libro_id   = l.id
      JOIN public.usuarios u ON s.usuario_id = u.id
      WHERE s.usuario_id = $1
      ORDER BY s.creado DESC, s.id DESC
    `;

    const { rows } = await db.query(querySolicitudes, [id]);

    if (rows.length === 0) {
      const userQuery =
        "SELECT nombre AS usuario_nombre FROM public.usuarios WHERE id=$1";
      const { rows: userRows } = await db.query(userQuery, [id]);

      if (userRows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.json(userRows);
    }

    return res.json(rows);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { status, mensaje, terminado } = req.body;

  try {
    // 1) Traer solicitud actual para saber libro_id y status anterior
    const { rows: currentRows } = await db.query(
      `
      SELECT libro_id, status
      FROM public.solicitudes
      WHERE id = $1
    `,
      [id]
    );

    if (currentRows.length === 0) {
      return res.status(404).json({ message: "Solicitud no encontrada." });
    }

    const { libro_id: libroId, status: statusAnterior } = currentRows[0];

    // 2) Armar UPDATE dinámico (como ya lo tenías)
    const fields = [];
    const values = [];
    let index = 1;

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

    const solicitudActualizada = rows[0];

    // 3) Lógica de stock según cambio de STATUS
    // Si no mandaste "status" en el body, no tocamos stock
    if (status) {
      // Cuando pasa a ENTREGADO (y antes no era ENTREGADO) → stock - 1
      if (status === "entregado" && statusAnterior !== "entregado") {
        await db.query(
          `
          UPDATE public.libros
          SET stock = GREATEST(stock - 1, 0)
          WHERE id = $1
        `,
          [libroId]
        );
      }

      // Cuando pasa a DEVUELTO (y antes no era DEVUELTO) → stock + 1
      if (status === "devuelto" && statusAnterior !== "devuelto") {
        await db.query(
          `
          UPDATE public.libros
          SET stock = stock + 1
          WHERE id = $1
        `,
          [libroId]
        );
      }
    }

    res.json({
      message: "Solicitud actualizada correctamente.",
      solicitud: solicitudActualizada,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
