programs.pwd = (function (window) {

function init(argc, argv) {}
function main(argc, argv)
{
	if (env.wd === '/') {
		puts(env.wd);
	} else {
		puts(env.wd.slice(0, -1));
	}
	return 0;
}
function kill(argc, argv) {}

return {
	help: 'return working directory name',
	init: init, main: main, kill: kill
};
})(window);
