const express = require('express')
const app = express()

app.use(express.json())

const test = 5

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    response.send(`
    <p>The phonebook has ${persons.length} contacts in it.</p>
    <p>${new Date().toString()}</p>`
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


let newName = () => prompt("Enter the name of the new contact: ")
let newPhoneNumber = () => prompt("Enter the phone number of the new constact: ")


app.post('/api/persons', (request, response) => {
    const body = request.body

    const person = {
        id: new Date().getTime() * Math.random() * 1000000,
        name: newName(),
        number: newPhoneNumber()
    }

    response.json(person)    
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
