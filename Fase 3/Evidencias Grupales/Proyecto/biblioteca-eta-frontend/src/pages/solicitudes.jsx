import { useState } from "react";
import useRequests from "../hooks/useRequests";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Button,
} from "@headlessui/react";
import ModalAction from "../components/ModalAction";

export default function Solicitudes() {
  const { requests, requestUpdate, fetchRequests } = useRequests();
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("");
  const [id, setId] = useState();

  const [statusFilter, setStatusFilter] = useState("todos");

  
  const parseFecha = (str) => {
    if (!str || str === "—") return null;
    const partes = str.split("-");
    if (partes.length !== 3) return null;
    const [dd, mm, yyyy] = partes;
    const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    return isNaN(d) ? null : d;
  };

  const formatFecha = (date) => {
    if (!date) return "—";
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  
  const calcularFechaLimite = (terminadoStr) => {
    const base = parseFecha(terminadoStr);
    if (!base) return "—";
    const limite = new Date(base);
    limite.setDate(limite.getDate() + 30);
    return formatFecha(limite);
  };

  
  const statusCounts = requests.reduce((acc, r) => {
    if (!r.status) return acc;
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  
  const statusOptions = ["todos", ...Object.keys(statusCounts)];

  // Filtrar según status elegido
  const filteredRequests =
    statusFilter === "todos"
      ? requests
      : requests.filter((r) => r.status === statusFilter);

  const handleOpenModal = (e, a, id) => {
    e.preventDefault();
    setId(id);
    setAnswer(a);
    setIsOpen(true);
  };

  const handleChangeMsg = (value) => setMsg(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let status = "";
    if (answer === "Aceptar") status = "aceptado";
    if (answer === "Rechazar") status = "rechazado";
    if (answer === "Entregar") status = "entregado";
    if (answer === "Devolver") status = "devuelto";

    const payload = {
      terminado: new Date().toISOString(),
      mensaje: msg,
      status,
    };

    await requestUpdate(id, payload);
    setIsOpen(false);
    setMsg("");
    await fetchRequests();
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* CABECERA */}
      <div
        className="grid grid-cols-8 items-center px-4 py-3
                    bg-slate-800 text-white font-semibold uppercase
                    text-xs tracking-wide rounded-t-lg"
      >
        <span className="text-left">Libro</span>
        <span className="text-left">Usuario</span>
        <span className="text-left">Fecha creación</span>
        <span className="text-left">Fecha término</span>
        <span className="text-left">Fecha límite entrega</span>
        <span className="text-left">Mensaje</span>

        {/* STATUS como botón con contador */}
        <Popover className="relative flex">
          <PopoverButton className="rounded px-2 py-1 hover:bg-slate-700 focus:outline-none">
            {statusFilter === "todos"
              ? `STATUS`
              : statusFilter.toUpperCase()}
          </PopoverButton>

        <PopoverPanel
          anchor="bottom"
          className="z-20 mt-2 w-48 rounded-md bg-slate-700 p-2 text-white shadow-lg"
        >
          <div className="space-y-1 text-[11px]">
            {statusOptions.map((st) => {
              const isTodos = st === "todos";
              const label = isTodos
                ? `TODOS (${requests.length})`
                : `${st.toUpperCase()} (${statusCounts[st] || 0})`;

              return (
                <Button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`w-full rounded px-2 py-1 text-left hover:bg-white/10 ${
                    statusFilter === st ? "bg-white/10 font-semibold" : ""
                  }`}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </PopoverPanel>
      </Popover>

        <span className="text-center">Acciones</span>
      </div>

      {/* FILAS */}
      <div className="divide-y divide-slate-200">
        {filteredRequests.map((request, idx) => (
          <div
            key={request.id}
            className={`grid grid-cols-8 items-center px-4 py-3 text-sm
                        ${idx % 2 === 0 ? "bg-slate-50" : "bg-slate-100"}
                        hover:bg-slate-200/70 transition-colors`}
          >
            <span className="text-slate-800">{request.libro_nombre}</span>
            <span className="text-slate-700">{request.usuario_nombre}</span>
            <span className="text-slate-700">{request.creado || "—"}</span>
            <span className="text-slate-700">{request.terminado || "—"}</span>

            {/* 🔥 Fecha límite calculada en el front */}
            <span className="text-green-700 font-medium">
              {calcularFechaLimite(request.terminado)}
            </span>

            <span className="text-slate-700">{request.mensaje || "—"}</span>

            <span
              className={`font-medium ${
                request.status === "aceptado"
                  ? "text-green-700"
                  : request.status === "rechazado"
                  ? "text-red-600"
                  : request.status === "entregado"
                  ? "text-blue-600"
                  : request.status === "devuelto"
                  ? "text-purple-600"
                  : "text-slate-700"
              }`}
            >
              {request.status.toUpperCase()}
            </span>

            <div className="flex justify-center">
              <Popover className="relative">
                <PopoverButton className="rounded-md bg-green-600 px-3 py-1.5 text-white text-xs font-medium hover:bg-green-700 focus:outline-none">
                  Acciones
                </PopoverButton>
                <PopoverPanel
                  anchor="bottom"
                  className="z-10 mt-2 w-40 rounded-md bg-slate-700 p-2 text-white shadow-lg"
                >
                  <div className="space-y-1">
                    <Button
                      onClick={(e) =>
                        handleOpenModal(e, "Aceptar", request.id)
                      }
                      className="w-full rounded px-2 py-1 text-left hover:bg-white/10"
                    >
                      Aceptar
                    </Button>
                    <Button
                      onClick={(e) =>
                        handleOpenModal(e, "Rechazar", request.id)
                      }
                      className="w-full rounded px-2 py-1 text-left hover:bg-white/10"
                    >
                      Rechazar
                    </Button>
                    <Button
                      onClick={(e) =>
                        handleOpenModal(e, "Entregar", request.id)
                      }
                      className="w-full rounded px-2 py-1 text-left hover:bg-white/10"
                    >
                      Entregar
                    </Button>
                    <Button
                      onClick={(e) =>
                        handleOpenModal(e, "Devolver", request.id)
                      }
                      className="w-full rounded px-2 py-1 text-left hover:bg-white/10"
                    >
                      Devolver
                    </Button>
                  </div>
                </PopoverPanel>
              </Popover>
            </div>
          </div>
        ))}
      </div>

      <ModalAction
        answer={answer}
        handleOpenModal={handleOpenModal}
        handleChangeMsg={handleChangeMsg}
        msg={msg}
        isOpen={isOpen}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
