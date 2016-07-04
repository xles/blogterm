var terminal = document.getElementById('stdout'),
    termbuffer = '',
    exitEvent     = new Event('sig_exit'),
    keyUpEvent    = new Event('key_up'),
    keyDownEvent  = new Event('key_down'),
    keyLeftEvent  = new Event('key_left'),
    keyRightEvent = new Event('key_right'),
    keyTabEvent   = new Event('key_tab'),
    EOT = 4,
    LF  = 10,
    CR  = 13,
//    EOT = String.fromCharCode(4),
//    LF  = String.fromCharCode(10),
    getsbuffer = '',
    programs = {},
    fs = fsinit(),
    env = {
	get: function(key) {
		return JSON.parse(localStorage.getItem(key));
	},
	set: function(key, value) {
		return localStorage.setItem(key, JSON.stringify(value));
	},
	process: [],
	pipeline: [],
	stdin: '',
	stdout: '',
	wd: '/',
	whoami: {},
	echo: false
};

