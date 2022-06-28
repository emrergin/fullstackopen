import { useState,useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm.js'
import Filter from './components/Filter.js'
import Persons from './components/Persons.js'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearch] = useState('');

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleNameChange = (event)=>{
    setNewName(event.target.value);
  }

  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event)=>{
    setSearch(event.target.value);
  }

  const addName = (event)=>{
    event.preventDefault();
    if (persons.filter(a=> a.name === newName).length)
    {
      alert(`${newName} already exists in the phonebook`);
      return false;
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson));
    setNewName(``);
    setNewNumber(``);
  }

  const filteredPersons =
    searchTerm ?
    persons.filter(a=>a.name.toUpperCase().indexOf(searchTerm.toUpperCase())!==-1)
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} changeHandler={handleSearchChange}/>
      <h2>add new person</h2>
      <PersonForm 
        submitFunction={addName} 
        nameFunction={handleNameChange}
        numberFunction={handleNumberChange}
        name={newName}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />      
    </div>
  )
}

export default App;