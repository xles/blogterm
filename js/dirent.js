function opendir(path)
{
	var path = realpath(path).substr(1)
	    rpath = '/' + path,
	    current = fs;
	

	if (path === '')
		return {
			realpath: rpath,
			node: current
		};

	path = path.split('/').reverse();
	while (path.length) {
		if (typeof current !== 'object')
			return null;
		current = current[path.pop()];
	}
	console.log(current);
	if (current === undefined || current._mode !== 'd')
		return null;
	return {
		realpath: rpath,
		node: current
	};
}
