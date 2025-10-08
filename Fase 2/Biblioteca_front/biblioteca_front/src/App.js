import './App.css';
import { Test } from './components/test';
import ListaLibros from './components/ListaLibros';
import { Login } from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Sidemenu } from './components/Sidemenu';
import { Register } from './components/register';
import Navbar from './components/navbar';
import Layout from './components/layout';
import Catalogo from './components/Catalogo';


function App() {
  return (
    <BrowserRouter>
      {/* <Navbar/>  */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/Test" element={<Test />} />
          <Route path="/ListaLibros" element={<ListaLibros />} />
           <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>agregar libro</h1>} />
          <Route path="Hola" element={<h1>Hola</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;