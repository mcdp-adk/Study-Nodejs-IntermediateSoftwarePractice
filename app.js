const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const nodejsRouter = require('./routes/nodejs');

let app = express();

app.listen(8080);

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(session({
    secret: 'mainSession',
    resave: true,
    saveUninitialized: true
}))

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/index.html');
})

app.use('/nodejs', nodejsRouter);