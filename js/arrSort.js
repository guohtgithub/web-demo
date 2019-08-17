// 时间差
function getSecond(startTime,endTime){
	var stime = startTime.getTime();
	var etime = endTime.getTime();
	var usedTime = etime - stime;  //两个时间戳相差的毫秒数
	console.log(usedTime,'usedTime')
	var days=Math.floor(usedTime/(24*3600*1000));
	//计算出小时数
	var leave1=usedTime%(24*3600*1000);    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000));
	//计算相差分钟数
	var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000));
	
	// 计算相差秒数
	var leave3 = leave2%(60*1000)
	var second = Math.floor(leave3/1000)
	
	var time = days + " 天 "+hours+" 时 "+minutes+" 分 "+second+' 秒';
	
	return time;
}


var arr = [1,2,33,4,5,66,42,1,333,100]
// 算法排序
// 1.插入排序
var arrShow = (function insertionSort(array){
	if(Object.prototype.toString.call(array).slice() === '[object Array]' || 
			Object.prototype.toString.call(array).slice() === 'Array'){
		let startTime = new Date();
		for(var i=1;i<array.length;i++){
			var key = array[i]
			var j = i -1
			while(j >=0 && array[j] > key){
				array[j + 1] = array[j]
				j--
			}
			array[j + 1] = key
		}
		let endTime = new Date();
		let timeDiff = getSecond(startTime,endTime)
		console.log(timeDiff,'insertionSort')
		return array	
	}else{
		return 'array is not an Array'
	}
})(arr)

console.log(arrShow,'insertionSort')

// 2.二分插入排序
function binaryInsertionSort(array){
	if(Object.prototype.toString.call(array).slice() === '[object Array]' || 
		Object.prototype.toString.call(array).slice() === 'Array'){
		let startTime = new Date();
		for(var i=1;i<array.length;i++){
			var key = array[i],left=0,right = i-1
			while(left<=right){
				var middle = parseInt((left + right)/2)
				if(key < array[middle]){
					right = middle - 1
				}else{
					left = middle + 1
				}
			}
			for(var j = i -1;j>=left;j--){
				array[j+1] = array[j]
			}
			array[left] = key
		}
		let endTime = new Date();
		let timeDiff = getSecond(startTime,endTime)
		console.log(timeDiff,'binaryInsertionSort')
		return array
	}else{
		return 'array is not an Array'
	}
}
console.log(binaryInsertionSort(arr),'binaryInsertionSort')

// 3.选择排序
function selectionSort(array){
	if(Object.prototype.toString.call(array).slice() === '[object Array]' || 
		Object.prototype.toString.call(array).slice() === 'Array'){
		let startTime = new Date();
		var len = array.length,temp
		for(var i=0;i<len-1;i++){
			var min = array[i]
			for(var j=i+1;j<len;j++){
				if(array[j] < min){
					temp = min
					min = array[j]
					array[j] = remp
				}
			}
			array[i] = min
		}
		let endTime = new Date();
		let timeDiff = getSecond(startTime,endTime)
		console.log(timeDiff,'binaryInsertionSort')
		return array
	}else{
		return 'array is not an Array'	
	}
}
console.log(binaryInsertionSort(arr),'selectionSort')

// 4.冒泡排序
function bubbleSort(array){
	if(Object.prototype.toString.call(array).slice() === '[object Array]' || 
		Object.prototype.toString.call(array).slice() === 'Array'){
		let startTime = new Date();
		var len = array.length,temp
		for(var i=0;i<len-1;i++){
			for(var j=len-1;j>=i;j--){
				if(array[j]<array[j-1]){
					temp = array[j]
					array[j] = array[j-1]
					array[j-1] = temp
				}
			}
		}
		let endTime = new Date();
		let timeDiff = getSecond(startTime,endTime)
		console.log(timeDiff,'bubbleSort')
		return array
	}else{
		return 'array is not an Array'
	}
}
console.log(bubbleSort(arr),'bubbleSort')

