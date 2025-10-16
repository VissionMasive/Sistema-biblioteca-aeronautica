const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
const jwtSecret = process.env.JWT_SECRET || "secret_key";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "3h";

router.post("/register", async (req, res) => {
  const { nombre, email, password, role } = req.body;
  if (!nombre || !password)
    return res.status(400).json({ error: "Faltan campos requeridos" });
  try {
    if (email) {
      const exists = await db.query(
        "SELECT id FROM public.usuarios WHERE email = $1",
        [email]
      );
      if (exists.rows.length)
        return res.status(409).json({ error: "Email ya registrado" });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    if (role && !["admin", "alumno"].includes(role)) {
      return res.status(400).json({ error: "Rol invalido" });
    }

    if (role === null || role === undefined) {
      role = "alumno"; // Rol por defecto
    }

    const { rows } = await db.query(
      "INSERT INTO public.usuarios (nombre, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, role",
      [nombre, email || null, hash, role]
    );

    const user = rows[0];

    const token = jwt.sign({ id: user.id, nombre: user.nombre, role: user.role }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Refistro error:", err);
    res.status(500).json({ error: "Error en el registro" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email y password son requeridos" });

  try {
    const { rows } = await db.query(
      "SELECT id, nombre, email, password_hash, role FROM public.usuarios WHERE email = $1",
      [email]
    );
    if (rows.length === 0)
      return res.status(401).json({ error: "Credenciales invalidas" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match)
      return res.status(401).json({ error: "Credenciales invalidas" });
    const token = jwt.sign({ id: user.id, nombre: user.nombre, role: user.role }, jwtSecret, {
      expiresIn: jwtExpiresIn,
    });
    res.json({ token, user: { id: user.id, nombre: user.nombre, role: user.role } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Error en el login" });
  }
});



module.exports = router;
