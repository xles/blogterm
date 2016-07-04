programs.cd = (function (window) {

function init(argc, argv) {}
function main(argc, argv)
{
	var path = argv[1], wd;

	if (argc < 1) {
		path = '~';
	}
	wd = realpath(path);
	if (wd === '/') {
		env.wd = '/';
		return 0
	}
	console.log(wd);
	var file = fopen(wd);

	if (file && file.node._mode === 'd') {
		env.wd = wd + '/';
	} else if (file && file.node._mode !== 'd') {
		puts(path + ': Not a directory.');
	} else {
		puts(path + ': No such file or directory.');
	}
	return 0;
}
function kill(argc, argv) {}

return {
	help: 'change working directory',
	init: init, main: main, kill: kill,
};
})(window);
