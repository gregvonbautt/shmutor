import { Button } from '@fluentui/react-components'
import { LABELS } from '@renderer/common/Labels'
import { useShmutorStore } from '@renderer/common/Store'
import { ReactNode, useEffect, useState } from 'react'
import ChallengePage from './ChallengePage'

const CHALLENGES_PER_PAGE = 8

function ChallengePanel(): ReactNode {
  const challenges = useShmutorStore((state) => state.challenges)
  const userAnswers = useShmutorStore((state) => state.userAnswers)

  const [page, setPage] = useState(0)
  const numPages = Math.trunc((challenges.length - 1) / CHALLENGES_PER_PAGE) + 1
  const firstIdx = page * CHALLENGES_PER_PAGE

  // reset to page 0 when the answers are cleared
  useEffect(() => {
    if (userAnswers.size == 0) setPage(0)
  }, [userAnswers])

  let pageSolved = true
  for (let i = firstIdx; i < Math.min(challenges.length, firstIdx + CHALLENGES_PER_PAGE); i++) {
    if (!userAnswers.get(i)) {
      pageSolved = false
      break
    }
  }

  const controls = (
    <>
      <Button disabled={page <= 0} onClick={() => setPage(page - 1)}>
        {LABELS.previous}
      </Button>
      <Button disabled={!pageSolved || page >= numPages - 1} onClick={() => setPage(page + 1)}>
        {LABELS.next}
      </Button>
      <div>
        ({page + 1} / {numPages})
      </div>
    </>
  )

  return challenges.length > 0 ? (
    <ChallengePage controls={controls} firstIdx={firstIdx} num={CHALLENGES_PER_PAGE} />
  ) : (
    ''
  )
}

export default ChallengePanel
