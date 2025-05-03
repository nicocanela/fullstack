const Header = (props) => {
  console.log(props.course)
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  const parts = props.parts
  return (
    <>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} />  
      ))}
    </>
  )
}

const Total = (props) => {
  const parts = props.parts
  const exercises = parts.map((part) => (part.exercises))
  console.log(exercises)
  return (
    <>
      <p>Number of exercises {exercises.reduce((a, b) => {a+b}, 0)}</p>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }
    ]
  }
  


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <p>popina</p>
    </div>
  )
}

export default App