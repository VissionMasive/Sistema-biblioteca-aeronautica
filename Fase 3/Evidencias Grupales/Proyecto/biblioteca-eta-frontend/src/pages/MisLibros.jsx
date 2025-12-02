import { useEffect } from "react";
import { Link } from "react-router-dom";
import useRequests from "../hooks/useRequests";
import { useAuthContext } from "../context/authContext";
import { useBooks } from "../hooks/useBooks";

export default function MisLibros() {
  const { user } = useAuthContext();
  const { requests, fetchUserRequests, loading, error } = useRequests(false);
  const { books = [] } = useBooks(); 

  useEffect(() => {
    fetchUserRequests(user.id);
  }, [user.id, fetchUserRequests]);

  const libros = requests.filter((r) => r.status === "entregado");
  const nombreUsuario = requests[0]?.usuario_nombre || "Usuario";

  const parseFecha = (fechaStr) => {
    if (!fechaStr) return null;
    const partes = fechaStr.split("-");
    if (partes.length === 3) {
      if (partes[0].length === 4) {
        const [y, m, d] = partes;
        return new Date(Number(y), Number(m) - 1, Number(d));
      }
      if (partes[2].length === 4) {
        const [d, m, y] = partes;
        return new Date(Number(y), Number(m) - 1, Number(d));
      }
    }
    const f = new Date(fechaStr);
    return isNaN(f) ? null : f;
  };

  const formatFecha = (f) => {
    if (!f) return "—";
    const d = String(f.getDate()).padStart(2, "0");
    const m = String(f.getMonth() + 1).padStart(2, "0");
    return `${d}-${m}-${f.getFullYear()}`;
  };

  const fechaLimite = (f) => {
    const base = parseFecha(f);
    if (!base) return "—";
    const limite = new Date(base);
    limite.setDate(limite.getDate() + 30);
    return formatFecha(limite);
  };

  const getPortadaSrc = (r) => {
    const libro = books.find(
      (b) =>
        b.id === r.libro_id || 
        b.id === r.libro?.id   
    );

    const portadaPath =
      libro?.portada_url ||
      r.portada_url || 
      null;

    if (portadaPath) {
      return `http://localhost:3001${portadaPath}`;
    }

    return "/img/covers/aerodinamica.svg";
  };
  console.log(libros)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Mis libros · <span className="text-slate-600">{nombreUsuario}</span>
        </h1>

        <Link
          to="/Alumnos"
          className="px-3 py-2 border rounded bg-white hover:bg-gray-50"
        >
          Volver atrás
        </Link>
      </div>

      {loading ? (
        <div>Cargando…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : libros.length === 0 ? (
        <div className="text-slate-600">No tienes libros en posesión.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {libros.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded shadow hover:shadow-md transition p-3"
            >
              <img
                src={
                  r.portada_url
                    ? `http://localhost:3001${r.portada_url}`
                    : "/img/covers/aerodinamica.svg" 
                }
                alt={`Portada ${r.libro_nombre}`}
                className="h-48 w-full object-cover rounded mb-2"
              />

              <div className="font-medium text-base line-clamp-2 mb-3">
                {r.libro_nombre}
              </div>

              <div className="text-sm text-slate-700 space-y-1">
                <p>
                  Solicitud realizada:{" "}
                  <span className="font-semibold">
                    {formatFecha(parseFecha(r.creado))}
                  </span>
                </p>

                <p>
                  Fecha límite de entrega:{" "}
                  <span className="font-semibold">
                    {fechaLimite(r.terminado)}
                  </span>
                </p>

                <p>
                  Estado:{" "}
                  <span className="text-blue-600 font-semibold">
                    En posesión
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
