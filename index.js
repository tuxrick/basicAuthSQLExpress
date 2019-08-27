'use strict'

var app = require("./app");


app.listen(3700,() => {
	console.log("servidor corriendo correctamente en la url: localhost:3700");
})




/*
var http = require('http');
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
});
*/
//app.listen();
