programs.jssh = (function (window) {
	var sh_history = getShellHistory();

	var promiseCreated = false;
	var main = function(argc, argv) {
		env.puts = true;

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
				puts('up arrow');
				break;
			case 40:  // up arrow
				puts('down arrow');
				break;
			case 13:  // Return
				//puts (e.value);
				system(env.stdin);
				break;
			default:
				return null;
				break;
		}
		prompt();
*/
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
		main: main
	};
})(window);

programs.help = (function (window) {
	var main = function(argc, argv) {
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
			puts(env.whoami.uname);
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
			puts('Logging out');
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
