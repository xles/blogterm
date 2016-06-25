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
		if (env.puts)
			printf('\n');
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
		if (env.puts)
			printf(String.fromCharCode(e.charCode));
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
	process: [{
		bin: 'login',
		argv: ''
	}],
	pipeline: [],
	stdin: '',
	stdout: '',
	wd: '/',
	whoami: {},
	puts: false
};

function init(e)
{
	puts('Initializing JSOS ...');
	printf('Initializing hardware ... ');
	if (window.navigator.userAgent.match(/iPad|iPhone|iPod|Android/i)) {
		puts('failed.');
		puts('Fatal error: No keyboard.');
		puts('\nSystem halted.');
		return true;
	} else {
		puts('ok');
	}
	printf('Initializing file system ... ');
	fsinit();
	puts('ok');
	printf('reading user database ... ');
	env.users = get_users();
	puts('ok');

	call('clear', []);
	printf(new Date().toString() + '\n\n');
	puts('JSOS, Copyright © 2016 xlestronix Digital Equipment.\n');

	setInterval(function(){ 
		kernel(e);
	}, 40);
}

function kernel(e)
{
	env.event = e || window.event;
//	var argv  = parseargs(env.stdin);
//	    cmd   = argv.shift();
	call(env.process.last().bin, env.process.last().argv);
}

function testfs()
{
	console.log(fs['bin.pwd']);
}
