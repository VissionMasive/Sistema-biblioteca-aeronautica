import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Cuenta() {
  const { loginUser } = useAuth();
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(users);
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    alert("Inicio de sesión simulado. Luego lo conectamos con FastAPI.");
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Correo institucional
          </label>
          <input
            type="email"
            className="border rounded w-full p-2"
            placeholder="usuario@alumnos.eta.cl"
            value={users.email}
            onChange={(e) => setUsers({ ...users, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className="border rounded w-full p-2 pr-16"
              placeholder="••••••••"
              value={users.password}
              onChange={(e) => setUsers({ ...users, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 text-sm"
              aria-label="Mostrar/ocultar contraseña"
            >
              {show ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>
        <button className="w-full py-2 bg-primary text-white rounded">
          Ingresar
        </button>
        <div className="text-xs text-slate-500 text-center">
          <Link to={"/registro"}>¿Eres nuevo usuario? Haz click aqui.</Link>
        </div>
      </form>
    </div>
  );
}
