
import React from 'react'
import { Link } from 'react-router-dom'
export default function Consultas(){
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>¿Cómo podemos ayudarte?</h1>
      <div className='grid md:grid-cols-2 gap-4'>
        <Link to='/contacto' className='p-4 bg-white rounded shadow hover:shadow-md transition'>Contacto</Link>
        <Link to='/consultas-frecuentes' className='p-4 bg-white rounded shadow hover:shadow-md transition'>Consultas frecuentes</Link>
      </div>
    </div>
  )
}
