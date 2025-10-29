import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import { useCategory } from "../hooks/useCategory";
import { useAuthors } from "../hooks/useAuthors";
import { useEditorials } from "../hooks/useEditorials";
import Select from "../components/Select";

export default function Catalogo() {
  const { books = [], loading, error } = useBooks();
  const { categories = [] } = useCategory();
  const { authors = [] } = useAuthors();
  const { editorials = [] } = useEditorials();

  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);

  // Años a partir de los libros cargados
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

  // ===== FILTRADO EN CLIENTE =====
  const filteredBooks = useMemo(() => {
    const title = (filters.nombre || "").trim().toLowerCase();
    const categoria = (filters.categoria || "").toLowerCase();
    const autor = (filters.autor || "").toLowerCase();
    const editorial  = (filters.editorial || "").toLowerCase();
    const year = (filters.anno || "").trim();
    const disp = (filters.disp || "").toUpperCase(); 

    return books.filter((b) => {
      const titulo = (b.nombre || "").toLowerCase();
      const autorNombre = (b.autor_nombre || b.autor || "").toLowerCase();
      const editorialNombre = (b.editorial_nombre || b.editorial || "").toLowerCase();

      // Año del libro en string
      let byear = "";
      if (b.anno) {
        if (typeof b.anno === "string" && /^\d{4}/.test(b.anno)) byear = b.anno.slice(0, 4);
        else if (typeof b.anno === "number") byear = String(b.anno);
        else if (b.anno instanceof Date) byear = String(b.anno.getFullYear());
      }

      // Categorías como nombres en lowercase
      const catNames = Array.isArray(b.categorias)
        ? b.categorias.map((c) => (c?.nombre || "").toLowerCase())
        : [];

      // Disponibilidad (si tu API no trae 'disponible', usa stock)
      const isDisponible =
        typeof b.disponible === "boolean" ? b.disponible : Number(b.stock || 0) > 0;

      // 1) Búsqueda parcial en título o autor
      if (title && !(titulo.includes(title) || autorNombre.includes(title))) return false;

      // 2) Categoría por nombre
      if (categoria && !catNames.some((n) => n.includes(categoria))) return false;

      // 3) Autor por nombre
      if (autor && !autorNombre.includes(autor)) return false;

      // 4) Editorial por nombre
      if (editorial&& !editorialNombre.includes(editorial)) return false;

      // 5) Año exacto
      if (year && byear !== year) return false;

      // 6) Disponibilidad
      if (disp === "SI" && !isDisponible) return false;
      if (disp === "NO" && isDisponible) return false;

      return true;
    });
  }, [books, filters]);
  // ================================

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Catálogo</h1>

      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <button
          onClick={() => setOpen((o) => !o)}
          className="px-4 py-2 rounded border bg-white shadow-sm w-full md:w-auto text-left md:text-center"
        >
          {open ? "Ocultar filtros" : "Filtros"}
        </button>

        {/* Búsqueda parcial título/autor */}
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
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <Link
              to={`/libro/${book.id ?? book.libro_id}`}
              key={book.id ?? book.libro_id}
              className="bg-white rounded shadow hover:shadow-md transition p-3"
            >
              <img
                src="/img/covers/aerodinamica.svg"
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

              <div className="text-xs text-slate-500">
                {Array.isArray(book.categorias) && book.categorias.length > 0 ? (
                  book.categorias.map((cat, idx) => (
                    <span key={cat.id ?? `${cat.nombre}-${idx}`} className="mr-1">
                      {cat.nombre}
                    </span>
                  ))
                ) : (
                  <span>—</span>
                )}
                {" · "}
                {(typeof book.disponible === "boolean"
                  ? book.disponible
                  : Number(book.stock || 0) > 0)
                  ? "Disponible"
                  : "No disponible"}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
