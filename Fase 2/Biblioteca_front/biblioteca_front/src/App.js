import './App.css';
import { Test } from './components/test';
import ListaLibros from './components/ListaLibros'; 
import { BrowserRouter, Routes, Route } from 'react-router';
import { Sidemenu } from './components/Sidemenu';


function App() {
  return(
    <BrowserRouter> 
    <Routes>
      <Route path="/Test" element={<Test/>} />
      <Route path="/ListaLibros" element={<ListaLibros/>} />
      <Route path="*" element={<h1>agregar libro</h1>} />
     <Route path="Hola" element={<h1>Hola</h1>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;