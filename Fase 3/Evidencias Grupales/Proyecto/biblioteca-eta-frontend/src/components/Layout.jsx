import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { ImExit } from "react-icons/im";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Layout() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
            )}

            <Link
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
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-4 py-6">
        <div className="min-h-[60vh]">
          <Outlet />
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-10 border-t">
        <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
          {/* NOSOTROS */}
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

          {/* ENLACES DE INTERÉS */}
          <div>
            <div className="font-semibold mb-2">Enlaces de interés</div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                Redes Sociales
                <div className="flex items-center gap-3 text-slate-700">
                  <a
                    href="https://www.facebook.com/people/Escuela-T%C3%A9cnica-Aeron%C3%A1utica/100064752036916/#"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary"
                  >
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/escuela_aeronautica/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com/DGACChile"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary"
                  >
                    <FaXTwitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <Link
                className="underline text-slate-700 hover:text-primary block"
                to="/politicas-privacidad"
              >
                Políticas de privacidad
              </Link>
            </div>
          </div>

          {/* CONTACTO */}
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
    </div>
  );
}
