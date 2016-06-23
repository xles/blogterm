var stdout = document.getElementById('stdout'),
//    stdin = document.getElementById('stdin'),
    pid = 'jssh',
    wd = '/',
    getsbuffer = '',
    localecho = true;

//document.onclick = function() {
//	stdin.focus();
//};

document.onkeyup = function(e) {
	console.log(e.keyCode);
	if (e.keyCode === 8) {
		if (getsbuffer.length) {
			getsbuffer = getsbuffer.slice(0, -1);
			env.stdout = env.stdout.slice(0, -1);
			console.log(getsbuffer);
			redraw();
		}
	}
}
document.onkeypress = function(e) {
	if (e.keyCode === 13) {
		if (localecho)
			print('\n');
		env.stdin = getsbuffer;
		kernel(e);
		getsbuffer = '';
	} else {
		getsbuffer = getsbuffer + e.key;
		if (localecho)
			print(e.key);
	}
};

var env = {
	get: function(key) {
		return JSON.parse(localStorage.getItem(key));
	},
	set: function(key, value) {
		return localStorage.setItem(key, JSON.stringify(value));
	}
}

function init()
{
	fsinit();
	call('clear',[]);
	var motd = fread('/etc/motd');
	print(motd);
	prompt();
}

function kernel(event)
{
	env.event = event || window.event;
	var argv  = parseargs(env.stdin),
	    cmd   = argv.shift();

	call(pid,argv);
}

function testfs()
{
	console.log(fs['bin.pwd']);
}
