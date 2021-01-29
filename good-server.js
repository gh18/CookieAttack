var http = require('http');
var url = require('url');
var server = new http.Server(function(req, res){
console.log(req.headers);

var urlParsed = url.parse(req.url, true);
console.log(urlParsed);

let userMessage = [];

function getForm() {
	let field1 = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Form</title>
	</head>
	<body>
	    <h1>Fill In Form</h1>
	    <div id='posts'></div>
	    <p>Hello, user!</p>`

	let input = userMessage.join('<br>');

	let field2 = `
	    <form action='/get' method='get'>
	        <input type="text" name="username" placeholder="Name"/><br>
	        <input type="submit"/>
	    </form>
	</body>
	</html>
	`
	return field1 + input + field2;
}

if(urlParsed.pathname == '/echo' && urlParsed.query.message){
	res.setHeader('Cache-control', 'no-cache');
	res.setHeader("Set-Cookie", "login=ok");
	res.end(urlParsed.query.message);
} else if(urlParsed.pathname == '/field1') {
    res.setHeader("Set-Cookie", "code=0000");
	res.end(getForm());
} else if (urlParsed.pathname == '/get') {
	userMessage.push(urlParsed.query.username);
	res.end(getForm());
} else {
	res.statusCode = 404; // Not Found
	res.end("Page not found");
}
});

server.listen(8000, '127.0.0.1');