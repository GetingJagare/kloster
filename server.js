const setup = {port:8000}

const express = require ('express');

const app = express ();

app.get('/mail', function (req, res) {
    const isAjax = req.headers['x-requested-with'] && req.headers['x-requested-with'] === 'XMLHttpRequest';
    if (isAjax) {
        const striptags = require('striptags');
        const shell = require('shelljs');
        const {name, email, text} = req.post;
        if (!name || !email || !phone || !message || !req.post['g-recaptcha-response'] || !shell.which('sendmail')) {
            res.write(JSON.stringify({result: 0}));
            res.end();
        }

        const from = 'robot@black-freak-society.ru';
        const to = 'mbd.kloster@yandex.ru';
        const subject = `Заявка: ${striptags(name)}`;
        const fullMessage = `You have received a new message from your website contact form.\nHere are the details:\nName: ${striptags(name)}\nEmail: ${striptags(email)}\nPhone: ${striptags(phone)}\nMessage:\n${striptags(message)}`;
        shell.exec(`echo -e "From: ${from}\r\nSubject: ${subject}\r\nTo: ${to}\r\n\r\n ${fullMessage}" | sendmail -f ${from} ${to}`);
        res.write(JSON.stringify({result: 1}));
        res.end();
    }

    res.send({success: 1});
});

app.listen(setup.port, function () {
    console.log('Server running at 127.0.0.1:%s', setup.port);
});