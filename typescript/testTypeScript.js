var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var message = 'Hello World!';
console.log(message);
var Sites = /** @class */ (function () {
    function Sites() {
    }
    Sites.prototype.name = function () {
        console.log("Guoht");
    };
    return Sites;
}());
var obj = new Sites();
obj.name();
var uname = 'guoht';
var score1 = 70;
var score2 = 75.9;
var sum = score1 + score2;
console.log("名字：" + uname);
console.log('第一科分数：' + score1);
console.log('第二科分数：' + score2);
console.log('总分数：' + sum);
var global_num = 12;
var Numbers = /** @class */ (function () {
    function Numbers() {
        this.num_val = 13;
    }
    Numbers.prototype.storeNum = function () {
        var local_num = 14;
    };
    Numbers.sval = 10;
    return Numbers;
}());
console.log('全局变量为：' + global_num);
console.log(Numbers.sval, '静态变量');
var nums = new Numbers();
console.log(nums.num_val, '类变量');
var num1 = 10;
var num2 = 12;
var res = 0;
res = num1 + num2;
console.log('加：  ' + res);
res = num1 - num2;
console.log('减：  ' + res);
res = num1 * num2;
console.log('乘：  ' + res);
res = num1 / num2;
console.log('除：  ' + res);
res = num1 % num2;
console.log('取余：  ' + res);
num1++;
console.log('自增：  ' + num1);
num2--;
console.log('自增：  ' + num2);
var res2 = num1 > num2;
console.log('num1 > num2: ' + res2);
var res2 = num1 >= num2;
console.log('num1 >= num2: ' + res2);
var res2 = num1 < num2;
console.log('num1 < num2: ' + res2);
var res2 = num1 <= num2;
console.log('num1 <= num2: ' + res2);
var res2 = num1 == num2;
console.log('num1 == num2: ' + res2);
var res2 = num1 != num2;
console.log('num1 != num2: ' + res2);
var avg = 20;
var percentage = 90;
console.log('avg 值为：' + avg + ', percnetage 值为：' + percentage);
var flag = (avg > 50) && (percentage > 80);
console.log(flag, 'boolean');
flag = (avg < 50) || (percentage > 80);
console.log(flag, 'boolean');
flag = !((avg < 50) || (percentage > 80));
console.log(flag, 'boolean');
var num3 = -3;
var result = num3 > 0 ? '大于0' : '小于 0，或等于 0';
console.log(result, '三元运算符（？）');
console.log(typeof num1, '类型运算符');
if (num3 < 0) {
    console.log('负数');
}
if (avg % 2) {
    console.log('偶数');
}
else {
    console.log('奇数');
}
var someArray = [1, 'string', false];
for (var _i = 0, someArray_1 = someArray; _i < someArray_1.length; _i++) {
    var entry = someArray_1[_i];
    console.log(entry, 'somearry 子元素');
}
var list = [1, 2, 3, 4];
list.forEach(function (val, idx, array) {
    console.log(val, idx, array, 'forEach');
});
list.every(function (val, index, array) {
    console.log(val, index, 'every');
    return true;
});
var num4 = 5;
var factorial = 1;
while (num4 >= 1) {
    factorial *= num4;
    num4--;
}
console.log(factorial, "----");
// do...while 会在条件
var n = 10;
do {
    console.log(n);
    n--;
} while (n >= 0);
var i = 1;
while (i <= 10) {
    if (i % 5 == 0) {
        console.log('在1 ~ 10 之间第一个被 5 整除的数为：' + i);
        break;
    }
    i++;
}
var j = 0;
var count = 0;
for (j = 0; j <= 20; j++) {
    if (j % 2 == 0) {
        continue;
    }
    count++;
}
console.log('0 ~ 20 之间的偶数个数为：' + count);
// Function
function fn() {
    console.log('调用函数');
}
fn();
function test() {
    return 'Hello World!';
}
function caller() {
    var msg = test();
    console.log(msg);
}
caller();
function add(x, y) {
    return x + y;
}
console.log(add(1, 3));
function build(firstName, lastName) {
    return firstName + " " + lastName;
}
var result1 = build('guoht');
var result2 = build('guoht', 'xiongxl');
// let result3 = build('djsk','dkdkdk','kdjdjd') // 报错
function calculate(price, rate) {
    if (rate === void 0) { rate = 0.5; }
    var discount = price * rate;
    console.log('计算结果：' + discount);
}
calculate(1000);
calculate(1000, 0.8);
function fullStr(str) {
    var otherStr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherStr[_i - 1] = arguments[_i];
    }
    return str + ' ' + otherStr.join(' ');
}
var fullstr = fullStr('jsjdk', 'dddd', 'jdjdk', 'dpod');
console.log(fullstr, 'string.join');
function addNums() {
    var num = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        num[_i] = arguments[_i];
    }
    var i;
    var sum = 0;
    for (i = 0; i < num.length; i++) {
        sum = sum + num[i];
    }
    console.log('和为：' + sum);
}
addNums(1, 2, 3);
addNums(1, 2, 3, 4, 5, 6);
var fns = function () {
    return 'hello world';
};
console.log(fns(), '匿名函数');
var resFn = function (a, b) {
    return a * b;
};
console.log(resFn(2, 5));
(function () {
    var x = 'hello!';
    console.log(x);
})();
var myFn = new Function("a", "b", "return a* b");
var x = myFn(4, 6);
console.log(x, '0000');
function factorialNum(number) {
    if (number <= 0) {
        return 1;
    }
    else {
        return (number * factorialNum(number - 1));
    }
}
console.log(factorialNum(6), '递归');
var foo = function (x) { return 10 + x; };
console.log(foo(30), 'Lambda');
var func = function (x) {
    if (typeof x == 'number') {
        console.log(x + ' 是一个数字');
    }
    else if (typeof x == 'string') {
        console.log(x + ' 是一个字符串');
    }
};
func(12);
func('fff');
var display = function (x) {
    console.log('输出为：' + x);
};
display(333);
var disp = function () {
    console.log('jdjdskksdkdkd');
};
disp();
function dispFn(x, y) {
    console.log(x, 'ssss---x');
    console.log(y, "djdjdjdj---y");
}
dispFn('aaa');
dispFn(1, 'sjdjdj');
// Number
console.log('TypeScript Number 属性：');
console.log('最大值为：' + Number.MAX_VALUE);
console.log('最小值为：' + Number.MIN_VALUE);
console.log('负无穷大：' + Number.NEGATIVE_INFINITY);
console.log('正无穷大：' + Number.POSITIVE_INFINITY);
var month = 0;
if (month >= 0 || month < 12) {
    console.log('月份是：' + (month + 1));
}
else {
    month = Number.NaN;
    console.log('请输入月份数值正确', month);
}
function employee(id, name) {
    this.id = id;
    this.name = name;
}
var emp = new employee(123, 'admin');
employee.prototype.email = 'admin@guoht.com';
console.log('员工号：', emp.id);
console.log('员工姓名：', emp.name);
console.log('员工邮箱：', emp.email);
var numStr = 1225.890;
var val = numStr.toExponential();
console.log(val, 'toExponential');
console.log(numStr.toFixed(), 'toFixed()');
console.log(numStr.toFixed(2), 'toFixed(2)');
var numStr2 = new Number(100);
console.log(numStr2.toLocaleString(), 'local');
console.log(numStr2.toPrecision(2), 'toPrecision');
console.log(numStr2.toString(), '10进制');
console.log(numStr2.toString(2), '二进制');
console.log(numStr2.valueOf(), 'valueOf');
// String
var txt = new String('txt');
// or 
// var txt = 'txt'
console.log('txt', txt.constructor);
console.log('length', txt.length);
var strfn = new String('guoht');
console.log('charAt() ', strfn.charAt(3));
console.log('charCodeAt() ', strfn.charCodeAt(3));
var str2 = txt.concat(strfn.toString());
console.log('concat ', str2);
console.log(str2.indexOf('guo'), 'indexOf');
console.log(str2.lastIndexOf('txt'), 'lastIndexOf');
var indexStr = str2.localeCompare('txtguoht');
console.log(indexStr, 'localeCompare--');
var intement = 'The rain in SPAIN stays mainly in the plain';
var match = intement.match(/in/g); // array
console.log(match, 'rez');
var re = /(\w+)\s(\w+)/;
var infostr = 'zskdk dkdj';
var newstr = infostr.replace(re, '$2,$1');
console.log(newstr, 'replace');
re = /apples/gi;
var strre = 'Apples are round, and apples are juicy.';
if (strre.search(re) == -1) {
    console.log('Does not contain Apples');
}
else {
    console.log('Contains Apples');
}
var splitstr = strre.split(' ', 4);
console.log(splitstr, 'array');
var subStr = 'guoht guozj xiongxl';
console.log('1-3', subStr.substring(1, 3));
console.log('3-7', subStr.substring(3, 7));
console.log('3-end', subStr.substring(3));
console.log(strre.toLocaleLowerCase(), ' local lower');
console.log(subStr.toLocaleUpperCase(), ' local upper');
var txtinfo = 'Guoht';
console.log(txtinfo.toLowerCase(), ' lower');
console.log(txtinfo.toUpperCase(), ' upper');
console.log(txtinfo.toString(), ' toString');
console.log(txtinfo.valueOf(), ' valueOf');
//Array
var webName;
webName = ['Google', 'Taobao', 'Sina', 'baidu'];
var numlist = [1, 2, 3, 4, 5, 6];
console.log(numlist[1]);
console.log(numlist[4]);
var arrNum = new Array(4);
for (var i = 0; i < arrNum.length; i++) {
    arrNum[i] = i * 2;
    console.log(arrNum[i]);
}
var newWeb = new Array('Google', 'Baidu', 'Taobao', 'JD', 'Fackbook');
for (var i = 0; i < newWeb.length; i++) {
    console.log(newWeb[i]);
}
var arr = [12, 34];
var n1 = arr[0], n2 = arr[1];
console.log(n1, 'n1---');
console.log(n2, 'n2---');
var j1;
var numArr = [11, 22, 33, 44];
for (j1 in numArr) {
    console.log(numArr[j1]);
}
var numArrs = [[1, 2, 3], [4, 5, 6]];
console.log(numArrs[0][2], '0,2');
console.log(numArrs[1][0], '1,0');
function dispArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
dispArr(newWeb);
function retArr(arr) {
    return arr;
}
var retarr = retArr(newWeb);
for (var k in retarr) {
    console.log(retarr[k]);
}
var alpha = ['a', 'b', 'c', 'd'];
var numeric = [1, 2, 3];
var alphaNumeric = alpha.concat(numeric.toString());
console.log(alphaNumeric, ' Array concat');
function isBig(elem, index, array) {
    return (elem >= 10);
}
var passed = [12, 3, 44, 5, 33, 2];
console.log(passed.every(isBig), 'every array'); // 所有元素复合条件
console.log(passed.filter(isBig), 'filter array');
passed.forEach(function (val) {
    console.log(val, 'forEach--');
});
console.log(passed.indexOf(3), ' indexOf');
console.log(passed.join('---'), 'join');
console.log(passed.lastIndexOf(2), 'lastIndexOf');
console.log(passed.map(Math.sqrt), 'map');
console.log(passed.pop(), 'pop'); // 删除最后一个
console.log(passed, 'pop array');
console.log(passed.push(10), 'push'); // 返回 数组的新长度
console.log(passed.reduce(function (a, b) { return a + b; }), 'reduce');
console.log(passed.reduceRight(function (a, b) { return a + b; }), 'reduceRight');
console.log(passed.reverse(), 'reverse');
console.log(passed.shift(), 'shift'); // 删除第一个
console.log(passed.slice(1, 2), 'slice'); // 返回新数组
console.log(passed, 'slice new array');
console.log(passed.some(isBig), 'some'); // 某个值符合条件
console.log(passed.sort(), 'sort array'); // 数组排序
console.log(passed.splice(2, 1, 88), 'splice');
console.log(passed, 'splice after array');
console.log(passed.toString(), 'tostring');
console.log(typeof passed.toString(), 'typeof after toString ');
console.log(typeof passed, passed, ' after tostring');
console.log(passed.unshift(98, 90, 7), 'unshift array'); // 向数组开头添加元素，并返回新数组长度
// 元组
var myTuple = [1, 'string'];
console.log(myTuple[0], myTuple[1], 'tuple');
console.log(myTuple.push(12), ' tuple push new length'); // 添加在最后面
console.log(myTuple.pop(), 'delete last elem, and return the elem');
myTuple[0] = 120;
console.log(myTuple[0], 'updata elem value');
var num = myTuple[0], str = myTuple[1];
console.log(num, str, 'tuple elem');
// 联合类型 Union Types
var type;
type = 12;
console.log(type, 'is number');
type = 'string';
console.log(type, 'is string');
function dispType(name) {
    if (typeof name == 'string') {
        console.log(name, 'string type');
    }
    else {
        var i;
        for (i = 0; i < name.length; i++) {
            console.log(name[i], 'array string elem');
        }
    }
}
dispType('guoht');
dispType(['guoht', 'arr', 'xxl']);
var typeArr;
var m;
typeArr = [1, 2, 3];
for (m = 0; m < typeArr.length; m++) {
    console.log(typeArr[m], 'for every elem number');
}
typeArr = ['guoht', 'xxl', 'guozj'];
for (m = 0; m < typeArr.length; m++) {
    console.log(typeArr[m], 'for every elem string');
}
var customer = {
    firstName: 'guo',
    lastName: 'ht',
    sayHi: function () { return 'Hi there!'; }
};
console.log(customer.firstName);
console.log(customer.lastName);
console.log(customer.sayHi());
var employ = {
    firstName: 'Tom',
    lastName: 'Black',
    sayHi: function () { return 'Hello'; }
};
console.log(employ.firstName);
console.log(employ.lastName);
console.log(employ.sayHi);
var opt = {
    program: 'test',
    commandline: 'hello'
};
console.log(opt.commandline);
opt = {
    program: 'test2',
    commandline: ['hello', 'guoht']
};
console.log(opt.program);
console.log(opt.commandline);
opt = {
    program: 'test3',
    commandline: function () {
        return ' ** hello world **';
    }
};
console.log(opt.program);
var fnInter = opt.commandline;
console.log(fnInter(), 'fn');
var list2 = ['john', 'tom', 'bran'];
var agelist;
var drummer = {};
drummer.age = 2;
drummer.name = 'guozj';
console.log('年龄：', drummer.age);
console.log('姓名：', drummer.name);
var Iobj = {
    v1: 12, v2: 23
};
console.log('v1 value: ', Iobj.v1);
console.log('v2 value: ', Iobj.v2);
// class 类
var Car = /** @class */ (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car.prototype.disp = function () {
        console.log('engine ：', this.engine);
    };
    return Car;
}());
var car = new Car('xxxx');
console.log(car.engine, 'engine');
car.disp();
var Shape = /** @class */ (function () {
    function Shape(a) {
        this.Area = a * a;
    }
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.disp = function () {
        console.log('Circle Area:', this.Area);
    };
    return Circle;
}(Shape));
var circle = new Circle(12);
circle.disp();
var Root = /** @class */ (function () {
    function Root() {
    }
    return Root;
}());
var Childs = /** @class */ (function (_super) {
    __extends(Childs, _super);
    function Childs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Childs;
}(Root));
var Leaf = /** @class */ (function (_super) {
    __extends(Leaf, _super);
    function Leaf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Leaf;
}(Childs)); // 多重继承，继承了Childs 和 Root 类
var leaf = new Leaf();
leaf.str = 'shoekdkdk';
console.log(leaf.str);
var PrinterClass = /** @class */ (function () {
    function PrinterClass() {
    }
    PrinterClass.prototype.doPrint = function () {
        console.log('father class doPrint function');
    };
    return PrinterClass;
}());
var stringPrinter = /** @class */ (function (_super) {
    __extends(stringPrinter, _super);
    function stringPrinter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    stringPrinter.prototype.doPrint = function () {
        _super.prototype.doPrint.call(this);
        console.log('son class doPrint function');
    };
    return stringPrinter;
}(PrinterClass));
var printfn = new stringPrinter();
printfn.doPrint();
var StaticStr = /** @class */ (function () {
    function StaticStr() {
    }
    StaticStr.disp = function () {
        console.log('num value of :', StaticStr.num);
    };
    return StaticStr;
}());
StaticStr.num = 12;
StaticStr.disp();
var inFnuction = printfn instanceof stringPrinter;
console.log('printfn is object of stringPrinter', inFnuction);
var Encapsulate = /** @class */ (function () {
    function Encapsulate() {
        this.str1 = 'hello';
        this.str2 = 'world';
    }
    return Encapsulate;
}());
var encapsulate = new Encapsulate();
console.log(encapsulate.str1, ' publice');
var AgriLoan = /** @class */ (function () {
    function AgriLoan(interest, rebate) {
        this.interest = interest;
        this.rebate = rebate;
    }
    return AgriLoan;
}());
var agriloan = new AgriLoan(10, 1);
console.log('interest ', agriloan.interest);
console.log('rebate ', agriloan.rebate);
// Object 对象
var object = {
    key1: 'value1',
    key2: 'value2',
    key3: function () {
        console.log('function');
    },
    key4: ['array']
};
console.log(object.key1, object.key4);
var objFn = object.key3;
objFn();
var siteObj = {
    site1: 'jdjd',
    site2: 'skdkdk',
    sayHi: function () { } // 必须添加类型模板
};
siteObj.sayHi = function () {
    console.log('jdjdksk---', siteObj.site1);
};
siteObj.sayHi();
var invokesites = function (obj) {
    console.log('site1:', obj.site1);
    console.log('site2:', obj.site2);
};
invokesites(siteObj);
function addPoint(p1, p2) {
    var x = p1.x + p2.x;
    var y = p1.y + p2.y;
    return { x: x, y: y };
}
var newPoint = addPoint({ x: 3, y: 4 }, { x: 4, y: 9 });
console.log(newPoint, 'new Point');
var ANameSpace;
(function (ANameSpace) {
    var AClassName = /** @class */ (function () {
        function AClassName() {
        }
        AClassName.prototype.draw = function () {
            console.log('AClass of draw');
        };
        return AClassName;
    }());
    ANameSpace.AClassName = AClassName;
    var BClassName = /** @class */ (function () {
        function BClassName() {
        }
        BClassName.prototype.draw = function () {
            console.log('Bclass of draw');
        };
        return BClassName;
    }());
    ANameSpace.BClassName = BClassName;
})(ANameSpace || (ANameSpace = {}));
function drawAll(space) {
    space.draw();
}
drawAll(new ANameSpace.AClassName());
drawAll(new ANameSpace.BClassName());
var Guoht;
(function (Guoht) {
    var Guozj;
    (function (Guozj) {
        var Xxl = /** @class */ (function () {
            function Xxl() {
            }
            Xxl.prototype.claculateDiscount = function (price) {
                return price * 0.4;
            };
            return Xxl;
        }());
        Guozj.Xxl = Xxl;
    })(Guozj = Guoht.Guozj || (Guoht.Guozj = {}));
})(Guoht || (Guoht = {}));
var guoht = new Guoht.Guozj.Xxl();
console.log(guoht.claculateDiscount(400));
// 声明文件
var Runoob;
(function (Runoob) {
    var cale = (function () {
        function cale() {
        }
    });
    cale.prototype.doSum = function (limit) {
        var sum = 0;
        for (var i = 0; i < limit; i++) {
            sum += i;
        }
        return sum;
    };
    Runoob.cale = cale;
    return cale;
})(Runoob || (Runoob = {}));
// declare module Runoob{
// 	export class cale{
// 		doSum(limit:number):number
// 	}
// }
var test1 = new Runoob.cale();
console.log(test1.doSum(10), 'sum ');
