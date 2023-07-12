const app = require("./app")
const config = require("./utils/config")
const logger = require("./utils/logger")


// require("dotenv").config()
// const express = require("express")
// const app = express()
// const cors = require("cors")

// const Note = mongoose.model('Note', noteSchema)
// const Note = require("./models/note")

// app.use(express.json())
// app.use(express.static("build"))
// app.use(requestLogger)
// app.use(cors())

// app.get("/",(req, res) => {
// 	res.send("<h1>Hello Wordl</h1>")
// })

// const PORT = process.env.PORT || 3001

app.listen(config.PORT, () => {
	logger.info(`Server runnin on port ${config.PORT}`)
})

// logger.info(`Server runnin on port ${config.PORT}`)



// app.use(unknownEndpoint)

// tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
// app.use(errorHandler)