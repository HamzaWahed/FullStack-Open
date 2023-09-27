import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [numbersToShow, setNumbersToShow] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: 10
    }
    let flag = false

    persons.forEach(person => {
      if (person.name === personObject.name) {
        alert(`${newName} is already in the phonebook`)
        flag = true
        return
      }
    })

    if (!flag) {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        setNumbersToShow(persons)
    }
    flag = false
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    if (event.target.value != '') {
      setNumbersToShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
    } else {
      setNumbersToShow(persons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons numbersToShow={numbersToShow} />
    </div>
  )
}

export default App