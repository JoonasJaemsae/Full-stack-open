import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar.js'
import Countries from './components/Countries.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        setSearchResults(response.data)
      })
  }, [])
  console.log('render', countries.length, 'notes')

  return (
    <div>
      <div>
        <SearchBar countries={countries} setSearchResults={setSearchResults} />
      </div>
      <div>
        <Countries countries={searchResults} />
      </div>
    </div>
  )
}

export default App;
