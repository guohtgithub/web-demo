var message:string = 'Hello World!'
console.log(message)

class Sites {
	name():void{
		console.log("Guoht")
	}
}
var obj = new Sites()
obj.name()

var uname:string = 'guoht'
var score1:number = 70
var score2:number = 75.9
var sum = score1 + score2
console.log("名字：" + uname)
console.log('第一科分数：'+ score1)
console.log('第二科分数：'+ score2)
console.log('总分数：'+ sum)

var global_num = 12
class Numbers {
	num_val = 13
	static sval = 10

	storeNum():void{
		var local_num = 14
	}
}

console.log('全局变量为：' + global_num)
console.log(Numbers.sval,'静态变量')
var nums = new Numbers();
console.log(nums.num_val,'类变量')

var num1:number = 10
var num2:number = 12
var res:number = 0
res = num1 + num2
console.log('加：  ' + res)

res = num1 - num2
console.log('减：  ' + res)

res = num1 * num2
console.log('乘：  ' + res)

res = num1 / num2
console.log('除：  ' + res)

res = num1 % num2
console.log('取余：  ' + res)

num1++
console.log('自增：  '+num1)

num2--
console.log('自增：  '+num2)

var res2 = num1 > num2
console.log('num1 > num2: ' + res2)

var res2 = num1 >= num2
console.log('num1 >= num2: ' + res2)

var res2 = num1 < num2
console.log('num1 < num2: ' + res2)

var res2 = num1 <= num2
console.log('num1 <= num2: ' + res2)

var res2 = num1 == num2
console.log('num1 == num2: ' + res2)

var res2 = num1 != num2
console.log('num1 != num2: ' + res2)

var avg:number = 20
var percentage:number = 90
console.log('avg 值为：' +avg + ', percnetage 值为：'+percentage)

var flag:boolean = (avg>50) && (percentage > 80)
console.log(flag,'boolean')

flag = (avg<50) || (percentage > 80)
console.log(flag,'boolean')

flag = !((avg<50) || (percentage > 80))
console.log(flag,'boolean')

var  num3:number = -3
var result = num3 > 0 ? '大于0' : '小于 0，或等于 0'
console.log(result,'三元运算符（？）')

console.log(typeof num1,'类型运算符')

if(num3 < 0){
	console.log('负数')
}

if(avg % 2){
	console.log('偶数')
}else{
	console.log('奇数')
}

let someArray = [1,'string',false]
for(let entry of someArray){
	console.log(entry,'somearry 子元素')
}

let list = [1,2,3,4]
list.forEach((val,idx,array) =>{
	console.log(val,idx,array,'forEach')
})

list.every((val,index,array) =>{
	console.log(val,index,'every')
	return true
})

var num4:number = 5
var factorial:number = 1
while(num4>=1){
	factorial *= num4
	num4--;
}
console.log(factorial,"----")

// do...while 会在条件
var n = 10;
do{
	console.log(n)
	n--
}while(n >= 0)

var i:number = 1
while(i <= 10){
	if(i % 5 == 0){
		console.log('在1 ~ 10 之间第一个被 5 整除的数为：' + i)
		break
	}
	i++
}

var j = 0
var count = 0
for(j=0;j<=20;j++){
	if(j % 2 ==0){
		continue
	}
	count ++ 
}
console.log('0 ~ 20 之间的偶数个数为：' + count)

// Function
function fn(){
	console.log('调用函数')
}
fn()

function test():string{
	return 'Hello World!'
}

function caller(){
	var msg = test()
	console.log(msg)
}
caller()

function add(x:number,y:number){
	return x + y;
}
console.log(add(1,3))

function build(firstName:string,lastName?:string){
	return firstName + " " + lastName
}
let result1 = build('guoht');
let result2 = build('guoht','xiongxl');
// let result3 = build('djsk','dkdkdk','kdjdjd') // 报错

function calculate(price:number,rate:number = 0.5){
	var discount = price *  rate
	console.log('计算结果：'+ discount)
}
calculate(1000)
calculate(1000,0.8)

function fullStr(str:string,...otherStr:string[]){
	return str + ' ' + otherStr.join(' ');
}
let fullstr = fullStr('jsjdk','dddd','jdjdk','dpod')
console.log(fullstr,'string.join')

function addNums(...num:number[]){
	var i
	var sum:number = 0;
	for (i=0;i<num.length;i++){
		sum = sum + num[i]
	}
	console.log('和为：' + sum)
}
addNums(1,2,3)
addNums(1,2,3,4,5,6)

var fns = function (){
	return 'hello world';
}
console.log(fns(),'匿名函数')

var resFn = function(a:number,b:number){
	return a * b;
}
console.log(resFn(2,5));

(function(){
	var x = 'hello!'
	console.log(x)
})()

