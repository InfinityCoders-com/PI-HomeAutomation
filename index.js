var Gpio = require('onoff').Gpio;
var http = require('http');

var LED = new Gpio(18, 'out');

http.createServer(function (req, res) {
	const state = LED.readSync();
	const newState = state == 0 ? 1 : 0;
	res.writeHead(200,
		{'Content-Type': 'text/html',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'});
	if(req.url == '/?changeState') {
		LED.writeSync(newState);
		res.write('"'+ newState + '"');
		res.end();
	} else {	
		res.write('"'+ state + '"');
		res.end();
	}
}).listen(8000);
