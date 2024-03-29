const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

var app = express()

app.use(express.json())

app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))

morgan.token('body', (req, res) => {
    if (req.method === "POST")
    return JSON.stringify(req.body)
})


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        res.send(person)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`
    <p>The phonebook has ${persons.length} contacts in it.</p>
    <p>${new Date().toString()}</p>
    `)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})



app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    if (!body.name) {
        return res.status(400).json({
            error: 'name is missing'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'number is missing'
        })
    }
//new Date().valueOf() same as new Date().getTime()
//Math.floor / ceil / round
//Date.now() instead of new Date().getTime()
    const person = {
        id: new Date().getTime() * Math.random() * 1000000,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    res.json(person) 

})



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Sample app listening at http://localhost:${PORT}`)
})
