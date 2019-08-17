function getStr(hashStr,resStr){ // 标记某单个数在字符串最后出现位置
  let hashlen = hashStr.length
  let indexArr = [hashlen]
  let len = resStr.length
  let hashList = []
  for(let i=hashlen-1;i>=0;i--){
    if(len >0 && /\d/.test(hashStr[i])){
      if(i != hashlen-1){
        indexArr.unshift(i+1)
      }
      indexArr.unshift(i)
      len--
    }
  }

  indexArr.reduce((lastIndex,currentIndex) =>{
	  hashList.push(hashStr.slice(lastIndex,currentIndex))
    return currentIndex
  },0)

  return hashList
}

function getWhichStr(hashStr,resStr){ // 标记某单个字符在字符串最后出现位置
  let resArr = resStr.toString().split("").reverse()
  let resultArr = []
  let hashCaceh = hashStr
  resArr.forEach((item,index) => {
    let indexNum = hashCaceh.lastIndexOf(item)
    let hashStrlen = hashCaceh.length
    resultArr.push(hashCaceh.substr(indexNum+1,hashStrlen))
    resultArr.push(item)
    hashCaceh = hashCaceh.substr(0,indexNum)
    if(index+1 == resArr.length){
      resultArr.push(hashCaceh.substr(0,indexNum))
    }
  })
  return resultArr
}

function reconvert(str){ // ascii转汉字 有关转码编译
  str = str.replace(/(\\u)(\w{1,4})/gi,function($0){ 
    return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16))); 
  }); 
  str = str.replace(/(&#x)(\w{1,4});/gi,function($0){ 
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16)); 
  }); 
  str = str.replace(/(&#)(\d{1,6});/gi,function($0){ 
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2"))); 
  }); 
  str = str.replace(/\\x(\w{2})/g,function(_,$1){ 
    return String.fromCharCode(parseInt($1,16)) 
  });
   
  return str; 
}

const reduce = (array,fn,initialValue) => {  // Array prototype reduce 方法
  let sum ;
  if(initialValue){
    sum = initialValue;
    for(let value of array)
      sum = fn(sum,value)
  }else{
    sum = array[0]
    for(let i=0;i<array.length;i++)
      sum = fn(sum,array[i])
  }
  return sum
}

// url 解析
function getUrl(url){
  let arr = url.split('?')[1].split('&')
  let keyObj = {}
  arr.forEach(key => {
    let keyArr = key.split('=')
    keyObj[keyArr[0]] = keyArr[1]
  })
  return keyObj
}

function isStatic(value){ // symbol 外的原始数据类型
  return (typeof value === 'string' || typeof value === 'number' || 
    typeof value === 'boolean' || typeof value === 'undefined' || 
    value === null)
}

function isPrimitive(value){ // 检查数据是否是原始数据类型
  return isStatic(value) || typeof value === 'symbol'
}

function isObject(value){ // 判断数据是否是引用类型数据
  let type = typeof value
  return value != null && (type == 'object' || type == 'function')
}

function isObjectLike(value){ // 检查value 是否是类对象
  return value != null && typeof value == 'object'
}

function getRawType(value){ // 获取数据类型，返回Number、String、Object、Array
  return Object.prototype.toString.call(value).slice(8,-1) // [object xxxx]
}

const isPlainObject = (obj) => { // 判断数据是不是Object 类型数据
  return Object.prototype.toString.call(obj) === '[object Object]'
}

const isArray = (arr) => { // 判断数据是不是Array 类型数据
  return Object.prototype.toString.call(arr) === '[object Array]'
  // return Array.isArray(arr)
}

const isRegExp = (value) => { // 判断数据是不是正则对象
  return Object.prototype.toString.call(value) === '[object RegExp]'
}

const isDate = (date) => { // 判断数据是不是时间对象
  return Object.prototype.toString.call(date) === '[object Date]'
}

const isNative = (value) =>{ // 判断 value 是不是浏览器内置函数
  return typeof value === 'function' && /native code/.test(value.toString())
}

const isFunction = (value) => { // 检查 value 是不是函数
  return Object.prototype.toString.call(value) === '[object Function]'
}

const isLength = (value) => { // 检查 value 是否为有效的类数组长度
  return typeof value === 'number' 
    && value > -1 
    && value % 1 == 0
    && value < Number.MAX_SAFE_INTEGER
}

const isArrayLike = (value) => { // 检查 value 是否是类数组
  return value != null && isLength(value.length) && !isFunction(value)
}