var myFn = new Function("a","b","return a* b")
var x = myFn(4,6)
console.log(x,'0000')

function factorialNum(number){
	if(number <= 0){
		return 1;
	}else {
		return (number * factorialNum(number -1))
	}
}
console.log(factorialNum(6),'递归')

var foo = (x:number) => 10 + x
console.log(foo(30),'Lambda')

var func = (x) =>{
	if(typeof x == 'number'){
		console.log(x + ' 是一个数字')
	}else if(typeof x == 'string'){
		console.log(x + ' 是一个字符串')
	}
}
func(12);
func('fff')

var display = x => {
	console.log('输出为：'+ x);
}
display(333)

var disp = () => {
	console.log('jdjdskksdkdkd');
}
disp()

function dispFn(s1:string):void;
function dispFn(n1:number,s1:string):void;
function dispFn(x:any,y?:any):void{
	console.log(x,'ssss---x')
	console.log(y,"djdjdjdj---y")
}
dispFn('aaa');
dispFn(1,'sjdjdj')

// Number
console.log('TypeScript Number 属性：')
console.log('最大值为：'+ Number.MAX_VALUE)
console.log('最小值为：'+ Number.MIN_VALUE)
console.log('负无穷大：'+ Number.NEGATIVE_INFINITY)
console.log('正无穷大：'+ Number.POSITIVE_INFINITY)

var month = 0;
if(month >=0 || month < 12){
	console.log('月份是：'+(month+1))
}else{
	month = Number.NaN
	console.log('请输入月份数值正确',month)
}

function employee(id:number,name:string){
	this.id = id;
	this.name = name
}
var emp = new employee(123,'admin');
employee.prototype.email = 'admin@guoht.com'
console.log('员工号：',emp.id)
console.log('员工姓名：',emp.name)
console.log('员工邮箱：',emp.email)

var numStr = 1225.890
var val = numStr.toExponential()
console.log(val,'toExponential')

console.log(numStr.toFixed(),'toFixed()')
console.log(numStr.toFixed(2),'toFixed(2)')

var numStr2 = new Number(100)
console.log(numStr2.toLocaleString(),'local')

console.log(numStr2.toPrecision(2),'toPrecision')

console.log(numStr2.toString(),'10进制')
console.log(numStr2.toString(2),'二进制')

console.log(numStr2.valueOf(),'valueOf')

// String
var txt = new String('txt')
// or 
// var txt = 'txt'

console.log('txt',txt.constructor)

console.log('length',txt.length)

var strfn = new String('guoht')
console.log('charAt() ',strfn.charAt(3))

console.log('charCodeAt() ', strfn.charCodeAt(3))

var str2 = txt.concat(strfn.toString());
console.log('concat ',str2)

console.log(str2.indexOf('guo'),'indexOf')

console.log(str2.lastIndexOf('txt'),'lastIndexOf')

var indexStr = str2.localeCompare('txtguoht')
console.log(indexStr,'localeCompare--')

var intement = 'The rain in SPAIN stays mainly in the plain'
var match = intement.match(/in/g) // array
console.log(match,'rez')

var re = /(\w+)\s(\w+)/
var infostr = 'zskdk dkdj'
var newstr = infostr.replace(re,'$2,$1')
console.log(newstr,'replace')

re = /apples/gi
var strre = 'Apples are round, and apples are juicy.'
if(strre.search(re) == -1){
	console.log('Does not contain Apples')
}else{
	console.log('Contains Apples')
}

var splitstr = strre.split(' ',4)
console.log(splitstr,'array')

var subStr = 'guoht guozj xiongxl'
console.log('1-3',subStr.substring(1,3))
console.log('3-7',subStr.substring(3,7))
console.log('3-end',subStr.substring(3))

console.log(strre.toLocaleLowerCase(),' local lower')

console.log(subStr.toLocaleUpperCase(),' local upper')

var txtinfo = 'Guoht'
console.log(txtinfo.toLowerCase(),' lower')
console.log(txtinfo.toUpperCase(),' upper')

console.log(txtinfo.toString(),' toString')
console.log(txtinfo.valueOf(),' valueOf')

//Array
var webName:string[];
webName = ['Google','Taobao','Sina','baidu']

var numlist:number[] = [1,2,3,4,5,6]
console.log(numlist[1])
console.log(numlist[4])

var arrNum:number[] = new Array(4)
for(var i=0;i<arrNum.length;i++){
	arrNum[i] = i * 2
	console.log(arrNum[i])
}

var newWeb:string[] = new Array('Google','Baidu','Taobao','JD','Fackbook')
for(var i=0;i<newWeb.length;i++){
	console.log(newWeb[i])
}
var arr:number[] = [12,34]
var [n1,n2] = arr
console.log(n1,'n1---')
console.log(n2,'n2---')

