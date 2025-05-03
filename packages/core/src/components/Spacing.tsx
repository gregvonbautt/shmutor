import React from "react"

export function Spacing(props: {
  direction: 'V' | 'H'
  size?: 'S' | 'M' | 'L'
  children: React.ReactNode
}): React.ReactElement {
  const className = `spacing${props.direction} spacing${props.direction}${props.size}`
  return <div className={className}>{props.children}</div>
}
