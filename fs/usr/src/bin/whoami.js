programs.whoami = (function (window) {

function init(argc, argv) {}
function main(argc, argv)
{
	puts(env.whoami.uname);
	return 0;
}
function kill(argc, argv) {}

return {
	help: 'display effective user id',
	init: init, main: main, kill: kill
};
})(window);
