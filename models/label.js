const mongoose = require('mongoose')

const labelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

labelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Label', labelSchema)