var stdin  = fopen('/dev/stdin'),
    stdout = fopen('/dev/stdout'),
    stderr = fopen('/dev/stderr'),
    tty    = fopen('/dev/tty');

function fopen(path)
{
	var path = realpath(path);
	if (!path)
		return null;
	path = path.substr(1);
	
	var rpath = '/' + path,
	    current = fs;

	path = path.split('/').reverse();
	while (path.length) {
		if (typeof current !== 'object')
			return null;
		current = current[path.pop()];
	}
	if (current === undefined) // || current._mode === 'd')
		return null;
	return {
		realpath: rpath,
		node: current
	};
}

function fprintf(str, stream)
{
//	env.stdout = env.stdout + html_entities(str);
	//console.log(stdout);
	fwrite(html_entities(str), stream);
	redraw();
}

function printf(str)
{
	fprintf(str, stdout)
}

function puts(str)
{
	printf(str + '\n');
}

function gets() {
	return fgets(stdin);
}

function fgets(stream) {
	var data = stream.node.content,
	    terminator = data.charCodeAt(data.length-1);
	
//	console.log(terminator);
//	console.log(CR);
//	console.log(LF);
//	console.log(EOT);
	
	if (terminator === EOT || terminator === LF || terminator === CR) {
		console.log(data);
		stream.node.content = '';
		//fwrite('', stdin);
		return data.slice(0, -1);
	} else {
		return false;
	}
}

function fwrite(data, stream)
{
	stream.node.content += data;
	env.set('fs', fs);
}

function fread(stream)
{
	var data;
	switch (stream.node._mode) {
		case 's': 
			data = stream.node.content;
			stream.node.content = '';
			env.set('fs', fs);
			break;
		case 'f':
			var filename = 'fs' + stream.realpath;
			xhr = new XMLHttpRequest();
			xhr.open('GET', filename, false);
			xhr.send(null);

			if (xhr.status === 200) {
				data = xhr.responseText;
			} else {
				data = false;
			}
			break;
		default:
			data = false;
			break;
	}
	return data;
}

function _gets(_prompt) {
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

function popen(cmd) {
	return new Promise(function(resolve, reject) {
		/*  Do system call here and catch stdout somehow ...  */
		resolve();
	});
}

function html_entities(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}
