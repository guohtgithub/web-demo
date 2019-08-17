var Watcher = /** @class */ (function () {
    function Watcher(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.value = this.get();
    }
    Watcher.prototype.get = function () {
        Dep.target = this;
        var value = this.vm.$data[this.expr];
        Dep.target = null;
        return value;
    };
    Watcher.prototype.update = function () {
        var newValue = this.vm.$data[this.expr];
        var old = this.value;
        if (newValue !== old) {
            this.cb(newValue);
        }
    };
    return Watcher;
}());
