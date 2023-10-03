import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [numbersToShow, setNumbersToShow] = useState([])

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
        setNumbersToShow(initialNumbers)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    let flag = false
    persons.forEach(person => {
      if (person.name === personObject.name && confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        phonebookService
          .update(person.id, personObject)
          .then(newNumber => {
            console.log(newNumber)
          })
          
        flag = true
        return
      }
    })

    if (!flag) {
        phonebookService
          .create(personObject)
          .then(newNumbers => {
            setPersons(persons.concat(newNumbers))
            setNewName('')
            setNewNumber('')
            setNumbersToShow(persons)
          })
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

  const deleteUser = (id,name) => {
    if (!confirm(`Delete ${name} ?`)) {
      return
    }

    phonebookService
      .remove(id)
      .then(deletedUser => {
        console.log(deletedUser)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons numbersToShow={numbersToShow} handleClick={deleteUser}/>
    </div>
  )
}

export default App