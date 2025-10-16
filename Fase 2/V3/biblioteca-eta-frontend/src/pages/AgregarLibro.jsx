import React, { useState } from "react"
import { createBook } from "../api/booksApi"

export default function AgregarLibro() {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    autor: "",
    anno: "",
    descripcion: "",
    stock: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = {
        nombre: form.nombre.trim(),
        categoria: form.categoria.trim(),
        autor: form.autor.trim(),
        anno: Number(form.anno),
        descripcion: form.descripcion.trim(),
        stock: Number(form.stock),
      }
      await createBook(payload)
      alert("📚 Libro agregado correctamente")
      setForm({ nombre: "", categoria: "", autor: "", anno: "", descripcion: "", stock: "" })
    } catch (err) {
      setError(err.message || "Error al agregar el libro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-16">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Agregar nuevo libro
        </h1>

        {/* Contenedor tipo “toolbar” como en la home */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fila superior: inputs estilo barra de búsqueda/filtros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre del libro"
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              <input
                type="text"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                placeholder="Categoría"
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              <input
                type="text"
                name="autor"
                value={form.autor}
                onChange={handleChange}
                placeholder="Autor"
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              <input
                type="number"
                name="anno"
                value={form.anno}
                onChange={handleChange}
                placeholder="Año"
                min="0"
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Fila media: descripción y stock */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <div className="lg:col-span-3">
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Descripción"
                  required
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                />
              </div>

              <div className="lg:col-span-1">
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  min="0"
                  required
                  className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-end gap-3 pt-2">
              {error && <p className="text-red-600 text-sm mr-auto">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="h-11 px-5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Guardando…" : "Agregar libro"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
