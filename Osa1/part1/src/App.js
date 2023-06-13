import { useState } from 'react'

// const Hello = (props) => {
const Hello = ({ name, age }) => {
  // console.log(props)

  // const { name, age } = props
  // const name = props.name;
  // const age = props.age;

  // const bornYear = () => {
  //   const yearNow = new Date().getFullYear()
  //   return yearNow - props.age
  // }
  const bornYear = () => new Date().getFullYear() - age


  return (
    <div>
      <p>Hello prop {name}, you are {age} years old</p>
      <p>
        So you wre probably born {bornYear()}
      </p>
    </div>
  )
}

const App = (props) => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = left + 1
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
  }
  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = right + 1
    setRight(updatedRight);
    setTotal(left + updatedRight);
  }


  // const handleClick = () => {
  //   console.log("clicked")
  // }
  // setTimeout(
  //   () => setCounter(counter + 1), 1000
  // )

  const increaseByOne = () => {
    console.log('increasing, value before', counter);
    setCounter(counter + 1);
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter);
    setCounter(counter - 1);
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter);
    setCounter(0);
  }

  console.log('rendering...', counter)

  // const { counter } = props
  const now = new Date();
  const a = 10;
  const b = 20;
  const nimi = "Pekka";
  const ika = 10;
  console.log("Hello from komponentti");
  console.log(now, a + b);

  const friends = [
    { name: "Leevi", age: 4 },
    { name: "test", age: 11 }
  ]

  const friends2 = ["levist", "venalst"]
  console.log(friends[0])
  console.log(friends[1])

  return (
    <div>
      <Display counter={counter} />
      {/* <p>Lasketaan: {counter}</p> */}
      {/* <button onClick={increaseByOne}> */}
      {/* <button onClick={() => setCounter(counter + 1)}> */}
      {/* plussaus</button>
      <button onClick={setToZero}>ZERO</button> */}
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={decreaseByOne} text="minus" />
      <Button handleClick={setToZero} text="zero" />

      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
      <Hello name="testi" age="derpington" />
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <p>
        {friends[0].name} dsdsdsds {friends[0].age}
        {friends[1].name} dsdsdsds {friends[1].age}
      </p>
      <p>
        printing: {friends2}
      </p>
      <div>
        {left}
        {/* <button onClick={handleLeftClick}>Left</button>
        <button onClick={handleRightClick}>Right</button> */}
        <Button handleClick={handleLeftClick} text="Left" />
        <Button handleClick={handleRightClick} text="Right" />

        {right}
        <p>total: {total}</p>
        <History allClicks={allClicks} />
        {/* <p>{allClicks.join(" ")}</p> */}
      </div>
    </div>
  )
}

// const Display = ({ counter }) => {
//   return (
//     <div>{counter}</div>
//   )
// }
const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// const Button = (props) => {
//   return (
//     <button onClick={props.handleClick}>
//       {props.text}
//     </button>
//   )
// }

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app us used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press histroy: {props.allClicks.join(" ")}
    </div>
  )
}

export default App;
