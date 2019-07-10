module.exports = function (app) {
	app.post('/mail', function (req, res) {
    	const shell = require('shelljs');

    	if (!req.body['g-recaptcha-response'].length) {
        	res.write(JSON.stringify({success: 0, errorCode: 1}));
        	res.end();
    	}

    	const {name, email, text} = req.body;
    	if (!name || !email || !text) {
        	res.write(JSON.stringify({success: 0, errorCode: 2}));
        	res.end();
    	}

    	const from = 'noreply@black-freak-society.ru';
    	const to = 'mbd.kloster@yandex.ru';
    	const subject = 'Сообщение с сайта';
    	shell.exec('echo "From: ' + from + '\r\nSubject: ' + subject + '\r\nTo: ' + to + '\r\n\r\nИмя: ' + name + '\r\n' +
        	'Email: ' + email + '\r\nСообщение: ' + text + '" | sendmail -f ' + from + ' ' + to);

    	res.write(JSON.stringify({success: 1}));
    	res.end();
	});
};