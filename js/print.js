'use strict';

var env = {
	get: function(key) {
		return JSON.parse(localStorage.getItem(key));
	},
	set: function(key, value) {
		return localStorage.setItem(key, JSON.stringify(value));
	},
	process: ['login'],
	stdin: '',
	stdout: '',
	wd: '/',
	whoami: {},
	puts: false
};
var fs = env.get('fs');

window.onload = function() {
	var paper = document.getElementById('paper'),
	    lp = fopen('/dev/lp');

	console.log(lp.node.content);
	paper.innerHTML = fread(lp);
	console.log(lp.node.content);
//	stream.node.content = '';
//	env.set('fs', fs);
/*
	    data = location.hash.substr(1);
	fsinit();
	console.log(data);
	data = JSON.parse(atob(data));
	console.log(data);

	var reader = new commonmark.Parser();
	var writer = new commonmark.HtmlRenderer();
	var parsed = reader.parse(fread(data.wd+data.argv[1]));
	paper.innerHTML = writer.render(parsed);
*/

	//paper.innerHTML = fread(data.wd+data.argv[1]);
	window.print();
	window.parent.clearstream('lp');
	//paper.innerHTML = location.hash;
};
