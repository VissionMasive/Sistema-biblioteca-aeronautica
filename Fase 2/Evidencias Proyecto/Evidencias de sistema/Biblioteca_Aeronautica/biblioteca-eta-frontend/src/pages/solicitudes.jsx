import useRequests from "../hooks/useRequests";



export default function Solicitudes() {
  const { requests } = useRequests();
  return (
    <div>
      <div className="grid grid-cols-7 ">
        <span>Libro</span>
        <span>usuario</span>
        <span>fecha creacion</span>
        <span>fecha termino</span>
        <span>mensaje</span>
        <span>status</span>
        <span>Acciones</span>
      </div>
      {requests.map((request) => (
        <div className="grid grid-cols-7 " key={request.id}>
          <span>{request.libro_nombre}</span>
          <span>{request.usuario_nombre}</span>
          <span>{request.creado}</span>
          <span>{request.terminado}</span>
          <span>{request.mensaje}</span>
          <span>{request.status}</span>
          <div>
            <button className="px-4 py-2 bg-primary text-white rounded disabled:opacity-60 ">+</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-60 ">-</button>
          </div>
        </div>
      ))}
    </div>
  );
}
