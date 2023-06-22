import { useState , useEffect } from 'react'
import axios from "axios"

const PersonList = ({persons, filterEntry}) => {

  const filterPersons = (person) => {
    if (person.name.toLowerCase().includes(filterEntry.toLowerCase())){
      return true
    }
    return(
      person.number.toLowerCase().includes(filterEntry.toLowerCase())
    )
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterEntry.toLowerCase()));
  const filteredPersons2 = persons.filter(filterPersons);

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

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, addName }) => {
  

  return (
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
)
}

const Filter = ({filterEntry,handleFilterChange}) => {
  return (
    <div>
      filter shown: <input value={filterEntry} onChange={handleFilterChange} />
    </div>
  )
}

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "040-1231244" },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ]) 

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterEntry, setFilterEntry] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterEntry={filterEntry} handleFilterChange={handleFilterChange} />
      <h3>Add new</h3>      
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}      
      />
      <h3>Numbers</h3>
      <PersonList persons={persons} filterEntry={filterEntry} />
    </div>
  )

}

export default App