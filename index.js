const http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<html><head><title>Useless deals workshop "Cloister"</title></head>' + 
     '<body><center><h2>Site is on maintenance mode</h2><hr />NodeJS server ' + 
     process.version + '</center></body></html>');
});

server.listen(8000, '127.0.0.1', function () {
   console.log('Server is running on 127.0.0.1:8000');
});
