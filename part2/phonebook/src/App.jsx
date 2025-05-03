import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notificacion'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState({text: null, type:null})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    if (person !== undefined) {
      if (confirm(`${newName} is already on the book, replace old number with new one?`)) {
        const changedPerson = {...person, number: newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setMessage({text: `Changed ${returnedPerson.name}'s number successfully`, type: 'success'})
            setTimeout(() => {
              setMessage({text: null, type:null})
            }, 5000)
          })
          .catch(error => {
            setMessage({text: `errorrrrr ${person.name} ya fue borraddooooo`, type: 'failure'})
            setTimeout(() => {
              setMessage({text: null, type:null})
            }, 5000)
          })
      } else {
        console.log('nada')
      }
    } else {
      const newPersonObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({text: `Added ${returnedPerson.name} successfully`, type: 'success'})
          setTimeout(() => {
            setMessage({text: null, type:null})
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const deletePerson = id => {
    const person = persons.find(person => person.id === id)
    if (confirm(`de verdad quiere borrar a ${person.name}?`)) {
      personService
      .remove(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
      })
    }
  }

  const personsToShow = nameFilter ? persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onChange={handleNameFilter} />
      <h2>add a new</h2>
      <Form newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addContact={addContact} />
      <h2>Numbers</h2>
      <Persons contacts={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App