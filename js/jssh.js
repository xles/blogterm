programs.jssh = (function (window) {
	var sh_history = getShellHistory();

	var main = function(argc, argv) {
		switch (env.event.keyCode) {
			case 38:  // up arrow
				echo('up arrow');
				break;
			case 40:  // up arrow
				echo('down arrow');
				break;
			case 13:  // Return
				//echo (e.value);
				system(env.stdin);
				break;
			default:
				return null;
				break;
		}
		prompt();
	};

	function system(str, _echo)
	{
		var input = str,
		    argv  = parseargs(input);
		
		updateShellHistory(input);

		if (argv.length === 0)
			return redraw();
		if (argv[0] === 'jssh')
			return null;
		if (!programs.hasOwnProperty(argv[0]))
			return echo(argv[0] + ': Command not found');
		call(argv[0], argv);
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
		main: main
	};
})(window);

programs.help = (function (window) {
	var main = function(argc, argv) {
		echo('Available commands:');
		for (var cmd in programs) {
			if (programs.hasOwnProperty(cmd) && cmd !== 'jssh') {
				echo('  '+cmd+'\t- '+window.programs[cmd].help);
			}
		}
	};
	return {
		help: 'print help text',
		main: main
	};
})(window);

programs.clear = (function (window) {
	return {
		help: 'clear the terminal screen',
		main: function main(argc, argv)
		{
			env.stdout = 	'\n\n\n\n\n\n' +
					'\n\n\n\n\n\n' +
					'\n\n\n\n\n\n' +
					'\n\n\n\n\n\n';
			redraw();
		}
	};
})(window);

programs.reboot = (function (window) {
	return {
		help: 'stopping and restarting the system',
		main: function main(argc, argv)
		{
			localStorage.clear();
			//init(env.event);
		}
	};
})(window);
