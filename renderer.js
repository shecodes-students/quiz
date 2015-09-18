var uuid = require('uuid');
var md     = require('markdown-it');
var Plugin = require('markdown-it-regexp');

function makePlugin(onAnswerOption, opts) {
    opts = opts || {};
	return Plugin(
	  // regexp to match
	  /\[([\sx])\]/,

	  // this function will be called when something matches
	  function(match, utils) {
		var checked = match[1] === 'x';
		var id = opts.getId ? opts.getId() : uuid.v4();
        console.log(opts);
		onAnswerOption(id, checked);
		return '<input id="' + id + '" type="checkbox">';
	  }
	);
}

module.exports = function render(input, optionsHandler, opts) {
	return md()
		.use(makePlugin(optionsHandler, opts))
		.render(input);
};
