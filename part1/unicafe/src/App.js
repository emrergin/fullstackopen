import { useState } from 'react'

const Statistics = ({good,bad,neutral}) => {
  if (good+bad+neutral > 0){
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={`Good`} value={good}/>
          <StatisticLine text={`Neutral`} value={neutral}/>
          <StatisticLine text={`Bad`} value={bad}/>
          <StatisticLine text={`All`} value={good+bad+neutral}/>
          <StatisticLine text={`Average`} value={(good-bad)/(good+bad+neutral)}/>
          <StatisticLine text={`Positive`} value={`${100*good/(good+bad+neutral)}%`}/>
        </tbody>
      </table>
    </>
  )}
  else{
    return(
      <>
      <h1>statistics</h1>
      <div>No feedback given</div>
      </>
    )
  }
}

const StatisticLine = ({text, value})=>{
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}
const Button = ({text,handler}) =>{
  return(
    <button onClick={handler}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handler={()=>setGood(good+1)}/>
      <Button text="neutral" handler={()=>setNeutral(neutral+1)}/>
      <Button text="bad" handler={()=>setBad(bad+1)}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>

  )
}

export default App