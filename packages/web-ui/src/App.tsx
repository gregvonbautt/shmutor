import { Challenge, ShmutorApp } from '@shmutor/core'
import './App.css'
import '@shmutor/core/core.css'

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
