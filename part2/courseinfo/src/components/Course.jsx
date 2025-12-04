import Header from './Header'

const Course = ({course}) => {
    return(
        <div>
            <Header course={course.name}/>
        </div>
    )
}


export default Course