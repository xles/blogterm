var stdout = document.getElementById('stdout'),
    stdin = document.getElementById('stdin'),
    sh_history = getShellHistory();

function getShellHistory()
{
	if (!localStorage.getItem('sh_history')) {
		localStorage.setItem('sh_history', JSON.stringify([]));
	}
	return JSON.parse(localStorage.getItem('sh_history'));
}

function updateShellHistory(cmd)
{
	sh_history.push(cmd);
	localStorage.setItem('sh_history', JSON.stringify(sh_history));
}

function redraw()
{
	stdout.scrollTop = stdout.scrollHeight;
	stdin.value = '% ';
}

function readterm(e)
{
	switch (event.keyCode) {
		case 38:  // up arrow
			echo('up arrow');
			break;
		case 40:  // up arrow
			echo('down arrow');
			break;
		case 13:  // Return
			//echo (e.value);
			system(e.value);
			break;
		default:
			return null;
			break;
	}
/*
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
*/
}

function parseterm(str)
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
	stdout.innerText = stdout.innerText + str;
	redraw();
}

function system(str, _echo)
{
	var input = str,
	    argv  = parseterm(input),
	    cmd   = argv.shift();
	
	updateShellHistory(input);
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
