const Filter = ({value, changeHandler}) => {
    return ( 
        <div>
            <label htmlFor="searchBar">Search </label>
            <input value={value} onChange={changeHandler} id="searchBar"/>
        </div>
     );
}
 
export default Filter;