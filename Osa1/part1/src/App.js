const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello prop {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
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
    <>
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
    </>
  )
}

export default App;
