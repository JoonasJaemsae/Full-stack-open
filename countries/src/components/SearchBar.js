import React from 'react'

const SearchBar = ({ countries, setSearchResults }) => {

    const handleSubmit = (event) => event.preventDefault()

    const handleSearchChange = (event) => {
        if (!event.target.value) return setSearchResults(countries)

        const resultsArray = countries.filter(country =>
            country.name.toLowerCase().includes(event.target.value.toLowerCase()))

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