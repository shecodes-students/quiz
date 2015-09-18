var test = require("tape");
var renderer = require("../renderer");
var opts = {
    getId: function() {
        return "42";
    }
};
test("should convert [x] to an checked HTML checkbox element", function(t){
	var html = renderer('- [x] hello', function(){}, opts).replace(/\n/g, '');
	t.equal(html, '<ul><li><input id="42" type="checkbox"> hello</li></ul>');
	t.end();
});
test("should convert [ ] to an unchecked HTML checkbox element", function(t){
	var html = renderer('- [ ] hello', function(){}, opts).replace(/\n/g, '');
	t.equal(html, '<ul><li><input id="42" type="checkbox"> hello</li></ul>');
	t.end();
});

test("should call onAnswerOption with question id and its correctness", function(t){
	renderer('- [ ] hello', function(id, correct){
        t.equal(id, "42");
        t.equal(correct, false);
        t.end();
    }, opts);
});
test("should call onAnswerOption with question id and its correctness", function(t){
	renderer('- [x] hello', function(id, correct){
        t.equal(id, "42");
        t.equal(correct,true);
        t.end();
    }, opts);
});
