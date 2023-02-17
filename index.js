const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
app = express()

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())
app.use(express.static('build'))

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
    response.json(contacts).end()
})

app.get('/api/contacts/:id', (request, response) => {
    let id = Number(request.params.id)
    const contact = contacts.find(c => c.id === id)
    if (!contact) {
        response.status(404).end()
    }
    response.status(200).json(contact).end()
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

    if (contacts.find(contact => contact.name.toUpperCase() === body.name.toUpperCase())) {
        return response.status(400).json({ error: 'Name already exists!!!' }).end()
    }

    let contact = {
        id: contacts.length > 0 ? 1 + Math.max(...contacts.map(c => c.id)) : 0,
        name: body.name,
        num: body.num
    }

    contacts = contacts.concat(contact)
    console.log('post req result, backend, contacts =>', contacts)
    response.json(contact).end()
})

app.put('/api/contacts/:id', (request, response) => {
    console.log('put req, backend, request.body =>', request.body)
    const body = request.body
    contacts = contacts.map(contact => contact.id !== body.id ? contact : body)
    response.status(201).end()
})

app.delete('/api/contacts/:id', (request, response) => {
    let id = Number(request.params.id);
    contacts = contacts.filter(contact => contact.id !== id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`))