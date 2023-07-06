const mongoose = require("mongoose")
// require('dotenv').config()

// set "REACT_APP_API_KEY=abcdef3242342" && npm start
// set "REACT_APP_DB_PASSWORD=dddddd " && npm star
// const password = process.env.REACT_APP_DB_PASSWORD
// console.log("passwrod: ", password)
// const url = `mongodb+srv://fullstack:${fullstack@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
// const url =  `mongodb+srv://Metarail:${password}@metarail0.5iydssj.mongodb.net/noteApp?retryWrites=true&w=majority`

const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose.set("strictQuery",false)

mongoose.connect(url)
	.then(result => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message)
	})


const noteSchema = new mongoose.Schema({

	content: {
		type: String,
		minlength: 5,
		required: true
	},
	important: Boolean
})

noteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Note", noteSchema)