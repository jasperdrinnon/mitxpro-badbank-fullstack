const express = require('express');
const app = express();
const cors = require('cors');
//const auth0 = require('auth0-js');
const dal = require('./dal.js')

//denote the folder to be used
app.use(express.static('public'));
app.use(cors());

//route to create jellyfish account
app.get('/account/create/:name/:email/:password', function (req,res) {
    //else create user
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        });
});

//route to login a jellyfish
app.get('/account/login/:email/:password', function (req,res) {
    res.send({
        email: req.params.email,
        password: req.params.password
    });
});

//route to all accounts
app.get('/account/all', function (req,res) {
    dal.all()
        .then((docs) => {
        console.log(docs);
        res.send(docs);
        });
});

//route to deposit
app.get('/account/deposit/:name/:email/:balance', function (req,res) {
    res.send({
        balance: req.params.balance
    });
});

//route to withdraw
app.get('/account/withdraw/:name/:email/:balance', function (req,res) {
    res.send({
        balance: req.params.balance
    });
});

const port = 3000;
app.listen(port);
console.log('Running on port: ' + port);