import { useState, useEffect } from 'react'   
import axios from 'axios'                   
import Filter from './components/Filter'
import PersonFrom from './components/PersonFrom'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


const addPerson = (event) => {
  event.preventDefault()

  const nameExists = persons.find(p => p.name === newName)
  if (nameExists) {
    alert(`${newName} is already added to phonebook`)
    return
  }

  const personObject = {
    name: newName,
    number: newNumber
  }

  personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
}


  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
      
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>add a new</h2>
      <PersonFrom 
        addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
          
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )
} 

export default App
