const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
app = express()

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())
app.use(express.static('build'))


const Contact = require('./models/contact')

let contacts = [
    {
        id: 1,
        name: "Pavan",
        num: 9502908436
    },
    {
        id: 2,
        name: "Lahari",
        num: 8008973821
    },
    {
        id: 3,
        name: "Reddy",
        num: 6302665787
    },
    {
        id: 4,
        name: "Anvesh",
        num: 6305526622
    }
]

app.get('/', (request, response) => {
    response.status(200).send('<h1>Hello World!</h1>').end()
})

app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(result => {
        console.log('get, backend, result => ', result)
        response.json(result)
    })
})

app.get('/api/contacts/:id', (request, response) => {
    Contact.find({ _id: request.params.id }).then(result => {
        response.json(result)
    }).catch(error => {
        response.status(204).end()
    })
})

app.get('/info', (request, response) => {
    let curTime = new Date();
    const html = `<p>Phonebook has info for ${contacts.length} people</p><p>${curTime}</p>`
    response.send(html)
})

app.post('/api/contacts', (request, response) => {
    const body = request.body
    console.log('post req, backend, body=>', body)
    if (!body.name) {
        return response.status(400).json({ error: 'Invalid name!' }).end()
    }
    if (!body.num) {
        return response.status(400).json({ error: 'Invalid number!' }).end()
    }

    let contact = {
        name: body.name,
        num: body.num
    }

    Contact.create(contact).then(result => {
        console.log('post, backend, result => ', result)
        response.json(result)
    }).catch(error => {
        response.json(409)
    })

})

app.put('/api/contacts/:id', (request, response) => {
    console.log('put req, backend, request.body =>', request.body)
    const body = request.body

    Contact.updateOne({ _id: request.params.id }, { name: body.name, num: body.num }).then(result => {
        console.log('put, backend, result => ', result)
        response.status(200).json(result)
    }).catch(error => {
        response.status(409).json(error)
    })

})

app.delete('/api/contacts/:id', (request, response) => {

    Contact.deleteOne({ _id: request.params.id }).then(result => {
        response.status(204).json({ message: "Deleted successfully", result })
    }).catch(error => {
        response.status(409).json({ message: "Not deleted", error })
    })

})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`))