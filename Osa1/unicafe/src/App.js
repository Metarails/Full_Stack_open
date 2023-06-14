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
  const positive = (good / allvotes) * 100

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
      <div>Good: {good}</div>
      <div>Neutral: {neutral}</div>
      <div>Bad: {bad}</div>
      <div>All votes: {allvotes}</div>
      <div>Average: {average}</div>
      <div>Positive: {positive} %</div>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const increaseGood = () => {
    console.log('good ', good);
    setGood(good + 1);
  }
  const increaseNeutral = () => {
    console.log('neutral ', neutral);
    setNeutral(neutral + 1);
  }
  const increaseBad = () => {
    console.log('bad', bad);
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
