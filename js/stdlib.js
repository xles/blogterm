function redraw(prompt)
{
	//stdout.textContent = env.stdout + '\u2588';
	stdout.innerHTML = env.stdout + '<span id="caret"></span>';
	stdout.scrollTop = stdout.scrollHeight;
}

function prompt(prompt)
{
	if (prompt === undefined)
		prompt = '% ';	
	print(prompt);
}

function parseargs(str)
{
//	var argv = str.trim().match(/[^\s"']+|"([^"]*)"|'([^']*)'/g);
	var argv = str.trim().match(/[^\s"']+|"[^"]*"|'[^']*'/g);
	if (!argv)
		return str;

	argv = argv.map(function(arg) {
		return arg.replace(/^['|"]|['|"]$/g, '');
	});

	return argv;
}

function print(str)
{
	env.stdout = env.stdout + str;
	redraw();
}

function echo(str)
{
	print(str + '\n');
}

function call(cmd, argv)
{
	window.programs[cmd].main(argv.length, argv);
}

function parsepath(path)
{
	if (path.endsWith('/')) {
		path = path.slice(0, -1);
	}
	return path.split('/');
}

function gotodir(path)
{
	var tree = parsepath(path),
	    _fs = env.get('fs');

	tree.forEach(traverse);

	function traverse(element, index, array) {
		if (index === 0)
			return;
		_fs = _fs[element];
	}
	return _fs ? _fs : false;
}

function fread(str)
{
	var _fs = gotodir(str);

	if (!_fs) {
		return false;
	}

	switch (_fs._mode) {
		case 'f':
			return fopen(str);
			break;
		default:
			return false;
			break;
	}
}

function fopen(str)
{
	var filename = 'fs' + str;
	xhr = new XMLHttpRequest();
	xhr.open('GET', filename, false);
	xhr.send(null);

	if (xhr.status === 200) {
		return xhr.responseText;
	} else {
		return false;
	}	
}

function fwrite(path, data)
{
	//var _fs = fs;//gotodir(path);
	var _fs = gotodir(path);
	//_fs['banana'] = {
	_fs = {
		_mode: 'm',
		data:  data
	};

	env.set('fs', _fs);
}
