
function say (word) {
	console.log(word);
};

function execute (someFunction, value) {
	someFunction(value);
};



//execute(say, "hello");


execute(function (word) {
	console.log(word);
}, "hello");