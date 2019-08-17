class Oberver{
	constructor(data){
		this.observe(data)
	}
	observe(data){
		if(!data || typeof data !== 'object'){
			return
		}else{
			var keys = Object.keys(data)
			keys.forEach(key =>{
				this.defineReactive(data,key,data[key])
			})
		}
	}
	defineReactive(obj,key,val){
		var dep = new Dep()
		Object.defineProperty(obj,key,{
			enumerable:true,
			configurable:false,
			get(){
				let watcher = Dep.target
				watcher && dep.addSub(watcher)
				return val
			},
			set(newValue){
			 val = newValue
			 dep.notify()
			}
		})
	}
}

class Dep{
	constructor(){
		this.subs = []
	}
	addSub(sub){
		this.subs.push(sub)
	}
	notify(){
		this.subs.forEach(sub => {
			sub.update()
		})
	}
}