import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import { useCategory } from "../hooks/useCategory";
import { useAuthors } from "../hooks/useAuthors";
import { useEditorials } from "../hooks/useEditorials";
import Select from "../components/Select";
import data from "../data/catalog.json"; // eliminar despues de agregar annos al BD

export default function Catalogo() {
  const { books, loading, error } = useBooks();
  const { categories } = useCategory();
  const { authors } = useAuthors();
  const { editorials } = useEditorials();
  const [ filters, setFilters ] = useState({});

  const [open, setOpen] = useState(false);

  const annos = useMemo(
    () => Array.from(new Set(data.map((d) => d.anno))).sort((a, b) => a - b),
    []
  );
console.log(books)

  const cleanFilters = () => {
    setFilters({});
  };

  const handleFilter = (key, value) => {
    setFilters((prev) => {
      if (value === "" || value === null) {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }

      return { ...prev, [key]: value };
    });
  };

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
            label="categoría"
            list={categories}
            onChange={(value) => handleFilter("categoria", value)}
            valor={filters.categoria || ""}
          />
          <Select
            label="autor"
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
            label="año"
            list={annos}
            onChange={(value) => handleFilter("anno", value)}
            valor={filters.anno || ""}
          />
          <Select
            label="DISPONIBILIDAD"
            list={["SI", "NO"]}
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
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <Link
              to={`/libro/${book.libro_id}`}
              key={book.libro_id}
              className="bg-white rounded shadow hover:shadow-md transition p-3"
            >
              <img
                src="/img/covers/aerodinamica.svg"
                alt={`Portada ${book.nombre}`}
                className="h-48 w-full object-cover rounded mb-2"
              />
              <div className="font-medium line-clamp-2">{book.nombre}</div>
              <div className="text-sm text-slate-600">{book.autor}</div>
              <div className="text-xs text-slate-500">
                {book.categorias.map((cat) => (
                  <span>{cat.nombre}</span>
                ))}
                {book.disponible ? "· Disponible" : "· No disponible"}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}