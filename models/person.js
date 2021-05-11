//mongoose mongodb
const mongoose = require('mongoose')
const { notEqual } = require('assert')

const password = process.argv[2]

const url = process.env.MONGODB_URI

console.log('Connecting to ', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
.then(result => {
    console.log('Connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number
})

//getting rid of _id and version __v
mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id
        delete converted.__v
    }
})

module.exports = mongoose.model('Person', personSchema)