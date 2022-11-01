import React from 'react'
import { useState } from 'react'

const PersonForm = (props) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handleNameChange = (event) => {
        setNewName(event.target.value) // We are saving the typed name into newName and retrieve it in addPerson.
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value) // We are saving the typed number into newName and retrieve it in addPerson
    }

    function retrieveNewId() {
        if (props.persons.length === 0) return 0
        else {
            const ids = props.persons.map(person => person.id)
            let index = ids[ids.length - 1] + 1
            return index
        }
    }

    const addPerson = (event) => {
        event.preventDefault()
        let found = false
        props.persons.forEach(person => {
            if (JSON.stringify(person.name) === JSON.stringify(newName)) {
                found = true;
            }
        })
        if (found) {
            alert(`${newName} is already added to phonebook`)
        }
        else {
            let newId = retrieveNewId()
            const personObject = {
                name: newName,
                number: newNumber,
                id: newId
            }
            props.setPersons(props.persons.concat(personObject))
        }
        setNewName('')
        setNewNumber('')
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name:
                <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number:
                <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm