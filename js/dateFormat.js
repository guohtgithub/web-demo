
// 时间格式化
function dateFmt(fmt,date){
	var o = {
		'y+':date.getFullYear(),  // 年
		"M+":date.getMonth() + 1, // 月
		"d+":date.getDate(),      // 日
		'h+':date.getHours(),     // 小时
		'm+':date.getMinutes(),   // 分
		's+':date.getSeconds(),   // 秒
	}
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length))
	for(var k in o)
		if(new RegExp('('+k+')').test(fmt))
			fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1)?(o[k]):(('00')+o[k]).substr((""+o[k]).length))
	console.log(fmt,'dateformat')
	return fmt
}

var crtTime = new Date()
dateFmt("yyyy-MM-dd hh:mm:ss",crtTime)
dateFmt("hh:mm:ss",crtTime)
dateFmt("yyyy/MM/dd hh:mm:ss",crtTime)
dateFmt("mm:ss",crtTime)

// JS转换时间戳为“刚刚”、“1分钟前”、“2小时前”“1天前”等格式
function getTimer(strTime){

	var minute = 1000 * 60
	var hour = minute * 60
	var day = hour * 24
	var week = day * 7
	var month = day * 30

	var timer = new Date().getTime() // 指定当前时间戳
	var timerStr = Date.parse(new Date(strTime)) // 指定时间的时间戳
	var time = timer - timerStr

	var result = null
	if(time < 0){
		result = 'message error'
	}else if(time / month >= 1){
		result = '发布于' + parseInt(time / month) + '月前！'
	}else if(time / week >= 1){
		result = '发布于' + parseInt(time / week) + '周前！'
	}else if(time / day >= 1){
		result = "发布于" + parseInt(time / day) + '天前！'
	}else if(time / minute >= 1){
		result = '发布于' + parseInt(time / minute) + '分钟前！'
	}else{
		result = '刚刚发布！'
	}
	return result
}

// 倒计时
function tow(n){ // 补零
	return n >=0 &&  n<10 ? '0'+n:n
} 

/**
* 倒计时类型方法
* @date number 时间戳 毫秒数
* @type string 按什么倒计时 天、小时、分钟、秒
*/
function getDate(date,type){
	
}
