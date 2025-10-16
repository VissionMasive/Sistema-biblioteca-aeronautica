import { Link } from "react-router-dom";
import { FaUser, FaBook } from "react-icons/fa";
import { FaBookMedical, FaGears } from "react-icons/fa6";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";

export default function Docentes() {
  const { token } = useAuthContext();
  const { users, fetchUsers, user } = useAuth(false);

  useEffect(() => {
    if (token) fetchUsers(token)
  }, [fetchUsers, token])
  
  const accesos = [
    { label: "Usuarios", to: "/usuarios", icon: <FaUser className="h-20 w-20 text-slate-700 mx-auto mt-8" /> },
    { label: "Libros", to: "/normativa-docente", icon: <FaBook className="h-20 w-20 text-slate-700 mx-auto mt-8" /> },
    { label: "Solicitudes", to: "/solicitudes", icon: <FaBookMedical className="h-20 w-20 text-slate-700 mx-auto mt-8" /> },
    { label: "Configuracion", to: "/reglamentacion", icon: <FaGears className="h-20 w-20 text-slate-700 mx-auto mt-8" /> },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Docentes</h1>
      <p className="text-slate-600">Accesos rápidos</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accesos.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="p-4 bg-white rounded shadow hover:shadow-md transition h-48 "
          >
            <div className="h-40 flex flex-col items-center justify-center">
              {a.icon}
              <span className="mt-4 text-lg font-medium text-slate-700">

              {a.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
