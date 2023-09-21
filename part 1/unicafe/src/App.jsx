import {useState} from "react";

const Display = props => <p>{props.text} {props.value}</p>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  if (total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text='good' value={good} />
          <StatisticsLine text='neutral' value={neutral} />
          <StatisticsLine text='bad' value={bad} />
          <StatisticsLine text='all' value={total} />
          <StatisticsLine text='average' value={(good-bad)/total} />
          <StatisticsLine text='positive' value={`${good/total * 100} %`} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (newValue, handler) => {
    handler(newValue)
  }

  const total = good+neutral+bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClick(good+1, setGood)} text='good' />
      <Button handleClick={() => handleClick(neutral+1, setNeutral)} text='neutral' />
      <Button handleClick={() => handleClick(bad+1, setBad)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App