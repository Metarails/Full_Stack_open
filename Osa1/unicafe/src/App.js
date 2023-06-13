import { useState } from "react";

const FeedbackButton = ({ handleClick, text }) => {

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const FeedbackStats = (props) => {

  return (
    <div>{props.text} {props.count}</div>
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
      <h1>Statistics</h1>
      <FeedbackStats text="Good" count={good} />
      <FeedbackStats text="Neutral" count={neutral} />
      <FeedbackStats text="Bad" count={bad} />
    </div>
  );
}

export default App;
