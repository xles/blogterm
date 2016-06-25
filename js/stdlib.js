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
	printf(prompt);
}

function parseargs(str)
{
	var argv = str.trim().match(/[^\s"']+|"([^"]*)"|'([^']*)'/g);

	if (!argv)
		return str;

	argv = argv.map(function(arg) {
		return arg.replace(/^['|"]|['|"]$/g, '');
	});

	return argv;
}

function printf(str)
{
	env.stdout = env.stdout + html_entities(str);
	redraw();
}

function html_entities(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function puts(str)
{
	printf(str + '\n');
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
		console.log(_fs);
		_fs = _fs[element];
		console.log(_fs);
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

function get_users()
{
	var users = {}, passwd = fread('/etc/passwd');
	passwd = passwd.trim().split('\n').map(function(pw) {
		pw = pw.split(':')
		users[pw[0]] = {
			uname: pw[0],
			pw:    pw[1],
			uid:   pw[2],
			gid:   pw[3],
			gcos:  pw[4],
			home:  pw[5],
			sh:    pw[6]
		};
	});

	return users;
}
