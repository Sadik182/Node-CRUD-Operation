const express = require('express');
const Joi = require('joi');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const persons = [
    {id: 1, name: "Md. Sadikur Rahman"},
    {id: 2, name: "Md. Abir Ahmed"},
    {id: 3, name: "Md. Shajibur Rahman"},
    {id: 4, name: "Md. Musfiqa  Hauqe"},
]

app.get('/', (req, res) => {
    res.send('This is my first Node Server');
})

app.get('/persons', (req, res) => {
    res.send(persons);
});
app.get('/persons/:id', (req, res) => {
    const person = persons.find(p => p.id === parseInt(req.params.id));
    if(!person) res.status(400).send('<h3 style = "color: red">Opsss... Can not find </h3>');
    res.send(person);
});

app.post('/persons', (req, res) => {
    const {error} = validatePerson(req.body);
    if(error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const person ={
        id: persons.length + 1,
        name: req.body.name
    }
    persons.push(person);
    res.send(person);
})

app.put('/persons/:id', (req, res) => {
    const person = persons.find(p => p.id === req.params.id)
})

const validatePerson = (person) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(person, schema);
}


app.listen(port, () => {
    console.log('listining From port', port);
});