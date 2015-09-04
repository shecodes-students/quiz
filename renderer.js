var md     = require('markdown-it');
var Plugin = require('markdown-it-regexp');

var plugin = Plugin(
  // regexp to match
  /\[([\sx])\]/,

  // this function will be called when something matches
  function(match, utils) {
	var checked = match[1] === 'x';
	return '<input type="checkbox"' + (checked ? ' checked' : '')  + '>';
  }
);

module.exports = function(input) {
	return md()
		.use(plugin)
		.render(input);
};
