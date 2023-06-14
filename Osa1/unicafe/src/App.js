import { useState } from "react";

const FeedbackButton = ({ handleClick, text }) => {

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ( {good, bad, neutral}) => {
  
  const allvotes = good + neutral + bad;
  const average = (good - bad) / allvotes
  const positive = ((good / allvotes) * 100) + " %"

  if (allvotes === 0 ){
    return (
      <div>
        <p>No feedback given.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics:</h1>
      <table>
        <tbody>
        <StatisticLine text={"Good: "} value={good} />
        <StatisticLine text={"Neutral: "} value={neutral} />
        <StatisticLine text={"Bad: "} value={bad} />
        <StatisticLine text={"All votes: "} value={allvotes} />
        <StatisticLine text={"Average: "} value={average} />
        <StatisticLine text={"Positive: "} value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine  = (props) => {

  return (
      <tr>
        <td>{props.text}</td><td>{props.value}</td>
      </tr>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const increaseGood = () => {
    setGood(good + 1);
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  }
  const increaseBad = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <FeedbackButton handleClick={increaseGood} text="Good" />
      <FeedbackButton handleClick={increaseNeutral} text="Neutral" />
      <FeedbackButton handleClick={increaseBad} text="Bad" />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
}

export default App;
