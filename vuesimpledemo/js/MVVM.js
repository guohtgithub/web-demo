var MVVM = /** @class */ (function () {
    function MVVM(options) {
        this.$vm = this;
        this.$el = options.el;
        this.$data = options.data;
        if (this.$el) {
            new Oberver(this.$data);
            this.$compiler = new TemplateCompiler(this.$el, this.$vm);
        }
    }
    return MVVM;
}());
