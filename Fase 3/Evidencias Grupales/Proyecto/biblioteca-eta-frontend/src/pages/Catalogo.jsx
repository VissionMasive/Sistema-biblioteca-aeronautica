import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import { useCategory } from "../hooks/useCategory";
import { useAuthors } from "../hooks/useAuthors";
import { useEditorials } from "../hooks/useEditorials";
import Select from "../components/Select";
import { useAuthContext } from "../context/authContext";


export default function Catalogo() {
  const { books = [], loading, error } = useBooks();
  const { categories = [] } = useCategory();
  const { authors = [] } = useAuthors();
  const { editorials = [] } = useEditorials();
  const { user } = useAuthContext();
  

  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);

  // 👇 nueva state: modo de vista ("cards" | "stock")
  const [viewMode, setViewMode] = useState("cards");

  const annos = useMemo(() => {
    const years = new Set();
    for (const b of books) {
      if (!b?.anno) continue;
      let y = b.anno;
      if (typeof y === "string" && /^\d{4}/.test(y)) y = y.slice(0, 4);
      else if (y instanceof Date) y = String(y.getFullYear());
      else if (typeof y === "number") y = String(y);
      if (y) years.add(y);
    }
    return Array.from(years).sort();
  }, [books]);

  const cleanFilters = () => setFilters({});

  const handleFilter = (key, value) => {
    setFilters((prev) => {
      const v = typeof value === "string" ? value : "";
      if (!v || v.trim() === "") {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      }
      return { ...prev, [key]: v };
    });
  };

  const filteredBooks = useMemo(() => {
    const title = (filters.nombre || "").trim().toLowerCase();
    const categoria = (filters.categoria || "").toLowerCase();
    const autor = (filters.autor || "").toLowerCase();
    const editorial = (filters.editorial || "").toLowerCase();
    const year = (filters.anno || "").trim();
    const disp = (filters.disp || "").toUpperCase();

    return books.filter((b) => {
      const titulo = (b.nombre || "").toLowerCase();
      const autorNombre = (b.autor_nombre || b.autor || "").toLowerCase();
      const editorialNombre = (
        b.editorial_nombre ||
        b.editorial ||
        ""
      ).toLowerCase();

      let byear = "";
      if (b.anno) {
        if (typeof b.anno === "string" && /^\d{4}/.test(b.anno))
          byear = b.anno.slice(0, 4);
        else if (typeof b.anno === "number") byear = String(b.anno);
        else if (b.anno instanceof Date) byear = String(b.anno.getFullYear());
      }

      const catNames = Array.isArray(b.categorias)
        ? b.categorias.map((c) => (c?.nombre || "").toLowerCase())
        : [];

      const isDisponible =
        typeof b.disponible === "boolean"
          ? b.disponible
          : Number(b.stock || 0) > 0;

      if (title && !(titulo.includes(title) || autorNombre.includes(title)))
        return false;

      if (categoria && !catNames.some((n) => n.includes(categoria)))
        return false;

      if (autor && !autorNombre.includes(autor)) return false;

      if (editorial && !editorialNombre.includes(editorial)) return false;

      if (year && byear !== year) return false;

      if (disp === "SI" && !isDisponible) return false;
      if (disp === "NO" && isDisponible) return false;

      return true;
    });
  }, [books, filters]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-semibold">Catálogo</h1>

        {/* 🔀 Switch vista catálogo / vista stock */}
        <div className="inline-flex rounded border bg-white shadow-sm overflow-hidden text-sm">
          <button
            onClick={() => setViewMode("cards")}
            className={
              "px-3 py-1.5 " +
              (viewMode === "cards"
                ? "bg-slate-800 text-white"
                : "text-slate-700 hover:bg-slate-100")
            }
          >
            Vista catálogo
          </button>
          {user?.role === "admin" && (
            <button
              onClick={() => setViewMode("stock")}
              className={
                "px-3 py-1.5 border-l " +
                (viewMode === "stock"
                  ? "bg-slate-800 text-white"
                  : "text-slate-700 hover:bg-slate-100")
              }
            >
              Vista stock
            </button>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <button
          onClick={() => setOpen((o) => !o)}
          className="px-4 py-2 rounded border bg-white shadow-sm w-full md:w-auto text-left md:text-center"
        >
          {open ? "Ocultar filtros" : "Filtros"}
        </button>

        <input
          className="border rounded p-2 flex-1"
          placeholder="Buscar por título o autor"
          value={filters.nombre || ""}
          onChange={(e) => handleFilter("nombre", e.target.value)}
        />
      </div>

      {open && (
        <div className="bg-white rounded shadow p-4 grid md:grid-cols-5 gap-2">
          <Select
            label="Categoría"
            list={categories}
            onChange={(value) => handleFilter("categoria", value)}
            valor={filters.categoria || ""}
          />
          <Select
            label="Autor"
            list={authors}
            onChange={(value) => handleFilter("autor", value)}
            valor={filters.autor || ""}
          />
          <Select
            label="Editorial"
            list={editorials}
            onChange={(value) => handleFilter("editorial", value)}
            valor={filters.editorial || ""}
          />
          <Select
            label="Año"
            list={annos}
            onChange={(value) => handleFilter("anno", value)}
            valor={filters.anno || ""}
          />
          <Select
            label="Disponibilidad"
            list={["Si", "No"]}
            onChange={(value) => handleFilter("disp", value)}
            valor={filters.disp || ""}
          />

          <div className="md:col-span-5 flex gap-2">
            <button onClick={cleanFilters} className="px-3 py-2 border rounded">
              Limpiar
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div>Cargando...</div>
      ) : error ? (
        <div className="text-red-600">Error cargando libros</div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-slate-600 text-sm">
          No se encontraron libros con los filtros aplicados.
        </div>
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => {
            const disponible =
              typeof book.disponible === "boolean"
                ? book.disponible
                : Number(book.stock || 0) > 0;

            const stock = Number(book.stock || 0);

            return (
              <Link
                to={`/libro/${book.id ?? book.libro_id}`}
                key={book.id ?? book.libro_id}
                className="bg-white rounded shadow hover:shadow-md transition p-3"
              >
                <img
                  src={
                    book.portada_url
                      ? `http://localhost:3001${book.portada_url}`
                      : "/img/covers/aerodinamica.svg"
                  }
                  alt={`Portada ${book.nombre}`}
                  className="h-48 w-full object-cover rounded mb-2"
                />

                <div className="font-medium line-clamp-2">{book.nombre}</div>

                <div className="text-sm text-slate-600">
                  {book.autor_nombre || book.autor || "—"}
                </div>
                <div className="text-sm text-slate-600">
                  {book.editorial_nombre || book.editorial || "—"}
                </div>

                <div className="text-xs text-slate-500 mt-1">
                  {Array.isArray(book.categorias) &&
                  book.categorias.length > 0 ? (
                    book.categorias.map((cat, idx) => (
                      <span
                        key={cat.id ?? `${cat.nombre}-${idx}`}
                        className="mr-1"
                      >
                        {cat.nombre}
                      </span>
                    ))
                  ) : (
                    <span>—</span>
                  )}
                </div>

                <div className="text-xs text-slate-600 mt-1">
                  {disponible ? (
                    <span>
                      <span className="text-green-700 font-semibold">
                        Disponible
                      </span>
                      {` · Stock: ${stock}`}
                    </span>
                  ) : (
                    <span>
                      <span className="text-red-600 font-semibold">
                        No disponible
                      </span>
                      {` · Stock: ${stock}`}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-3">Resumen de stock</h2>
          <table className="w-full text-sm border border-slate-200 rounded">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500">
              <tr>
                <th className="p-2 text-left">Portada</th>
                <th className="p-2 text-left">Libro</th>
                <th className="p-2 text-left">Autor</th>
                <th className="p-2 text-left">Editorial</th>
                <th className="p-2 text-left">Categorías</th>
                <th className="p-2 text-right">Stock</th>
                <th className="p-2 text-center">Disponibilidad</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, idx) => {
                const disponible =
                  typeof book.disponible === "boolean"
                    ? book.disponible
                    : Number(book.stock || 0) > 0;

                const stock = Number(book.stock || 0);
                const categoriasTexto = Array.isArray(book.categorias)
                  ? book.categorias.map((c) => c?.nombre).join(", ")
                  : "—";

                return (
                  <tr
                    key={book.id ?? book.libro_id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="p-2">
                      <img
                        src={
                          book.portada_url
                            ? `http://localhost:3001${book.portada_url}`
                            : "/img/covers/aerodinamica.svg"
                        }
                        alt={`Portada ${book.nombre}`}
                        className="h-12 w-8 object-cover rounded mx-auto"
                      />
                    </td>
                    <td className="p-2">{book.nombre}</td>
                    <td className="p-2">
                      {book.autor_nombre || book.autor || "—"}
                    </td>
                    <td className="p-2">
                      {book.editorial_nombre || book.editorial || "—"}
                    </td>
                    <td className="p-2">{categoriasTexto || "—"}</td>
                    <td className="p-2 text-right">{stock}</td>
                    <td className="p-2 text-center">
                      {disponible ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-semibold">
                          Disponible
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700 font-semibold">
                          No disponible
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
