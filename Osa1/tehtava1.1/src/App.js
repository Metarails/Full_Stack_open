const Header = (props) => {
  // console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  // console.log("PART prop info", props.info)
  return (
    <div>
      <p>{props.info.name} {props.info.exercise}</p>
    </div>
  )
}

const Content = (props) => {
  // console.log("propsit", props)
  // console.log("info prop 0 tiedot: ", props.info[0])
  return (
    <div>
      <Part info={props.contentlist[0]} />
      <Part info={props.contentlist[1]} />
      <Part info={props.contentlist[2]} />
    </div>
  )
}

const Total = (props) => {
  // console.log(props)
  return (
    <div>
      <p>Number of exercises {props.count}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const contentlist = [
    { exercise: exercises1, name: part1 },
    { exercise: exercises2, name: part2 },
    { exercise: exercises3, name: part3 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content contentlist={contentlist} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  );
}

export default App;
