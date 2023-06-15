import { useState } from "react";

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const copypoints = Array(anecdotes.length).fill(0)
  // console.log(copypoints)


  const [points, setPoints] = useState(copypoints)
  // console.log(points)

  // const [highest, setHighest] = useState(0)

  const selectRandom = () => {
    const anecdotesLenght = anecdotes.length
    // console.log(anecdotesLenght)
    const randomNumber = Math.floor(Math.random() * (anecdotesLenght - 1))
    setSelected(randomNumber);
  }

  const voteAnectode = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    // console.log("highes", highest, points[selected])
    // if (points[selected] > points[highest]){
    //   setHighest(selected)
    // }
  }

  // console.log(Math.max(...points))
  const highest = points.indexOf(Math.max(...points))
  return (
    <div>
      <h1>Anectode of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        Votes: {points[selected]}
      </div>
      <div>
        <p>
          <button onClick={voteAnectode} >Vote</button>
          <button onClick={selectRandom} >Next anectode</button>
        </p>
      </div>
      <h1>Anectode with highest votes</h1>
      <div>{anecdotes[highest]}</div>
      <div>votes: {points[highest]}</div>
    </div>
  );
}

export default App;