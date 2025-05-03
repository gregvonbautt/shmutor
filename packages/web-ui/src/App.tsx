import { ShmutorApp, Spacing } from '@shmutor/core'
import '@shmutor/core/core.css'
import './App.css'
import { useRef, useState } from 'react'
import { Button, FluentProvider, webLightTheme } from '@fluentui/react-components'

function App() {

  const [file, setFile] = useState<File>()
  const fileInput = useRef<HTMLInputElement>(null)

  return <FluentProvider theme={webLightTheme}>
    <div style={{ margin: '2em' }}>
      <Spacing direction='V' size='M'>
        <input ref={fileInput} type='file' accept='.xlsx'
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files) setFile(e.target.files[0])
          }} />
        <Button onClick={() => fileInput?.current?.click()}>Open File!</Button>
        <ShmutorApp xlsChallengeDef={file} />
      </Spacing>
    </div>
  </FluentProvider>
}

export default App
