import React, { useEffect } from 'react'
import readXlsxFile from 'read-excel-file'
import { Challenge, useShmutorStore } from './common/Store'
import ChallengePanel from './components/ChallengePanel'
import ControlPanel from './components/ControlPanel'
import { Spacing } from './components/Spacing'
import './styles.css'

export function ShmutorApp(props: {
  challengeBank?: Challenge[]
  xlsChallengeDef?: File | Blob
}): React.ReactElement {
  const setChallengeBank = useShmutorStore((state) => state.setChallengeBank)

  useEffect(() => {
    if (!props.challengeBank) return
    setChallengeBank(props.challengeBank)
  }, [props.challengeBank])

  useEffect(() => {
    if (!props.xlsChallengeDef) return
    readXlsxFile(props.xlsChallengeDef).then((rows) => {
      setChallengeBank(rows.map(r => ({
        question: r[0].toString(),
        answer: r[1].toString()
      })))
    })
  }, [props.xlsChallengeDef])

  return <Spacing direction="V" size="M">
    <ControlPanel />
    <ChallengePanel />
  </Spacing>
}
