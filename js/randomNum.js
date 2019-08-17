var mycars = [1,2,3,4,5,6,7,8,9,0];
mycars.sort(function(a, b){   
	return 0.5 - Math.random()
});

let arr = []            
while(mycars.length) {
	arr.push(mycars.splice(parseInt(Math.random() * mycars.length), 1)[0]);
}
