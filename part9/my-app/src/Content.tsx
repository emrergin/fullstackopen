import Part from './Part'
import {CoursePart} from './types'

const Content = ({parts}:{parts: CoursePart[]}) =>{
    return(
        <>
        {parts.map(
            (part, index:number)=> <Part part={part} key={index}/>
        )

        }
        </>
    )
}

export default Content;