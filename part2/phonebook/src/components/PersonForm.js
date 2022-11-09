import React from 'react'

const PersonForm = (props) => {
    const handleNameChange = (event) => {
        props.setNewName(event.target.value) // We are saving the typed name into newName and retrieve it in addPerson.
    }
    const handleNumberChange = (event) => {
        props.setNewNumber(event.target.value) // We are saving the typed number into newName and retrieve it in addPerson
    }

    return (
        <form onSubmit={props.addPerson}>
            <div>
                name:
                <input
                    value={props.newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number:
                <input
                    value={props.newNumber}
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