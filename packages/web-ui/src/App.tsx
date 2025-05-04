import { Button, FluentProvider, labelClassNames, webLightTheme } from '@fluentui/react-components'
import { CoreLabelNames, CoreLabels, ShmutorApp, Spacing, useLabels } from '@shmutor/core'
import '@shmutor/core/core.css'
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [labels, register] = useLabels()

  useEffect(() => {
    // init the label service
    register(CoreLabels)
  }, [])

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
        <Button onClick={() => fileInput?.current?.click()}>{labels(CoreLabelNames.load_file)}</Button>
        <ShmutorApp xlsChallengeDef={file} />
      </Spacing>
    </div>
  </FluentProvider>
}

export default App
