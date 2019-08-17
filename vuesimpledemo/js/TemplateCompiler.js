var TemplateCompiler = /** @class */ (function () {
    function TemplateCompiler(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        if (this.el) {
            var fragment = this.node2Fragment(this.el);
            this.compile(fragment);
            this.el.appendChild(fragment);
        }
    }
    TemplateCompiler.prototype.isElementNode = function (node) {
        return node.nodeType === 1;
    };
    TemplateCompiler.prototype.isTextNode = function (node) {
        return node.nodeType === 3;
    };
    TemplateCompiler.prototype.toArray = function (fakeArr) {
        return [].slice.call(fakeArr);
    };
    TemplateCompiler.prototype.isDirective = function (directiveName) {
        return directiveName.indexOf('v-') >= 0;
    };
    TemplateCompiler.prototype.node2Fragment = function (node) {
        var fragment = document.createDocumentFragment();
        var child;
        while (child = node.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    };
    TemplateCompiler.prototype.compile = function (parent) {
        var _this = this;
        var childNodes = parent.childNodes;
        var arr = this.toArray(childNodes);
        arr.forEach(function (node) {
            if (_this.isElementNode(node)) {
                _this.compileElem(node);
            }
            else {
                var textReg = /\{\{(.+)\}\}/;
                var expr = node.textContent;
                if (textReg.test(expr)) {
                    expr = RegExp.$1;
                    _this.compileText(node, expr);
                }
            }
        });
    };
    TemplateCompiler.prototype.compileElem = function (node) {
        var _this = this;
        var arrs = node.attributes;
        this.toArray(arrs).forEach(function (attr) {
            var attrName = attr.name;
            if (_this.isDirective(attrName)) {
                var type = attrName.split('-')[0];
                var expr = attr.value;
                CompilerUtils[type] && CompilerUtils[type](node, _this.vm, expr);
            }
        });
    };
    TemplateCompiler.prototype.compileText = function (node, expr) {
        CompilerUtils.text(node, this.vm, expr);
    };
    return TemplateCompiler;
}());
CompilerUtils = {
    text: function (node, vm, expr) {
        var updateFn = this.updater.textUpdater;
        updateFn && updateFn(node, vm.$data[expr]);
        new Watcher(vm, expr, function (newValue) {
            updateFn && updateFn(node, newValue);
        });
    },
    model: function (node, vm, expr) {
        var updateFn = this.updater.modelUpdater;
        updateFn && updateFn(node, vm.$data[expr]);
        new Watcher(vm, expr, function (newValue) {
            updateFn && updateFn(node, newValue);
        });
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            vm.$data[expr] = newValue;
        });
    },
    updater: {
        textUpdater: function (node, value) {
            node.textContent = value;
        },
        modelUpdater: function (node, value) {
            node.value = value;
        }
    }
};
