programs.tput = (function (window) {

var disp = document.getElementById('stdout');
var cols, lines;

function init(argc, argv) {}
function main(argc, argv)
{
	lines = Math.round(disp.clientHeight / get_rem());
	cols  = Math.round(disp.clientWidth  / get_chwidth());

	switch (argv[1]) {
		case 'cols':
			puts(cols);
			break;
		case 'lines':
			puts(lines);
			break;
		case 'clear':
			cmd_clear();
			break;
		default:
			break;
	}
	return 0;
}
function kill(argc, argv) {}

function cmd_clear()
{
	fwrite('\n'.repeat(lines), tty);
	redraw();
}

function get_chwidth()
{
	var caret = document.getElementById('caret'),
	//var test = document.createElement('span'),
	    //term = window.getComputedStyle(test),
	    //ch = term.getPropertyValue('width');
	    ch = caret.getBoundingClientRect().width;
	console.log(caret.getBoundingClientRect().width);
	console.log(caret.getBoundingClientRect().height);
	return parseFloat(ch);
}

function get_rem()
{
	var term = window.getComputedStyle(disp),
	    rem = term.getPropertyValue('line-height');
	return parseFloat(rem);
}

return {
	help: 'terminal capability interface',
	init: init, main: main, kill: kill
};
})(window);
