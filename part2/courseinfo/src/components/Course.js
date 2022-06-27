import Header from './Header';
import Total from './Total';
import Content from './Content';

const Course = ({course}) => {
    return ( <div>
        <Header title={course.name} />
        <Content parts={course.parts} />
        <Total sum={course.parts.reduce((start,current)=>
             start+current.exercises,0)}/>
      </div> );
}
 
export default Course;