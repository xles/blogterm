programs.jssh = (function (window) {
var sh_history = getShellHistory();

var showPrompt = true,
    getchPromise = false,
    ch = false;

function init(argc, argv)
{
//	document.addEventListener('getch', getchEventListener, false);
}
function main(argc, argv)
{
	env.echo = true;

	if (showPrompt) {
		printf('% ');
	}
	showPrompt = false;
	if (!(str = gets())) {
		return;
	}
	system(str);
}
function kill(argc, argv) {
	env.whoami = {};
	console.log('killing shell');
//	document.removeEventListener('getch', getchEventListener, false);
}

var getchEventListener = function(e) {
	console.log('getchEventListener: %O', e.detail);
	ch = e.detail
	switch (ch) {
		case 'ArrowUp':  // up arrow
			puts('up arrow');
			break;
		case 'ArrowDown':  // up arrow
			puts('down arrow');
			break;
		case 'Tab':  // Return
			puts('tab');
			break;
		default:
			return null;
			break;
	}
};

function parse_pipeline(str)
{
	var pipeline = str.trim().split('|');

	if (!pipeline[0])
		return [];

	pipeline = pipeline.map(function(cmd) {

		var argv = cmd.trim().match(/[^\s"']+|"[^"]*"|'[^']*'/g);
		if (!argv)
			return cmd.trim();

		argv = argv.map(function(arg) {
			return arg.replace(/^['|"]|['|"]$/g, '');
		});
		return argv;
	});

	return pipeline;
}
function system(str, _puts)
{
	var input = str,
	    pipeline  = parse_pipeline(input);

	updateShellHistory(input);
	showPrompt = true;

	if ((str.match(/"/g) || []).length % 2 > 0)
		return puts('Unmatched ".');
	
	console.log(pipeline);
	if (pipeline.length === 0)
		return redraw();
	if (pipeline[0][0] === 'jssh')
		return null;

	pipeline.map(function(cmd) {
		if (!programs.hasOwnProperty(cmd[0]))
			return puts(cmd[0] + ': Command not found');
		call(cmd[0], cmd);
	})
}

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
return {
	init: init,
	main: main,
	kill: kill,
};
})(window);

programs.help = (function (window) {
function init(argc, argv) {}
function main(argc, argv)
{
	puts('Available commands:');
	Object.keys(programs).sort().forEach(function(cmd) {
		var internal = [
			'jssh',
			'login'
		];
		if (internal.indexOf(cmd) === -1) {
			var len = cmd.length;
			puts('  '+cmd+' '.repeat(10-len)+window.programs[cmd].help);
		}
	});
	return 0
}
function kill(argc, argv) {}
return {
	help: 'print help text',
	init: init,
	main: main,
	kill: kill,
};
})(window);


programs.exit = (function (window) {
function init(argc, argv) {}
function main(argc, argv)
{
	call('clear', []);
	env.whoami = {};
	puts('Logging out');
	kill();
	return 0;
}
function kill(argc, argv) {}
return {
	help: 'cause normal process termination',
	init: init, main: main, kill: kill,
};
})(window);

