import React from 'react';
import PomodoroTimer from './Components/pomodoro-timer'


function App() {
  return (
    <div className="container">
      <PomodoroTimer defaultPomodoroTime={2400} shortRestTime={600} longRestTime={1200} cycles={4}/>
    </div>
  );
}

export default App;
