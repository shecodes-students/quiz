// jshint -W060
var fs = require('fs');
var renderer = require("./renderer");
var markdown = fs.readFileSync('question.md', 'utf-8');
var Document = require('stringdom');
var Entities = require('html-entities').XmlEntities;
var entities = new Entities;

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
	button.setAttribute('onclick', '(' + onSubmitButtonClicked.toString() + ')(event, ' + entities.encode(JSON.stringify(answerOptions)) + ');');
	question.appendChild(button);
});


function onSubmitButtonClicked(event, answerOptions) {
	console.log(arguments);
	var questionId = event.target.getAttribute('data-question');
    var question = document.querySelector('#Question'+questionId);
    console.log('question', question);
    var answers = question.querySelectorAll('input[type=checkbox]');
    answers = [].slice.call(answers);
    console.log('answers', answers);
    answers.forEach(function(answer) {
        console.log('a',answer);
        var id = answer.getAttribute('id');
        if (answerOptions[id] === answer.checked) {
            answer.parentElement.style.backgroundColor= 'green';
        } else {
            answer.parentElement.style.backgroundColor= 'red';
        }
    });
	console.log('Submit button:', questionId, answerOptions);
}

//console.log(doc.documentElement.innerHTML);
document.body.innerHTML = doc.documentElement.innerHTML;
