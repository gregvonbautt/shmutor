import { Button, Checkbox } from '@fluentui/react-components'
import { LABELS } from '../common/Labels'
import { useShmutorStore } from '../common/Store'
import { cmp, shuffled } from '../common/Utils'
import { ReactNode, useState } from 'react'
import Spacing from './Spacing'

function ControlPanel(): ReactNode {
  const challengeBank = useShmutorStore((state) => state.challengeBank)
  const setChallengeBank = useShmutorStore((state) => state.setChallengeBank)
  const setChallenges = useShmutorStore((state) => state.setChallenges)
  const [fileName, setFileName] = useState('')
  const [swap, setSwap] = useState(false)

  const ipcHandle = (): void => {
    setFileName('haha!')
    setChallengeBank(
      [{
        question: 'q1',
        answer: 'a1'
      }]
    )

    // window.electron.ipcRenderer.invoke('dialog:openFile').then((result) => {
    //   setFileName(result?.path)
    //   const rows: string[][] = result?.contents || []
    //   setChallengeBank(
    //     rows.map((r) => ({
    //       question: r[0],
    //       answer: r[1]
    //     }))
    //   )
    // })
  }

  const userAnswers = useShmutorStore((state) => state.userAnswers)
  const clearAnswers = useShmutorStore((state) => state.clearAnswers)

  const startChallenge = (): void => {
    const challenges = shuffled(challengeBank)
    if (swap) {
      challenges.forEach((c) => {
        const x = c.answer
        c.answer = c.question
        c.question = x
      })
    }
    setChallenges(challenges)
    clearAnswers()
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Controls */}
      <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
        <Spacing direction="V" size="M">
          <p>
            <Button onClick={ipcHandle}>{LABELS.load_from_file}</Button>
          </p>
          {fileName && (
            <>
              <p>
                {LABELS.file}: {fileName.split('/').at(-1)}
              </p>
              <p>
                {LABELS.num_questions}: {challengeBank.length}
              </p>
            </>
          )}
          <p>
            <Checkbox
              label={LABELS.swap}
              checked={swap}
              onChange={(_, e) => setSwap(e.checked == true)}
            />
          </p>
          <p>
            <Button disabled={challengeBank.length == 0} onClick={startChallenge}>
              {userAnswers.size == 0 ? LABELS.start : LABELS.start_over}
            </Button>
          </p>
        </Spacing>
      </div>

      {/* Stats Panel */}
      <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
        <Stats />
      </div>
    </div>
  )
}

function Stats(): ReactNode {
  const userAnswers = useShmutorStore((state) => state.userAnswers)
  const challenges = useShmutorStore((state) => state.challenges)
  const numCorrect = Array.from(userAnswers.entries()).reduce((cnt, e) => {
    return cnt + (cmp(challenges[e[0]].answer, e[1]) ? 1 : 0)
  }, 0)
  return (
    <Spacing direction="V" size="S">
      <h3>{LABELS.stats}</h3>
      <p>
        {LABELS.number_answered}: {userAnswers.size} / {challenges.length}
      </p>
      <p>
        {LABELS.correct_answers}: {numCorrect} / {userAnswers.size}
        &nbsp;
        {userAnswers.size > 0 ? `(${Math.round((numCorrect * 100) / userAnswers.size)}%)` : ''}
      </p>
    </Spacing>
  )
}

export default ControlPanel
