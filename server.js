
//This is it... Enjoy it... know it... love it.

var http = require("http"),
    url  = require("url"),
    port = 8888;


function start (route, handle) {
	function onRequest (request, response) {
		console.log("request received");
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request);
	};
	http.createServer(onRequest).listen(port);
	console.log("server has started on port " + port);
};

exports.start = start;


//dependecy injection is a $25 term for a 5cent concept.

//really short Version.
//dependency injection means giving an objects its instance variable.
//here we can see that route and handle are both functions or instance variable
//and start function is the object.
//in the start Object/function we inject two instance variables route and handle.

//Qtn 
// How was the response variable injected into router and request Handlers.




























