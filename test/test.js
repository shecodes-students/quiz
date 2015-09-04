var test = require("tape");
var renderer = require("../renderer");

test("should convert [x] to an checked HTML checkbox element", function(t){
	var html = renderer('- [x] hello').replace(/\n/g, '');	
	t.equal(html, '<ul><li><input type="checkbox" checked> hello</li></ul>');
	t.end();
});
test("should convert [ ] to an unchecked HTML checkbox element", function(t){
	var html = renderer('- [ ] hello').replace(/\n/g, '');	
	t.equal(html, '<ul><li><input type="checkbox"> hello</li></ul>');
	t.end();
});
