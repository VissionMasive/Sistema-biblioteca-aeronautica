import { useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { ImExit } from "react-icons/im";

const DrawerItem = ({ to, label, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 " +
      (isActive ? "text-primary font-semibold bg-slate-100" : "text-slate-700")
    }
  >
    <span className="inline-flex">{children}</span>
    <span>{label}</span>
  </NavLink>
);

export default function Layout() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthContext(); 
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  const items = useMemo(
    () => [
      {
        to: "/biblioteca-y-horarios",
        label: "Biblioteca y horarios",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 6h16M4 10h16M10 14h10M10 18h10" />
          </svg>
        ),
      },
      {
        to: "/talleres-y-eventos",
        label: "Talleres y eventos",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-6H3v6a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        to: "/consultas-frecuentes",
        label: "Consultas frecuentes",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 6v6l4 2" />
          </svg>
        ),
      },
      { divider: true },
      {
        to: "/catalogo",
        label: "Catálogo",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 6h16M4 10h10" />
          </svg>
        ),
      },
      {
        to: "/contacto",
        label: "Contacto",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M21 8a2 2 0 01-2 2H7l-4 4V6a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        ),
      },
    ],
    []
  );

  const filtered = items.filter(
    (it) => it.divider || it.label.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://www.escuelaaeronautica.gob.cl/wp-content/themes/escat-theme/img/logo.png"
              alt="Logo ETA"
              className="h-8"
            />
            <span className="text-lg md:text-xl font-bold text-primary uppercase tracking-wide">
              Biblioteca ETA
            </span>
          </Link>

          <nav className="flex items-center gap-3 md:gap-5">
            {user?.role === "alumno" && (
              <Link
                to="/alumnos"
                className="flex items-center gap-2 hover:text-primary"
                title="Alumnos"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z"
                  />
                </svg>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                to="/docentes"
                className="flex items-center gap-2 hover:text-primary"
                title="Docentes"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 8a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"
                  />
                </svg>
              </Link>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="p-2 text-black hover:text-primary"
                title="Cerrar sesión"
              >
                <ImExit className="w-6 h-6" />
              </button>
            ) : (
              <Link
                to="/cuenta"
                className="flex items-center gap-2 hover:text-primary"
                title="Cuenta"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
                  />
                </svg>
              </Link>
            )} <Link
            
              to="/consultas"
              className="flex items-center gap-2 hover:text-primary"
              title="Consúltanos"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.8L3 20l.8-3.2A7.963 7.963 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="p-2 rounded hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        <div className="min-h-[60vh]">
          <Outlet />
        </div>
      </div>

      <footer className="mt-10 border-t">
        <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-semibold mb-2">Nosotros</div>
            <div className="space-y-1">
              <Link
                className="underline text-slate-700 hover:text-primary"
                to="/sobre-escuela"
              >
                Sobre Escuela Técnico Aeronáutica
              </Link>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Enlaces de interés</div>
            <div className="space-y-1">
              <Link
                className="underline text-slate-700 hover:text-primary"
                to="/redes-sociales"
              >
                Redes sociales Técnico Aeronáutica
              </Link>
              <br />
              <Link
                className="underline text-slate-700 hover:text-primary"
                to="/politicas-privacidad"
              >
                Políticas de privacidad
              </Link>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Contacto</div>
            <p className="text-slate-600">contacto@biblioteca.eta.cl</p>
            <p className="text-slate-600">(+56)2 2999 2323</p>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pb-6">
          © {new Date().getFullYear()} Biblioteca ETA
        </div>
      </footer>

      {open && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">Menú</div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-slate-100"
                aria-label="Cerrar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-3">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar en menú..."
                className="w-full border rounded p-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              {filtered.map((it, idx) =>
                it.divider ? (
                  <div key={"div-" + idx} className="border-t my-2" />
                ) : (
                  <DrawerItem key={it.to} to={it.to} label={it.label}>
                    {it.icon}
                  </DrawerItem>
                )
              )}
            </div>

            {/* Logout también dentro del drawer (opcional) */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="mt-4 w-full px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
