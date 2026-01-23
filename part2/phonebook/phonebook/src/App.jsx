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
    const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    
    if (!ok) return 

    const updatedPerson = {...nameExists , number: newNumber}

    personService
      .update(nameExists.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => 
          p.id !== nameExists.id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })

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

  const handleDelete = (id, name) => {
    const ok = window.confirm(`Delete ${name}?`)
    if (!ok) return

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
} 

export default App
