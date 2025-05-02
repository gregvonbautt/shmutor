import { create } from 'zustand'

export interface Challenge {
  question: string
  answer: string
}

export interface ChallengeBank {
  name: string
  challenges: Challenge[]
}

type State = {
  challengeBank: ChallengeBank
  challenges: Challenge[]
  userAnswers: Map<number, string>
}

type Action = {
  setChallengeBank: (cb: ChallengeBank) => void
  setChallenges: (challenges: Challenge[]) => void
  provideAnswer: (idx: number, answer: string) => void
  clearAnswers: () => void
}

export const useShmutorStore = create<State & Action>((set) => ({
  challengeBank: {
    name: '',
    challenges: []
  },
  challenges: [],
  userAnswers: new Map<number, string>(),
  setChallengeBank: (cb): void => set(() => ({ challengeBank: cb })),
  setChallenges: (c): void => set(() => ({ challenges: c })),
  provideAnswer: (idx: number, answer: string): void =>
    set((state) => ({ userAnswers: new Map(state.userAnswers).set(idx, answer) })),
  clearAnswers: (): void => set({ userAnswers: new Map() })
}))
