programs.reboot = (function (window) {

function init(argc, argv) {}
function main(argc, argv)
{
	localStorage.clear();
	//init(env.event);
	return 0;
}
function kill(argc, argv) {}

return {
	help: 'stopping and restarting the system',
	init: init, main: main, kill: kill
};
})(window);
