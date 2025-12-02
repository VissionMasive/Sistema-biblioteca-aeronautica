import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import { useAuthContext } from "../context/authContext";

export default function Detalle() {
  const { id } = useParams();
  const { book, getBooksid, reqBook, loading, error } = useBooks();
  const { user } = useAuthContext();

  const nav = useNavigate();

  useEffect(() => {
    getBooksid(id);
  }, [id, getBooksid]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!user || !book) return alert("Debes iniciar sesión");
    const res = await reqBook(book.id, user.id);
    alert(res.message);
    await getBooksid(id);
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow text-center">
        Cargando libro...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded shadow text-red-600 text-center">
        Error al cargar el libro.
      </div>
    );
  }

  if (!book) {
    return (
      <div className="bg-white p-4 rounded shadow text-center">
        Libro no encontrado.
      </div>
    );
  }

  const coverUrl = book.portada_url
    ? `http://localhost:3001${book.portada_url}`
    : "/img/covers/aerodinamica.svg";

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <img
            src={coverUrl}
            alt={`Portada ${book.nombre}`}
            className="w-full max-w-md rounded object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{book.nombre}</h1>

          <div className="text-slate-600">
            {book.autor_nombre || "Autor desconocido"} ·{" "}
            {book.editorial_nombre || "Editorial desconocida"} ·{" "}
            {book.anno ? new Date(book.anno).getFullYear() : "Sin año"}
          </div>

          <div className="text-slate-500 text-sm flex flex-wrap gap-2 mt-1">
            {Array.isArray(book.categorias) && book.categorias.length > 0 ? (
              book.categorias.map((cat, index) => (
                <span key={cat.id ?? index} className="mr-2">
                  {cat.nombre}
                </span>
              ))
            ) : (
              <span>Sin categoría</span>
            )}

            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                Number(book.stock) > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              Stock: {Number.isFinite(Number(book.stock)) ? book.stock : 0}
            </span>
          </div>

  

          <div className="mt-4 flex gap-3">
            {user?.role === "alumno" && (
              <button
                onClick={handlesubmit}
                className="px-4 py-2 bg-primary text-white rounded disabled:opacity-60"
                disabled={!Number(book.stock) || Number(book.stock) <= 0}
                title={
                  Number(book.stock) > 0
                    ? "Reservar libro"
                    : "No disponible para préstamo"
                }
              >
                Solicitar
              </button>
            )}
            <button
              onClick={() => nav(-1)}
              className="px-4 py-2 border rounded"
            >
              Volver
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="font-semibold mb-2">Descripción</div>
        <p className="text-slate-700">{book.descripcion}</p>
      </div>
    </div>
  );
}
