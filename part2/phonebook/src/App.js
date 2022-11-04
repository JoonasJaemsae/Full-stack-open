import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SearchBar from './components/SearchBar'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setSearchResults(response.data)
      }).catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <SearchBar persons={persons} setSearchResults={setSearchResults} />
      </div>
      <h3>Add a new</h3>
      <div>
        <PersonForm persons={persons} setPersons={setPersons} />
      </div>
      <h3>Numbers</h3>
      <div>
        <Persons persons={searchResults} />
      </div>
    </div>
  )
}

export default App