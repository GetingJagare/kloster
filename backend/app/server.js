const setup = {port: 8000};

const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.write('Hello world!');
    res.end();
});

app.post('/mail', function (req, res) {
    if (!req.body['g-recaptcha-response'].length && (process.env.IS_DEV === 'false' || process.env.IS_DEV === undefined)) {
        res.write(JSON.stringify({success: 0, errorCode: 1}));
    } else {
        const {name, email, text} = req.body;
        if (!name || !email || !text) {
            res.write(JSON.stringify({success: 0, errorCode: 2}));
        } else {
            const shell = require('shelljs');
            const from = 'noreply@vsv-kloster.ru';
            const to = 'mbd.kloster@yandex.ru,getingjagare@gmail.com';
            const subject = 'Сообщение с сайта';
            shell.exec('echo "From: ' + from + '\r\nSubject: ' + subject + '\r\nTo: ' + to + '\r\n\r\nИмя: ' + name + '\r\n' +
                'Email: ' + email + '\r\nСообщение: ' + text + '" | sendmail -f ' + from + ' ' + to);
            /**
             * echo "From: noreply@vsv-kloster.ru\r\nSubject: Сообщение с сайта\r\nTo: mbd.kloster@yandex.ru,getingjagare@gmail.com\r\n\r\nИмя: test\r\nEmail: test@test.com\r\nСообщение: test text" | sendmail -f noreply@vsv-kloster.ru mbd.kloster@yandex.ru,getingjagare@gmail.com
             */

            res.write(JSON.stringify({success: 1, message: 'Сообщение отправлено'}));
        }
    }
    res.end();
});

app.listen(setup.port, function () {
    console.log('Server running at 127.0.0.1:%s', setup.port);
});
