// requiring the frameworks
const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');

// initialize the express framework
const app = express()
app.use(express.static('public'))

// starting the server
app.listen(3000, () => {
    console.log('Server started!');
    console.log('Waiting a Spotify call...');
});

// parse the body of all requests 
app.use(bodyParser.json());

// get all the users
app.route('/api/users').get((req, res) =>{
    // sending back a response
    res.send({
        miaunei: [{ name: 'miti print'}, {name: 'print print'}]
    });
    console.log("200 GET - /api/users");
});

// create an user
app.post('/api/signup', (req, res) => {
    store
      .createUser({
        username: req.body.username,
        password: req.body.password
      })
      .then(() => res.sendStatus(201))
  })

// login endpoint
app.post('/api/login', (req, res) => {
    store
      .authenticate({
        username: req.body.username,
        password: req.body.password
      })
      .then(({ success }) => {
        if (success) res.sendStatus(200)
        else res.sendStatus(401)
      })
})

// creating a dynamic endpoint
app.route('/api/users/:name').get((req, res)=> {
    const requestedUserName = req.params['name'];
    res.send({ name: requestedUserName });
    console.log("200 GET - /api/users/",req.params['name']);
});

// changing an object route
app.route('/api/users/:name').put((req, res) => {
    res.status(200).send(req.body);
    console.log("201 PUT - /api/users/", req.params['name']);
});

// delete an object route
app.route('/api/users/:name').delete((req, res) => {
    res.sendStatus(204);
    console.log("204 DELETE - /api/users/", req.params['name']);
});