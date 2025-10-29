import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/authContext";

// Helpers visuales
const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("") || "U";

const gradientFromName = (name = "") => {
  const grads = [
    "from-sky-400 to-sky-600",
    "from-emerald-400 to-emerald-600",
    "from-rose-400 to-rose-600",
    "from-violet-400 to-violet-600",
    "from-amber-400 to-amber-600",
    "from-fuchsia-400 to-fuchsia-600",
    "from-blue-400 to-blue-600",
    "from-teal-400 to-teal-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = (hash << 5) - hash + name.charCodeAt(i);
  return grads[Math.abs(hash) % grads.length];
};

export default function Usuarios() {
  const { token } = useAuthContext();
  const { users = [], fetchUsers, loading } = useAuth(); // si tu hook no expone loading, quítalo

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token) fetchUsers(token);
  }, [fetchUsers, token]);

  const filteredUsers = useMemo(() => {
    const user = search.trim().toLowerCase();
    if (!user) return users;
    return users.filter((u) => (u?.nombre || "").toLowerCase().includes(user));
  }, [users, search]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Alumnos
          </h1>
          <p className="text-slate-600">
            Accede rápidamente al historial de solicitudes de cada usuario.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-sm text-slate-500">
            {filteredUsers.length} resultado
            {filteredUsers.length === 1 ? "" : "s"}
          </div>
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre…"
              className="w-64 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
            />
            <span className="pointer-events-none absolute right-3 top-2.5 text-slate-400">
              ⌕
            </span>
          </div>
        </div>
      </div>

      {/* Contenedor listado */}
      <div className="rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
          <span className="text-sm font-medium text-slate-700">
            Accesos rápidos
          </span>
          <span className="text-xs text-slate-500">
            Click para ver historial
          </span>
        </div>

        <ul className="divide-y divide-slate-100">
          {/* Estado: cargando (skeleton) */}
          {loading &&
            [...Array(5)].map((_, i) => (
              <li
                key={i}
                className="px-5 py-4 flex items-center gap-4 animate-pulse"
              >
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div className="h-4 w-40 rounded bg-slate-200" />
              </li>
            ))}

          {/* Estado: vacío */}
          {!loading && filteredUsers.length === 0 && (
            <li className="px-5 py-10 text-center text-slate-500">
              No se encontraron alumnos para “<b>{search}</b>”.
            </li>
          )}

          {/* Lista */}
          {!loading &&
            filteredUsers.map((user) => {
              const grad = gradientFromName(user?.nombre);
              return (
                <li key={user.id}>
                  <Link
                    to={`/usuarios/${user.id}/historial`}
                    className="group flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-full grid place-items-center text-white text-sm font-semibold bg-gradient-to-br ${grad} shadow-sm`}
                        title={user?.nombre}
                      >
                        {getInitials(user?.nombre)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 group-hover:text-slate-950 capitalize">
                          {user?.nombre}
                        </div>
                      </div>
                    </div>
                    <div className="text-slate-400 group-hover:text-slate-500 transition">
                      ➜
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
