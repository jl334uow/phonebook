require('dotenv').config()
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
app.use(express.static('build'))

const Person = require('./models/person')
// let persons = [
//     { 
//       "name": "Arto Hellas", 
//       "number": "040-123456",
//       "id": 1
//     },
//     { 
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     { 
//       "name": "Dan Abramov", 
//       "number": "12-43-234345",
//       "id": 3
//     },
//     { 
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122",
//       "id": 4
//     }
//   ]
var d = new Date()

//adding a person
// const generateId = () => {
//     const maxId = persons.length > 0
//     ? Math.max(...persons.map(p => p.id))
//     : 0
//     return Math.floor(Math.random() * (100 - maxId) + maxId)
// }

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(body.name == undefined || body.number == undefined){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const p = Person.find(person => person.name === body.name)

    if(p){
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else{
        const person = new Person({
            name: body.name,
            number: body.number
        })
    
        // persons = persons.concat(person)
        person.save().then(result => {
            response.json(result)
            console.log('person saved!')
        })
        
    }
})

//searching for persons in the array
app.get('/api/persons', (request, response) => {
    Person.find({}).then(result=> {
        response.json(result)
    })
})

//searching for an individual person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = Person.findById(request.params.id)
    .then(
        person => {
            response.json(person)
        }
    )
    .catch(()=>{
        response.status(404).end()
    })
    // if(person){
    //     response.json(person)
    // } else{
    //     response.status(404).end()
    // }
})

//
app.get('/info', (request, response) =>{

    response.send('<p>Phonebook has info for ' + persons.length + ' people</p>' 
    + d)
})

//Deleting a person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    // persons = Person.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})