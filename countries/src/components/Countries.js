import React from 'react'
import Country from './Country.js'

const Countries = (props) => {
    return (
        <div>
            {props.countries.map(country => {
                return <Country name={country.name} />
            }
            )}
        </div>
    )
}

export default Countries