
import React, { useState } from 'react'
const faqs = [
  { q:'¿Cómo reservo un libro físico?', a:'Busca el libro en el Catálogo y presiona “Reservar” en el detalle. La reserva quedará pendiente hasta que retires el libro en el mesón de biblioteca.' },
  { q:'¿Cuántos libros puedo reservar?', a:'Hasta 3 libros por semana por persona.' },
  { q:'¿Cómo cancelo una reserva?', a:'Puedes cancelar en cualquier momento desde tu cuenta o escribiendo al correo de biblioteca.' },
  { q:'¿Dónde se realizan las devoluciones?', a:'Las devoluciones son presenciales en el mesón de biblioteca.' },
  { q:'¿Puedo descargar material digital?', a:'Sí, los recursos con licencia abierta aparecen con botón “Descargar PDF”.' },
  { q:'¿Qué credenciales necesito para iniciar sesión?', a:'Utiliza tu correo institucional (por ejemplo, usuario@alumnos.eta.cl) y tu contraseña.' },
  { q:'¿Qué tipo de materiales tiene la biblioteca?', a:'Libros técnicos y de estudio del área aeronáutica, y material de investigación (revistas especializadas).' },
  { q:'¿Cómo contacto a la biblioteca?', a:'Usa el formulario en la sección Contacto.' }
]
function Item({q,a}){ const [open,setOpen]=useState(false); return (<div className='border rounded'><button onClick={()=>setOpen(o=>!o)} className='w-full text-left px-4 py-3 flex items-center justify-between'><span className='font-medium'>{q}</span><span className='text-slate-500'>{open?'−':'+'}</span></button>{open&&<div className='px-4 pb-4 text-slate-700'>{a}</div>}</div>) }
export default function FAQ(){ return (<div className='space-y-4'><h1 className='text-2xl font-semibold'>Consultas Frecuentes</h1><div className='space-y-2'>{faqs.map((f,i)=><Item key={i} q={f.q} a={f.a}/>)}</div></div>) }
