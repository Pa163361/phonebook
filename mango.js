const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Enter password!')
    process.exit(1)
}

let password = process.argv[2]

mongoose.set('strictQuery', false)

const url = `mongodb+srv://fullstack:${password}@firstcluster.legrnuq.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.connect(url)

const ContactSchema = new mongoose.Schema({
    name: String,
    num: Number,
})

const Contact = mongoose.model('contact', ContactSchema)

const contact = new Contact({
    name: "Amma",
    num: 9959925109,
})

contact.save().then(result => {
    console.log('contact saved!')
    mongoose.connection.close()
})