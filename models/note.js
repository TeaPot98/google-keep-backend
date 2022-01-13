const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: String,
    title: String,
    // labels - array of strings
    pinned: Boolean,
    color: String
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)