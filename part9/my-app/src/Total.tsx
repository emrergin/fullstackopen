interface Part{
    name: string;
    exerciseCount: number;
}


const Total = ({parts}:{parts: Array<Part>}) =>{
    return(
        <p>
            Number of exercises{" "}
            {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
}

export default Total;