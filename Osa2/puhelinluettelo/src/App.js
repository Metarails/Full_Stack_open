import { useState } from 'react'

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
    }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const  addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target, "new name: ", newName)

    const includeTest = persons.find( person => newName === person.name)
    console.log("includes test: ",  includeTest);
    if (includeTest !== undefined) {
      console.log("LÖYTDY!!!")
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
    console.log(event.target.value);
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>debug name: {newName} Number: {newNumber}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
            <Person key={person.name} person={person} />
          )}
      </div>
    </div>
  )

}

export default App