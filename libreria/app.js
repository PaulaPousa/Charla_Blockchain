const fetch = require('node-fetch');
const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

router.get('/', function (req, res) {
    res.sendFile('index.html');
});

router.post('/reservar', function (req, res) {

    fetch('localhost:5000/reservarLibro', {
        method: 'post',
        body:    JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
    
    res.send('exito.html');
});

//add the router
app.use('/', router);
app.use('/reservar', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');