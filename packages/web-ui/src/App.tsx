import { Challenge, ShmutorApp } from '@shmutor/components'
import './App.css'
import '@shmutor/components/components.css'

function App() {
  const challenges: Challenge[] = [
    { question: 'question!!', answer: 'answer!!' },
    { question: 'question2!!', answer: 'answer2!!' }
  ]
  return <ShmutorApp challengeBank={{
    name: '',
    challenges
  }} />
}

export default App
