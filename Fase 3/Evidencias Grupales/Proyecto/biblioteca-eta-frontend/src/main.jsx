import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Detalle from "./pages/Detalle.jsx";
import Cuenta from "./pages/Cuenta.jsx";
import Alumnos from "./pages/Alumnos.jsx";
import Docentes from "./pages/Docentes.jsx";
import Consultas from "./pages/Consultas.jsx";
import Contacto from "./pages/Contacto.jsx";
import TalleresEventos from "./pages/TalleresEventos.jsx";
import FAQ from "./pages/FAQ.jsx";
import SobreEscuela from "./pages/SobreEscuela.jsx";
import PoliticasPrivacidad from "./pages/PoliticasPrivacidad.jsx";
import NormativaEstudiantil from "./pages/NormativaEstudiantil.jsx";
import NormativaDocente from "./pages/NormativaDocente.jsx";
import DocumentosTecnicos from "./pages/DocumentosTecnicos.jsx";
import Reglamentacion from "./pages/Reglamentacion.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import Usuarios from "./pages/Usuarios.jsx";
import DetalleUsuario from "./pages/DetalleUsuario.jsx";
import Registro from "./pages/Registro.jsx";
import AgregarLibro from "./pages/AgregarLibro.jsx";
import Solicitudes from "./pages/solicitudes.jsx";
import HistorialUsuario from "./pages/HistorialUsuario.jsx";
import MisSolicitudes from "./pages/MisSolicitudes.jsx";
import MisLibros from "./pages/MisLibros";
import ReporteAdmin from "./pages/ReporteAdmin";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/misSolicitudes" element={< MisSolicitudes/>} />
            
            <Route path="/misLibros" element={<MisLibros />} />
            <Route path="/libro/:id" element={<Detalle />} />
            <Route path="/cuenta" element={<Cuenta />} />
            <Route path="/alumnos" element={<Alumnos />} />

            <Route path="/reporte" element={<ReporteAdmin />} />
            <Route element={<ProtectedRoute requiredRoles={"admin"} />}>
              <Route path="/agregarLibro" element={<AgregarLibro />} />
              <Route path="/docentes" element={<Docentes />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/usuario/:id" element={<DetalleUsuario />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route
                path="/usuarios/:id/historial"
                element={<HistorialUsuario />}
              />
            </Route>
            <Route path="/consultas" element={<Consultas />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/talleres-y-eventos" element={<TalleresEventos />} />
            <Route path="/consultas-frecuentes" element={<FAQ />} />
            <Route path="/sobre-escuela" element={<SobreEscuela />} />
            <Route
              path="/politicas-privacidad"
              element={<PoliticasPrivacidad />}
            />
            <Route
              path="/normativa-estudiantil"
              element={<NormativaEstudiantil />}
            />
            <Route path="/normativa-docente" element={<NormativaDocente />} />
            <Route
              path="/documentos-tecnicos"
              element={<DocumentosTecnicos />}
            />
            <Route path="/reglamentacion" element={<Reglamentacion />} />
            <Route
              path="/biblioteca-y-horarios"
              element={
                <div className="p-4 bg-white rounded shadow">
                  Próximamente: Biblioteca y Horarios
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