const isEmpty = (value) => {
  if(value == null){
    return true
  }

  if(isArrayLike(value)){
    return !value.length
  }else if(isPlainObject(value)){
    for(let key in value){
      if(hasOwnProperty.call(value,key)){
        return false
      }
    }
  }
  return false
}

const cached = (fn) => { // 记忆函数：缓存函数的运算结果
  let cache = Object.create(null)
  return function cacheFn(str){
    let hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

let camelizeRE = /-(w)/g;
const camelize = (str) => {
  return str.replace(camelizeRE,(_,c) => {
    return c ? c.toUppperCase() : ''
  })
}

// ab-cd-ef ==> abCdEf
let _camelize = cached(camelize)

let hyphenateRE = /B(A-Z)/g
const hyphenate = (str) => {
  return str.replace(hyphenateRE,'-$1').toLowerCase()
}
// abCd ==> ab-cd
let _hyphenate = cached(hyphenate)

const capitalize = (str) => { // 首字母大写
  return str.charAt(0).toUppperCase() + str.slice(1)
}

let _capitalize = cached(capitalize)

const extend = (to,_from) =>{
  for(let key in _from){
    to[key] = _from[key]
  }
  return to
}

// Object.assign: 对象属性复制，浅拷贝
Object.assign = Object.assign || function(){
  if(arguments.length == 0) throw new TypeError('Cannot convert undefined or null to object')
  let target = arguments[0],
      args = Array.prototype.slice.call(arguments,1),
      key
  args.forEach(function(item){
    for(key in item){
      item.hasOwnProperty(key) && (target[key] = item[key])
    }
  })
  return target
}

// 禁止右键、选择、复制
['contextmenu','selectstart','copy'].forEach(ev => {
  document.addEventListener(ev,event => {
    return event.returnValue = false
  })
})

// 禁止某些键盘事件
document.addEventListener('keydown',event => {
  return !(
      112 === event.keyCode || // F1
      123 === event.keyCode || // F12
      event.ctrlKey && 82 == event.keyCode || // ctrl + R
      event.ctrlKey && 78 == event.keyCode || // ctrl + N
      event.shiftKey && 121 == event.keyCode || // shift + F10
      event.altKey && 115 == event.keyCode || // alt + F4
      "A" == event.srcElement.tagName && event.shiftKey  // shift + 点击a标签
    ) || (event.returnValue = false)
})

window.onload = function(){ // 利用performance.timing进行性能分析
  setTimeout(() => {
    let t = performance.timing

    console.log('DNS查询耗时 ：' + (t.domainLookupEnd - t.domainLookupStart).toFixed(0))
    console.log('TCP链接耗时 ：' + (t.connectEnd - t.connectStart).toFixed(0))
    console.log('request请求耗时 ：' + (t.responseEnd - t.responseStart).toFixed(0))
    console.log('解析dom树耗时 ：' + (t.domComplete - t.domInteractive).toFixed(0))
    console.log('白屏时间 ：' + (t.responseStart - t.navigationStart).toFixed(0))
    console.log('domready时间 ：' + (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0))
    console.log('onload时间 ：' + (t.loadEventEnd - t.navigationStart).toFixed(0))

    if(t = performance.memory){
        console.log('js内存使用占比 ：' + (t.usedJSHeapSize / t.totalJSHeapSize * 100).toFixed(2) + '%')
    }
  })
}

// 返回数组中通过测试（函数fn内判断）的第一个元素的下标
Array.prototype.findeIndex = Array.prototype.findeIndex || (fn,ctx) => {
  ctx = ctx || this;
  let result
  ctx.some((value,index,arr) => {
    return fn(value,index,arr) ? (result = index,true):false
  },thisValue)
  return result
}

// 返回数组中通过测试（函数fn内判断）的第一个元素的值
Array.prototype.find = Array.prototype.find || (fn,ctx) => {
  ctx = ctx || this
  let result 
  ctx.some((value,index,arr) => {
    return fn(value,index,arr) ? (result = value,true) : false
  },thisValue)
  return result
}

//用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false，可指定开始查询的位置
Array.prototype.includes = Array.prototype.includes || (value,start) => {
  let ctx = this
  let length = ctx.length
  start = parseInt(start)
  if(isNaN(start)){
    start = 0
  }else if(start < 0){
    start = -start > length ? 0 : (length + start)
  }

  let  index = ctx.indexOf(value)
  return index >= start;
}

// 使用 value 值来填充 array，从start位置开始, 到end位置结束（但不包含end位置），返回原数组
Array.prototype.fill = Array.prototype.fill || (value,start,end) => {
  let ctx = this
  let length = ctx.length
  start = parseInt(start)
  if(isNaN(start)){
    start = 0
  }else if(start < 0){
    start = -start > length ? 0 : (length+start)
  }
  end = parseInt(end)
  if(isNaN(end) || end > length){
    end = length
  }else if(end < 0){
    end += length
  }

  while(start < end){
    ctx[start++] = value
  }
  return ctx
}

// 返回一个给定对象自身的所有可枚举属性值的数组
Object.values = Object.values || (object) =>{
  if(object === null || object === undefined){
    throw new TypeError('Cannot convert undefined or null to object');
  }

  let result = []
  if(isArrayLike(object) || isPlainObject(object)){
    for(let key in object){
      object.hasOwnProperty(key) && (result.push(object(key)))
    }
  }
  return result
}

// 返回一个由一个给定对象的自身可枚举属性组成的数组
Object.keys = Object.keys || (object) => {
  if(object === null || object === undefined){
    throw new TypeError('Cannot convert undefined or null to object');
  }
  let result = []
  if(isArrayLike(object) || isPlainObject(object)){
    for(let key in object){
      object.hasOwnProperty(key) && result.push(key)
    }
  }
  return result
}

// 求取数组中非NaN数据中的最小值
const min = (array) =>{
  array = array.filter(item => !_isNaN(item))
  return array.length ? Math.min.apply(null,array) : undefined
}

// 求取数组中非NaN数据中的最大值
const max = (array) => {
  array = array.filter(item => !_isNaN(item))
  return array.length ? Math.max.apply(null,array):undefined
}

// isNaN
const _isNaN = v => {
  return !(typeof v == 'string' || typeof v == 'number' || isNaN(v))
}

window.requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame || 
  window.oRequestAnimationFrame ||
  (callback) => {
    window.setTimeout(callback,1000/60)
  }

window.cancelAnimationFrame = window.cancelAnimationFrame || 
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame || 
  window.msCancelAnimationFrame || 
  window.oCancelAnimationFrame ||
  (id) => {
    window.clearTimeout(id)
  }

// 退出全屏
const exitFullscreen = () => {
  let elem = parent.document
  elem.webkitCancelFullScreen
  ? elem.webkitCancelFullScreen()
  : elem.mozCancelFullScreen
  ? elem.mozCancelFullScreen()
  : elem.msCancelFullScreen
  ? elem.msCancelFullScreen()
  : elem.cancelFullScreen
  ? elem.cancelFullScreen()
  : elem.msExitFullscreen
  ? elem.msExitFullscreen()
  : elem.exitFullscreen
  ? elem.exitFullscreen()
  : console.log('切换失败，可尝试ESC退出')
}

// 全屏
const toFullScreen = () =>{
  let elem = document.body
  elem.webkitRequestFullScreen
  ? elem.webkitRequestFullScreen()
  : elem.mozRequestFullScreen
  ? elem.mozRequestFullScreen()
  : elem.msRequestFullScreen
  ? elem.msRequestFullScreen()
  : elem.requestFullScreen
  ? elem.requestFullScreen()
  : console.log('浏览器不支持全屏')
}

// 图片下载
function downloadURI(dataurl,filename){
  let a = document.createElement('a')
  a.href = dataurl
  a.setAttribute('download',filename)
  let b = document.createEvent('MouseEvents')
  b.initEvent('click',false,true)
  a.dispatchEvent(b)
  return false
}

// 文件下载， base64 数据导出文件
const downloadFile = (filename,data) =>{
  let downloadLink = document.createElement('a')
  if(downloadLink){
    document.body.appendChild(downloadLink)
    downloadLink.style.display = 'none'
    downloadLink.download = filename
    downloadLink.href = data
    if(document.createEventa){
      let downloadEvt = document.createEvent('MouseEvents')
      downloadEvt.initEvent('click',true,false)
      downloadEvt.dispatchEvent(downloadEvt)
    }else if(document.createEventObject){
      downloadLink.fireEvent('onclick')
    }else if(typeof downloadLink.onclick == 'function'){
      downloadLink.onclick()
    }
    document.body.removeChild(downloadLink)
  }
}

// 将指定字符串由一种时间格式转化为另一种
const dateStrFormat = (str,from,to) => {
  str += ''
  let Y = ''
  if(~(Y = from.indexOf('YYYY'))){
    Y = str.substr(Y,4)
    to = to.replace(/YYYY|yyyy/g,Y)
  }else if(~(Y = from.indexOf('YY'))){
    Y = str.substr(Y,2)
    to = to.replace(/yy|YY/g,Y)
  }

  let k,i
  ['M','D','H','h','m','s'].forEach(s => {
    i = from.indexOf(s+s)
    k = ~i ? str.substr(i,2) : ''
    to = to.replace(s+s,k)
  })
  return to
}

// 格式化时间
const dateFormater = (formater,time) => {
  let date = time ? new Date(time) : new Date(),
      Y = date.getFullYear() + '',
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds()

  return formater.replace(/YYYY|yyyy/g,Y)
    .replace(/YY|yy/g,Y.substr(2,2))
    .replace(/MM/g,(M<10?'0':'')+M)
    .replace(/DD/g,(D<10?'0':'')+D)
    .replace(/HH|hh/g,(H<10?'0':'')+H)
    .replace(/mm/g,(M<10?'0':'')+M)
    .replace(/ss/g,(s<10?'0':'')+s)
}

// 生成一个重复的字符串，有n个str组成，可修改为填充为数组等
const repeatStr = (str,n) => {
  let res = ''
  while(n){
    res += str
    n--
  }
  return res
}

// set简单实现
window.Set = window.Set || (() => {
  function Set(arr){
    this.items = arr ? unique(arr) : []
    this.size = this.items.length
  }
  Set.prototype = {
    add:function(value){
      if(!this.has(value)){
        this.items.push(value)
        this.size++
      }
      return this
    },
    clear:function(){
      this.items = []
      this.size = 0
    },
    delete:function(value){
      return this.items.some((v,i) => {
        if(v === value){
          this.items.split(i,1)
          return true
        }
        return false
      })
    },
    has:function(value){
      return this.items.some(v => v === value)
    },
    values:function(){
      return this.items
    }
  }
  return Set;
})

// 数组去重，返回一个新数组
const unique = arr => {
  if(!isArrayLike(arr)) return arr // 不是类数组对象

  let result = []
  let objArr = []
  let obj = Object.create(null)

  arr.forEach(item => {
    if(isStatic(item)){
      let key = item + '_' + getRawType(item)
      if(!obj[key]){
        obj[key] = true
        result.push(item)
      }
    }else {
      if(!objArr.includes(item)){
        objArr.push(item)
        result.push(item)
      }
    }
  })
  return result
}

// 浏览器信息
function getExplorerInfo() {
  let t = navigator.userAgent.toLowerCase();
  return 0 <= t.indexOf("msie") ? { //ie < 11
    type: "IE",
    version: Number(t.match(/msie ([d]+)/)[1])
  } : !!t.match(/trident/.+?rv:(([d.]+))/) ? { // ie 11
    type: "IE",
    version: 11
  } : 0 <= t.indexOf("edge") ? {
    type: "Edge",
    version: Number(t.match(/edge/([d]+)/)[1])
  } : 0 <= t.indexOf("firefox") ? {
    type: "Firefox",
    version: Number(t.match(/firefox/([d]+)/)[1])
  } : 0 <= t.indexOf("chrome") ? {
    type: "Chrome",
    version: Number(t.match(/chrome/([d]+)/)[1])
  } : 0 <= t.indexOf("opera") ? {
    type: "Opera",
    version: Number(t.match(/opera.([d]+)/)[1])
  } : 0 <= t.indexOf("Safari") ? {
    type: "Safari",
    version: Number(t.match(/version/([d]+)/)[1])
  } : {
    type: t,
    version: -1
  }
}

//识别各种浏览器及平台

//运行环境是浏览器
let inBrowser = typeof window !== 'undefined';
//运行环境是微信
let inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
//浏览器 UA 判断
let UA = inBrowser && window.navigator.userAgent.toLowerCase();
let isIE = UA && /msie|trident/.test(UA);
let isIE9 = UA && UA.indexOf('msie 9.0') > 0;
let isEdge = UA && UA.indexOf('edge/') > 0;
let isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
let isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
let isChrome = UA && /chrome/.test(UA) && !isEdge;

// clone 克隆数据，可深度克隆
const dataClone = (value,deep) => {
  if(isPrimitive(value)) return value

  if(isArrayLike(value)){
    value = Array.prototype.slice.call(value)
    return value.map(item => deep ? clone(item,deep):item)
  }else if(isPlainObject(value)){
    let target = {},key
    for(key in value){
      value.hasOwnProperty(key) && 
        (target[key] = deep ? clone(value[key],deep):value)
    }
  }

  let type = getRawType(value)
  switch(type){
    case 'Date':
    case 'RegExp':
    case 'Error': 
      value = new window[type](value);
      break;
  }
  return value
}