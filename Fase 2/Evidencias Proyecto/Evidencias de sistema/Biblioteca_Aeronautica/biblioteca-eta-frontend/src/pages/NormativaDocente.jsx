
import React from 'react'
import docs from '../data/normativa_docente.json'
import DocList from '../components/DocList.jsx'
export default function NormativaDocente(){
  return <DocList title='Normativa Docente' description='Reglamentos oficiales aplicables al cuerpo docente.' docs={docs} />
}
