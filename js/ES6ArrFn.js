let numbers = [1,2,3,4,5]

// forEach()
numbers.forEach(number => {
	console.log(number) // 1,2,3,4,5
})

let sum = 0
let add = (num) => {
	sum += num
}
numbers.forEach(add)
console.log('add',sum)

// map()
let doublenumbers = numbers.map(number => {
	return number * 2
})
console.log(doublenumbers,'newArr')

let building = [
	{name:'the Great Wall',location:'BeiJing'},
	{name:'Eiffel Tower',location:'Paris'}
]
let citys = building.map(item => {
	return item.location
})
console.log(citys,'city')

// filter()
let products = [
	{name:'cucumber',type:'vegetable'},
	{name:'banana',type:'fruit'},
	{name:'celery',type:'vegetable'},
	{name:'orange',type:'fruit'}
]
let filtered = products.filter(product => {
	return product.type === 'vegetable'
})
console.log(filtered,'filter')

let post = {id:4,title:'JavaScript'}
let comments = [
	{postId:4,content:'Angular4'},
	{postId:2,content:'Vue.js'},
	{postId:3,content:'Node.js'},
	{postId:4,content:'React.js'}
]
function commentsForPost(post,comments){
	return comments.filter(comment => {
		return comment.postId == post.id
	})
}
console.log(commentsForPost(post,comments),'filter-2')

//find()
let users = [
	{name:'Jill',id:1,age:10},
	{name:'Alex',id:2,age:18},
	{name:'Bill',id:3,age:20},
	{name:'Alex',id:4,age:24}
]

let user = users.find( user => {
	return user.name == 'Alex'
})
console.log(user,'find')

function userForPost(post,comments){
	return comments.find(comment => {
		return comment.postId == post.id
	})
}
console.log(userForPost(post,comments),'find post')

// every() some()
let isAdult_every = users.every(user => {
	return user.age > 18
})
console.log(isAdult_every,'every')

let isAdult_some = users.some(user => {
	return user.age > 18
}) 
console.log(isAdult_some,'some')

let sumValue = numbers.reduce((sum,number) => {
	return sum + number
},0)
console.log(sumValue,'reduce--')

let goodList = [
	{id:1,price:10,qty:5},
	{id:2,price:15,qty:2},
	{id:3,price:30,qty:4}
]
let totalPrice = goodList.reduce((prev,cur) => {
	return prev + cur.price * cur.qty
},0)

console.log(totalPrice,'totalPrice')

let strCode = 'ababsjdjwjwjsjd'
let countCode = strCode.split('').reduce((res,cur) => {
	res[cur] ? res[cur]++ : res[cur] = 1
	return res
},{})
console.log(countCode)