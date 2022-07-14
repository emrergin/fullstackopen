import { CoursePart } from "./types"

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };


const Part =  ({part}:{part:CoursePart})=> {
    switch (part.type){
        case "normal":
            return(
                <>
                    <h3>{part.name}-{part.exerciseCount}</h3>
                    <div><em>{part.description}</em></div>
                </>
            )
        case "groupProject":
            return(
                <>
                    <h3>{part.name}-{part.exerciseCount}</h3>
                    <div>Project exercises: {part.groupProjectCount}</div>
                </>
            )
        case "submission":
            return(
                <>
                    <h3>{part.name}-{part.exerciseCount}</h3>
                    <div><em>{part.description}</em></div>
                    <div>Submit to: <a href={part.exerciseSubmissionLink} target="_blank" rel="noreferrer">{part.exerciseSubmissionLink}</a></div>
                </> 
            )
        case "special":
            return(
                <>
                    <h3>{part.name}-{part.exerciseCount}</h3>
                    <div><em>{part.description}</em></div>
                    <div>
                    <strong>requirements: </strong>

                    {
                        part.requirements.map(
                            (requirement,index)=> <span key={index}>{requirement}{index<part.requirements.length-1? ', ':""}</span>
                        )
                    }
                    </div>
                </>
            )
        default:
            return assertNever(part)
    }
}
export default Part