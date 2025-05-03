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
        <Part key={part.id} name={part.name} exercises={part.exercises} />  
      ))}
    </>
  )
}
  
const Total = ({parts}) => {
  const exercises = parts.map((part) => (part.exercises))
  return (
    <p>Number of exercises {exercises.reduce((a, b) => (a+b), 0)}</p>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Course = ({ course }) => {
  console.log('quw wea')
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course