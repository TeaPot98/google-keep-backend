const logger = require('../utils/logger')
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
    Note.find({})
        .then(notes => {
            response.json(notes)
        })
})

notesRouter.post('/', (request, response) => {
    const body = request.body

    logger.info('The body from POST request: ', body)

    const newNote = new Note({
        title: body.title,
        content: body.content,
        pinned: false,
        color: 'blue'
    })

    newNote
        .save()
        .then(result => {
            console.log('note saved')
            response.json(result)
        })
        .catch(error => next(error))

})

notesRouter.get('/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

notesRouter.delete('/:id', (request, response) => {
    Note
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

notesRouter.put('/:id', (request, response) => {
    const body = request.body

    const note = {
        title: body.title,
        content: body.content,
        pinned: body.pinned,
        color: body.color
    }

    Note
        .findByIdAndUpdate(request.params.id, note, {new: true})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter