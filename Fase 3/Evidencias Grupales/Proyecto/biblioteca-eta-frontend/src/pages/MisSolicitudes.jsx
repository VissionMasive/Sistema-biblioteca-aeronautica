import { useEffect } from "react";
import { Link } from "react-router-dom";
import useRequests from "../hooks/useRequests";
import { useAuthContext } from "../context/authContext";

export default function MisSolicitudes() {
  const { user } = useAuthContext();
  const { requests, fetchUserRequests, loading, error } = useRequests(false);

  useEffect(() => {
    fetchUserRequests(user.id);
  }, [user.id, fetchUserRequests]);

  const nombreUsuario = requests[0]?.usuario_nombre || "Usuario";

  // 👉 Parser genérico: acepta "2025-10-23" o "23-10-2025"
  const parseFecha = (fechaStr) => {
    if (!fechaStr) return null;

    const partes = fechaStr.split("-");
    if (partes.length === 3) {
      // YYYY-MM-DD
      if (partes[0].length === 4) {
        const [yyyy, mm, dd] = partes;
        const f = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
        return isNaN(f) ? null : f;
      }
      // DD-MM-YYYY
      if (partes[0].length === 2 && partes[2].length === 4) {
        const [dd, mm, yyyy] = partes;
        const f = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
        return isNaN(f) ? null : f;
      }
    }

    const directa = new Date(fechaStr);
    return isNaN(directa) ? null : directa;
  };

  // 👉 Formatear SIEMPRE a DD-MM-YYYY (y soportar ambos formatos de entrada)
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "—";
    const fecha = parseFecha(fechaStr);
    if (!fecha) return "—";

    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}-${mes}-${año}`;
  };

  // 👉 Sumar 10 días a fecha término y decidir color
  const getFechaLimiteInfo = (fechaTermino) => {
    const base = parseFecha(fechaTermino);
    if (!base) return { texto: "—", clase: "text-gray-500" };

    const limite = new Date(base);
    limite.setDate(limite.getDate() + 30);

    // Comparar solo por día
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    limite.setHours(0, 0, 0, 0);

    const diffDias = Math.round((limite - hoy) / (1000 * 60 * 60 * 24));

    let clase = "text-green-600"; // dentro del plazo
    if (diffDias < 0) {
      clase = "text-red-600 font-semibold"; // vencido
    } else if (diffDias <= 3) {
      clase = "text-yellow-600 font-semibold"; // se vence pronto
    }

    // Formateamos límite a DD-MM-YYYY
    const dia = String(limite.getDate()).padStart(2, "0");
    const mes = String(limite.getMonth() + 1).padStart(2, "0");
    const año = limite.getFullYear();
    const texto = `${dia}-${mes}-${año}`;

    return { texto, clase };
  };

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
              <th className="p-2 text-left">Fecha límite entrega</th>
              <th className="p-2 text-left">Mensaje</th>
              <th className="p-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => {
              const { texto: fechaLimite, clase: claseLimite } =
                getFechaLimiteInfo(r.terminado);

              return (
                <tr key={r.id} className="odd:bg-white even:bg-slate-50">
                  <td className="p-2">{r.libro_nombre}</td>

                  {/* Fechas formateadas a DD-MM-YYYY (soporta ambos formatos de entrada) */}
                  <td className="p-2">{formatearFecha(r.creado)}</td>
                  <td className="p-2">{formatearFecha(r.terminado)}</td>

                  {/* Fecha límite + color según plazo */}
                  <td className={`p-2 ${claseLimite}`}>{fechaLimite}</td>

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
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
