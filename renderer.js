var uuid = require('uuid');
var md     = require('markdown-it');
var Plugin = require('markdown-it-regexp');

function makePlugin(onAnswerOption) {
	return Plugin(
	  // regexp to match
	  /\[([\sx])\]/,

	  // this function will be called when something matches
	  function(match, utils) {
		var checked = match[1] === 'x';
		var id = uuid.v4();
		onAnswerOption(id, checked);
		return '<input id="' + id + '" type="checkbox">';
	  }
	);
}

module.exports = function render(input, optionsHandler) {
	return md()
		.use(makePlugin(optionsHandler))
		.render(input);
};
