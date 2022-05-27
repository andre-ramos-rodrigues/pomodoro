import React from 'react'
import secondsToMinute from './secondsToMinute'

type TimerProps = {
    mainTime: number
}

export default function Timer({mainTime}: TimerProps): JSX.Element {
  return (
    <div className="timer">
        {secondsToMinute(mainTime)}
    </div>
  )
}
