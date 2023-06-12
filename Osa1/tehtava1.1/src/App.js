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
      <p>{props.info.name} {props.info.exercises}</p>
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
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content contentlist={parts} />
      <Total parts={parts} />
    </div>
  );
}

export default App;
