programs.lp = (function (window) {

function init(argc, argv) {}
function main(argc, argv)
{
	var filename = argv[1],
	    file = fopen(file),
	    lp = fopen('/dev/lp'),
	    printdata = JSON.stringify({
	    	wd: env.wd,
	    	argv: argv
	    });

	fwrite(fread(file), lp);

	if (file && file.node._mode === 'f') {
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
	} else if (file && file.node._mode === 'd') {
		puts('lp: No file in print request.');
	} else {
		puts('lp: Error - unable to access "' + 
			file + 
			'" - No such file or directory');
	}
	return 0;
}
function kill(argc, argv) {}

return {
	help: 'print files',
	init: init, main: main, kill: kill
};
})(window);