var j1:any
var numArr = [11,22,33,44]
for(j1 in numArr){
	console.log(numArr[j1])
}

var numArrs:number[][] = [[1,2,3],[4,5,6]]
console.log(numArrs[0][2],'0,2')
console.log(numArrs[1][0],'1,0')

function dispArr(arr:string[]){
	for(var i=0;i<arr.length;i++){
		console.log(arr[i]);
	}
}
dispArr(newWeb)

function retArr(arr:string[]){
	return arr;
}
var retarr = retArr(newWeb)
for(var k in retarr){
	console.log(retarr[k])
}

var alpha = ['a','b','c','d']
var numeric = [1,2,3]

var alphaNumeric = alpha.concat(numeric.toString())
console.log(alphaNumeric,' Array concat')

function isBig(elem,index,array){
	return (elem >= 10)
}
var passed:number[] = [12,3,44,5,33,2]
console.log(passed.every(isBig),'every array'); // 所有元素复合条件

console.log(passed.filter(isBig),'filter array')

passed.forEach(function(val){
	console.log(val,'forEach--')
})

console.log(passed.indexOf(3),' indexOf')

console.log(passed.join('---'),'join')

console.log(passed.lastIndexOf(2),'lastIndexOf')

console.log(passed.map(Math.sqrt),'map')

console.log(passed.pop(),'pop') // 删除最后一个

console.log(passed,'pop array')

console.log(passed.push(10),'push') // 返回 数组的新长度

console.log(passed.reduce(function(a,b){return a+b}),'reduce')

console.log(passed.reduceRight(function(a,b){return a+b}),'reduceRight')

console.log(passed.reverse(),'reverse')

console.log(passed.shift(),'shift') // 删除第一个

console.log(passed.slice(1,2),'slice') // 返回新数组

console.log(passed,'slice new array') 

console.log(passed.some(isBig),'some') // 某个值符合条件

console.log(passed.sort(),'sort array') // 数组排序

console.log(passed.splice(2,1,88),'splice')

console.log(passed,'splice after array')

console.log(passed.toString(),'tostring')

console.log(typeof passed.toString() ,'typeof after toString ')

console.log(typeof passed,passed,' after tostring')

console.log(passed.unshift(98,90,7),'unshift array') // 向数组开头添加元素，并返回新数组长度

// 元组
var myTuple = [1,'string']
console.log(myTuple[0],myTuple[1],'tuple')

console.log(myTuple.push(12),' tuple push new length') // 添加在最后面

console.log(myTuple.pop(),'delete last elem, and return the elem') 

myTuple[0] = 120
console.log(myTuple[0],'updata elem value')

var [num,str] = myTuple
console.log(num,str,'tuple elem')

// 联合类型 Union Types
var type:string|number
type = 12
console.log(type,'is number')
type = 'string'
console.log(type,'is string')

function dispType(name:string|string[]){
	if(typeof name == 'string'){
		console.log(name,'string type')
	}else{
		var i
		for(i=0;i<name.length;i++){
			console.log(name[i],'array string elem')
		}
	}
}

dispType('guoht')
dispType(['guoht','arr','xxl'])

var typeArr:number[]|string[]
var m:number
typeArr = [1,2,3]

for(m=0;m<typeArr.length;m++){
	console.log(typeArr[m],'for every elem number')
}

typeArr = ['guoht','xxl','guozj']
for(m=0;m<typeArr.length;m++){
	console.log(typeArr[m],'for every elem string')
}

// 接口 interface
interface Person{
	firstName:string,
	lastName:string,
	sayHi:()=>string
}

var customer:Person = {
	firstName:'guo',
	lastName:'ht',
	sayHi:():string =>{return 'Hi there!'}
}

console.log(customer.firstName)
console.log(customer.lastName)
console.log(customer.sayHi())

var employ:Person = {
	firstName:'Tom',
	lastName:'Black',
	sayHi:():string =>{return 'Hello'}
}
console.log(employ.firstName)
console.log(employ.lastName)
console.log(employ.sayHi)

interface runOpt{
	program:string,
	commandline:string[]|string|(()=>string)
}
var opt:runOpt = {
	program:'test',
	commandline:'hello'
}
console.log(opt.commandline)

opt = {
	program:'test2',
	commandline:['hello','guoht']
}
console.log(opt.program)
console.log(opt.commandline)

opt = {
	program:'test3',
	commandline:() => {
		return ' ** hello world **'
	}
}
console.log(opt.program)
var fnInter:any = opt.commandline
console.log(fnInter(),'fn')

interface namelist{
	[index:number]:string
}

var list2:namelist = ['john','tom','bran']
interface ages{
	[index:string]:number
}
var agelist:ages
// agelist['john'] = 15 node 运行不过

