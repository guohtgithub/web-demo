/**
*	1、js基本数据类型：Undefined，Null，Boolean，Number，String，(ES6)symbol，（ES10）BigInt
* 栈内存中处理
* 基本类型的值在内存中占据着固定大小的空间，并被保存在栈内存中。
* 当一个变量向另一个变量复制基本类型的值，会创建这个值的副本，
* 并且我们不能给基本数据类型的值添加属性
* 2、js引用类型：Object
* 名（key）存在栈内存中，值（value）存在堆内存中，栈内存会提供一个引用的地址指向堆内存中的值
* 引用类型，它的值是对象，保存在堆内存中，包含引用类型值的变量实际上包含的不是对象本身
* 而是一个指向该对象的指针。从一个变量向另一个变量复制引用类型的值，复制的其实是指针地址而已，
* 因此两个变量最终都指向同一个对象
*/

var obj = {
	name:'guoht',
	age:29
}
var obj2 = obj
obj2['c'] = 3
console.log(obj) // {name:'guoht',age:29,c:3}
console.log(obj2) // {name:'guoht',age:29,c:3}

// 1、浅拷贝 
var arr = [1,2,3,4,5,6]
var arr2 = arr
arr2[1] = 'test'
console.log(arr) // [1,'test',3,4,5,6]
console.log(arr2) // [1,'test',3,4,5,6]

// 2 深拷贝
// 1）数组
// 对于数组我们可以使用slice() 和 concat() 方法来解决上面的问题

// slice arrayObj.slice(start,[end]) 该方法返回一个Array对象，
// 其中包含了arrayObj的指定部分，不会改变原数组
var arrCope = arr.slice(0)
arrCope[3] = 'guoht'
console.log(arr) // [1,'test',3,4,5,6]
console.log(arrCope) // [1,'test',3,'guoht',5,6]

// concat arrayObj.concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，
// 而仅仅会返回被连接数组的一个副本，concat() 不对对象的本身 prototype 复制操作
arrConcat = arr.concat()
arrConcat[2] = 'guozj'
console.log(arr) // [1,'test',3,4,5,6]
console.log(arrConcat) // [1,'test','guozj,4,5,6]

// for 循环 返回新数组
function deepCopyArr(arr1,arr2=[]){
	for(var i=0;i<arr1.length;i++){
		arr2[i] = arr1[i]
	}
	return arr2
}

let depcopy = deepCopyArr(arr)
depcopy[1] = 'xxl'
console.log(arr) // [1,'test',3,4,5,6]
console.log(depcopy) // [1,'xxl',2,3,4,5,6]

// 扩展运算符
let [...arrCopy] = arr
arrCopy[5] = 'arrCopy'
console.log(arr) // [1,'test',3,4,5,6]
console.log(arrCopy) // [1,'test',3,4,5,'arrCopy']

// Array.from 如果参数是一个真正的数组，Array.from 会返回一个一模一样的新数组
let arrFrom = Array.from(arr)
arrFrom[0] = 'arrFrom'
console.log(arr) // [1,'test',3,4,5,6]
console.log(arrFrom) // ['arrFrom','test',3,4,5,6]

// 2）对象
// 对象的深拷贝：定义一个新的对象，遍历原对象的属性 并 赋给新对象的属性
var newObj = new Object()
newObj.name = obj.name
newObj.age = obj.age

newObj.name = 'xxl'
console.log(obj) // {name:'guoht',age:29,c:3}
console.log(newObj) // {name:'xxl',age:29}

// for 循环 返回新对象
var deepCopeObj = function(obj){	
	var deepObj = {}
	for(var key in obj){
		if(typeof obj[key] === 'object'){ // N 级嵌套 回调deepVopyObj 方法
			deepObj[key] = deepCopeObj(obj[key]) // 
		}else{
			deepObj[key] = obj[key]
		}

		// deepObj[key] = typeof obj[key] === 'object' ? deepCopyObj(obj[key]) : obj[key]
	}
	return deepObj
}

var objCopy = deepCopeObj(obj)
objCopy.name = 'guozj'
console.log(obj) // {name:'guoht',age:29,c:3}
console.log(objCopy) // {name:'guozj',age:29,c:3}

// Obj JSON.stringif => JSON.parse 
let objJson = JSON.parse(JSON.stringify(obj))
objJson.age = 30
console.log(obj) // {name:'guoht',age:29,c:3}
console.log(objJson) // {name:'guoht',age:30,c:3}

// 扩展运算符
let {...objCopy1} = obj
objCopy1.c = 5
console.log(obj) // {name:'guoht',age:29,c:3}
console.log(objCopy1) // {name:'guoht',age:29,c:5}

// 合成版
function deepCopyObject(obj){
	let result = Array.isArray(obj)?[]:{}
	if(obj && typeof obj === 'object'){
		for(let key in obj){
			if(obj.hasOwnProperty(key)){
				if(obj[key] && typeof obj[key] === 'object'){
					result[key] = typeof obj[key] === 'object' ? deepCopyObject(obj[key]) : obj[key]
				}	
			}
		}
	}
	return result
}

// 注：ES6新增了Object.assign() 方法
// 第一个参数是目标对象，之后还可以跟一个或多个原对象。它会遍历一个或多个原对象
// 可枚举的自有键并把他们复制到目标对象，最后返回目标对象。assign是使用 = 操作符来赋值
// Object.assign() 只是一级属性复制，比浅拷贝多深拷贝了一层而已
// Object.assign() 更新新值，添加新属性，更新第一个参数的属性和值
// Object.assign() 对对象的本身的 prototype 不复制操作
let assignObj1 = {name:'guoht',age:29}
let assignObj2 = {name:'xxl',sex:'girls'}

let assignObj3 = Object.assign(assignObj1,assignObj2)

console.log(assignObj1) // {name:'xxl',age:29,sex:'girls'}
console.log(assignObj2) // {name:'xxl',sex:'girls'}
console.log(assignObj3) // {name:'xxl',age:29,sex:'girls'}

let Cobj = function(name){
	this.name = name
}
Cobj.prototype.getName = function(){
	console.log(this.name)
}
let assignObj4 = new Cobj('obj')
Object.assign(assignObj1,assignObj4)
console.log(assignObj1) // {name:'obj',age:29,sex:girls}
// assignObj1.getName() // error assignObj1.getName is not a function