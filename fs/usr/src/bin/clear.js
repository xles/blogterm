programs.clear = (function (window) {

function init(argc, argv) {}
function main(argc, argv)
{
	//env.stdout += '\n'.repeat(24);
	//redraw();
	printf('\n'.repeat(25));
	return 0;
}
function kill(argc, argv) {}

return {
	help: 'clear the terminal screen',
	init: init, main: main, kill: kill
};
})(window);
