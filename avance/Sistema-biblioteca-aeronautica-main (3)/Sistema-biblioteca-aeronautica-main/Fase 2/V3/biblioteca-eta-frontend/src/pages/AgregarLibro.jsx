import React, { useMemo, useState } from "react"
import { createBook } from "../api/booksApi"
import { useCategory } from "../hooks/useCategory"
import { useEditorials } from "../hooks/useEditorials"
import { useAuthors } from "../hooks/useAuthors"

export default function AgregarLibro() {
  const { categories = [], loading: loadingCat } = useCategory()
  const { editorials = [], loading: loadingEd } = useEditorials()
  const { authors = [], loading: loadingAut } = useAuthors()

  const [form, setForm] = useState({
    nombre: "",
    categoriaId: "",
    autorId: "",
    editorialId: "",
    idioma: "",
    anno: "",
    descripcion: "",
    stock: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const categoriaOptions = useMemo(
    () =>
      categories.map((c) =>
        typeof c === "string"
          ? { value: c, label: c }
          : { value: c.id, label: c.nombre }
      ),
    [categories]
  )

  const editorialOptions = useMemo(
    () =>
      editorials.map((e) =>
        typeof e === "string"
          ? { value: e, label: e }
          : { value: e.id, label: e.nombre }
      ),
    [editorials]
  )

  const autorOptions = useMemo(
    () =>
      authors.map((a) =>
        typeof a === "string"
          ? { value: a, label: a }
          : { value: a.id, label: a.nombre }
      ),
    [authors]
  )

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
        descripcion: form.descripcion.trim(),
        stock: Number(form.stock),
        editorial: form.editorialId ? Number(form.editorialId) : null,
        autor: form.autorId ? Number(form.autorId) : null,
        idioma: form.idioma?.trim() || null,
        anno: form.anno?.toString().trim() || null,
        categoriaId: form.categoriaId ? Number(form.categoriaId) : undefined,
      }

      await createBook(payload)
      alert("📚 Libro agregado correctamente")

      setForm({
        nombre: "",
        categoriaId: "",
        autorId: "",
        editorialId: "",
        idioma: "",
        anno: "",
        descripcion: "",
        stock: "",
      })
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

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Primera fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Título del libro"
                required
                className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              {/* Categoría */}
              <select
                name="categoriaId"
                value={form.categoriaId}
                onChange={handleChange}
                required
                disabled={loadingCat}
                className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  {loadingCat ? "Cargando categorías…" : "Categoría"}
                </option>
                {categoriaOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Autor */}
              <select
                name="autorId"
                value={form.autorId}
                onChange={handleChange}
                required
                disabled={loadingAut}
                className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  {loadingAut ? "Cargando autores…" : "Autor"}
                </option>
                {autorOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="anno"
                value={form.anno}
                onChange={handleChange}
                placeholder="Año (ej. 2020)"
                className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Segunda fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Editorial */}
              <select
                name="editorialId"
                value={form.editorialId}
                onChange={handleChange}
                required
                disabled={loadingEd}
                className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  {loadingEd ? "Cargando editoriales…" : "Editorial"}
                </option>
                {editorialOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              {/* Idioma */}
              <input
                type="text"
                name="idioma"
                value={form.idioma}
                onChange={handleChange}
                placeholder="Idioma (p. ej. Español)"
                className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-4 text-gray-800 placeholder-gray-400 focus:bg-white focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />

              {/* Espaciadores */}
              <div className="hidden lg:block" />
              <div className="hidden lg:block" />
            </div>

            {/* Descripción + Stock */}
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

            {/* Botón guardar */}
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
