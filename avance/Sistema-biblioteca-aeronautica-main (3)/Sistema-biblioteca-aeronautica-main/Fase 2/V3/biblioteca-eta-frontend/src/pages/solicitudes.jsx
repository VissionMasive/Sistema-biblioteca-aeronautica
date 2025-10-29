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
    const payload = {
      terminado: new Date().toISOString(),
      mensaje: msg,
      status,
    };

    await requestUpdate(id, payload);
    setIsOpen(false);
    await fetchRequests();
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-7 items-center px-4 py-3
                      bg-slate-800 text-white font-semibold uppercase
                      text-xs tracking-wide rounded-t-lg">
        <span className="text-left">Libro</span>
        <span className="text-left">Usuario</span>
        <span className="text-left">Fecha creación</span>
        <span className="text-left">Fecha término</span>
        <span className="text-left">Mensaje</span>
        <span className="text-left">Status</span>
        <span className="text-center">Acciones</span>
      </div>

      <div className="divide-y divide-slate-200">
        {requests.map((request, idx) => (
          <div
            key={request.id}
            className={`grid grid-cols-7 items-center px-4 py-3 text-sm
                        ${idx % 2 === 0 ? "bg-slate-50" : "bg-slate-100"}
                        hover:bg-slate-200/70 transition-colors`}
          >
            <span className="text-slate-800">{request.libro_nombre}</span>
            <span className="text-slate-700">{request.usuario_nombre}</span>
            <span className="text-slate-700">{request.creado || "—"}</span>
            <span className="text-slate-700">{request.terminado || "—"}</span>
            <span className="text-slate-700">{request.mensaje || "—"}</span>
            <span
              className={`font-medium ${
                request.status === "aceptado"
                  ? "text-green-700"
                  : request.status === "rechazado"
                  ? "text-red-600"
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
                      onClick={(e) => handleOpenModal(e, "Aceptar", request.id)}
                      className="w-full rounded px-2 py-1 text-left hover:bg-white/10"
                    >
                      Aceptar
                    </Button>
                    <Button
                      onClick={(e) => handleOpenModal(e, "Rechazar", request.id)}
                      className="w-full rounded px-2 py-1 text-left hover:bg-white/10"
                    >
                      Rechazar
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
