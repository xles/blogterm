var fs = JSON.parse(localStorage.getItem('fs'));

function fsinit()
{
	if (!localStorage.getItem('fs')) {
		localStorage.setItem('fs', JSON.stringify(
		{
			bin: {
				_mode: 'd',
				cd: {
					_mode: 'x'
				},
				pwd: {
					_mode: 'x'
				},
				echo: {
					_mode: 'x'
				}
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
				}

			}	
		}
		));
	}
}
