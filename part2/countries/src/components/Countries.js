import React from 'react'
import Country from './Country.js'

const Countries = ({ countries, setSearchResults }) => {
    if (countries.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    } else if (((countries.length > 1 && countries.length <= 10) || countries.length === 0)) {
        return (
            <div>
                {countries.map((country, index) =>
                    <div key={index}> {country.name.common} <button onClick={() => setSearchResults([country])}>show</button></div>
                )}
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]} languages={countries[0].languages}/>
            </div>
        )
    }
}

export default Countries