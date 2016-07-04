programs.stmd = (function (window) {

function init(argc, argv) {}
function main(argc, argv)
{
	var filename = argv[1],
	    file = fopen(filename);
	
	if (file && file.node._mode === 'f') {
		var reader = new commonmark.Parser();
		var writer = new commonmark.HtmlRenderer();
		var parsed = reader.parse(fread(file));
		var result = writer.render(parsed);
		printf(result);
	} else if (file && file.node._mode === 'd') {
		puts('stmd: ' + filename + ': Is a directory.');
	} else {
		puts('stmd: ' + filename + ': No such file or directory.');
	}
	return 0;
}
function kill(argc, argv) {}

return {
	help: 'convert CommonMark formatted text to HTML',
	init: init, main: main, kill: kill
};
})(window);
