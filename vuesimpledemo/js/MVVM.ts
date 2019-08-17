class MVVM{
	constructor(options){
		this.$vm = this
		this.$el = options.el
		this.$data = options.data

		if(this.$el){
			new Oberver(this.$data)
			this.$compiler = new TemplateCompiler(this.$el,this.$vm)
		}
	}
}