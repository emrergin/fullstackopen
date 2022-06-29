import { useState,useEffect } from 'react'
// import axios from 'axios'
import PersonForm from './components/PersonForm.js'
import Filter from './components/Filter.js'
import Persons from './components/Persons.js'
import Notification from './components/Notification.js'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

  const deleteName= (id,name) =>{
    if (window.confirm(`Do you really want to delete ${name}?`)) {
        personService.deletePerson(id);
        setPersons(persons.filter(a=>a.id!==id))
    }
}

  const addName = (event)=>{
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    let existingPerson = persons.find(a=> a.name === newName);
    if (existingPerson)
    {
      console.log(existingPerson);
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {        
        let updatedPerson = {...existingPerson, number:newNumber};
        personService.update(existingPerson.id,updatedPerson).then(response =>{
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : response));
          // console.log(response);
          setMessage(`${response.name} is updated successfully.`);
          setMessageType(`success`);
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(`${existingPerson.name} was already removed from the server.`);
          setMessageType(`error`);
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })        
      }
      return false;
    }
    personService
    .create(newPerson)
    .then(returnedPerson  => {
      setNewName(``);
      setNewNumber(``);
      setPersons(persons.concat(returnedPerson))
      setMessage(`${returnedPerson.name} is saved.`);
      setMessageType(`success`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const filteredPersons =
    searchTerm ?
    persons.filter(a=>a.name.toUpperCase().indexOf(searchTerm.toUpperCase())!==-1)
    : persons;

  return (
    <div>
      <Notification message={message} messageType={messageType}/>
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
      <Persons persons={filteredPersons} deleteHandler={deleteName}/>      
    </div>
  )
}

export default App;