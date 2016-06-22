var stdout = document.getElementById('stdout'),
    stdin = document.getElementById('stdin'),
    pid = 'jssh',
    wd = '/',
    _event;


document.onclick = function() {
	stdin.focus();
};

function init()
{
	call('clear',[]);
	var motd = fread('/etc/motd');
	print(motd);
}

function kernel(event)
{
	_event = event || window.event;
	var argv  = parseargs(stdin.value),
	    cmd   = argv.shift();

	call(pid,argv);
}

function testfs()
{
	console.log(fs['bin.pwd']);
}
