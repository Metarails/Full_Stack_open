const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.info.name} {props.info.exercises}</p>
    </div>
  )
}

const Content = ({parts}) => {

  console.log("content elemeeetn: ", parts)

  return (
    <div>
      {parts.map(part => <Part key={part.id} info={part} />)}
    </div>
  )
}

// const Total = (props) => {
//   return (
//     <div>
//       <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     </div>
//   )
// }

const Course = ({course}) => {

  console.log("course ele,mnmtii: ", course)
  console.log("head: ", course.name)
  console.log("id: ", course.id)
  console.log("head: ", course.parts)

  return (
    <>
    <Header course={course.name} key={course.id} />
    <Content parts={course.parts} />
    </>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'INCREASING  increasing text',
        exercises: 111,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  );
}

export default App;
