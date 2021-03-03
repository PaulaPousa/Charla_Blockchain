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


app.listen(port, () => {
  console.log("ESCUCHANDO: http://localhost:" + port);
  console.log("");
});
