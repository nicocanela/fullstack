const Persons = ({ contacts, deletePerson }) => {
    return (
      contacts.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)
    )
  }
  
  const Person = ({ person, deletePerson }) => {
    return (
      <p>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>borrar</button>
      </p>
    )
  }

export default Persons