interface Father{
	age:number
}

interface Son extends Father{
	name:string
}

var drummer = <Son>{}

drummer.age = 2
drummer.name = 'guozj'

console.log('年龄：',drummer.age)
console.log('姓名：',drummer.name)

interface Iparent1{
	v1:number
}

interface Iparent2{
	v2:number
}

interface Child extends Iparent1,Iparent2{}
var Iobj:Child = {
	v1:12,v2:23
}
console.log('v1 value: ',Iobj.v1)
console.log('v2 value: ',Iobj.v2)

// class 类
class Car{
	engine:string
	constructor(engine:string){
		this.engine = engine
	}
	disp():void{
		console.log('engine ：',this.engine)
	}
}

var car = new Car('xxxx')
console.log(car.engine,'engine')
car.disp()

class Shape{
	Area:number
	constructor(a:number){
		this.Area = a * a
	}
}

class Circle extends Shape{
	disp():void{
		console.log('Circle Area:',this.Area)
	}
}

var circle = new Circle(12)
circle.disp()

class Root{
	str:string
}
class Childs extends Root{}
class Leaf  extends Childs{} // 多重继承，继承了Childs 和 Root 类

var leaf = new Leaf()
leaf.str = 'shoekdkdk'
console.log(leaf.str)

class PrinterClass{
	doPrint():void{
		console.log('father class doPrint function')
	}
}

class stringPrinter extends PrinterClass{
	doPrint():void{
		super.doPrint()
		console.log('son class doPrint function')
	}
}

var printfn = new stringPrinter()
printfn.doPrint()

class StaticStr{
	static num:number
	static disp():void{
		console.log('num value of :',StaticStr.num)
	}
}

StaticStr.num = 12
StaticStr.disp()

var inFnuction = printfn instanceof stringPrinter
console.log('printfn is object of stringPrinter',inFnuction)

class Encapsulate{
	str1:string = 'hello'
	private str2:string = 'world'
}

var encapsulate = new Encapsulate()
console.log(encapsulate.str1,' publice')
// console.log(encapsulate.str2,' private') // 私有属性只能在类中使用

interface Iloan{
	interest:number
}
class AgriLoan implements Iloan{
	interest:number
	rebate:number

	constructor(interest:number,rebate:number){
		this.interest = interest
		this.rebate = rebate
	}
}

var agriloan = new AgriLoan(10,1)
console.log('interest ',agriloan.interest)
console.log('rebate ',agriloan.rebate)

// Object 对象
var object = {
	key1:'value1',
	key2:'value2',
	key3:() =>{
		console.log('function')
	},
	key4:['array']
}

console.log(object.key1,object.key4)

let objFn = object.key3
objFn()

var siteObj = {
	site1:'jdjd',
	site2:'skdkdk',
	sayHi:() => {} // 必须添加类型模板
}
siteObj.sayHi = () =>{
	console.log('jdjdksk---',siteObj.site1)
}

siteObj.sayHi()

var invokesites = function(obj:{site1:string,site2:string}){
	console.log('site1:',obj.site1)
	console.log('site2:',obj.site2)	
}

invokesites(siteObj)

interface Ipoint{
	x:number
	y:number
}

function addPoint(p1:Ipoint,p2:Ipoint):Ipoint{
	var x = p1.x + p2.x
	var y = p1.y + p2.y
	return {x:x,y:y}
}

var newPoint = addPoint({x:3,y:4},{x:4,y:9})
console.log(newPoint,'new Point')

namespace ANameSpace{
	export interface AInterface{
		draw()
	}
	export class AClassName implements AInterface{
		public draw(){
			console.log('AClass of draw')
		}
	}

	export class BClassName implements AInterface{
		public draw(){
			console.log('Bclass of draw')
		}
	}
}

function drawAll(space:ANameSpace.AInterface){
	space.draw()
}
drawAll(new ANameSpace.AClassName())
drawAll(new ANameSpace.BClassName())

namespace Guoht{
	export namespace Guozj{
		export class Xxl{
			public claculateDiscount(price:number){
				return price * 0.4
			}
		}
	}
}

var guoht = new Guoht.Guozj.Xxl()
console.log(guoht.claculateDiscount(400))

// 声明文件
var Runoob
(function(Runoob){
	var cale = (function(){
		function cale(){
		}
	})
	cale.prototype.doSum = function(limit){
		var sum = 0;
		for(var i=0;i<limit;i++){
			sum += i
		}
		return sum
	}
	Runoob.cale = cale
	return cale
})(Runoob || (Runoob={}))

// declare module Runoob{
// 	export class cale{
// 		doSum(limit:number):number
// 	}
// }

var test1 = new Runoob.cale()

console.log(test1.doSum(10),'sum ')