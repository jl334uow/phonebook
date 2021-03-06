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
const { update } = require('./models/person')

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    //check empty fields
    if(body.name == undefined || body.number == undefined){
        
        return response.status(400).json({
            error: 'content missing'
        })
    }

    //make new person
    const person = new Person({
        name: body.name,
        number: body.number
        })

    //find if name already exists
    Person.findOne({name:body.name})
    .then(p => {
        if(p){
            console.log('name already exists')
        } else{

            //save person to database
            person.save()
            .then(result => {
                response.json(result)
                console.log('person saved!')
            })
            .catch(error => next(error))
        }
    })
    .catch(error => {
        console.log(error)
        response.status(500).end()
    })
    
})

//updating an indiivdual person
app.put('/api/persons/:id', (request, response) =>{
    const body = request.body
    
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(request.params.id,person)
    .then(updatedPerson =>{
        response.json(updatedPerson)
    })
    .catch(error => next(error))
})

//searching for persons in the array
app.get('/api/persons', (request, response) => {
    Person.find({}).then(result=> {
        response.json(result)
    })
})

//searching for an individual person
app.get('/api/persons/:id', (request, response, next) => {
    const person = Person.findById(request.params.id)
    .then(
        person => {
            if(person){
                response.json(person)
            } else{
                response.status(404).end()
            }
        }
    )
    .catch(error => next(error))
})

//info of database
app.get('/info', (request, response) =>{
    var d = new Date()
    Person.count({}).then(
        result => {
            response.send('<p>Phonebook has info for ' + result + ' people</p>' 
    + d)
        }
    )
})

//Deleting a person
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result =>{
        response.status(204).end()
    })
    .catch(error => next(error))
    
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

//activates if the URI is invalid
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformed id'})
    } else if(error.name === 'ValidationError'){
        return response.status(400).send({error: error.message})
    }
    
    next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})