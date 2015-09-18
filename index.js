var fs = require('fs');
var renderer = require("./renderer");
var markdown = fs.readFileSync('question.md', 'utf-8');
var html = renderer(markdown);

document.body.innerHTML = html;
