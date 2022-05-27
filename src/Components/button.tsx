import React from 'react'

type ButtonProps = {
    onClick?: () => void
    text: string
    className?: string
}

export default function Button({onClick,text,className}:ButtonProps ):JSX.Element {
  return (
    <button className={className} onClick={onClick}>{text}</button>
  )
}
