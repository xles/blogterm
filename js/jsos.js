var stdout = document.getElementById('stdout'),
//    stdin = document.getElementById('stdin'),
//    pid = 'help',
    pid = 'jssh',
    wd = '/',
    getsbuffer = '';

//document.onclick = function() {
//	stdin.focus();
//};

document.onkeydown = function(e) {
//	kernel(e);
	if (e.keyCode === 8) {
		e.preventDefault();
		if (getsbuffer.length) {
			getsbuffer = getsbuffer.slice(0, -1);
			env.stdout = env.stdout.slice(0, -1);
			console.log(getsbuffer);
			redraw();
		}
	}
	if (e.keyCode === 13) {
		if (env.echo)
			print('\n');
		env.stdin = getsbuffer;
		kernel(e);
		getsbuffer = '';
		console.log(env.stdin);
	}
}
document.onkeypress = function(e) {
//	} else {
	if (e.keyCode !== 13) {
//		console.log(String.fromCharCode(e.charCode));
//		getsbuffer = getsbuffer + e.key;
		getsbuffer = getsbuffer + String.fromCharCode(e.charCode);
		if (env.echo)
			print(String.fromCharCode(e.charCode));
	}
};

window.onload = function(e) {
	env.event = e || window.event;
	init();
	console.log(env.event);
}

var env = {
	get: function(key) {
		return JSON.parse(localStorage.getItem(key));
	},
	set: function(key, value) {
		return localStorage.setItem(key, JSON.stringify(value));
	},
	stdin: '',
	stdout: '',
	echo: false
}

function init(e)
{
	echo('Initializing JSOS ...');
	print('Initializing hardware ... ');
	if (window.navigator.userAgent.match(/iPad|iPhone|iPod|Android/i)) {
		echo('failed.');
		echo('Fatal error: No keyboard.');
		echo('\nSystem halted.');
		return true;
	} else {
		echo('ok');
	}
	echo('Initializing file system ... ok');
	fsinit();

//	kernel(env.event);
	call(pid,[]);
	var motd = fread('/etc/motd');
	print(motd);
	prompt();
}

function kernel(e)
{
	env.event = e || window.event;
	var argv  = parseargs(env.stdin);
//	    cmd   = argv.shift();

	call(pid,argv);
}

function testfs()
{
	console.log(fs['bin.pwd']);
}
