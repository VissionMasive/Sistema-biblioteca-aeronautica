
import React from 'react'

function IconFacebook(props){return (<svg viewBox="0 0 24 24" width="28" height="28" {...props}><path fill="currentColor" d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>)}
function IconInstagram(props){return (<svg viewBox="0 0 24 24" width="28" height="28" {...props}><path fill="currentColor" d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2.2a2.8 2.8 0 110 5.6 2.8 2.8 0 010-5.6zM17.5 6.5a1 1 0 100 2 1 1 0 000-2z"/></svg>)}
function IconX(props){return (<svg viewBox="0 0 24 24" width="28" height="28" {...props}><path fill="currentColor" d="M18.244 2H21L13.5 10.28 22.5 22h-6.75l-5.28-6.84L4.5 22H2l8.06-9.18L2.25 2h6.75l4.77 6.3L18.244 2z"/></svg>)}

export default function RedesSociales(){
  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Redes sociales — Escuela Técnico Aeronáutica</h1>
      <p className='text-slate-700'>Sigue a la Escuela en sus canales oficiales.</p>
      <div className='grid md:grid-cols-3 gap-4'>
        <a href='https://www.facebook.com/people/Escuela-T%C3%A9cnica-Aeron%C3%A1utica/100064752036916/#' target='_blank' rel='noreferrer' className='bg-white rounded shadow p-4 flex items-center gap-3 hover:shadow-md'>
          <span className='text-[#1877F2]'><IconFacebook/></span>
          <div><div className='font-medium'>Facebook</div><div className='text-sm text-slate-600'>Escuela Técnico Aeronáutica</div></div>
        </a>
        <a href='https://www.instagram.com/escuela_aeronautica/' target='_blank' rel='noreferrer' className='bg-white rounded shadow p-4 flex items-center gap-3 hover:shadow-md'>
          <span className='text-[#E4405F]'><IconInstagram/></span>
          <div><div className='font-medium'>Instagram</div><div className='text-sm text-slate-600'>@escuela_aeronautica</div></div>
        </a>
        <a href='https://x.com/DGACChile' target='_blank' rel='noreferrer' className='bg-white rounded shadow p-4 flex items-center gap-3 hover:shadow-md'>
          <span className='text-black'><IconX/></span>
          <div><div className='font-medium'>X (Twitter)</div><div className='text-sm text-slate-600'>@DGACChile</div></div>
        </a>
      </div>
    </div>
  )
}
