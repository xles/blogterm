function redraw(prompt)
{
	//stdout.textContent = env.stdout + '\u2588';
	fwrite(fread(stdout), tty);
	fwrite(fread(stderr), tty);
	termbuffer += fread(tty);
	terminal.innerHTML = termbuffer + '<span id="caret"></span>';
	terminal.scrollTop = terminal.scrollHeight;
//	console.log(stdout.textContent.split('\n').length);
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

function call(cmd, argv)
{
	env.process.push({
		bin: cmd,
		argv: argv
	});
	window.programs[cmd].init(argv.length, argv);
}

function kill()
{
	window.programs[env.process.last().bin].kill(
		env.process.last().argv.length,
		env.process.last().argv
	);
	env.process.pop();
}
/*
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

function _fread(str)
{
	var _fs = gotodir(str);

	if (!_fs) {
		return false;
	}

	switch (_fs._mode) {
		case 'f':
			return sfopen(str);
			break;
		case 'u':
			return sfopen(_fs.url);
			break;
		default:
			return false;
			break;
	}
}

function sfopen(str)
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

function _fwrite(path, data)
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
*/
function get_users()
{
	var users = {}, passwd = fopen('/etc/passwd');
	console.log(passwd);
	passwd = fread(passwd);

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
/*
		path = path.split('/').reverse();
		var wd = env.wd.substr(1).split('/');
		for (var i = 0; i < path.length; i++) {
			if (path[path.length-1] === '..') {
				path.pop();
				wd.pop();
			} else if (path[path.length-1] === '.') {
				path.pop();
			}
		}
		path = '/' + path.reverse().join('/');
		if (wd.length > 0)
			wd =  '/' + wd.join('/');

		path = wd + path;
*/
function realpath(path)
{
	var resolved = [];
	if (!path) {
		return env.wd;
	} else if (path.startsWith('~')) {
		path = env.whoami.home + path.substr(1);
	} else if (!path.startsWith('/')) {
		path = env.wd + path;
	}
	path = path.split('/');
	for (var i = 0; i < path.length; i++) {
		if (path[i] === '.' || path[i] === '')
			continue;
		if (path[i] === '..') {
			resolved.pop();
		} else {
			resolved.push(path[i]);
		}
	}
	resolved = '/' + resolved.join('/');
	console.log(resolved);
	if (resolved === '/')
		return '/';

	var current = fs,
	    spath = resolved.substr(1).split('/').reverse();
	while (spath.length) {
		if (typeof current !== 'object')
			return null;
		current = current[spath.pop()];
	}
	if (current === undefined) // || current._mode === 'd')
		return null;

	return resolved;
}
