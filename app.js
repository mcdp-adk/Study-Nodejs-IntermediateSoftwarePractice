const express = require('express');
const bodyParser = require('body-parser');
const nodejsRouter = require('./routes/nodejs');

let app = express();

app.listen(8080);

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/index.html');
})

app.use('/nodejs', nodejsRouter);