export function Spacing(props: {
  direction: 'V' | 'H'
  size?: 'S' | 'M' | 'L'
  children: React.ReactNode
}): JSX.Element {
  const className = `spacing${props.direction} spacing${props.direction}${props.size}`
  return <div className={className}>{props.children}</div>
}
