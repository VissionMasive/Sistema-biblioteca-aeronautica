
import React from 'react'
import { Link } from 'react-router-dom'
export default function Alumnos(){
  const accesos=[
    {label:'Catálogo', to:'/catalogo'},
    {label:'Normativa Estudiantil', to:'/normativa-estudiantil'},
    {label:'Documentos Técnicos', to:'/documentos-tecnicos'},
    {label:'Reglamentación', to:'/reglamentacion'},
  ]
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Alumnos</h1>
      <p className='text-slate-600'>Accesos rápidos</p>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {accesos.map(a=> <Link key={a.to} to={a.to} className='p-4 bg-white rounded shadow hover:shadow-md transition'>{a.label}</Link>)}
      </div>
    </div>
  )
}
