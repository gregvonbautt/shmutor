import { Input, Tag } from '@fluentui/react-components'
import { CheckmarkCircleRegular } from '@fluentui/react-icons'
import { Challenge, useShmutorStore } from '@renderer/common/Store'
import { useEffect, useState } from 'react'
import Spacing from './Spacing'

function ChallengeGroup(props: { firstIdx: number; num: number }): JSX.Element {
  const challenges = useShmutorStore((state) => state.challenges)
  const items = challenges.slice(props.firstIdx, props.firstIdx + props.num).map((i, idx) => {
    const index = props.firstIdx + idx
    return <RenderChallenge key={`challenge-${index}`} challenge={i} idx={index} />
  })

  return (
    <Spacing direction="V" size="M">
      {items}
    </Spacing>
  )
}

function RenderChallenge(props: { challenge: Challenge; idx: number }): JSX.Element {
  const [input, setInput] = useState<string>('')
  const userAnswers = useShmutorStore((state) => state.userAnswers)
  const userAnswer = userAnswers.get(props.idx)

  // clear input if index changes
  useEffect(() => setInput(''), [props.idx])

  // clear input if all answers are cleared
  useEffect(() => {
    if (userAnswers.size == 0) setInput('')
  }, [userAnswers])

  const provideAnswer = useShmutorStore((state) => state.provideAnswer)

  const submitAnswer = (): void => {
    if (input) {
      provideAnswer(props.idx, input.toLowerCase())
    }
  }

  return (
    <Spacing direction="H" size="M">
      <div>
        <Tag>{props.challenge.question}</Tag>
      </div>
      {!userAnswer ? (
        <div>
          <Input
            value={input}
            onChange={(_, d) => setInput(d.value)}
            onKeyDown={(e) => {
              if (e.key == 'Enter') submitAnswer()
            }}
          />
        </div>
      ) : (
        <RenderAnswer challenge={props.challenge} answer={userAnswer} />
      )}
    </Spacing>
  )
}

function RenderAnswer(props: { challenge: Challenge, answer: string }): JSX.Element {
  if (props.answer.toLowerCase() == props.challenge.answer.toLowerCase()) {
    return (
      <Spacing direction="H" size="S">
        <div style={{ color: 'green', fontWeight: 'bold' }}>{props.challenge.answer}</div>
        <CheckmarkCircleRegular />
      </Spacing>
    )
  } else {
    return (
      <>
        <Spacing direction="H" size="M">
          <div style={{ textDecoration: 'line-through', color: 'red' }}>{props.answer}</div>
          <div style={{ fontWeight: 'bold' }}>{props.challenge.answer}</div>
        </Spacing>
      </>
    )
  }
}

export default ChallengeGroup
