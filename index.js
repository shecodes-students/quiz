// jshint -W060
var fs = require('fs');
var renderer = require("./renderer");
var markdown = fs.readFileSync('question.md', 'utf-8');
var Document = require('stringdom');

var answerOptions = {};
function collectAnswerOptions (id, trueorfalse) {
    answerOptions[id] = trueorfalse;
    console.log(answerOptions);
    return;
}

function addClass(el, cl) {
	var classes = (el.getAttribute('class') || "").split(' ');
	classes.push(cl);
	el.setAttribute('class', classes.join(' '));
}

var html = renderer(markdown, collectAnswerOptions);

var doc = new Document();
doc.write(html);
var questions = doc.querySelectorAll('section.quiz>ol>li');
questions.forEach(function(question, i) {
	question.setAttribute('id', 'Question' + i);
	addClass(question, 'question');
	var button = doc.createElement('button');
	button.setAttribute('data-question', i);
	button.textContent = 'Submit';
	button.setAttribute('onclick', '(' + onSubmitButtonClicked.toString() + ')(event);');
	question.appendChild(button);
});


function onSubmitButtonClicked(event) {
	console.log(arguments);
	var questionId = event.target.getAttribute('data-question');
	console.log('Submit button:', questionId);
}

//console.log(doc.documentElement.innerHTML);
document.body.innerHTML = doc.documentElement.innerHTML;
