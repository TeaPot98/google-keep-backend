const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const labelsRouter = require('./controllers/labels')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// Connecting to the MongoDB
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB:', error.message)
    })

// Prevent CORS Policy error
app.use(cors())

app.use(express.static('build'))

// Use built-in body-parser to parse correctly the JSON from the requests
app.use(express.json())

// Log info about every request - for debugging
app.use(middleware.requestLogger)

// Handling routes
app.use('/api/notes', notesRouter)
app.use('/api/labels', labelsRouter)

// Handling unknown endpoint and errors
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app