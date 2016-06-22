var programs = [
    	'cd',
    	'pwd',
    	'echo',
    	'clear',
    	'help',
    ];

function echo(argv)
{
	if (Array.isArray(argv)) {
		argv = argv[0];
	}
	print(argv + '\n');
}

function cd (argv)
{
	var path = argv[0];
	if (path.startsWith('/')) {
		wd = path;
	} else {
		wd = wd + path;
	}
}

function pwd(argv)
{
	echo(wd);
}

function motd(argv)
{
	var motd = fread('/etc/motd');
	return motd;
}

function clear(argv)
{
	stdout.innerText = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
	redraw();
}

function help(argv)
{
	echo('Available commands:');
	echo('  help     - print help text');
	echo('  cd       - change working directory');
	echo('  pwd      - print working directory');
	echo('  echo     - echo string');
}
