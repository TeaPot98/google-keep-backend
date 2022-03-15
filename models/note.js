const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 0,
        // required: true
    },
    title: {
        type: String,
        minlength: 0,
        // required: true
    },
    labels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Label'
        }
    ],
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