var fs = require('fs');
var renderer = require("./renderer");
var markdown = fs.readFileSync('question.md', 'utf-8');

var answerOptions = {};
function collectAnswerOptions (id, trueorfalse) {
    answerOptions[id] = trueorfalse;
    console.log(answerOptions);
    return;
}

var html = renderer(markdown, collectAnswerOptions);
document.body.innerHTML = html;
