
import React from 'react'
import docs from '../data/reglamentacion.json'
import DocList from '../components/DocList.jsx'
export default function Reglamentacion(){
  return <DocList title='Reglamentación' description='Leyes y normas externas aplicables al quehacer educativo.' docs={docs} />
}
