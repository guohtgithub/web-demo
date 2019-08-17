class TemplateCompiler{
	constructor(el,vm){
		this.el = this.isElementNode(el) ? el : document.querySelector(el)
		this.vm = vm
		if(this.el){
			var fragment = this.node2Fragment(this.el)
			this.compile(fragment)
			this.el.appendChild(fragment)
		}
	}

	isElementNode(node){
		return node.nodeType === 1
	}
	isTextNode(node){
		return node.nodeType === 3
	}
	toArray(fakeArr){
		return [].slice.call(fakeArr)
	}
	isDirective(directiveName){
		return directiveName.indexOf('v-') >= 0
	}

	node2Fragment(node){
		var fragment = document.createDocumentFragment()
		var child
		while(child = node.firstChild){
			fragment.appendChild(child)
		}
		return fragment
	}
	compile(parent){
		var childNodes = parent.childNodes
		var arr = this.toArray(childNodes)
		arr.forEach(node => {
			if(this.isElementNode(node)){
				this.compileElem(node)
			}else{
				var textReg = /\{\{(.+)\}\}/
				var expr = node.textContent
				if(textReg.test(expr)){
					expr = RegExp.$1
					this.compileText(node,expr)
				}
			}
		})
	}

	compileElem(node){
		var arrs = node.attributes
		this.toArray(arrs).forEach(attr => {
			var attrName = attr.name
			if(this.isDirective(attrName)){
				var type = attrName.split('-')[0]
				var expr = attr.value
				CompilerUtils[type] && CompilerUtils[type](node,this.vm,expr)
			}
		})
	}
	compileText(node,expr){
		CompilerUtils.text(node,this.vm,expr)
	}
}

CompilerUtils = {
	text(node,vm,expr){
		var updateFn = this.updater.textUpdater
		updateFn && updateFn(node,vm.$data[expr])

		new Watcher(vm,expr,(newValue) => {
			updateFn && updateFn(node,newValue)
		})
	},
	model(node,vm,expr){
		var updateFn = this.updater.modelUpdater
		updateFn && updateFn(node,vm.$data[expr])

		new Watcher(vm,expr,(newValue) => {
			updateFn && updateFn(node,newValue)
		})

		node.addEventListener('input',e => {
			var newValue  = e.target.value
			vm.$data[expr] = newValue
		})
	},
	updater:{
		textUpdater(node,value){
			node.textContent = value
		},
		modelUpdater(node,value){
			node.value = value
		}	
	}
}