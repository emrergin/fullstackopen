const Person = ({name,number,id,deleteHandler}) => {
    // console.log(id)
    return (
    <div key={name}>
        <span>{name} {number}</span> 
        <button onClick={()=>deleteHandler(id,name)}>delete</button>
    </div>
     );
}
 
export default Person;