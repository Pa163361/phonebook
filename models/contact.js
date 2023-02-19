const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = 'mongodb+srv://fullstack:fullstackPavan1@firstcluster.legrnuq.mongodb.net/phoneBook?retryWrites=true&w=majority'

mongoose.connect(url).then(result => {
    console.log('mongoDB connected!')
}).catch(result => {
    console.log('mongoDB not connected!')
})

const ContactSchema = mongoose.Schema({
    name: String,
    num: Number,
})

ContactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// No need of declaring contact model like: const contact = mongoose.model('contact',ContactSchema)
// Below line is enough for both declaration and exporting
module.exports = mongoose.model('Contact', ContactSchema)