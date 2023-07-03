
const express = require("express");
const app = express();
const cors = require("cors")

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

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { "Content-Type": "text/json"});
//     response.end(JSON.stringify(notes));
// })

app.get("/",(req, res) => {
    res.send("<h1>Hello Wordl</h1>");
})

app.get("/api/notes", (req,res) => {
    res.json(notes);
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

    if (!body.content){
        return response.status(400).json({
            error: "content missing"
        });
    }
    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }
    // note.id = maxId + 1;
    
    console.log(note);
    notes = notes.concat(note);
    response.json(note);
})

app.get("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    console.log(id);
    const note = notes.find(note => {
        const id = Number(request.params.id);
        console.log(note.id, typeof note.id, id, typeof id, note.id === id);
        return note.id === id;
    });

    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }

    // console.log(note);
    // response.json(note);
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
  
    response.status(204).end();
  })

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`);
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)