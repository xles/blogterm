programs.stmd = (function (window) {
	return {
		help: 'convert CommonMark formatted text to HTML',
		main: function main(argc, argv) {


			var file = argv[1],
			    _fs = gotodir(env.wd)[file];
			
			if (_fs && _fs._mode === 'f') {
				var reader = new commonmark.Parser();
				var writer = new commonmark.HtmlRenderer();
				var parsed = reader.parse(fread(env.wd+file));
				var result = writer.render(parsed);
				printf(result);
			} else if (_fs && _fs._mode === 'd') {
				puts('stmd: ' + file + ': Is a directory.');
			} else {
				puts('stmd: ' + file + ': No such file or directory.');
			}
		}
	};
})(window);
