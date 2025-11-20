import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <div>
    <br/>{text} {value}
  </div>
  
)

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = (good / all) * 100

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return(
    <div>
      <h2>Statistics</h2>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive + "%"}/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const Good = () => setGood(good + 1)
  const Neutral = () => setNeutral(neutral + 1)
  const Bad = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={Good} text="good"/>
      <Button handleClick={Neutral} text="neutral"/>
      <Button handleClick={Bad} text="bad"/>

      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

export default App


