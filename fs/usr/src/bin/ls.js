programs.ls = (function (window) {

function init(argc, argv) {}
function main(argc, argv) {
	var _wd = env.wd,
	    path = env.wd;

	if (argv[1])
		path = argv[1];

	dir = opendir(path);
	if(!dir)
		return 0;
	console.log(dir);
	for (var file in dir.node) {
		console.log(file);
		if (dir.node.hasOwnProperty(file) && file !== '_mode') {
			printf(file + '\t');
		}
	}
	printf('\n');
	return 0;
}
function kill(argc, argv) {}

return {
	help: 'list directory contents',
	init: init, main: main, kill: kill
};
})(window);
