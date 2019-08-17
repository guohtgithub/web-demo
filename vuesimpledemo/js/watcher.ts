class Watcher{
	constructor(vm,expr,cb){
		this.vm = vm
		this.expr = expr
		this.cb = cb
		this.value = this.get()
	}
	get(){
		Dep.target = this
		var value = this.vm.$data[this.expr]
		Dep.target = null
		return value
	}
	update(){
		var newValue = this.vm.$data[this.expr]
		var old = this.value
		if(newValue !== old){
			this.cb(newValue)
		}
	}
}