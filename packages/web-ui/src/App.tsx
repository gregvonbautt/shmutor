import { ShmutorApp, Spacing } from '@shmutor/core'
import '@shmutor/core/core.css'
import './App.css'
import { useState } from 'react'

function App() {

  const [file, setFile] = useState<File>()

  return <Spacing direction='V' size='M'>
    <input type='file' onChange={(e) => {
      if (e.target.files) setFile(e.target.files[0])
    }} />
    <ShmutorApp xlsChallengeDef={file} />
  </Spacing>
}

export default App
