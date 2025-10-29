import React from 'react'

export default function SobreEscuela() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Sobre la Escuela Técnico Aeronáutica
      </h1>

      <section className="rounded overflow-hidden">
        <img
          src="https://www.escuelaaeronautica.gob.cl/wp-content/uploads/2022/05/ETA-5.jpg"
          alt="Escuela Técnico Aeronáutica"
          className="w-full h-[50vh] object-cover rounded shadow"
          loading="lazy"
        />
      </section>

      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold">Quiénes somos</h2>
        <p className="text-slate-700">
          La Escuela Técnico Aeronáutica pertenece a la DGAC y tiene como misión
          formar profesionales y técnicos para el sector aeronáutico civil de Chile.
          La biblioteca apoya la docencia y promueve el acceso abierto al conocimiento.
        </p>

        <h3 className="text-lg font-semibold mt-4">Misión</h3>
        <p className="text-slate-700">
          Ofrecer servicios de información confiables y oportunos que fortalezcan la
          formación integral de estudiantes, docentes e investigadores.
        </p>

        <h3 className="text-lg font-semibold mt-4">Visión</h3>
        <p className="text-slate-700">
          Ser referente en gestión de información aeronáutica, impulsando la alfabetización
          informacional, la innovación y el uso ético del conocimiento.
        </p>

        <h3 className="text-lg font-semibold mt-4">Valores</h3>
        <ul className="list-disc pl-6 text-slate-700">
          <li>Excelencia académica</li>
          <li>Seguridad operacional</li>
          <li>Servicio y colaboración</li>
          <li>Integridad y respeto</li>
        </ul>
      </div>
    </div>
  )
}