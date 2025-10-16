import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

export default function Usuarios() {
  const { token } = useAuthContext();
  const { users, fetchUsers } = useAuth();

  useEffect(() => {
    if (token) fetchUsers(token);
  }, [fetchUsers, token]);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Alumnos</h1>
      <p className="text-slate-600">Accesos rápidos</p>
      <div>
        {users.map((user) => (
          <Link
            to={`/usuario/${user.id}`}
            key={user.id}
            
          >
            <div
              className="p-4 bg-cyan-50 rounded shadow hover:shadow-md transition w-2/3"
            >
              <div className="font-medium">{user.nombre}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
