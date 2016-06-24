var gets = function(_prompt) {
	if (_prompt)
		prompt(_prompt);
	return new Promise(function(resolve, reject) {
		document.addEventListener('gets', function (e) {
			console.log('string acquired: %O', e.detail);
			//document.dispatchEvent(activityEvent);
			resolve(e.detail);
		}, false);
	});
};

var getch = function(_prompt) {
	if (_prompt)
		prompt(_prompt);
	return new Promise(function(resolve, reject) {
		document.addEventListener('getch', function (e) {
			console.log('character acquired: %O', e.detail);
			//document.dispatchEvent(activityEvent);
			resolve(e.detail);
		}, false);
	});
};

