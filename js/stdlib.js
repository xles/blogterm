var stdout = document.getElementById('stdout'),
    stdin = document.getElementById('stdin');

function redraw()
{
	stdout.scrollTop = stdout.scrollHeight;
	stdin.value = '% ';
}

function readterm(e)
{
	if (event.keyCode !== 13) {
		return null;
	}
	var input = e.value,
	    argv  = parseterm(input),
	    cmd   = argv.shift();
	
	echo(input);
	if (cmd.length === 0)
		return null;
	if (programs.indexOf(cmd) === -1)
		return echo(cmd + ': Command not found');
	console.log('argv: %O', argv);
	window[cmd](argv);
}

function parseterm(str)
{
	var argv = str.trim().split(/\s+/);
	if (argv[0] === '%')
		argv.shift();
	
	return argv;
}

function print(str)
{
	stdout.innerText = stdout.innerText + str;
	redraw();
}

function system(str, echo)
{
	var input = str,
	    argv  = parseterm(input),
	    cmd   = argv.shift();
	
	echo(input);
	if (cmd.length === 0)
		return null;
	if (programs.indexOf(cmd) === -1)
		return echo(cmd + ': Command not found');
	window[cmd](argv);
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
