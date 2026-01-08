import { useState } from 'react'
import Filter from './components/Filter'
import PersonFrom from './components/PersonFrom'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-789', id: 1 },
    { name: 'Ada Lovelace', number: '234-567-891', id: 2 },
    { name: 'Dan Abramov', number: '345-678-912', id: 3 },
    { name: 'Mary Poppendieck', number: '456-789-123', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.find(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { 
        name: newName, 
        number: newNumber, 
        id: persons.length + 1 
      }
      setPersons(persons.concat(personObject))
    }
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = persons.filter(person =>person.name.toLowerCase().includes(filter.toLowerCase()))
      
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>

      <h2>add a new</h2>
        <PersonFrom 
          addPerson={addPerson}
          newName={newName} handleNameChange={handleNameChange}
          newNumber={newNumber} handleNumberChange={handleNumberChange}/>
          
      <h2>Numbers</h2>
        <Persons persons={personsToShow}/>
    </div>
  )
} 

export default App