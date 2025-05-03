import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const StatisticsLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({scores}) => {
  const { g, n, b } = scores
  if ((g+n+b) === 0) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text='good' value={g} />
          <StatisticsLine text='neutral' value={n} />
          <StatisticsLine text='bad' value={b} />
          <StatisticsLine text='all' value={(g+n+b)} />
          <StatisticsLine text='avg' value={(g-b)/(g+n+b)} />
          <StatisticsLine text='positive' value={g*100/(g+n+b)+"%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const scores = {g: good, n: neutral, b: bad}

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <h1>Statistics</h1>
      <Statistics scores={scores}/>
    </div>
  )
}

export default App