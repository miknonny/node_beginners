var server          = require("./server"),
    router          = require("./router"),
    requestHandlers = require("./requestHandlers");


//dependency injection for both router and handle.
//here we are just passing in a function...


var handle = {};


handle["/"]       = requestHandlers.start;
handle["/start"]  = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"]   = requestHandlers.show;


//router(router.js) an object module containing a function route()
//handle is an object containing a mapping of keys to functions from the
//requestHandler module imported.


server.start(router.route, handle);


//Very important. 
//note that every variable imported from any module is made. 
//available here.
