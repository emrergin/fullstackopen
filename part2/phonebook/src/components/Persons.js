import Person from './Person';

const Persons = ({persons, deleteHandler}) => 
    {return(
        <>
        {persons.map(person=> <Person key={person.name} 
                                        name={person.name} 
                                        number={person.number} 
                                        id={person.id} 
                                        deleteHandler={deleteHandler}/> )}
        </>
    );
    }

 
export default Persons;