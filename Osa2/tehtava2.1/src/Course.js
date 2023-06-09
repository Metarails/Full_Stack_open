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
  
    // console.log("content elemeent: ", parts)
  
    return (
      <div>
        {parts.map(part => <Part key={part.id} info={part} />)}
      </div>
    )
  }
  
  const Total = ({parts}) => {
  
    // console.log("totals: ", parts)
    let execs = 0
    parts.map(part => execs += part.exercises)
  
    // console.log("total execs: ", execs)
  
    const initialExecs = 0
    const total = parts.reduce( (countingValue, valueInCurrentArray) => {
      // console.log('what is happening', countingValue, valueInCurrentArray)
      // console.log("current array index value: ", valueInCurrentArray)
      return countingValue + valueInCurrentArray.exercises
    }, initialExecs)
    // console.log("total:", total)
  
    return (
      <div>
        <h4>
          Number of exercises (with map): {execs}
        </h4>
        <h4>
          Number of exercises (with reduce): {total}
        </h4>
      </div>
    )
  }
  
  const Course = ({course}) => {
  
    // console.log("course elementti: ", course)
    // console.log("head: ", course.name)
    // console.log("id: ", course.id)
    // console.log("head: ", course.parts)
  
    return (
      <div>
        <Header course={course.name} key={course.id} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  

export default Course;