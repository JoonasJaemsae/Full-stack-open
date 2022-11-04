import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar.js'
import Countries from './components/Countries.js'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const url = `https://restcountries.com/v3.1/all`
    axios
      .get(url)
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>
        <SearchBar allCountries={allCountries} setSearchResults={setSearchResults} />
      </div>
      <div className="temp">
      </div>
      <div>
        <Countries countries={searchResults} setSearchResults={setSearchResults} />
      </div>
    </div>
  )
}

export default App;
