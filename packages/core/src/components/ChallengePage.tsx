import { Button, Input, Tag } from '@fluentui/react-components'
import { CheckmarkCircleRegular, EyeRegular } from '@fluentui/react-icons'
import React, { ReactNode, useEffect, useState } from 'react'
import { LABELS } from '../common/Labels'
import { Challenge, useShmutorStore } from '../common/Store'
import { cmp } from '../common/Utils'
import { Spacing } from './Spacing'

function ChallengePage(props: {
  controls?: ReactNode
  firstIdx: number
  num: number
}): React.ReactElement {
  const challenges = useShmutorStore((state) => state.challenges)
  const userAnswers = useShmutorStore((state) => state.userAnswers)

  const [pageInput, setPageInput] = useState(new Map<number, string>())

  // clear input in case of user answers reset
  useEffect(() => {
    if (userAnswers.size == 0) setPageInput(new Map<number, string>())
  }, [userAnswers])

  const provideAnswer = useShmutorStore((state) => state.provideAnswer)
  const updateInput = (idx: number, input?: string): void => {
    setPageInput((pageInput) => {
      const upd = new Map<number, string>(pageInput)
      if (!input) {
        upd.delete(idx)
      } else {
        upd.set(idx, input)
      }
      return upd
    })
  }

  const submitAnswer = (idx: number): void => {
    const answer = pageInput.get(idx)
    if (answer) {
      provideAnswer(props.firstIdx + idx, answer)
      updateInput(idx, undefined)
    }
  }

  const items = challenges.slice(props.firstIdx, props.firstIdx + props.num).map((i, idx) => {
    const globalIdx = props.firstIdx + idx
    return (
      <RenderChallenge
        key={`challenge-${globalIdx}`}
        challenge={i}
        globalIdx={globalIdx}
        input={pageInput.get(idx) || ''}
        onInputChange={(input) => updateInput(idx, input)}
        submitAnswer={() => submitAnswer(idx)}
      />
    )
  })

  return (
    <Spacing direction="V" size="M">
      <Spacing direction="H" size="M">
        <Button
          disabled={pageInput.size == 0}
          onClick={() => {
            pageInput.forEach((_, idx) => submitAnswer(idx))
          }}
        >
          {LABELS.check}
        </Button>
        {props.controls}
      </Spacing>
      {items}
    </Spacing>
  )
}

function RenderChallenge(props: {
  challenge: Challenge
  globalIdx: number
  input: string
  onInputChange: (input?: string) => void
  submitAnswer: () => void
}): React.ReactElement {
  const userAnswers = useShmutorStore((state) => state.userAnswers)
  const userAnswer = userAnswers.get(props.globalIdx)
  const [peek, setPeek] = useState(false)

  return (
    <Spacing direction="H" size="M">
      <div>
        <Tag>{props.challenge.question}</Tag>
      </div>
      {!userAnswer ? (
        <Spacing direction="H" size="M">
          <div>
            <Input
              value={props.input}
              onChange={(_, d) => props.onInputChange(d.value)}
              onKeyDown={(e) => {
                if (e.key == 'Enter') props.submitAnswer()
              }}
            />
          </div>
          <Button
            icon={<EyeRegular />}
            onMouseDown={() => setPeek(true)}
            onMouseLeave={() => setPeek(false)}
          />
          {peek && <div style={{ color: 'lightgray' }}>{props.challenge.answer}</div>}
        </Spacing>
      ) : (
        <RenderAnswer challenge={props.challenge} answer={userAnswer} />
      )}
    </Spacing>
  )
}

function RenderAnswer(props: { challenge: Challenge, answer: string }): JSX.Element {
  if (cmp(props.answer, props.challenge.answer)) {
    return (
      <Spacing direction="H" size="S">
        <div style={{ color: 'green', fontWeight: 'bold' }}>{props.challenge.answer}</div>
        <CheckmarkCircleRegular />
      </Spacing>
    )
  } else {
    return (
      <>
        <Spacing direction="H" size="S">
          <div style={{ textDecoration: 'line-through', color: 'red' }}>{props.answer}</div>
          <div style={{ fontWeight: 'bold' }}>{props.challenge.answer}</div>
        </Spacing>
      </>
    )
  }
}

export default ChallengePage
