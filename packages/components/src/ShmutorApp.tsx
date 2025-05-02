import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import { useEffect } from 'react'
import { ChallengeBank, useShmutorStore } from './common/Store'
import ChallengePanel from './components/ChallengePanel'
import ControlPanel from './components/ControlPanel'
import Spacing from './components/Spacing'
import './styles.css'

export function ShmutorApp(props: { challengeBank: ChallengeBank }): JSX.Element {
  const setChallengeBank = useShmutorStore((state) => state.setChallengeBank)
  useEffect(() => setChallengeBank(props.challengeBank), [props.challengeBank])

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ margin: '2em' }}>
        <Spacing direction="V" size="M">
          <ControlPanel />
          <ChallengePanel />
        </Spacing>
      </div>
    </FluentProvider>
  )
}
