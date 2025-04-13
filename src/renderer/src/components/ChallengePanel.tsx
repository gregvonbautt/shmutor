import { Button } from '@fluentui/react-components'
import { LABELS } from '@renderer/common/Labels'
import { Challenge, useShmutorStore } from '@renderer/common/Store'
import { ReactNode, useEffect, useState } from 'react'
import ChallengePage from './ChallengePage'
import Spacing from './Spacing'

const CHALLENGES_PER_PAGE = 8

function ChallengePanel(): ReactNode {
  const setChallenges = useShmutorStore((state) => state.setChallenges)

  useEffect(() => {
    const challenges: Challenge[] = []
    for (let i = 0; i < 25; i++) {
      challenges.push({ question: `question ${i}`, answer: `answer ${i}` })
    }
    setChallenges(challenges)
  }, [setChallenges])

  const challenges = useShmutorStore((state) => state.challenges)
  const userAnswers = useShmutorStore((state) => state.userAnswers)

  const [page, setPage] = useState(0)
  const numPages = Math.trunc((challenges.length - 1) / CHALLENGES_PER_PAGE) + 1
  const firstIdx = page * CHALLENGES_PER_PAGE

  let pageSolved = true
  for (let i = firstIdx; i < Math.min(challenges.length, firstIdx + CHALLENGES_PER_PAGE); i++) {
    if (!userAnswers.get(i)) {
      pageSolved = false
      break
    }
  }

  return (
    <Spacing direction="V" size="M">
      <Spacing direction="H" size="M">
        <Button disabled={page <= 0} onClick={() => setPage(page - 1)}>
          {LABELS.previous}
        </Button>
        <Button disabled={!pageSolved || page >= numPages - 1} onClick={() => setPage(page + 1)}>
          {LABELS.next}
        </Button>
        <div>
          ({page + 1} / {numPages})
        </div>
      </Spacing>

      <ChallengePage firstIdx={firstIdx} num={CHALLENGES_PER_PAGE} />
    </Spacing>
  )
}

export default ChallengePanel
