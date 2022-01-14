const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')
const config = require('./utils/config')

// Creating http server
const server = http.createServer(app)

// Listening to the PORT
server.listen(config.PORT, () => {
    logger.info(`Server is running on port ${config.PORT}`)
})