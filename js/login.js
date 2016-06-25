programs.login = (function (window) {

	var promiseCreated = false;
	var main = function(argc, argv) {
		env.puts = true;
		
		if (Object.keys(env.whoami).length === 0) {
			if (!promiseCreated) {
				promiseCreated = true;
				gets('Logon: ').then(function(str) {
					console.log('validate user: %O', str);
					validateUser(str);
					promiseCreated = false;
				});
			}
		} else {
			if (!promiseCreated) {
				promiseCreated = true;
				gets('Passwd: ').then(function(str) {
					console.log('validate password: %O', str);
					validatepw(str);
					promiseCreated = false;
				});
			}
		}
	};

	function validatepw(str)
	{
//		if (!str.trim()) {
//			return null;//prompt('Passwd: ');
//		}
		if (env.whoami.pw === btoa(str)) {
			console.log(str + ': password valid');
			env.wd = env.whoami.home + '/';
			call('clear', []);
			var motd = fread('/etc/motd');
			printf(motd);
			call('jssh', []);
			env.process.push({
				bin: 'jssh',
				argv: ''
			});
		} else {
			puts('password invalid\n\n');
			env.whoami = {};
		}		
	}
	function validateUser(str)
	{
		str = str.trim();
		if (!str) {
			return null;
		}
		if (env.users.hasOwnProperty(str)) {
			env.whoami = env.users[str];
		} else {
			puts(str + ': no such user\n\n');
		}
	}
	return {
		main: main
	};
})(window);
