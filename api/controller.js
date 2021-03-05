'use strict';

const bodyParser = require("body-parser");
const express = require('express');

const app = express();
app.use(bodyParser.json());

const port = 4040;

let logic = require("./model.js");

app.post('/createAccount', (req, res) => {
    logic.createAccount(req.body.password).then((address) => {
        res.status(201).send({
        address: address
        });
    });
});

app.post('/deployContract', (req, res) => {
  logic.deployContract(req.body.account, req.body.password).then((address) => {
    res.status(201).send({
      address: address
    });
  });
});

app.post('/addBook', (req, res) => {
  logic.addBook(req.body.title, req.body.author, req.body.editorial).then((tx) => {
    res.status(201).send({
      tx: tx,
      msg: "El libro se ha añadido correctamente"
    });
  });
});

app.get('/getBooks', (req, res) => {
  logic.getBooks().then((books) => {
    res.status(200).send({
      books: books
    });
  });
});

app.post('/reserveBook', (req, res) => {
  logic.reserveBook(req.body.user, req.body.title).then((tx) => {
    res.status(201).send({
        tx: tx,
        msg: "Reserva realizada correctamente"
    });
  });
});

app.get('/getReserve', (req, res) => {
  logic.getReserve().then((tx) => {
    res.status(201).send({
        tx: tx,
    });
  });
});


app.listen(port, () => {
  console.log("ESCUCHANDO: http://localhost:" + port);
  console.log("");
});
