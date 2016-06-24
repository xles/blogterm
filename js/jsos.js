var stdout = document.getElementById('stdout'),
    activityEvent = new Event('activity');
    getsbuffer = '';


//document.onclick = function() {
//	stdin.focus();
//};
if (!Array.prototype.last){
	Array.prototype.last = function(){
		return this[this.length - 1];
	};
};

setInterval(function(){ 
	kernel(env.event);
}, 40);


document.onkeydown = function(e) {
	kernel(e);
	document.dispatchEvent(new CustomEvent('getch', {detail:e.key}));
	//console.log(getchEvent);
	if (e.keyCode === 8) {
		e.preventDefault();
		if (getsbuffer.length) {
			getsbuffer = getsbuffer.slice(0, -1);
			env.stdout = env.stdout.slice(0, -1);
			//console.log(getsbuffer);
			redraw();
		}
	}
	if (e.keyCode === 13) {
		//console.log(getsbuffer);
		//console.log(getsEvent);
		document.dispatchEvent(new CustomEvent('gets', {detail:getsbuffer}));
		if (env.echo)
			print('\n');
		env.stdin = getsbuffer;
		//kernel(e);
		getsbuffer = '';
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
	process: ['login'],
	stdin: '',
	stdout: '',
	wd: '/',
	whoami: {},
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
	print('Initializing file system ... ');
	fsinit();
	echo('ok');
	print('reading user database ... ');
	env.users = get_users();
	echo('ok');

	call('clear', []);
	print(new Date().toString() + '\n\n');
	echo('JSOS, Copyright © 2016 xlestronix Digital Equipment.\n');
	call(env.process.last(), []);
}

function kernel(e)
{
	env.event = e || window.event;
	var argv  = parseargs(env.stdin);
//	    cmd   = argv.shift();
	call(env.process.last(), argv);
}

function testfs()
{
	console.log(fs['bin.pwd']);
}
