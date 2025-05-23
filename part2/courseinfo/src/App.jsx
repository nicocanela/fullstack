import Course from './components/Course'

const App = () => {
  
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        { name: 'Fundamentals of React', exercises: 10, id: 1 },
        { name: 'Using props to pass data', exercises: 7, id: 2 },
        { name: 'State of a component', exercises: 14, id: 3 },
        { name: 'Redux', exercises: 11, id: 4 },
        { name: 'popita', exercises: 1, id: 5}
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        { name: 'Routing', exercises: 3, id: 1 },
        { name: 'Middlewares', exercises: 7, id: 2 }
      ] 
    }
  ]
  
  
  console.log('popi')
  return (
    <div>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App