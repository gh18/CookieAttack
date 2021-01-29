var http = require('http');
var fs = require('fs');
var url = require('url');
var server = new http.Server();


var server = new http.Server(function(req, res){
console.log(req.headers);

var urlParsed = url.parse(req.url, true);

if(urlParsed.pathname == '/img' && urlParsed.query.cookieDough){
    console.log('randomMessageHere')
    res.end(urlParsed.query.cookieDough);
}  else {
    res.statusCode = 404; // Not Found
    res.end("Hello!");
}
});


server.listen(3000, '127.0.0.1');