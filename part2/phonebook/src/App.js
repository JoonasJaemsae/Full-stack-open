import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value) // We are saving the typed name into newName and retrieve it in addPerson.
  }

  const addPerson = (event) => {
    event.preventDefault()
    persons.forEach(person => {
      if (JSON.stringify(person.name) === JSON.stringify(newName)) {
        alert('Name is already in phonebook')
        
      }
    })
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  // <div>
    {/* {props.content.map(part => */}
      // <Part key={part.id} name={part.name} exercises={part.exercises} />
    // )}
  {/* </div> */}

  // let sum = 0
  // props.content.forEach(part => {
    // sum += part.exercises
  // });

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App