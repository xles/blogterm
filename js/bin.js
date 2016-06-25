var programs = {};

programs.echo = (function (window) {
	return {
		help: 'write arguments to the standard output',
		main: function main(argc, argv) {
			if (Array.isArray(argv)) {
				argv.shift();
				argv = argv.join(' ');
			}
			puts(argv);
		}
	};
})(window);

programs.cd = (function (window) {
	return {
		help: 'change working directory',
		main: function main(argc, argv) {
			var path = argv[1], _wd;
			    tree = env.wd.slice(0, -1).split('/');

			if (!path) {
				env.wd = env.whoami.home + '/';
				return true;
			} else if (path === '.') {
				return true;
			} else if (path === '..') {
				tree.pop();
				env.wd = tree.join('/') + '/';
				return true;
			} else if (path === '~') {
				env.wd = env.whoami.home + '/';
				return true;
			} else if (path === '/') {
				env.wd = '/';
				return true;
			}

			if (path.startsWith('/')) {
				_wd = path;
			} else {
				_wd = env.wd + path;
			}
			if (!path.endsWith('/')) {
				_wd = _wd + '/';
			}
			var _fs = gotodir(_wd);
			if (_fs && _fs._mode === 'd') {
				env.wd = _wd;
			} else if (_fs && _fs._mode !== 'd') {
				puts(path + ': Not a directory.');
			} else {
				puts(path + ': No such file or directory.');
			}
		}
	};
})(window);

programs.pwd = (function (window) {
	return {
		help: 'return working directory name',
		main: function main(argc, argv) {
			if (env.wd === '/') {
				puts(env.wd);
			} else {
				puts(env.wd.slice(0, -1));
			}
		}
	};
})(window);

programs.ls = (function (window) {
	return {
		help: 'list directory contents',
		main: function main(argc, argv) {
			var _wd = env.wd,
			    _fs = gotodir(env.wd);
			console.log(_fs);
			for (var path in _fs) {
				if (_fs.hasOwnProperty(path) && path !== '_mode') {
					puts(path);
				}
			}
		}
	};
})(window);

programs.cat = (function (window) {
	return {
		help: 'concatenate and print files',
		main: function main(argc, argv) {
			var file = argv[1],
			    _fs = gotodir(env.wd)[file];
			
			if (_fs && _fs._mode === 'f') {
				printf(fread(env.wd+file));
			} else if (_fs && _fs._mode === 'd') {
				puts('cat: ' + file + ': Is a directory.');
			} else {
				puts('cat: ' + file + ': No such file or directory.');
			}
		}
	};
})(window);

programs.lp = (function (window) {
	return {
		help: 'print files',
		main: function main(argc, argv) {
			var file = argv[1],
			    _fs = gotodir(env.wd)[file],
			    printdata = JSON.stringify({
			    	wd: env.wd,
			    	argv: argv
			    });

			if (_fs && _fs._mode === 'f') {
				var page = document.createElement('iframe');
				page.onload = function setPrint () {
					this.contentWindow.__container__ = this;
					this.contentWindow.onbeforeunload = function () {
						document.body.removeChild(this.__container__);
					};
					this.contentWindow.onafterprint = function () {
						document.body.removeChild(this.__container__);
					};
					this.contentWindow.focus(); // Required for IE
					//this.contentWindow.print();
				};
				page.style.visibility = 'hidden';
				page.style.position = 'fixed';
				page.style.right = '0';
				page.style.bottom = '0';
				page.src = '/print.html#' + btoa(printdata);
				document.body.appendChild(page);			
			} else if (_fs && _fs._mode === 'd') {
				puts('lp: No file in print request.');
			} else {
				puts('lp: Error - unable to access "' + 
					file + 
					'" - No such file or directory');
			}
		}
	};
})(window);
