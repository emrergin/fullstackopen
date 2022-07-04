import {useEffect, useState} from 'react';
import axios from 'axios';

import CountryInfo from './components/CountryInfo';

function App() {
  const [searchQuery,setSearchQuery]=useState('');
  const [countries, setCountries]=useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const queryHandler = (event) => {
    setSearchQuery(event.target.value);
  }

  const buttonHandler = (countryName) =>{
    setSearchQuery(countryName);
  }

  const filteredCountries = 
  countries.length>0 ? countries.filter(a=>a.name.common.toUpperCase().indexOf(searchQuery.toUpperCase())!==-1) 
  : countries;

  return (
    <div className="App">
      <input value={searchQuery} onChange={queryHandler}/>
      {searchQuery.length===0 && <div>Find a country by typing above.</div>}
      {filteredCountries.length>10 && searchQuery.length>0 && <div>Too many matches. Specify another filter.</div>}
      {filteredCountries.length<=10 && filteredCountries.length>1 && 
        filteredCountries.map(a=> {
        return(
          <div key={a.cca2}>
            <span> {a.name.common} </span>
            <button onClick={() => buttonHandler(a.name.common)}> Show </button>
          </div>
        )
      })
      }
      {filteredCountries.length===1 && <CountryInfo country={filteredCountries[0]}/>}   
      {filteredCountries.length===0 && searchQuery.length>0 && <div>No country named such is found on this planet.</div>}          
    </div>
  );
}

export default App;
