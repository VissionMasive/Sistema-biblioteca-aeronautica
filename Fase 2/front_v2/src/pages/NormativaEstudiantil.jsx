
import React from 'react'
import docs from '../data/normativa_estudiantil.json'
import DocList from '../components/DocList.jsx'
export default function NormativaEstudiantil(){
  return <DocList title='Normativa Estudiantil' description='Reglamentos y protocolos oficiales para estudiantes.' docs={docs} />
}
