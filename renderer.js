var uuid = require('uuid');
var md     = require('markdown-it');
var Plugin = require('markdown-it-regexp');
var container = require('markdown-it-container');

function makePlugin(onAnswerOption, opts) {
    opts = opts || {};
	return Plugin(
	  // regexp to match
	  /\[([\sx])\]/,

	  // this function will be called when something matches
	  function(match, utils) {
		var checked = match[1] === 'x';
		var id = opts.getId ? opts.getId() : uuid.v4();
		onAnswerOption(id, checked);
		return '<input id="' + id + '" type="checkbox">';
	  }
	);
}

module.exports = function render(input, optionsHandler, opts) {
	return md({html: true})
		.use(makePlugin(optionsHandler, opts))
        .use(container, "question")
		.render(input);
};
