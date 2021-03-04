const fetch = require('node-fetch');
const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
    fetch('http://localhost:4040/getLibros', {
        method: 'get'
    })
    .then(res => res.json())
    .then(json => console.log(json));

    let book = "potatoe"
    res.render('index', {book: book});
});

app.post('/reservar', function (req, res) {

    // fetch('localhost:4040/reservarLibro', {
    //     method: 'post',
    //     body:    JSON.stringify(req.body),
    //     headers: { 'Content-Type': 'application/json' },
    // })
    // .then(res => res.json())
    // .then(json => console.log(json));
    
    console.log(req.body);
    res.render('exito');
});

app.listen(3000, function(){
    console.log('http://localhost:3000');
});