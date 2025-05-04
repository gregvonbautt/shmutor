import { create } from 'zustand'

export type Labels = Map<string, string>

export interface Challenge {
  question: string
  answer: string
}

type State = {
  labels: Labels,
  challengeBank: Challenge[]
  challenges: Challenge[]
  userAnswers: Map<number, string>
}

type Action = {
  addLabels: (ls: { [key: string]: string }) => void
  setChallengeBank: (cb: Challenge[]) => void
  setChallenges: (challenges: Challenge[]) => void
  provideAnswer: (idx: number, answer: string) => void
  clearAnswers: () => void
}

export const useShmutorStore = create<State & Action>((set) => ({
  labels: new Map<string, string>(),
  challengeBank: [],
  challenges: [],
  userAnswers: new Map<number, string>(),
  addLabels: (ls) => set((state) => {
    const labels = new Map<string, string>([...state.labels])
    Object.keys(ls).forEach(name => labels.set(name, ls[name]))
    return { labels }
  }),
  setChallengeBank: (cb): void => set(() => ({ challengeBank: cb })),
  setChallenges: (c): void => set(() => ({ challenges: c })),
  provideAnswer: (idx: number, answer: string): void =>
    set((state) => ({ userAnswers: new Map(state.userAnswers).set(idx, answer) })),
  clearAnswers: (): void => set({ userAnswers: new Map() })
}))
