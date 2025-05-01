export function shuffled<T>(unshuffled: T[]): T[] {
  return unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => ({ ...value }))
}

export function nrm(v?: string): string {
  return (v || '').trim().toLowerCase().split(/\s+/).join(' ')
}

export function cmp(v1?: string, v2?: string): boolean {
  return nrm(v1) === nrm(v2)
}
