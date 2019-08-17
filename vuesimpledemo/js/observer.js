var Oberver = /** @class */ (function () {
    function Oberver(data) {
        this.observe(data);
    }
    Oberver.prototype.observe = function (data) {
        var _this = this;
        if (!data || typeof data !== 'object') {
            return;
        }
        else {
            var keys = Object.keys(data);
            keys.forEach(function (key) {
                _this.defineReactive(data, key, data[key]);
            });
        }
    };
    Oberver.prototype.defineReactive = function (obj, key, val) {
        var dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get: function () {
                var watcher = Dep.target;
                watcher && dep.addSub(watcher);
                return val;
            },
            set: function (newValue) {
                val = newValue;
                dep.notify();
            }
        });
    };
    return Oberver;
}());
var Dep = /** @class */ (function () {
    function Dep() {
        this.subs = [];
    }
    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };
    Dep.prototype.notify = function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    };
    return Dep;
}());
