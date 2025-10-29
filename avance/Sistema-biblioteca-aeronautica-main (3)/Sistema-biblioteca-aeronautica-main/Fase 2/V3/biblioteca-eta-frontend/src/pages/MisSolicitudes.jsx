import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useRequests from "../hooks/useRequests";
import { useAuthContext } from "../context/authContext";

export default function MisSolicitudes() {
  const { user } = useAuthContext(); 
  const { requests, fetchUserRequests, loading, error } = useRequests(false);

  useEffect(() => {
    fetchUserRequests(user.id);
  }, [user.id, fetchUserRequests]);

  const nombreUsuario = requests[0]?.usuario_nombre || "Usuario";
  

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Historial de solicitudes · <span className="text-slate-600">{nombreUsuario}</span>
        </h1>
        <Link to="/Alumnos" className="px-3 py-2 border rounded hover:bg-gray-50">
          Volver atrás
        </Link>
      </div>

      {loading ? (
        <div>Cargando…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : requests.length === 0 ? (
        <div className="text-slate-600">Sin solicitudes para este usuario.</div>
      ) : (
        <table className="w-full text-sm border border-gray-200 rounded">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-2 text-left">Libro</th>
              <th className="p-2 text-left">Fecha creación</th>
              <th className="p-2 text-left">Fecha término</th>
              <th className="p-2 text-left">Mensaje</th>
              <th className="p-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id} className="odd:bg-white even:bg-slate-50">
                <td className="p-2">{r.libro_nombre}</td>
                <td className="p-2">{r.creado}</td>
                <td className="p-2">{r.terminado || "—"}</td>
                <td className="p-2">{r.mensaje || "—"}</td>
                <td
                  className={`p-2 font-semibold ${
                    r.status === "aceptado"
                      ? "text-green-600"
                      : r.status === "rechazado"
                      ? "text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
