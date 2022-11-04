import React from 'react'

const SearchBar = ({ allCountries, setSearchResults }) => {

    const handleSubmit = (event) => event.preventDefault()

    const handleSearchChange = (event) => {
        if (!event.target.value) return setSearchResults(allCountries)

        const resultsArray = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        setSearchResults(resultsArray)
    }

    return (
        <header>
            <form onSubmit={handleSubmit}>
                find countries
                <input onChange={handleSearchChange} />
            </form>
        </header>
    )
}

export default SearchBar