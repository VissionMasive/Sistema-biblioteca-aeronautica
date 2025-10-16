
import React, { useState } from 'react'
export default function Contacto(){
  const [form,setForm]=useState({tema:'',consulta:'',nombre:'',rut:'',email:''}); const [ok,setOk]=useState(false)
  function send(e){ e.preventDefault(); setOk(true) }
  return (
    <div className='max-w-2xl'>
      <h1 className='text-2xl font-semibold mb-3'>Contacto</h1>
      <form onSubmit={send} className='bg-white p-4 rounded shadow space-y-3'>
        <input className='border p-2 rounded w-full' placeholder='Tema de consulta' value={form.tema} onChange={e=>setForm({...form, tema:e.target.value})}/>
        <textarea className='border p-2 rounded w-full min-h-[120px]' placeholder='Escribe tu consulta' value={form.consulta} onChange={e=>setForm({...form, consulta:e.target.value})}/>
        <div className='grid md:grid-cols-2 gap-3'>
          <input className='border p-2 rounded w-full' placeholder='Nombre' value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})}/>
          <input className='border p-2 rounded w-full' placeholder='RUT' value={form.rut} onChange={e=>setForm({...form, rut:e.target.value})}/>
        </div>
        <input type='email' className='border p-2 rounded w-full' placeholder='Correo electrónico' value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <button className='px-4 py-2 bg-primary text-white rounded'>Enviar</button>
        {ok && <div className='text-green-700 text-sm'>Consulta enviada (simulada).</div>}
      </form>
    </div>
  )
}
