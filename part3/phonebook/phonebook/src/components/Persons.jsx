import Person from './Person'

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map(person => 
        <Person key={person.id} person={person} handleDelete={handleDelete}/>
      )}
    </ul>
  )
}

export default Persons
