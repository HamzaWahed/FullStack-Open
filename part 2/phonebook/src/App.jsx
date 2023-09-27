import { useState } from 'react'

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
      number: newNumber
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
      <div>filter shown with <input onChange={handleFilterChange} /></div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {numbersToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
      </div>
      <div>debug: {newNumber}</div>
    </div>
  )
}

export default App