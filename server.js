const setup = {port:8000}

const express = require ('express');

const app = express ();

app.post('/mail', function (req, res) {
    const nodemailer = require('nodemailer');
    if (!req.post['g-recaptcha-response'].length) {
        res.write(JSON.stringify({success: 0, message: 'Капча не пройдена!'}));
        res.end();
    }

    const {name, email, text} = req.post;
    if (!name || !email || !text) {
        res.write(JSON.stringify({success: 0, message: 'Не все поля заполнены'}));
        res.end();
    }

    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@black-freak-society.ru',
            pass: 'R0PhACriLTATIC'
        }
    });

    const mailOptions = {
        from: 'noreply <noreply@black-freak-society.ru>',
        to: email,
        subject: "Сообщение с сайта",
        text: text,
        html: '<b>' + text + '</b>'
    };

    const info = transporter.sendMail(mailOptions);

    res.end({success: 1, message: 'Сообщение отправлено'});
});

app.listen(setup.port, function () {
    console.log('Server running at 127.0.0.1:%s', setup.port);
});