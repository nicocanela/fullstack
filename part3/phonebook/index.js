const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())

morgan.token('fullstack', function (req, res) {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return ' '
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :fullstack'))
app.use(express.json())

let persons =
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    console.log(Date())
    response.send(
        `<p>Phonebook has ${persons.length} numbers</p><p>${Date()}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)
    response.status(204).json()
})

app.post('/api/persons', (request, response) => {
    // console.log(request.body)
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'falta nombre'
        })
    
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'falta número'
        })
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'ya existe'
        })
    }

    const id = generateId()

    const person = {
        name: body.name,
        number: body.number,
        id: id
    }

    persons = persons.concat(person)

    response.json(person)

})

const generateId = () => {
    const max = 1000000
    const id = Math.floor(Math.random() * max)

    return String(id)
}
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})