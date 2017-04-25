programs.cat = (function (window) {

function init(argc, argv) {}
function main(argc, argv)
{
	var filename = argv[1],
	    file = fopen(filename),
	    node;
	
	if(!file)
		puts('cat: ' + filename + ': No such file or directory.');
	node = file.node;
	
	console.log(file);
	if (node && (node._mode === 'f' || node._mode === 'u')) {
		printf(fread(file));
	} else if (node && node._mode === 'd') {
		puts('cat: ' + filename + ': Is a directory.');
	} else {
		puts('cat: ' + filename + ': No such file or directory.');
	}
	return 0;
}
function kill(argc, argv) {}

return {
	help: 'concatenate and print files',
	init: init, main: main, kill: kill,
};
})(window);
