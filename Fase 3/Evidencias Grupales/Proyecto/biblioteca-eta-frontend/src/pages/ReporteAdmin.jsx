import { useEffect, useMemo, useState } from "react";
import useRequests from "../hooks/useRequests";

export default function ReporteAdmin() {
  const { requests, fetchRequests } = useRequests();

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

 
  const parseFecha = (fechaStr) => {
    if (!fechaStr) return null;

    const partes = fechaStr.split("-");
    if (partes.length === 3) {
      if (partes[0].length === 4) {
        const [yyyy, mm, dd] = partes;
        const f = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
        return isNaN(f) ? null : f;
      }
      if (partes[0].length === 2 && partes[2].length === 4) {
        const [dd, mm, yyyy] = partes;
        const f = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
        return isNaN(f) ? null : f;
      }
    }

    const directa = new Date(fechaStr);
    return isNaN(directa) ? null : directa;
  };

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "—";
    const fecha = parseFecha(fechaStr);
    if (!fecha) return "—";

    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}-${mes}-${año}`;
  };

  
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const parseInputDate = (str) => {
    if (!str) return null;
    const [yyyy, mm, dd] = str.split("-");
    if (!yyyy || !mm || !dd) return null;
    const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    return isNaN(d) ? null : d;
  };

  const filteredRequests = useMemo(() => {
    if (!fechaInicio && !fechaFin) return requests;

    const fi = parseInputDate(fechaInicio);
    const ff = parseInputDate(fechaFin);

    if (fi) fi.setHours(0, 0, 0, 0);
    if (ff) ff.setHours(23, 59, 59, 999);

    return requests.filter((r) => {
      const f = parseFecha(r.creado); 
      if (!f) return true;

      if (fi && f < fi) return false;
      if (ff && f > ff) return false;

      return true;
    });
  }, [requests, fechaInicio, fechaFin]);

  const limpiarFiltros = () => {
    setFechaInicio("");
    setFechaFin("");
  };


  const handleExportExcel = () => {
    if (!filteredRequests.length) return;

    const headers = [
      "Libro",
      "Usuario",
      "Fecha creación",
      "Fecha término",
      "Status",
      "Mensaje",
    ];

    const rows = filteredRequests.map((r) => [
      r.libro_nombre || "",
      r.usuario_nombre || "",
      formatearFecha(r.creado) || "",
      formatearFecha(r.terminado) || "",
      r.status || "",
      r.mensaje || "",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((field) => `"${String(field ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte_biblioteca.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const totalSolicitudes = filteredRequests.length;
  const totalEntregados = filteredRequests.filter(
    (r) => r.status === "entregado"
  ).length;
  const totalDevueltos = filteredRequests.filter(
    (r) => r.status === "devuelto"
  ).length;
  const totalRechazados = filteredRequests.filter(
    (r) => r.status === "rechazado"
  ).length;

  const librosEnPosesion = filteredRequests.filter(
    (r) => r.status === "entregado"
  );

  const topLibros = useMemo(() => {
    const mapa = new Map();

    filteredRequests.forEach((r) => {
      const clave = r.libro_nombre;
      if (!clave) return;

      if (!mapa.has(clave)) {
        mapa.set(clave, {
          libro: clave,
          total: 0,
          entregados: 0,
        });
      }

      const item = mapa.get(clave);
      item.total += 1;
      if (r.status === "entregado") item.entregados += 1;
    });

    return Array.from(mapa.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [filteredRequests]);

  const topUsuarios = useMemo(() => {
    const mapa = new Map();

    filteredRequests.forEach((r) => {
      const usuario = r.usuario_nombre;
      if (!usuario) return;

      if (!mapa.has(usuario)) {
        mapa.set(usuario, {
          usuario,
          solicitudes: 0,
          entregados: 0,
          devueltos: 0,
        });
      }

      const item = mapa.get(usuario);
      item.solicitudes += 1;
      if (r.status === "entregado") item.entregados += 1;
      if (r.status === "devuelto") item.devueltos += 1;
    });

    return Array.from(mapa.values())
      .sort((a, b) => b.solicitudes - a.solicitudes)
      .slice(0, 5);
  }, [filteredRequests]);

  const totalSolicitudesLibros = useMemo(
    () => topLibros.reduce((sum, l) => sum + l.total, 0),
    [topLibros]
  );
  const maxLibrosSolicitudes = useMemo(
    () => (topLibros.length ? Math.max(...topLibros.map((l) => l.total)) : 0),
    [topLibros]
  );

  const totalSolicitudesUsuarios = useMemo(
    () => topUsuarios.reduce((sum, u) => sum + u.solicitudes, 0),
    [topUsuarios]
  );
  const maxUsuariosSolicitudes = useMemo(
    () =>
      topUsuarios.length
        ? Math.max(...topUsuarios.map((u) => u.solicitudes))
        : 0,
    [topUsuarios]
  );

  const distribucionStatus = useMemo(() => {
    const conteo = filteredRequests.reduce((acc, r) => {
      const st = r.status || "sin_status";
      acc[st] = (acc[st] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(conteo).map(([status, cantidad]) => ({
      status,
      cantidad,
    }));
  }, [filteredRequests]);

  const maxStatusCantidad = useMemo(() => {
    if (!distribucionStatus.length) return 0;
    return Math.max(...distribucionStatus.map((s) => s.cantidad));
  }, [distribucionStatus]);

  const totalStatusCantidad = useMemo(
    () => distribucionStatus.reduce((sum, s) => sum + s.cantidad, 0),
    [distribucionStatus]
  );

  const calcularFechaLimite = (terminadoStr) => {
    const base = parseFecha(terminadoStr);
    if (!base) return "—";
    const limite = new Date(base);
    limite.setDate(limite.getDate() + 30);
    const dd = String(limite.getDate()).padStart(2, "0");
    const mm = String(limite.getMonth() + 1).padStart(2, "0");
    const yyyy = limite.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Reporte general de biblioteca</h1>

      <div className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-end gap-4">
        <div>
          <p className="text-xs uppercase text-slate-500 font-semibold mb-2">
            Filtrar por fecha de creación
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div>
              <label className="block text-xs text-slate-600 mb-1">
                Desde
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-600 mb-1">
                Hasta
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 md:ml-auto">
          <button
            onClick={limpiarFiltros}
            className="px-3 py-2 border rounded text-sm hover:bg-slate-50"
          >
            Limpiar filtros
          </button>
          <button
            onClick={handleExportExcel}
            className="px-3 py-2 rounded bg-green-600 text-white text-sm hover:bg-green-700"
          >
            Exportar a Excel (CSV)
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white rounded shadow p-4">
          <p className="text-xs uppercase text-slate-500 font-semibold">
            Total solicitudes
          </p>
          <p className="text-2xl font-bold text-slate-800 mt-1">
            {totalSolicitudes}
          </p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <p className="text-xs uppercase text-slate-500 font-semibold">
            Libros entregados
          </p>
          <p className="text-2xl font-bold text-blue-700 mt-1">
            {totalEntregados}
          </p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <p className="text-xs uppercase text-slate-500 font-semibold">
            Libros devueltos
          </p>
          <p className="text-2xl font-bold text-purple-700 mt-1">
            {totalDevueltos}
          </p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <p className="text-xs uppercase text-slate-500 font-semibold">
            Rechazados
          </p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {totalRechazados}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Libros más solicitados</h2>
          {topLibros.length === 0 ? (
            <p className="text-sm text-slate-500">Sin datos.</p>
          ) : (
            <>
              <div className="mt-1 mb-4 space-y-2">
                {topLibros.map((l) => {
                  const pctTotal =
                    totalSolicitudesLibros > 0
                      ? (l.total / totalSolicitudesLibros) * 100
                      : 0;
                  const pctWidth =
                    maxLibrosSolicitudes > 0
                      ? (l.total / maxLibrosSolicitudes) * 100
                      : 0;
                  return (
                    <div key={`chart-libro-${l.libro}`}>
                      <div className="flex justify-between text-xs text-slate-600 mb-1">
                        <span className="truncate pr-2">{l.libro}</span>
                        <span>
                          {l.total} ({pctTotal.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded">
                        <div
                          className="h-2 bg-blue-500 rounded"
                          style={{ width: `${pctWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tabla detalle
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-slate-500 border-b">
                  <tr>
                    <th className="text-left py-1">Libro</th>
                    <th className="text-right py-1">Solicitudes</th>
                    <th className="text-right py-1">Entregados</th>
                  </tr>
                </thead>
                <tbody>
                  {topLibros.map((l) => (
                    <tr key={l.libro} className="border-b last:border-0">
                      <td className="py-1 pr-2">{l.libro}</td>
                      <td className="py-1 text-right">{l.total}</td>
                      <td className="py-1 text-right">{l.entregados}</td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </>
          )}
        </div>
<div className="bg-white rounded shadow p-4">
  <h2 className="text-lg font-semibold mb-2">
    Usuarios con más préstamos
  </h2>

  {topUsuarios.length === 0 ? (
    <p className="text-sm text-slate-500">Sin datos.</p>
  ) : (
    <>
      <table className="w-full text-sm">
        <thead className="text-xs uppercase text-slate-500 border-b">
          <tr>
            <th className="text-left py-1">Usuario</th>
            <th className="text-right py-1">Solicitudes</th>
            <th className="text-right py-1">Entregados</th>
            <th className="text-right py-1">Devueltos</th>
          </tr>
        </thead>
        <tbody>
          {topUsuarios.map((u) => (
            <tr key={u.usuario} className="border-b last:border-0">
              <td className="py-1 pr-2">{u.usuario}</td>
              <td className="py-1 text-right">{u.solicitudes}</td>
              <td className="py-1 text-right">{u.entregados}</td>
              <td className="py-1 text-right">{u.devueltos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )}
</div>

      </div>

      <div className="bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Libros actualmente en posesión</h2>

        <table className="w-full text-sm border border-gray-200 rounded">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-2 text-left">LIBRO</th>
              <th className="p-2 text-left">USUARIO</th>
              <th className="p-2 text-left">FECHA CREACIÓN</th>
              <th className="p-2 text-left">FECHA ENTREGA</th>
              <th className="p-2 text-left">FECHA LÍMITE ENTREGA</th>
            </tr>
          </thead>

          <tbody>
            {librosEnPosesion.map((r, idx) => (
              <tr
                key={r.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-slate-50"
                } border-t`}
              >
                <td className="p-2">{r.libro_nombre}</td>
                <td className="p-2">{r.usuario_nombre}</td>
                <td className="p-2">{formatearFecha(r.creado)}</td>
                <td className="p-2">{formatearFecha(r.terminado)}</td>
                <td className="p-2 text-green-600 font-semibold">
                  {calcularFechaLimite(r.terminado)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

<div className="bg-white rounded shadow p-4">
  <h2 className="text-lg font-semibold mb-2">Distribución por estado</h2>

  {distribucionStatus.length === 0 ? (
    <p className="text-sm text-slate-500">Sin datos.</p>
  ) : (
    <>
      {(() => {
        const totalGeneral = distribucionStatus.reduce(
          (acc, s) => acc + s.cantidad,
          0
        );

        return (
          <div className="mt-2 mb-4 space-y-2">
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>TOTAL</span>
                <span>
                  {totalGeneral} (100%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded">
                <div
                  className="h-2 bg-slate-400 rounded"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            {distribucionStatus.map((s) => {
              const porcentaje =
                totalGeneral > 0
                  ? ((s.cantidad / totalGeneral) * 100).toFixed(1)
                  : 0;

              return (
                <div key={s.status}>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>{s.status.toUpperCase()}</span>
                    <span>
                      {s.cantidad} ({porcentaje}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-100 rounded">
                    <div
                      className="h-2 bg-blue-500 rounded"
                      style={{
                        width: `${porcentaje}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* Tabla detalle
      <table className="w-full text-sm">
        <thead className="text-xs uppercase text-slate-500 border-b">
          <tr>
            <th className="text-left py-1">Status</th>
            <th className="text-right py-1">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {distribucionStatus.map((s) => (
            <tr key={s.status} className="border-b last:border-0">
              <td className="py-1 pr-2">{s.status.toUpperCase()}</td>
              <td className="py-1 text-right">{s.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  )}
</div>

    </div>
  );
}
