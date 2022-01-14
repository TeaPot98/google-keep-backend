const logger = require('../utils/logger')
const labelsRouter = require('express').Router()
const Label = require('../models/label')

labelsRouter.get('/', (request, response) => {
    Label
        .find({})
        .then(labels => {
            response.json(labels)
        })
        .catch(error => next(error))
})

labelsRouter.post('/', (request, response) => {
    const body = request.body

    const newLabel = new Label({
        name: body.name
    })

    newLabel
        .save()
        .then(savedLabel => {
            response.json(savedLabel)
        })
        .catch(error => next(error))
})

labelsRouter.get('/:id', (request, response) => {
    Label
        .findById(request.params.id)
        .then(label => {
            response.json(label)
        })
        .catch(error => next(error))
})

labelsRouter.delete('/:id', (request, response) => {
    Label
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

labelsRouter.put('/:id', (request, response) => {
    const body = request.body

    const newLabel = {
        name: body.name
    }

    Label
        .findByIdAndUpdate(request.params.id, newLabel, {new: true})
        .then(updatedLabel => {
            response.json(updatedLabel)
        })
        .catch(error => next(error))
})

module.exports = labelsRouter