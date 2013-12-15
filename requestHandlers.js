
var querystring = require("querystring"),
	fs          = require("fs"),
	formidable  = require("formidable");

function start (response) {
	console.log("Request handler 'start' was called");

	var body = '<html>' + 
	'<head>' + 
	'<meta http-equiv="Content-Type" content="text/html" '+
	'charset="UTF-8"' +
	'</head>' +
	'<body>' +
	'<form action="/upload" enctype="multipart/form-data" method="post">' +
	'<input type="file" name="upload" multiple="multiple">' +
	'<input type="submit" value="upload file" />' + 
	'</form>' +
	'</body>' +
	'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
};
	

function upload (response, request) {
	console.log("Request handler 'upload' was called");
	
	var form = new formidable.IncomingForm();
	
	console.log("about to parse");
	
	form.parse(request, function (error, fields, files) {
		console.log("parsing done");
		console.log(form.bytesReceived);
		
		/* possible error on Windows system:
		 * tried to rename to an already existing file. We need to unlink(delete) file 
		 * before attempting to rename;
		 */	
		
		console.log(files.upload.path);
		fs.rename(files.upload.path, "/tmp/test.png", function(error) {
			if (error) {
				fs.unlink("/tmp/test.png");
				fs.rename(files.path, "/tmp/test.png");
			}
		})
		
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image: <br />");
		response.write("<img src='/show' />")
		response.end();
	});

};

function show (response) {
	console.log("request handler show was called");
	fs.readFile("/tmp/test.png", "binary", function (error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
};

exports.start  = start;
exports.upload = upload;
exports.show   = show; 

//solving the exec problem. instead of bringing the content to the 
//server (request handler->router->server).
//we will bring the content to the server.
//we will inject the response object from the servers callback 
//function on request throught the router to the request Handlers.
