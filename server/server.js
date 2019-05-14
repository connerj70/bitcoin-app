const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      config = require('./.config.js'),
      cors = require('cors');

massive({
    host: config.connectionString,
    port: 5432,
    database: 'bitcoin_app',
    user: config.username,
    password: config.password
}).then(db => {
    app.set('db', db);
});

const app = express();
app.use(bodyParser.json());

app.post('/api/users', function(req, res, next) {
    var db = app.get('db');
    var {name, email, picture} = req.body;
    db.addUser([name, email, picture]).then(resp => {
        res.status(200).send(resp);
    }).catch(err => {
        res.status(500).send(err);
    });
});

  
const PORT = 3030;
app.listen(PORT, function() {
    console.log(`Listening on ${PORT}...`);
});