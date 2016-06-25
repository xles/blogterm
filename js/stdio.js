function gets(_prompt) {
	if (_prompt)
		prompt(_prompt);
	return new Promise(function(resolve, reject) {
		document.addEventListener('gets', function (e) {
			console.log('string acquired: %O', e.detail);
			resolve(e.detail);
		}, false);
	});
}

function getch(_prompt) {
	if (_prompt)
		prompt(_prompt);
	return new Promise(function(resolve, reject) {
		document.addEventListener('getch', function (e) {
			console.log('character acquired: %O', e.detail);
			resolve(e.detail);
		}, false);
	});
}
