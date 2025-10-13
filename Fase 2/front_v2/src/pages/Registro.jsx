import React, { useState } from "react"
import { useAuth } from "../hooks/useAuth"

export default function Registro() {
  const { registerUser, loading, error } = useAuth()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser(form)
      alert("Usuario registrado correctamente")
      setForm({ name: "", email: "", password: "" })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    // 🔹 Fondo gris claro como las otras páginas
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            Registrar nuevo usuario
          </h2>

          <div>
            <label htmlFor="name" className="block text-gray-600 font-medium">
              Nombre completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>

          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  )
}
