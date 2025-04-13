import { Button } from '@fluentui/react-components'
import { LABELS } from '@renderer/common/Labels'
import { ReactNode, useState } from 'react'
import Spacing from './Spacing'
import { useShmutorStore } from '@renderer/common/Store'

function ControlPanel(): ReactNode {
  const [res, setRes] = useState()

  const ipcHandle = (): void => {
    window.electron.ipcRenderer.invoke('dialog:openFile').then((result) => {
      console.log(result)
      setRes(result)
    })
  }

  const userAnswers = useShmutorStore((state) => state.userAnswers)
  const clearAnswers = useShmutorStore((state) => state.clearAnswers)

  return (
    <Spacing direction="H" size="M">
      <Button onClick={ipcHandle}>{LABELS.open_file}</Button>
      <Button onClick={clearAnswers} disabled={userAnswers.size == 0}>
        {LABELS.start_again}
      </Button>
      <div>{res}</div>
      <div>{JSON.stringify(Object.fromEntries(userAnswers))}</div>
    </Spacing>
  )
}

export default ControlPanel
