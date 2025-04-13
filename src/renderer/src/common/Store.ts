import { create } from 'zustand'

export interface Challenge {
  question: string
  answer: string
}

type State = {
  challenges: Challenge[]
  userAnswers: Map<number, string>
}

type Action = {
  setChallenges: (challenges: Challenge[]) => void
  provideAnswer: (idx: number, answer: string) => void
  clearAnswers: () => void
}

export const useShmutorStore = create<State & Action>((set) => ({
  challenges: [],
  userAnswers: new Map<number, string>(),
  setChallenges: (challenges): void => set(() => ({ challenges: challenges })),
  provideAnswer: (idx: number, answer: string): void =>
    set((state) => ({ userAnswers: new Map(state.userAnswers).set(idx, answer) })),
  clearAnswers: (): void => set({ userAnswers: new Map() })
}))
