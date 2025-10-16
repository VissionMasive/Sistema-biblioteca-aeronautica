
import React, { useMemo, useState } from 'react'
import events from '../data/events.json'

function startOfMonth(d){ return new Date(d.getFullYear(), d.getMonth(), 1) }
function endOfMonth(d){ return new Date(d.getFullYear(), d.getMonth()+1, 0) }
function addMonths(d, n){ return new Date(d.getFullYear(), d.getMonth()+n, 1) }
function fmtISO(d){ return d.toISOString().slice(0,10) }

export default function TalleresEventos(){
  const [cur, setCur] = useState(()=>{ const t=new Date(); return new Date(t.getFullYear(), t.getMonth(), 1) })
  const [q, setQ] = useState('')

  const first = startOfMonth(cur)
  const last = endOfMonth(cur)
  const firstWeekday = (first.getDay()+6)%7 // 0=Mon
  const days = last.getDate()
  const cells = []
  for(let i=0;i<firstWeekday;i++) cells.push(null)
  for(let d=1; d<=days; d++) cells.push(new Date(cur.getFullYear(), cur.getMonth(), d))
  while(cells.length % 7 !== 0) cells.push(null)

  const monthName = cur.toLocaleString('es-CL', { month: 'long', year:'numeric' })

  const filteredEvents = useMemo(()=>{
    const ql = q.trim().toLowerCase()
    return events.filter(ev => {
      const matchesMonth = ev.fecha.slice(0,7) === fmtISO(cur).slice(0,7)
      const matchesQuery = !ql || ev.titulo.toLowerCase().includes(ql) || ev.lugar.toLowerCase().includes(ql) || ev.tipo.toLowerCase().includes(ql)
      return matchesMonth && matchesQuery
    }).sort((a,b)=> a.fecha.localeCompare(b.fecha))
  }, [cur, q])

  const proximos = useMemo(()=>{
    const today = fmtISO(new Date())
    return events.filter(ev => ev.fecha >= today).sort((a,b)=> a.fecha.localeCompare(b.fecha)).slice(0,5)
  }, [])

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Talleres y eventos Biblioteca Escuela Técnico Aeronáutica</h1>
      <div className='text-slate-600'>Próximos eventos</div>

      <div className='bg-white rounded shadow p-4'>
        <div className='flex items-center justify-between mb-3'>
          <button className='px-2 py-1 border rounded' onClick={()=>setCur(addMonths(cur,-1))}>Anterior</button>
          <div className='font-semibold capitalize'>{monthName}</div>
          <button className='px-2 py-1 border rounded' onClick={()=>setCur(addMonths(cur,1))}>Siguiente</button>
        </div>
        <div className='grid grid-cols-7 gap-1 text-center text-sm font-medium text-slate-600'>
          {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(d=><div key={d} className='py-1'>{d}</div>)}
        </div>
        <div className='grid grid-cols-7 gap-1 mt-1'>
          {cells.map((d,idx)=>{
            if(!d) return <div key={idx} className='h-20 bg-slate-50 rounded'></div>
            const iso = fmtISO(d)
            const today = fmtISO(new Date())
            const has = events.some(ev => ev.fecha===iso)
            return (
              <div key={idx} className={'h-24 rounded border bg-white p-1 text-right relative '+(iso===today?'border-primary':'border-slate-200')}>
                <div className='text-xs text-slate-600'>{d.getDate()}</div>
                {has && <div className='absolute left-1 bottom-1 text-[10px] bg-primary text-white px-1 rounded'>Evento</div>}
              </div>
            )
          })}
        </div>

        <div className='mt-4'>
          <input className='border rounded p-2 w-full md:w-1/2' placeholder='Buscar por título, lugar o tipo' value={q} onChange={e=>setQ(e.target.value)} />
        </div>

        <div className='mt-4'>
          {filteredEvents.length===0 ? <div className='text-slate-500 text-sm'>No hay eventos para este mes.</div> : (
            <ul className='space-y-2'>
              {filteredEvents.map(ev => (
                <li key={ev.id} className='border rounded p-3 flex items-start gap-3'>
                  <div className='text-sm font-semibold min-w-[90px]'>{new Date(ev.fecha).toLocaleDateString('es-CL')}</div>
                  <div>
                    <div className='font-medium'>{ev.titulo}</div>
                    <div className='text-sm text-slate-600'>{ev.tipo} — {ev.lugar}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className='bg-white rounded shadow p-4'>
        <div className='font-semibold mb-2'>Próximos eventos</div>
        <ul className='space-y-2'>
          {proximos.map(ev => (
            <li key={ev.id} className='border rounded p-3 flex items-start gap-3'>
              <div className='text-sm font-semibold min-w-[90px]'>{new Date(ev.fecha).toLocaleDateString('es-CL')}</div>
              <div>
                <div className='font-medium'>{ev.titulo}</div>
                <div className='text-sm text-slate-600'>{ev.tipo} — {ev.lugar}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
