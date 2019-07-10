const setup = {port: 8000}

const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/mail', function (req, res) {
    if (!req.body['g-recaptcha-response'].length) {
        res.write(JSON.stringify({success: 0, errorCode: 1}));
    } else {
        const {name, email, text} = req.body;
        if (!name || !email || !text) {
            res.write(JSON.stringify({success: 0, errorCode: 2}));
        } else {
            const shell = require('shelljs');
            const from = 'noreply@black-freak-society.ru';
            const to = 'mbd.kloster@yandex.ru,getingjagare@gmail.com';
            const subject = 'Сообщение с сайта';
            shell.exec('echo "From: ' + from + '\r\nSubject: ' + subject + '\r\nTo: ' + to + '\r\n\r\nИмя: ' + name + '\r\n' +
                'Email: ' + email + '\r\nСообщение: ' + text + '" | sendmail -f ' + from + ' ' + to);

            res.write(JSON.stringify({success: 1, message: 'Сообщение отправлено'}));
        }
    }
    res.end();
});

app.listen(setup.port, function () {
    console.log('Server running at 127.0.0.1:%s', setup.port);
});