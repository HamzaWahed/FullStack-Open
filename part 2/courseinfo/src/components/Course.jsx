const Header = ({courseTitle}) => {
    return (
      <h1>
        {courseTitle}
      </h1>
    )
  }
  
const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({parts}) => {
    return (
        <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Total = ({parts}) => {
    return (
        <strong>total of {parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</strong>
    )
}
  
const Course = ({course}) => {
    return (
        <div>
        <Header courseTitle={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
}

export default Course