function fsinit()
{
//	if (!localStorage.getItem('fs')) {
		fs = {
			_mode: 'd',
			bin: {
				_mode: 'd',
				cat:    { _mode: 'x' },
				cd:     { _mode: 'x' },
				clear:  { _mode: 'x' },
				echo:   { _mode: 'x' },
				jssh:   { _mode: 'x' },
				login:  { _mode: 'x' },
				lp:     { _mode: 'x' },
				ls:     { _mode: 'x' },
				pwd:    { _mode: 'x' },
				stmd:   { _mode: 'x' },
				whoami: { _mode: 'x' },
			},
			sbin: {
				_mode: 'd',
				reboot: { _mode: 'x' },
			},
			dev: {
				_mode: 'd',
				lp: { 
					_mode: 's', 
					content: ''
				},
				stdin:  { 
					_mode: 's', 
					content: ''
				},
				stdout: { 
					_mode: 's', 
					content: ''
				},
				stderr: { 
					_mode: 's', 
					content: ''
				},
				tty:    { 
					_mode: 's', 
					content: ''
				},
			},
			etc: {
				_mode: 'd',
				foo: {
					_mode: 'd',
					bar: {
						_mode: 'd',
						baz: {
							_mode: 'f',
						}
					}
				},
				motd: {
					_mode: 'f'
				},
				passwd: {
					_mode: 'f'
				}

			},
			usr: {
				_mode: 'd',
				alice: {
					_mode: 'd',
					TODO: {
						_mode: 'f'
					},
					'resume.md': {
						_mode: 'f'
					}
				},
				src: {
					_mode: 'd',
					bin: {
						_mode: 'd',
						'cat.js':    { _mode: 'f' },
						'cd.js':     { _mode: 'f' },
						'clear.js':  { _mode: 'f' },
						'echo.js':   { _mode: 'f' },
						'jssh.js':   { _mode: 'f' },
						'login.js':  { _mode: 'f' },
						'lp.js':     { _mode: 'f' },
						'ls.js':     { _mode: 'f' },
						'pwd.js':    { _mode: 'f' },
 	 					'stmd.js':   { _mode: 'f' },
						'whoami.js': { _mode: 'f' },
					},
					sbin: {
						_mode: 'd',
						'reboot.js': { _mode: 'f' },
					}
				}
			}
		};
		console.log(fs);
		localStorage.setItem('fs', JSON.stringify(fs));
//	}
//	fs = 'BANANA';
	return fs;
}
