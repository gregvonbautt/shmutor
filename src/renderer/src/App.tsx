import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  FluentProvider,
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
  webLightTheme
} from '@fluentui/react-components'
import './assets/main.css'

function App(): JSX.Element {
  const ipcHandle = (): void => {
    window.electron.ipcRenderer.invoke('dialog:openFile').then(result => {
      console.log(result)
      alert(result)
    })
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="spacingVerticalS">
        <Button onClick={ipcHandle}>Browse...</Button>
        <Accordion>
          <AccordionItem value="1">
            <AccordionHeader>Accordion Header 1</AccordionHeader>
            <AccordionPanel>
              <div>Accordion Panel 1</div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionHeader>Accordion Header 2</AccordionHeader>
            <AccordionPanel>
              <div>Accordion Panel 2</div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionHeader>Accordion Header 3</AccordionHeader>
            <AccordionPanel>
              <div>Accordion Panel 3</div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <TeachingPopover>
          <TeachingPopoverTrigger>
            <Button onClick={ipcHandle}>TeachingPopover trigger</Button>
          </TeachingPopoverTrigger>
          <TeachingPopoverSurface>
            <TeachingPopoverHeader>Tips</TeachingPopoverHeader>
            <TeachingPopoverBody>
              <TeachingPopoverTitle>Teaching Bubble Title</TeachingPopoverTitle>
              <div>This is a teaching popover body</div>
            </TeachingPopoverBody>
            <TeachingPopoverFooter primary="Learn more" secondary="Got it" />
          </TeachingPopoverSurface>
        </TeachingPopover>
      </div>
    </FluentProvider>
  )
}

export default App
