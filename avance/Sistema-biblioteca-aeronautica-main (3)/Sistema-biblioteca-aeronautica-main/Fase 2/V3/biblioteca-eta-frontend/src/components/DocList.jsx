
import React, { useMemo, useState } from 'react'

export default function DocList({ title, description, docs }){
  const [q, setQ] = useState('')
  const items = useMemo(()=>{
    const s = q.trim().toLowerCase()
    if(!s) return docs
    return docs.filter(d => (d.titulo||'').toLowerCase().includes(s) || (d.publicado_por||'').toLowerCase().includes(s))
  }, [docs, q])
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>{title}</h1>
      {description && <p className='text-slate-600'>{description}</p>}
      <div className='flex items-center gap-2'>
        <input className='border rounded p-2 w-full md:w-1/2' placeholder='Buscar por título o entidad' value={q} onChange={e=>setQ(e.target.value)}/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {items.map((d,idx)=>{
          let fecha = 's/f'
          try{
            if(d.fecha_publicacion){
              const date = new Date(d.fecha_publicacion)
              if(!isNaN(date)) fecha = date.toLocaleDateString('es-CL')
              else fecha = d.fecha_publicacion
            }
          }catch{}
          return (
            <div key={idx} className='bg-white rounded shadow p-4 flex flex-col gap-2'>
              <div className='font-medium'>{d.titulo}</div>
              <div className='text-sm text-slate-600'>{d.publicado_por}</div>
              <div className='text-xs text-slate-500'>Fecha: {fecha}</div>
              <div className='mt-auto'>
                <a className='inline-block px-3 py-2 bg-primary text-white rounded' href={d.url} target='_blank' rel='noreferrer'>Ver PDF</a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
