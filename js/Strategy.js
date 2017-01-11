/*
 * 策略模式
 * 定义：定义一系列算法，把他们一个个封装起来，并且使他们相互替换。
 * 特点：将不变部分与变化部分隔开，也就是将算法的使用与实现进行分离。
 * 核心：一个组策略模式的程序由两部分组成。
 * 1.策略类：封装了具体的算法,并负责具体的计算过程；
 * 2.环境类 Context, 接受客户端的请求， 并将请求委托给某个策略类，此过程需要Context保持对某个策略对象的引用。
 * 实际应用：扩散算法的含义，使用策略模式封装"业务规则"。只要"业务规则"指向的目标一致，并可以替换使用，就可以用策略模式封装。
 */
//策略模式简单实例
var strategies = {
    'S': function (salary) {
        return salary * 4;
    },
    'A': function (salary) {
        return salary * 3;
    },
    'B': function (salary) {
        return salary * 2;
    }
};
var calculateBonus = function (level, salary) {
    return strategies[level](salary);
};
console.log(calculateBonus('S', 2000));
console.log(calculateBonus('A', 2000));
console.log(calculateBonus('B', 2000));
//动画例子 引用flash简单算法
var Animate = function (dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = null;
    this.easing = null;
    this.duration = null;
};
Animate.prototype = {
    start: function (propertyName, endPos, duration, easing) {
        this.startTime = +new Date();
        this.startPos = this.dom.getBoundingClientRect()[propertyName];
        this.propertyName = propertyName;
        this.endPos = endPos;
        this.duration = duration;
        this.easing = tween[easing];

        var self = this;
        var timeId = setInterval(function () {
            if(self.step() === false) {
                clearInterval(timeId);
            }
        }, 19);
    },
    step: function () {
        var t = +new Date();
        if(t > this.startTime + 　this.duration) {
            this.update(this.endPos);
            return false;
        }
        var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);

        this.update(pos);
    },
    update: function (pos) {
        this.dom.style[this.propertyName] = pos + 'px';
    }
};
//表单验证例子 自定义表单验证方法
var Validator = function () {
    this.cache = [];
};
Validator.prototype = {
    add: function (dom, rules) {
        var self = this;
        for(var i = 0, rule; rule = rules[i++];) {
            (function (rule) {
                var strategyAry = rule.strategy.split(':');
                var errorMsg = rule.errorMsg;

                self.cache.push(function () {
                    var strategy = strategyAry.shift();
                    strategyAry.unshift(dom.value);
                    strategyAry.push(errorMsg);
                    return formValidate[strategy].apply(dom, strategyAry);
                });
            })(rule);
        }
    },
    start: function () {
        for(var i = 0, validatoFunc; validatoFunc = this.cache[i++];) {
            var errorMsg = validatoFunc();
            if(errorMsg) {
                return errorMsg;
            }
        }
    }
}
