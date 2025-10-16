
import React from 'react'

export default function PoliticasPrivacidad(){
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Políticas de privacidad</h1>
      <div className='text-sm text-slate-500'>Última actualización: 07-10-2025</div>

      <div className='bg-white rounded shadow p-4 space-y-3 text-slate-700'>
        <p>Estas políticas aplican a los servicios de la Biblioteca de la Escuela Técnico Aeronáutica (ETA), orientados a estudiantes, docentes y personal administrativo en Chile.</p>

        <h2 className='text-lg font-semibold'>Datos que recopilamos</h2>
        <ul className='list-disc pl-6'>
          <li>Identificación básica: nombre, RUT, correo institucional y año de carrera.</li>
          <li>Actividad en la biblioteca: búsquedas, reservas, descargas y devoluciones.</li>
          <li>Comunicaciones: mensajes enviados a través del formulario de contacto.</li>
        </ul>

        <h2 className='text-lg font-semibold'>Finalidades del tratamiento</h2>
        <ul className='list-disc pl-6'>
          <li>Gestionar préstamos y reservas de material bibliográfico.</li>
          <li>Mejorar los servicios y generar estadísticas de uso (datos agregados).</li>
          <li>Responder consultas y notificar cambios relevantes del servicio.</li>
        </ul>

        <h2 className='text-lg font-semibold'>Base legal</h2>
        <p>Tratamos datos conforme a la normativa chilena aplicable en materia de protección de datos personales y principios de minimización, seguridad y confidencialidad.</p>

        <h2 className='text-lg font-semibold'>Conservación</h2>
        <p>Los datos se conservan mientras el usuario mantenga vínculo con la Escuela y por los plazos necesarios para fines académicos, administrativos o legales.</p>

        <h2 className='text-lg font-semibold'>Derechos de los titulares</h2>
        <p>Usted puede solicitar acceso, rectificación, cancelación y oposición (ARCO), así como la limitación del tratamiento, de acuerdo con la normativa chilena vigente.</p>

        <h2 className='text-lg font-semibold'>Cookies</h2>
        <p>Este sitio puede utilizar cookies técnicas para su correcto funcionamiento. En versiones productivas, se informará y solicitará consentimiento cuando corresponda.</p>

        <h2 className='text-lg font-semibold'>Seguridad</h2>
        <p>Aplicamos medidas razonables de seguridad para proteger los datos contra accesos no autorizados o uso indebido.</p>

        <h2 className='text-lg font-semibold'>Contacto</h2>
        <p>Para ejercer derechos o realizar consultas sobre privacidad, diríjase al canal oficial de la Escuela.</p>

        <div className='text-xs text-slate-500'>Este texto es referencial para la tesis; no constituye asesoría legal.</div>
      </div>
    </div>
  )
}
