import { useState } from 'react'

const PersonList = ({persons, filterEntry}) => {

  const filterPersons = (person) => {
    if (person.name.toLowerCase().includes(filterEntry.toLowerCase())){
      return true
    }
    return(
      person.number.toLowerCase().includes(filterEntry.toLowerCase())
    )
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterEntry.toLowerCase()))
  const filteredPersons2 = persons.filter(filterPersons)

  return(
    <>
      <div>
        {persons.map(person => 
            <Person key={person.name} person={person} />
          )}
      </div>
      <h2>Filtered Numbers with name only</h2>
      <div>
        {filteredPersons.map(person => 
            <Person key={person.name} person={person} />
          )}
      </div>
      <h2>Filtered Numbers with numbers too</h2>
      <div>
        {filteredPersons2.map(person => 
            <Person key={person.name} person={person} />
          )}
      </div>
    </>
  )
}

const Person = ({ person }) => {

  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: "Arto Hellas",
      number: "040-1231244",
    },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterEntry, setFilterEntry] = useState("");

  const  addName = (event) => {
    event.preventDefault();
    // console.log("button clicked", event.target, "new name: ", newName)

    const includeTest = persons.find( person => newName === person.name)
    // console.log("includes test: ",  includeTest);
    if (includeTest !== undefined) {
      // console.log("LÖYTY!!!")
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }

  }

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setFilterEntry(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown: <input value={filterEntry} onChange={handleFilterChange} />
      </div>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        {/* <div>debug name: {newName} Number: {newNumber}</div>
        <div>debug filter: {filterEntry}</div> */}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonList persons={persons} filterEntry={filterEntry} />
    </div>
  )

}

export default App