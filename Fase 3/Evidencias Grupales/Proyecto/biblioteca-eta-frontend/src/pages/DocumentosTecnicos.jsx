
import React from 'react'
import docs from '../data/documentos_tecnicos.json'
import DocList from '../components/DocList.jsx'
export default function DocumentosTecnicos(){
  return <DocList title='Documentos Técnicos' description='Resoluciones, calendarios e instrumentos institucionales.' docs={docs} />
}
