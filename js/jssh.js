programs.jssh = (function (window) {
	var sh_history = getShellHistory();

	var promiseCreated = false;
	var main = function(argc, argv) {
		env.echo = true;

		if (!promiseCreated) {
			promiseCreated = true;
			gets('% ').then(function(str) {
				system(str);
				promiseCreated = false;
			});
		}
/*
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
*/
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
		Object.keys(programs).sort().forEach(function(cmd) {
			var len = cmd.length;
			echo('  '+cmd+' '.repeat(10-len)+window.programs[cmd].help);	
		});
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

programs.whoami = (function (window) {
	return {
		help: 'display effective user id',
		main: function main(argc, argv)
		{
			echo(env.whoami.uname);
		}
	};
})(window);

programs.exit = (function (window) {
	return {
		help: 'cause normal process termination',
		main: function main(argc, argv)
		{
			call('clear', []);
			env.whoami = {};
			env.process.pop();
			echo('Logging out');
			//exit();
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
