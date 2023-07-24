const uri = "mongodb+srv://Metarail:<password>@metarail0.5iydssj.mongodb.net/<NIMITÄHÄN>?retryWrites=true&w=majority"

const mongoose = require("mongoose")

if (process.argv.length<3) {
	console.log("give password as argument")
	process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Metarail:${password}@metarail0.5iydssj.mongodb.net/noteApp?retryWrites=true&w=majority`

// const url = `mongodb+srv://Metarail:${password}@metarail0.5iydssj.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({

	content: {
		type: String,
		minlength: 5,
		required: true
	},
	important: Boolean
})
// const noteSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     minlength: 5,
//     required: true
//   },
//   important: Boolean,
// })

const Note = mongoose.model("Note", noteSchema)

// const note = new Note({
//   content: 'pro TYPOist for hire',
//   important: false,
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
	result.forEach(note => {
		console.log(note)
	})
	mongoose.connection.close()
})

// Note.find({ important: true }).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })