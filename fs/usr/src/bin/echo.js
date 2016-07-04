programs.echo = (function (window) {

function init(argc, argv) {}
function main(argc, argv)
{
	if (Array.isArray(argv)) {
		argv.shift();
		argv = argv.join(' ');
	}
	puts(argv);
	return 0;
}
function kill(argc, argv) {}

return {
	help: 'write arguments to the standard output',
	init: init, main: main, kill: kill
};
})(window);
