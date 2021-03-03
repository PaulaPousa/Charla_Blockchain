'use strict';

const bodyParser = require("body-parser");
const express = require('express');

const app = express();
app.use(bodyParser.json());

const port = 4040;

let logic = require("./model.js");

app.post('/crearCuenta', (req, res) => {
    logic.crearCuenta(req.body.password).then((address) => {
        res.status(201).send({
        address: address
        });
    });
});

app.post('/desplegarContrato', (req, res) => {
  logic.desplegarContrato(req.body.account, req.body.password).then((address) => {
    res.status(201).send({
      address: address
    });
  });
});

app.post('/addLibro', (req, res) => {
  logic.addLibro(req.body.contractAddress, req.body.account, 
    req.body.password, req.body.titulo, req.body.autor).then((msg) => {
    console.log(msg);
    res.status(201).send({
        msg: msg
    });
  });
});

app.post('/getLibros', (req, res) => {
  logic.getLibros(req.body.contractAddress, req.body.account, req.body.password).then((msg) => {
    console.log(msg);
    res.status(201).send({
        msg: msg
    });
  });
});

app.post('/reservarLibro', (req, res) => {
  /* Te envio JSON  
    {
      name: "Nombre de la persona",
      book: "Titulo del libro"
    }
  */
  res.status(200);
});


app.listen(port, () => {
  console.log("ESCUCHANDO: http://localhost:" + port);
  console.log("");
});
