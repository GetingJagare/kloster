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
            const nodemailer = require('nodemailer'),
                plainText = `Имя: ${name}\r\nEmail: ${email}\r\nСообщение: ${text}`,
                html = `<b>Имя:</b> ${name}<br><b>Email:</b> ${email}<br><b>Сообщение:</b> ${text}`;

            const transporter = nodemailer.createTransport({
                port: 465,
                host: process.env.SMTP_SERVER,
                auth: {
                    user: process.env.SMTP_MAILBOX,
                    pass: process.env.SMTP_PASSWORD,
                },
                secure: true,
            });

            const mailData = {
                from: process.env.SMTP_FROM,
                to: 'mbd.kloster@yandex.ru',
                subject: 'Сообщение с сайта vsv-kloster.ru',
                text: plainText,
                html,
            };

            /**
             * echo "From: noreply@vsv-kloster.ru\r\nSubject: Сообщение с сайта\r\nTo: mbd.kloster@yandex.ru,getingjagare@gmail.com\r\n\r\nИмя: test\r\nEmail: test@test.com\r\nСообщение: test text" | sendmail -f noreply@vsv-kloster.ru mbd.kloster@yandex.ru,getingjagare@gmail.com
             */

            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    res.write(JSON.stringify({success: 0, message: err}));
                } else {
                    res.write(JSON.stringify({success: 1, message: 'Сообщение отправлено'}));
                }
            });
        }
    }
    res.end();
});

app.listen(setup.port, function () {
    console.log('Server running at 127.0.0.1:%s', setup.port);
});
