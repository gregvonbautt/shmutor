import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import './assets/main.css'
import ChallengePanel from './components/ChallengePanel'
import ControlPanel from './components/ControlPanel'
import Spacing from './components/Spacing'

export function ShmutorApp(): JSX.Element {
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
