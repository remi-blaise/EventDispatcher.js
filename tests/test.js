dispatcher = new EventDispatcher ();
result = '';

dispatcher.listen('test.play', function () {
	result += '5';
}, 5);

dispatcher.listen('test.play', function () {
	result += '-1|';
}, -1);

dispatcher.listen('test.play', function () {
	result += '0|';
});

dispatcher.listen('test.play', function () {
	result += '0\'|';
});

id = dispatcher.listen('test.play', function () {
	result += 'E';
});
dispatcher.detach(id);

dispatcher.dispatch('test.play');

console.log(result === '-1|0|0\'|5');
