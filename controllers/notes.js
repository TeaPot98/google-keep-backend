const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
    Note.find({})
        .then(notes => {
            response.json(notes)
        })
})

module.exports = notesRouter