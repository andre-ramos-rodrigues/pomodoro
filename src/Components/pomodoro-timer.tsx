import React, { useEffect, useCallback } from 'react'
import { useInterval } from '../hooks/useInterval'
import Button from './button'
import secondsToMinute from './secondsToMinute'
import Timer from './timer'

const bellStart = require('../sounds/src_sounds_bell-start.mp3')
const bellFinish = require('../sounds/src_sounds_bell-finish.mp3')

const audioStart = new Audio(bellStart)
const audioStop = new Audio(bellFinish)

type PomodoroTimerProps = {
    defaultPomodoroTime: number
    shortRestTime: number
    longRestTime: number
    cycles: number
}

export default function PomodoroTimer({defaultPomodoroTime, shortRestTime, longRestTime, cycles}
  : PomodoroTimerProps): JSX.Element {
    const [ mainTime, setMainTime ] = React.useState(defaultPomodoroTime)
    const [ timeIsCounting, setTimeIsCounting ] = React.useState(false)
    const [ isWorking, setIsWorking ] = React.useState(false)
    const [ isResting, setIsResting ] = React.useState(false)
    const [ cyclesManager, setCyclesManager ] = React.useState(new Array(cycles - 1).fill(true))

    const [ completedCycles, setCompletedCyles ] = React.useState(0)
    const [ workingTime, setWorkingTime ] = React.useState(0)
    const [ numOfPomodoros, setNumOfPomodoros ] = React.useState(0)
    const [ status, setStatus ] = React.useState('')

    useInterval(() => {
      setMainTime(mainTime - 1)
        if (isWorking) setWorkingTime(workingTime + 1)
    }, 
      timeIsCounting? 1000 : null)

    const working = useCallback(() => {
        setStatus('Working')
        setTimeIsCounting(true)
        setIsWorking(true)
        setIsResting(false)
        setMainTime(defaultPomodoroTime)
        audioStart.play()
      }, [setTimeIsCounting, setIsWorking, setIsResting, setMainTime, defaultPomodoroTime])

    const resting = useCallback((long: boolean) => {
        setStatus('Resting')
        setTimeIsCounting(true)
        setIsWorking(false)
        setIsResting(true)
        audioStop.play()

        if (long) {
          setMainTime(longRestTime)
        } else {
          setMainTime(shortRestTime)
        }
      }, [setTimeIsCounting,setIsWorking,setIsResting, setMainTime, longRestTime, shortRestTime])

      useEffect(() => {
        if(isWorking) document.body.classList.add('working');
        if(isResting) document.body.classList.remove('working')
  
        if (mainTime > 0) return
  
        if (isWorking && cyclesManager.length > 0) {
          resting(false)
          cyclesManager.pop()
        } else if (isWorking && cyclesManager.length <= 0){
          resting(true)
          setCyclesManager(new Array(cycles - 1).fill(true))
          setCompletedCyles(completedCycles + 1)
        } 
        if (isWorking) setNumOfPomodoros(numOfPomodoros + 1)
        if (isResting) working()
      }, 
      [isWorking, isResting, completedCycles, cycles, cyclesManager, mainTime, numOfPomodoros, resting, working, setCyclesManager])
  

  return (

    <div className='pomodoro'>
      <div>
        { !isWorking && !isResting ? (
          <div className='textoInicial'>
            <h2>Bem vindo ao Pomodoro</h2>
            <p>Clique em work para começar o cronômetro de trabalho</p>
            <p>Após 40 minutos, você terá 10 minutos de descanso</p>
            <p>Após 4 sequências, seu descanso será de 20 minutos</p>
          </div>
        ): 
        <div>
          <h2>You are: {status}</h2>
          <Timer mainTime={mainTime}/>
        </div>}
      </div>
      <div className='btnContainer'>
      <Button text='work' className='btn' onClick={() => working()}/>
      <Button text='rest' className='btn' onClick={() => resting(false)}/>
      <Button
      className={!isWorking && !isResting? 'hidden' : 'btn'} 
      text={
        timeIsCounting? 'pausar' : 'retomar'
      } onClick={() => setTimeIsCounting(!timeIsCounting)}/>
      </div>
      <div className='info'>
        { isWorking || isResting ? 
        <div>
          <p>Cliclos concluídos: {completedCycles}</p>
          <p>Pomodoros concluídos: {numOfPomodoros}</p>
          <p>Tempo trabalhado: {secondsToMinute(workingTime)}</p>
        </div> : null}
      </div>  
    </div>
    
  )
}
