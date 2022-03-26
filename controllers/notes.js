const logger = require('../utils/logger')
const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
    Note.find({})
        .populate('labels')
        .then(notes => {
            response.json(notes)
        })
})

notesRouter.post('/', (request, response, next) => {
    const body = request.body

    logger.info('The body from POST request: ', body)

    const newNote = new Note({
        title: body.title,
        content: body.content,
        pinned: body.pinned,
        color: body.color
    })

    newNote
        .save()
        .populate('labels')
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

notesRouter.delete('/:id', (request, response, next) => {
    Note
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        title: body.title,
        content: body.content,
        pinned: body.pinned,
        color: body.color,
        labels: body.labels,
    }

    Note
        .findByIdAndUpdate(request.params.id, note, {new: true, populate: { path: 'labels' }})
        .then(updatedNote => {
            console.log('The note sent after updating >>> ', updatedNote)
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter