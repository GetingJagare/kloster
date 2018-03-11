const http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head><meta name="yandex-verification" content="38cc4afedf7b051e" />' + 
     '<link rel="icon" href="/favicon.ico?_r=' + parseInt(Math.random() * 1000000000) + '" type="image/x-icon"/>' + 
     '<title>Useless deals workshop "Cloister"</title><style>body{text-align: center}</style></head>' +
     '<body><h2>Site is on maintenance mode</h2><hr />NodeJS server ' +
     process.version + '</body></html>');
  res.end(0);
});

server.listen(8000, '127.0.0.1', function () {
   console.log('Server is running on 127.0.0.1:8000');
});
