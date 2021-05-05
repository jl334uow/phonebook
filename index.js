const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const app = express()
const appLogStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' })
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(morgan('tiny', {stream: appLogStream}))

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]
var d = new Date()

//adding a person
const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
    return Math.floor(Math.random() * (100 - maxId) + maxId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const p = persons.find(person => person.name === body.name)

    if(p){
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else{
        const person = {
            name: body.name,
            number: body.number,
            id: generateId()
        }
    
        persons = persons.concat(person)
        response.json(person)
    }
})

//searching for persons in the array
app.get('/api/persons', (request, response) => {
    response.send(persons)
})

//searching for an individual person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    } else{
        response.status(404).end()
    }
})

//
app.get('/info', (request, response) =>{

    response.send('<p>Phonebook has info for ' + persons.length + ' people</p>' 
    + d)
})

//Deleting a person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})