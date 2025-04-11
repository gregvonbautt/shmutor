import { Button, FluentProvider, webLightTheme } from '@fluentui/react-components'
import './assets/main.css'
import ChallengeGroup, { ChallengeItem } from './components/ChallengeGroup'
import Spacing from './components/Spacing'
import { useState } from 'react'

function App(): JSX.Element {
  const [res, setRes] = useState()

  const ipcHandle = (): void => {
    window.electron.ipcRenderer.invoke('dialog:openFile').then((result) => {
      console.log(result)
      setRes(result)
    })
  }

  const items: ChallengeItem[] = []
  for (let i = 0; i < 20; i++) {
    items.push({ question: `question ${i}`, answer: `answer ${i}` })
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ margin: '2em' }}>
        <Spacing direction="V" size="M">
          <Button onClick={ipcHandle}>Browse...</Button>
          {res}
          <ChallengeGroup items={items} />
        </Spacing>
      </div>
    </FluentProvider>
  )
}

export default App
