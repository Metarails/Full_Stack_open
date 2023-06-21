import Note from "./components/Note"
import { useState, useEffect } from "react"
import axios from "axios"
import noteService from "./services/notes"

const App = (props) => {

  // const [notes, setNotes] = useState(props.notes);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);

  // const hook = () => {
  //   console.log("effect");
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log("Promise fulfilled");
  //       setNotes(response.data);
  //     })
  // }
  // useEffect(hook, [])

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  console.log("render", notes.length, "notes")

  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      // id: notes.length + 1,
    }

    // axios
    //   .post("http://localhost:3001/notes", noteObject)
    //   .then(response => {
    //     console.log("responssi POSTista: ", response);
    //     setNotes(notes.concat(response.data));
    //     setNewNote("");
    //   })
    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })

    // setNotes(notes.concat(noteObject));
    // setNewNote("");
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    console.log("importance of " + id + "needs to be toggeld")
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find(n => n.id === id);
    const changedNote = {...note, important: !note.important}

    // axios.put(url, changedNote).then(response => {
    //   setNotes(notes.map(n => n.id !== id ? n : response.data))
    // })
    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id !== id ? note : response.data))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
        {/* {notes.map(note => 
          <Note key={note.id} note={note} />
        )} */}
      </ul>
        <form onSubmit={addNote}>
          <input
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit">save</button>
        </form>
    </div>
  );
}

export default App;
