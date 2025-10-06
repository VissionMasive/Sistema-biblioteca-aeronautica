import React, { useMemo, useState,useEffect } from "react";
import { Link } from "react-router-dom";
import data from "./catalog.json";
import {
  Select,
  createListCollection,
  Portal,
  Stack,
  Box,
} from "@chakra-ui/react";

const categoriasCollection = createListCollection({
  items: [
    { label: "Alimentos", value: "alimentos" },
    { label: "Accesorios", value: "accesorios" },
    { label: "Medicinas", value: "medicinas" },
  ],
});

export default function Catalogo() {
    const [categoria, setCategoria] = useState("");
  const [todoList, setTodolist] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("error en la peticion");
        return res.json();
      })
      .then((data) => setTodolist(data));
    console.log(todoList);
  }, []);
  const [q, setQ] = useState("");
  // const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("");
  const [autor, setAutor] = useState("");
  const [anio, setAnio] = useState("");
  const [disp, setDisp] = useState("");
  // const categorias = useMemo(
  //   () => Array.from(new Set(data.map((d) => d.categoria))).sort(),
  //   []
  // );
  const autores = useMemo(
    () => Array.from(new Set(data.map((d) => d.autor))).sort(),
    []
  );
  const anios = useMemo(
    () => Array.from(new Set(data.map((d) => d.anio))).sort((a, b) => a - b),
    []
  );

  const items = data.filter((d) => {
    const okQ =
      !q ||
      d.titulo.toLowerCase().includes(q.toLowerCase()) ||
      d.autor.toLowerCase().includes(q.toLowerCase());
    const okC = !categoria || d.categoria === categoria;
    const okT = !tipo || d.tipo === tipo;
    const okA = !autor || d.autor === autor;
    const okY = !anio || d.anio === Number(anio);
    const okD = !disp || (disp === "SI" ? d.disponible : !d.disponible);
    return okQ && okC && okT && okA && okY && okD;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        Bienvenido a tu biblioteca virtual
      </h1>
      <div className="bg-white rounded shadow p-4 grid md:grid-cols-5 gap-2">
        <input
          className="border rounded p-2 md:col-span-2"
          placeholder="Buscar por título o autor"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
       <Select.Root
        collection={categoriasCollection}
        value={categoria}
        onValueChange={setCategoria}
        size="md"
        variant="outline"
      >
        {/* Mantiene accesibilidad con un <select> nativo oculto */}
        <Select.HiddenSelect />

        {/* Label visible */}
        <Select.Label>Selecciona categoría</Select.Label>

        {/* Control visual del select (trigger + indicador) */}
        <Select.Control>
          <Select.Trigger>
            {/* Texto mostrado; placeholder si no hay valor */}
            <Select.ValueText placeholder="Categoría" />
          </Select.Trigger>

          <Select.IndicatorGroup>
            <Select.Indicator />
            {/* Botón para limpiar selección (opcional) */}
            <Select.ClearTrigger />
          </Select.IndicatorGroup>
        </Select.Control>

        {/* El contenido se renderiza en un Portal para posicionamiento */}
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {/* Iteramos sobre la colección para renderizar las opciones */}
              {categoriasCollection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>


        <select
          className="border rounded p-2"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Tipo</option>
          <option>LIBRO</option>
          <option>PDF</option>
        </select>
        <select
          className="border rounded p-2"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        >
          <option value="">Autor</option>
          {autores.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <select
          className="border rounded p-2"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
        >
          <option value="">Año</option>
          {anios.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          className="border rounded p-2"
          value={disp}
          onChange={(e) => setDisp(e.target.value)}
        >
          <option value="">Disponible</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {todoList.map((x) => (
          <Link
            to={`/libro/${x.id}`}
            key={x.id}
            className="bg-white rounded shadow hover:shadow-md transition p-3"
          >
            <img
              alt={`Portada ${x.nombre}`}
              className="h-48 w-full object-cover rounded mb-2"
            />
            <div className="font-medium line-clamp-2">{x.nombre}</div>
            <div className="text-sm text-slate-600">prueba · tes</div>
            <div className="text-xs text-slate-500">hola · error chao</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
