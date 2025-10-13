
import React, { useEffect, useRef, useState } from 'react'

export default function SobreEscuela(){
  const ref = useRef(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(()=>{
    function onScroll(){
      if(!ref.current) return
      const r = ref.current.getBoundingClientRect()
      const vh = window.innerHeight
      const total = Math.max(1, r.height)
      const y = Math.min(total, Math.max(0, vh - r.top))
      const p = y / (vh*0.8)
      setOpacity(Math.max(0, 1 - p))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive:true })
    return ()=>window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-semibold'>Sobre Escuela Técnico Aeronáutica</h1>
      <section ref={ref} className='relative h-[140vh] overflow-hidden rounded'>
        <div className='sticky top-24'>
          <img
            src='https://www.escuelaaeronautica.gob.cl/wp-content/uploads/2022/05/ETA-5.jpg'
            alt='Escuela Técnico Aeronáutica'
            style={{ opacity }}
            className='w-full h-[50vh] object-cover rounded shadow'
          />
        </div>
      </section>

      <div className='prose max-w-none'>
        <h2 className='text-xl font-semibold'>Quiénes somos</h2>
        <p className='text-slate-700'>La Escuela Técnico Aeronáutica forma parte de la DGAC y tiene por misión preparar profesionales y técnicos especializados para el sector aeronáutico civil del país. La biblioteca apoya los procesos de enseñanza-aprendizaje y promueve el acceso abierto al conocimiento.</p>

        <h3 className='text-lg font-semibold mt-4'>Misión</h3>
        <p className='text-slate-700'>Entregar servicios de información confiables y oportunos que potencien la formación integral de estudiantes y el trabajo de docentes e investigadores.</p>

        <h3 className='text-lg font-semibold mt-4'>Visión</h3>
        <p className='text-slate-700'>Ser un referente en gestión de información aeronáutica, fomentando el uso ético de la información, la alfabetización informacional y la innovación.</p>

        <h3 className='text-lg font-semibold mt-4'>Valores</h3>
        <ul className='list-disc pl-6 text-slate-700'>
          <li>Excelencia académica</li>
          <li>Seguridad operacional</li>
          <li>Servicio y colaboración</li>
          <li>Integridad y respeto</li>
        </ul>
      </div>
    </div>
  )
}
