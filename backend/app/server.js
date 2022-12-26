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
            const shell = require('shelljs'),
                moment = require('moment'),
                {MAIL_FROM: from, MAIL_TO: to, MAIL_HOST: host, MAIL_USER: user, MAIL_PASSWORD: password} = process.env,
                subject = 'Сообщение с сайта vsv-kloster.ru',
                date = moment().format("ddd, DD MMM Y H:mm:s ZZ"),
                fullMessage = `Имя: ${name}\r\nEmail: ${email}\r\nСообщение: ${text}\r\n`,
                fullEmail = `Date: ${date}\r\nFrom: ${from}\r\nSubject: ${subject}\r\nTo: ${to}\r\n\r\n${fullMessage}\r\n`;
            shell.exec(`echo -e "${fullEmail}" >> mail/mail.txt`);
            shell.exec(`cat /dev/null > mail/email.txt`);
            shell.exec(`echo -e "${fullEmail}" >> mail/email.txt`);
            shell.exec(`curl --ssl smtp://${host} --mail-from ${from}` +
                ` ${to.trim().split(/\s*,\s*/).map((mailbox) => `--mail-rcpt ${mailbox}`).join(' ')}` +
                ` --upload-file mail/email.txt --user '${user}:${password}'`);

            res.write(JSON.stringify({success: 1, message: 'Сообщение отправлено'}));
        }
    }
    res.end();
});

app.listen(setup.port, function () {
    console.log('Server running at 127.0.0.1:%s', setup.port);
});
