programs.login = (function (window) {

var promptLogin = true;
var promptPass = true;

function init(argc, argv)
{
	call('clear', []);
}
function main(argc, argv)
{
	if (Object.keys(env.whoami).length === 0) {
		env.echo = true;
		if (promptLogin) {
			printf(new Date().toString() + '\n\n');
			puts('JSOS, Copyright © 2016 xlestronix Digital Equipment.\n');
			printf('Login: ');
		}
		promptLogin = false;
		if (!(str = gets())) {
			return;
		}
//		console.log('login: %s', str);
		validateUser(str);
	} else {
		env.echo = false;
		if (promptPass) {
			printf('Password: ');
		}
		promptPass = false;
		if (!(str = gets())) {
			return;
		}
//		console.log('password: %s', str);
		validatepw(str);
	}
}
function kill(argc, argv) {}

function validatepw(str)
{
//	if (!str.trim()) {
//		return null;//prompt('Passwd: ');
//	}
	if (env.whoami.pw === btoa(str)) {
		console.log(str + ': password valid');
		env.wd = env.whoami.home + '/';
		call('clear', []);
		var motd = fopen('/etc/motd');
		motd = fread(motd);
		printf(motd);
		call('jssh', []);
//		env.process.push({
//			bin: 'jssh',
//			argv: ''
//		});
	} else {
		puts('password invalid\n\n');
		env.whoami = {};
		promptLogin = true;
		promptPass = true;
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
		promptLogin = true;
		promptPass = true;
	}
}
return {
	init: init, main: main, kill: kill,
};
})(window);