// 5.快速排序
function quickSort(array,left,right){
	if((Object.prototype.toString.call(array).slice() === '[object Array]' && 
			typeof left === 'number' && typeof right === 'number') || 
		(Object.prototype.toString.call(array).slice() === 'Array' && 
			typeof left === 'number' && typeof right === 'number')){
		let startTime = new Date();
		if(left < right){
			var x = array[right],i=left-1,temp;
			for(var j=left;j<=right;j++){
				if(array[j] <= x){
					i++
					temp = array[i];
					array[i] = array[j];
					array[j] = temp
				}
			}
			quickSort(array,left,i-1)
			quickSort(array,i+1,right)
		}
		return array
	}else{
		return 'array is not an Array, or left 、 or right is not a number'
	}
}

console.log(quickSort(arr,0,arr.length-1),'quickSort')

var quickSort2 = function(array){
	if(array.length <= 1) return array
	var pivotIndex = Math.floor(array.length/2)
	var pivot = array.splice(pivotIndex,1)[0]
	var left = []
	var right = []
	for(var i=0;i<array.length;i++){
		if(array[i] < pivot){
			left.push(array[i])
		}else{
			right.push(array[i])
		}
	}
	return quickSort2(left).concat([pivot],quickSort2(right))
}

console.log(quickSort2(arr),'quickSort2')

// 6.堆排序
/**
* 方法说明：堆排序
* @param array 待排序数组
*/
function heapSort(array){
	if(Object.prototype.toString.call(array).slice() === '[object Array]' || 
		Object.prototype.toString.call(array).slice() === 'Array'){
		var heapSize = array.length,temp
		for(var i=Math.floor(heapSize/2);i>=0;i--){
			heapify(array,i,heapSize)
		}
		for(var j=heapSize-1;j>=1;j--){
			temp = array[0]
			array[0] = array[j]
			array[j] = temp
			heapify(array,0,--heapSize)
		}
		return array
	}else{
		return 'array is not an Array'
	}
}

/**
* 方法说明：维护堆的性质
* @param array 数组
* @param x 数组下标
* @param len 堆大小
*/
function heapify(array,x,len){
	if((Object.prototype.toString.call(array).slice() === '[object Array]' && typeof x === 'number')|| 
		(Object.prototype.toString.call(array).slice() === 'Array'&& typeof x === 'number')){
		var l = 2 * x,r = 2*x +1,largest = x,temp
		if(l<len && array[l] > array[largest]){
			largest = l
		}
		if(r < len && array[r] > array[largest]){
			largest = r
		}
		if(largest != x){
			temp = array[x]
			array[x] = array[largest]
			array[largest] = temp
			heapify(array,largest,len)
		}
		return array
	}else{
		return 'array is not an Array or x is not a number'
	}
}

// 7.归并排序
function mergeSort(array,p,r){
	if(p<r){
		var q = Math.floor((p+r)/2)
		mergeSort(array,p,q);
		mergeSort(array,q+1,r)
		merge(array,p,q,r)
	}
}

function merge(array,p,q,r){
	var n1 = q-p+1,n2=r-q,left=[],right=[],m=n=0
	for(var i=0;i<n1;i++){
		left[i] = array[p+1]
	}
	for(var j=0;j<n2;j++){
		right[j] = array[q+1+j]
	}
	left[n1] = right[n2] = Number.MAX_VALUE
	for(var k=p;k<=r;k++){
		if(left[m] <= right[n]){
			array[k] = left[m]
			m++
		}else{
			array[k] = right[n]
			n++
		}
	}
}

// 9.计算排序
function countingSort(array){
	var len = array.length,B = [],C=[],min=max=array[0]
	for(var i=0;i<len;i++){
		min = min <= array[i] ? min :array[i]
		max = max >= array[i] ? max :array[i]
		C[array[i]] == C[array[i]]?C[array[i]] + 1 : 1
	}
	for(var j=min;j<max;j++){
		C[j+1] = (C[j+1] || 0) + (C[j] || 0)
	}
	for(var k=len-1;k>=0;k--){
		B[C[array[k]] -1] = array[k]
		C[array[k]]--
	}
	return B
}

console.log(countingSort(arr),'countingSort')