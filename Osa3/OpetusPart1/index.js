require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors")

// const Note = mongoose.model('Note', noteSchema)
const Note = require('./models/note')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
}

app.use(express.json());
app.use(express.static("build"));
app.use(requestLogger);
app.use(cors());




// let notes = [
//     {
//         id: 1,
//         content: "HTML is easy",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only JavaScript",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         important: true
//     }
// ]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { "Content-Type": "text/json"});
//     response.end(JSON.stringify(notes));
// })

app.get("/",(req, res) => {
    res.send("<h1>Hello Wordl</h1>");
})

app.get("/api/notes", (req,res) => {
    Note.find({}).then(notes => {
        res.json(notes)
      })
    // res.json(notes);
})

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

  
app.post("/api/notes", (request, response) => {
    console.log("headers: ", request.headers);
    
    const body = request.body;

    if (body.content === undefined){
        return response.status(400).json({
            error: "content missing"
        });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    
    note.save().then(savedNote =>{
        response.json(savedNote)
    })
    // const note = {
    //     content: body.content,
    //     important: body.important || false,
    //     id: generateId(),
    // }
    // note.id = maxId + 1;
    // console.log(note);
    // notes = notes.concat(note);
    // response.json(note);
})

app.get("/api/notes/:id", (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            console.log("what is found note?: ", note)
            if (note){
                response.json(note);
            } else {
                response.status(404).end();
            }    
        })
        .catch(error => {
            // console.log("error: ", error)
            console.log("should be going to error middleware next?: ", error.message)
            next(error)})

        // .catch(error => {
        //     return next(error)
        // })
        //     console.log(error);
        //     response.status(400).send({error: "malformatted id"});
    // const id = request.params.id;
    // console.log(id);
    // const note = notes.find(note => {
    //     const id = Number(request.params.id);
    //     console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    //     return note.id === id;
    // });

    // if (note) {
    //     response.json(note);
    // } else {
    //     response.status(404).end();
    // }

    // console.log(note);
    // response.json(note);
  })

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })

  app.delete('/api/notes/:id', (request, response, next) => {
    
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error));
    // const id = Number(request.params.id);
    // notes = notes.filter(note => note.id !== id);
  
    // response.status(204).end();
  })

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`);
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error("error handler middleware: ", error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }
  
// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
app.use(errorHandler)