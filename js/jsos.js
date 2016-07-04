if (!Array.prototype.last){
	Array.prototype.last = function(){
		return this[this.length - 1];
	};
};

document.onkeydown = function(e) {
	kernel(e);
	console.log(e.keyCode);
	
	switch (e.keyCode) {
		case 38:
			document.dispatchEvent(upKeyEvent);
			break;
		case 40:
			document.dispatchEvent(downKeyEvent);
			break;
		case 37:
			document.dispatchEvent(leftKeyEvent);
			break;
		case 39:
			document.dispatchEvent(rightKeyEvent);
			break;
	}
	if (e.ctrlKey) {
		//console.log('ctrl + %s', e.keyCode);
		var key;
		switch (e.keyCode) {
			case 68: 
				key = '^D'; 
				document.dispatchEvent(exitEvent);
				break;
			case 72: 
				key = '^H'; 
				break;
			case 85: 
				key = '^U'; 
				break;
			case 87: 
				key = '^W'; 
				break;
		}
		document.dispatchEvent(new CustomEvent('getch', {detail:key}));
	} else {
		document.dispatchEvent(new CustomEvent('getch', {detail:e.key}));
		if (e.keyCode === 8) {
			e.preventDefault();
			if (getsbuffer.length) {
				getsbuffer = getsbuffer.slice(0, -1);
				if (env.echo)
					termbuffer = termbuffer.slice(0, -1);
				//env.stdout = env.stdout.slice(0, -1);
				//console.log(getsbuffer);
				redraw();
			}
		}
		if (e.keyCode === 9) {
			e.preventDefault();
		}
	}
//	console.log('getsbuffer: "%s" %d', getsbuffer, getsbuffer.length);
}
document.onkeypress = function(e) {
//	} else {
	//console.log(e.charCode);
	if (e.keyCode !== 13 && !e.ctrlKey) {
		//console.log(String.fromCharCode(e.charCode)==='');
//		getsbuffer = getsbuffer + e.key;
		getsbuffer = getsbuffer + String.fromCharCode(e.charCode);
		if (env.echo)
			printf(String.fromCharCode(e.charCode));
	}
	if (e.keyCode === CR || e.keyCode === LF || e.keyCode === EOT) {
		getsbuffer += String.fromCharCode( EOT );
		document.dispatchEvent(new CustomEvent('gets', {detail:getsbuffer}));
		if (env.echo)
			printf('\n');
		fwrite(getsbuffer, stdin);
		getsbuffer = '';
	}
};

window.onload = function(e) {
	var wrem = (window.innerWidth / 58),
	    hrem = (window.innerHeight / 44),
	    rem  = Math.min(wrem, hrem) + 'px';
	document.body.style.fontSize = rem;
	env.event = e || window.event;
	init();
	console.log(env.event);
}

function init(e)
{
	fs = fsinit();
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
	puts('ok');

	printf('reading user database ... ');
	env.users = get_users();
	puts('ok');

	document.addEventListener('sig_exit', function (e) {
		if (env.process.length > 1) {
			kill();
		}
	}, false);

	call('login', []);
	setInterval(function(){ 
		kernel(e);
	}, 40);


}

function kernel(e)
{
	env.event = e || window.event;
//	var argv  = parseargs(env.stdin);
//	    cmd   = argv.shift();
//	call(env.process.last().bin, env.process.last().argv);
//	fs = env.get('fs');
	var exit_code = window.programs[env.process.last().bin].main(
		env.process.last().argv.length,
		env.process.last().argv
	);
	if (exit_code === 0) {
	//	kill();
		document.dispatchEvent(exitEvent);
	}
}

function testfs()
{
	var file = fopen('/usr/alice/banana');
	console.log(fs['bin.pwd']);
}

/*
var worker = new Worker('js/worker.js');
worker.postMessage('');

worker.addEventListener('message', function(e) {
	console.log('Worker said: %O', JSON.parse(e.data));
}, false);

function testworker()
{
	worker.postMessage('Hello World');
}
*/
