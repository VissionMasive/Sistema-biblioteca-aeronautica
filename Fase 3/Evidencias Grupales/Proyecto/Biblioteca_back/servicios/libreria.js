const db = require("../db")

async function solicitarLibro(userid, libroid) {
    try {
        const { rows } = await db.query("SELECT stock FROM public.libros WHERE id=$1", [libroid])
        if (rows.length === 0) {
            throw new Error("El libro no existe")
        }
        const stock = rows[0].stock
        if (stock <= 0) {
            throw new Error("No hay stock disponible del libro")
        }

        const requestExisted = await db.query("SELECT * FROM public.solicitudes WHERE libro_id = $1 AND usuario_id = $2", [libroid, userid])
        if (requestExisted.rows.length > 0) {
            return { success: true, message: "Solicitud ya creada"}
        }

        const timeNow = Date.now()
        const today = new Date(timeNow)
        const created_at = today.toISOString()
        const status = "Pendiente"

        await db.query("INSERT INTO public.solicitudes(usuario_id,libro_id,creado,status) VALUES($1,$2,$3,$4)", [userid, libroid, created_at, status])
        await db.query("UPDATE public.libros SET stock = stock - 1 WHERE id=$1", [libroid])
        return { success: true, message: "Libro prestado correctamente" }

    } catch (err) {
        console.error("Error prestando libro:", err.message)
        throw err
    }
}

async function devovlerLibro(userid, libroid) {
    try {


        const resPrestamo = await db.query("SELECT id FROM public.prestamos WHERE usuario_id=$1 AND libro_id=$2 AND fecha_devolucion IS NULL ORDER BY fecha_prestamo DESC LIMIT 1 FOR UPDATE", [userid, libroid])
        if (resPrestamo.rows.length === 0) {
            throw new Error("No se encontro ningun prestamo pendiente para el usuario")
        }
        const prestamoid = resPrestamo.rows[0].id
        await db.query("UPDATE public.prestamos SET fecha_devolucion = NOW() WHERE id=$1", [prestamoid])
        const libroActualizado = await db.query("UPDATE public.libros SET stock = stock + 1 WHERE id=$1 RETURNING id,stock", [libroid])
        if (libroActualizado.rowCount === 0) {
            throw new Error("Error:El libro no fue encontrado")
        }
        await db.query("COMMIT")
        return { success: true, message: "El libro fue devuelto correctamente", book: libroActualizado.rows[0] }
    } catch (err) {
        await db.query("ROLLBACK").catch(() => { })
        throw err
    }
}

module.exports = { solicitarLibro, devovlerLibro }