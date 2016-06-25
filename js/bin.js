var programs = {};

programs.echo = (function (window) {
	return {
		help: 'write arguments to the standard output',
		main: function main(argc, argv) {
			if (Array.isArray(argv)) {
				argv = argv[1];
			}
			echo(argv);
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
				echo(path + ': Not a directory.');
			} else {
				echo(path + ': No such file or directory.');
			}
		}
	};
})(window);

programs.pwd = (function (window) {
	return {
		help: 'return working directory name',
		main: function main(argc, argv) {
			if (env.wd === '/') {
				echo(env.wd);
			} else {
				echo(env.wd.slice(0, -1));
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
					echo(path);
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
				print(fread(env.wd+file));
			} else if (_fs && _fs._mode === 'd') {
				echo('cat: ' + file + ': Is a directory.');
			} else {
				echo('cat: ' + file + ': No such file or directory.');
			}
		}
	};
})(window);
