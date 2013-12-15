

var formidable = require('formidable'), 
	http       = require('http'), 
	sys        = require('sys');

http.createServer(function (req, res) {
	if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
		//parse the file for upload
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files){
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write('received upload: \n\n');
			res.end(sys.inspect({fields: fields, files:files}));
		});
		return;
	}

	//show a file upload

	res.writeHead(200, {'Content-Type': "text/html"});
	res.end(
		'<form action="/upload" enctype="multipart/form-data" ' +
		'method="post">' +
		'<input type="text" name="title"><br />' +
		'<input type="file" name="upload" multiple="multiple"><br />' + 
		'<input type="submit" value="upload">'+
		'</form>'
	);
}).listen(8888);
console.log("server has started...");