
import React, { useEffect, useState } from 'react'
const slides = [
  'https://www.escuelaaeronautica.gob.cl/wp-content/uploads/2019/11/3.jpg',
  'https://www.escuelaaeronautica.gob.cl/wp-content/uploads/2022/05/ETA-5.jpg',
  'https://www.escuelaaeronautica.gob.cl/wp-content/uploads/2022/05/ETA-1.jpg'
]
export default function Carousel(){
  const [i,setI] = useState(0)
  useEffect(()=>{ const t=setInterval(()=>setI(x=>(x+1)%slides.length), 4500); return ()=>clearInterval(t)},[])
  return (
    <div className='relative overflow-hidden h-72 md:h-96'>
      {slides.map((src,idx)=>(
        <img key={src} src={src} alt={`Slide ${idx+1}`} className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${idx===i?'opacity-100':'opacity-0'}`} />
      ))}
      <div className='absolute bottom-3 right-3 flex gap-1'>{slides.map((_,idx)=>(<span key={idx} className={`h-2 w-2 rounded-full ${idx===i?'bg-white':'bg-white/70'}`}></span>))}</div>
    </div>
  )
}
