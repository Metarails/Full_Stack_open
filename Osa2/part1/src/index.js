import React from 'react';
// import axios from "axios";
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//     const notes = response.data;
//     console.log("Responssi: ", response);
//     console.log("Nootit: ", notes);
//     ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
//   })

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]

// const result = notes.map(note => note.id)
// console.log("mappaus", result)

// ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />);
ReactDOM.createRoot(document.getElementById('root')).render(<App />);