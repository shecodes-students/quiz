map2 = function(a, math) {
	var l = [];
	for (var i=0; i< a.length; i++) {
		 l.push(math(a[i]));
	} 
	return l;
};





var l = map2([1,2,3], function(x) {return x*x;});
console.log(l); // ==> [1, 4, 9]
