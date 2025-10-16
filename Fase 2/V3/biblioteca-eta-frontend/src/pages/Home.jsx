
import React from 'react'
import Carousel from '../components/Carousel.jsx'
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div className='space-y-6'>
      <div className='relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]'>
        <Carousel/>
      </div>
      <div className='grid md:grid-cols-3 gap-4'>
        <Link to='/alumnos' className='rounded-xl bg-white shadow hover:shadow-md transition overflow-hidden'>
          <img src='https://www.escuelaaeronautica.gob.cl/wp-content/uploads/2022/05/ETA-5.jpg' alt='Alumnos' className='h-40 w-full object-cover'/>
          <div className='p-6'>
            <div className='text-xl font-semibold mb-2'>Alumnos</div>
            <div className='text-slate-600'>Servicios sugeridos para ti</div>
          </div>
        </Link>
        <Link to='/docentes' className='rounded-xl bg-white shadow hover:shadow-md transition overflow-hidden'>
          <img src='https://www.escuelaaeronautica.gob.cl/wp-content/uploads/2022/05/ETA-1.jpg' alt='Docentes' className='h-40 w-full object-cover'/>
          <div className='p-6'>
            <div className='text-xl font-semibold mb-2'>Docentes</div>
            <div className='text-slate-600'>Servicios sugeridos para ti</div>
          </div>
        </Link>
        <Link to='/consultas' className='rounded-xl bg-white shadow hover:shadow-md transition overflow-hidden'>
          <img src='https://www.escuelaaeronautica.gob.cl/wp-content/uploads/2019/11/3.jpg' alt='Ayuda' className='h-40 w-full object-cover'/>
          <div className='p-6'>
            <div className='text-xl font-semibold mb-2'>¿Cómo podemos ayudarte?</div>
            <div className='text-slate-600'>Atención y orientación virtual</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
