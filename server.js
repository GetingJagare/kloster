const setup = {port:8000}

const express = require ('express');
const bodyParser = require("body-parser");

const app = express ();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/mail', function (req, res) {
    const shell = require('shelljs');

    if (!req.body['g-recaptcha-response'].length) {
        res.write(JSON.stringify({success: 0, message: 'Капча не пройдена!'}));
        res.end();
    }

    const {name, email, text} = req.body;
    if (!name || !email || !text) {
        res.write(JSON.stringify({success: 0, message: 'Не все поля заполнены'}));
        res.end();
    }

    const from = 'noreply@black-freak-society.ru';
    const to = 'mbd.kloster@yandex.ru';
    const subject = 'Сообщение с сайта';
    shell.exec(`echo -e "From: ${from}\r\nSubject: ${subject}\r\nTo: ${to}\r\n\r\n Имя: ${name}\r\n
    Email: ${email}${text}"\r\rСообщение: ${text} | sendmail -f ${from} ${to}`);

    res.write(JSON.stringify({success: 1, message: 'Сообщение отправлено'}));
    res.end();
});

app.listen(setup.port, function () {
    console.log('Server running at 127.0.0.1:%s', setup.port);
});