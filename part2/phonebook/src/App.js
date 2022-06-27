import { useState } from 'react'
import PersonForm from './components/PersonForm.js'
import Filter from './components/Filter.js'
import Persons from './components/Persons.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearch] = useState('')

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