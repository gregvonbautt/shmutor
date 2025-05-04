import { useShmutorStore } from "./Store"

export function useLabels(): [(name: string) => string | undefined, (ls: { [key: string]: string }) => void] {
  const labels = useShmutorStore((state) => state.labels)
  const addLabels = useShmutorStore((state) => state.addLabels)
  return [(name: string) => (labels.get(name)), addLabels]
}

export enum CoreLabelNames {
  next = "next",
  previous = "previous",
  start = "start",
  start_over = "start_over",
  num_questions = "num_questions",
  check = "check",
  stats = "stats",
  num_answered = "num_answered",
  num_correct = "num_correct",
  swap = "swap",
  load_file = "load_file",
}

// TODO implement localization
export const CoreLabels = {
  [CoreLabelNames.next]: 'Дальше',
  [CoreLabelNames.previous]: 'Назад',
  [CoreLabelNames.start]: 'Начать',
  [CoreLabelNames.start_over]: 'Начать заново',
  [CoreLabelNames.num_questions]: 'Вопросов',
  [CoreLabelNames.check]: 'Проверить',
  [CoreLabelNames.stats]: 'Статистика',
  [CoreLabelNames.num_answered]: 'Дано ответов',
  [CoreLabelNames.num_correct]: 'Правильных ответов',
  [CoreLabelNames.swap]: 'Поменять вопрос и ответ',
  [CoreLabelNames.load_file]: 'Загрузить файл'
}
