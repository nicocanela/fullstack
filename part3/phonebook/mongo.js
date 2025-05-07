const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://nicolascanales:${password}@cluster0.zvp19b8.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

// const name = process.argv[3]
// const number = process.argv[4]

// const person = new Person({
//     name: name,
//     number: number
// })

// person.save().then(result => {
//     console.log(`added ${result.name} number ${result.number} to phonebook`)
//     mongoose.connection.close()
// })

console.log('phonebook:')
Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person.name, person.number)
    })
    mongoose.connection.close()
})