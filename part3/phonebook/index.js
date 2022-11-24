require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
const cors = require('cors')

app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))
app.use(cors())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
})
)

// Defines an event handler that is used to handle
// HTTP GET requests made to the application's / root
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const date = new Date()
    // Person.find({ name: "<person's name>" }) would produce the number
    // of results the name appears in the collection in the name field
    Person.find({}).then(persons => {
        response.send(
            `
            <div>
                Phonebook has info for ${persons.length} people
            </div>
            <div>
                <p>
                    ${date}
                </p>
            </div>
            `
        )
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error =>
            // Handles cases where the id malformatted such as http://localhost:3001/api/persons/someInvalidId
            // response.status(400).send({ error: 'malformatted id' }) }
            next(error)
        )
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save().then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    // 'runValidators: true' enables the mongoose default validators, that are set to false by default.
    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// Handler of requests with unknown endpoint. This should be the second-to-last loaded middleware
// before error handler.
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    // If the error is a CastError, the error handler will send a response
    // to the browser with the response object passed as a parameter.
    // Handles cases where the id malformatted such as http://localhost:3001/api/persons/someInvalidId
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    // In all other error situations, the middleware passes the error forward
    // to the default Express error handler. So next(error) is made in a way,
    // that it knows to look for an 'error' handler function, a function that
    // has 4 parameters of which 'error' is the first parameter.
    next(error)
}

// This has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})