
function redraw(prompt)
{
	stdout.scrollTop = stdout.scrollHeight;
}

function prompt(prompt)
{
	if (prompt === undefined)
		prompt = '% ';	
	stdin.value = prompt;
}

function parseargs(str)
{
//	var argv = str.trim().match(/[^\s"']+|"([^"]*)"|'([^']*)'/g);
	var argv = str.trim().match(/[^\s"']+|"[^"]*"|'[^']*'/g);
	argv = argv.map(function(arg) {
		return arg.replace(/^['|"]|['|"]$/g, '');
	});

	if (argv[0] === '%')
		argv.shift();
	
	return argv;
}

function print(str)
{
	stdout.textContent = stdout.textContent + str;
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
    return path.slice(0, -1).split('/');
}

function gotodir(path)
{
	var tree = parsepath(path),
	    _fs = fs;

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
