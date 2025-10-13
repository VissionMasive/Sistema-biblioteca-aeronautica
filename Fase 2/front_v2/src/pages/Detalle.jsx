
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import data from '../data/catalog.json'
export default function Detalle(){
  const { id } = useParams(); const nav=useNavigate()
  const item=data.find(d=>String(d.id)===String(id))
  if(!item) return <div className='bg-white p-4 rounded shadow'>No encontrado</div>
  return (
    <div className='bg-white p-4 rounded shadow'>
      <div className='grid md:grid-cols-2 gap-6'>
        <div><img src={item.portada_url} alt={`Portada ${item.titulo}`} className='w-full max-w-md rounded'/></div>
        <div>
          <h1 className='text-2xl font-semibold'>{item.titulo}</h1>
          <div className='text-slate-600'>{item.autor} · {item.anio}</div>
          <div className='text-slate-500 text-sm'>{item.categoria} · {item.tipo}</div>
          <div className='mt-3'>{item.sinopsis}</div>
          <div className='mt-4 flex gap-3'>
            {item.tipo!=='LIBRO' && item.pdf_url && <a href={item.pdf_url} target='_blank' rel='noreferrer' className='px-4 py-2 bg-green-600 text-white rounded'>Descargar PDF</a>}
            {item.tipo!=='PDF' && <button onClick={()=>alert('Reserva simulada.')} className='px-4 py-2 bg-primary text-white rounded'>Reservar</button>}
            <button onClick={()=>nav(-1)} className='px-4 py-2 border rounded'>Volver</button>
          </div>
        </div>
      </div>
      <div className='mt-6 pt-4 border-t'>
        <div className='font-semibold mb-2'>Descripción</div>
        <p className='text-slate-700'>{item.sinopsis}</p>
      </div>
    </div>
  )
}
