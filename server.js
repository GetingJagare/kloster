const setup = {port: 8000}

const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const router = require('./router')(app);

app.listen(setup.port, function () {
    console.log('Server running at 127.0.0.1:%s', setup.port);
});