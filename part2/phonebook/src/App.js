import React from 'react'
import { useState, useEffect } from 'react'
import Notification from './components/Notification.js'
import personService from './services/persons.js'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SearchBar from './components/SearchBar'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('green')

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
        setSearchResults(initialNotes)
      }).catch(error => {
        console.error(error)
      })
  }, [])

  const deletePerson = id => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} from the phonebook?`)) {
      personService
        .remove(personId)
        .then(response => {
          setPersons(persons.filter(person => person.id !== personId))
          setSearchResults(searchResults.filter(person => person.id !== personId))
          setMessage(`${personName} was successfully deleted from the phonebook.`)
          setMessageType('green')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch((error) => {
          setMessage(`Information of ${personName} has already been removed from the server`)
          setMessageType('red')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== personId))
          setSearchResults(persons.filter(person => person.id !== personId))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    let found = false
    persons.forEach(person => {
      if (JSON.stringify(person.name) === JSON.stringify(newName)) {
        found = true;
      }
    })
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const oneManArray = persons.filter(person => person.name === newName)
        const idToUpdate = oneManArray[0].id
        const personToUpdate = oneManArray[0]
        const updatedPerson = { ...personToUpdate, number: newNumber }
        personService
          .update(idToUpdate, updatedPerson)
          .then(response => {
            const newPersonsArray = persons.map(person => (person.id !== personToUpdate.id) ? person : response)
            setPersons(newPersonsArray)
            setSearchResults(newPersonsArray)
            setMessage(`Contact info for ${personToUpdate.name} was modified successfully.`)
            setMessageType('green')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }).catch((error) => {
            setMessage(`Information of ${personToUpdate.name} has already been removed from the server`)
            setMessageType('red')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== idToUpdate))
            setSearchResults(persons.filter(person => person.id !== idToUpdate))
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSearchResults(persons.concat(returnedPerson))
          setMessage(`${returnedPerson.name} was successfully added to the phonebook.`)
          setMessageType('green')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch((error) => {
          console.error(error)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <div>
        <SearchBar persons={persons} setSearchResults={setSearchResults} />
      </div>
      <h3>Add a new</h3>
      <div>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
        />
      </div>
      <h3>Numbers</h3>
      <div>
        <Persons persons={searchResults} deletePerson={deletePerson} />
      </div>
    </div>
  )
}

export default App