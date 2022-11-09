import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name}&nbsp;
      {person.number}&nbsp;
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </div>
  )
}

export default Person