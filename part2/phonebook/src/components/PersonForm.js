const PersonForm = ({submitFunction,nameFunction,numberFunction, name, number}) => {
    return ( 
    <form onSubmit={submitFunction}>
        <div>
          name: <input value={name}
          onChange={nameFunction} />
        </div>
        <div>
          number: <input value={number} type="tel"
          onChange={numberFunction} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
     );
}
 
export default PersonForm;