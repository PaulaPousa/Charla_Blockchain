const fetch = require('node-fetch');
const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
    fetch('http://localhost:4040/getBooks', {
        method: 'get'
    })
    .then(res => res.json())
    .then(json => {
      json = json["books"];
      res.render('index', {books: json});
    });
});

app.post('/reservar', function (req, res) {
    let selectedBook = JSON.stringify(req.body);
    console.log(selectedBook);
    fetch('http://localhost:4040/reserveBook', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:    selectedBook
    })
    .then(res => res.json())
    .then(json => {
      res.render('exito', {reserva: json["msg"]});
    });
});

app.listen(3000, function(){
    console.log('http://localhost:3000');
});
