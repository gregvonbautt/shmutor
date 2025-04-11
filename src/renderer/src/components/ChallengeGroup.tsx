import { Button, Input, Tag } from '@fluentui/react-components'
import { ArrowCircleRightRegular, CheckmarkCircleRegular } from '@fluentui/react-icons'
import { useState } from 'react'
import Spacing from './Spacing'

export interface ChallengeItem {
  question: string
  answer: string
}

function ChallengeGroup(props: { items: ChallengeItem[] }): JSX.Element {
  const challenges = props.items.map((i, idx) => (
    <RenderChallenge key={`challenge-${idx}`} challenge={i} />
  ))

  return (
    <div
      style={{
        display: 'table',
        tableLayout: 'fixed',
        width: '100%'
      }}
    >
      {challenges}
    </div>
  )
}

function RenderChallenge(props: { challenge: ChallengeItem }): JSX.Element {
  const cellStyle = {
    display: 'table-cell',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  const [input, setInput] = useState<string>()
  const [userAnswer, setUserAnswer] = useState<string>()

  return (
    <div style={{ display: 'table-row' }}>
      <div style={cellStyle}>
        <div style={{ marginBottom: '1em' }}>
          <Tag>{props.challenge.question}</Tag>
        </div>
      </div>
      {!userAnswer ? (
        <>
          <div style={cellStyle}>
            <Input value={input} onChange={(_, d) => setInput(d.value)} />
          </div>
          <Button
            disabled={!input}
            icon={<ArrowCircleRightRegular onClick={() => setUserAnswer(input?.toLowerCase())} />}
          />
        </>
      ) : (
        <RenderAnswer challenge={props.challenge} answer={userAnswer} />
      )}
    </div>
  )
}

function RenderAnswer(props: { challenge: ChallengeItem, answer: string }): JSX.Element {
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
