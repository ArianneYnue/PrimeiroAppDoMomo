const server = require('express');
const bodyParse = require('body-parser');
const {auth} = require('./middleware/auth');
const app = server();

const users = [];

app.use(bodyParse.json());

app.get('/login', (req, res) => {
    res.json({login:"msg"});
});

app.get('/', (req, res) => {
    res.json({msg: "momo"});
});

app.use(auth);

app.get('/usuarios', (req, res) =>{
    res.json(users);
});

app.post('/usuario', (req, res) =>{
    const { user } = req.body;

    if(!user) {
        res.status(500).json({error: "campo nulo"});
    }

    users.push(user);

    res.status(201).json(users);
});

app.delete('/usuario/:user', (req, res) =>{
    const { user } = req.params;
    if(!user) {
        res.status(500).json({error: "usuario nulo"});
    }

    const idx = users.indexOf(user);

    if (idx > -1) {
        users.splice(idx, 1);
    } else {
        res.json({error: "usuario nao existe"});
    }

    res.json(users);
});

app.put('/usuario', (req, res) => {
    const { user, newUser } = req.body;

    if (!user) {
        res.status(500).json({error: "usuario nulo"});
    }

    const idx = users.indexOf(user);

    if (idx > -1) {
        users[idx] = newUser;
    } else {
        res.json({error: "usuario nao existe"});
    }

    res.json(users);
})


module.exports = app;