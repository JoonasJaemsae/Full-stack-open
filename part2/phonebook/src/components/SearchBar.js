import React from 'react'

const SearchBar = ({ persons, setSearchResults }) => {

    const handleSubmit = (event) => event.preventDefault()

    const handleSearchChange = (event) => {
        if (!event.target.value) return setSearchResults(persons)

        const resultsArray = persons.filter(person =>
            person.name.toLowerCase().includes(event.target.value.toLowerCase()))

        setSearchResults(resultsArray)
    }

    return (
        <header>
            <form onSubmit={handleSubmit}>
                filter shown with&nbsp;
                <input onChange={handleSearchChange} />
            </form>
        </header>
    )
}

export default SearchBar