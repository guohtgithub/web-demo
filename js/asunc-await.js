// async
async function timeout(flag){
	if(flag){
		return 'hello world';
	}else{	
		return 'my god,failure';
	}
}



timeout(true).then(result =>{
	console.log(result)
});
timeout(false).catch(err =>{
	console.log(err)
});
console.log('1111')

//await
function twosecondsLater(num){
	return new Promise((resolve,reject) =>{
		setTimeout(() =>{
			resolve(2*num)
			// console.log(2*num)
		},2000)
	})
}

async function restResult(){
	// let now = new Date()
	let result = await twosecondsLater(30);
	console.log('1111')
	let result2 = await twosecondsLater(50);
	console.log('11112')
	let result3 = await twosecondsLater(40);
	console.log(result,result2,result3);
	console.log('11112')
	// let now2 = new Date()
	// let countTime = now2.getTime() - now.getTime()
	// console.log(countTime,'000')

}

restResult();
console.log('-----------------------')
let now = new Date()

const fs = require('fs')
fs.readFile('1.txt','utf8',(err,data) =>{
	let now2 = new Date()
	let countTime = now2.getTime() - now.getTime()
	console.log(countTime,'1')
	console.log(data)
})

fs.readFile('2.txt','utf8',(err,data) =>{
	let now2 = new Date()
	let countTime = now2.getTime() - now.getTime()
	console.log(countTime,'2')
	console.log(data)
})

fs.readFile('3.txt','utf8',(err,data) =>{
	let now2 = new Date()
	let countTime = now2.getTime() - now.getTime()
	console.log(countTime,'3')
	console.log(data)
})

let now3 = new Date()
let countTime2 = now3.getTime() - now.getTime()
console.log(countTime2,'now3')

let doubleAfter2seconds = num => {
	return new Promise((resolve,reject) => {
		setTimeout(() => {
			resolve(2 * num)
		},2000)
	})
}

async function timeouts(){
	let result = await doubleAfter2seconds(30);
	return result;
}

timeouts().then(result => {
	console.log(result,'result2seconds')
})
console.log('async await')