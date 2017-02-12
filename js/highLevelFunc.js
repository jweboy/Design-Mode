/*jshint loopfunc: true */

/**
 * 高阶函数的核心
 * 1.函数可以作为参数传递
 * 2.函数可以作为返回值输出
 */

/**
 * 作为返回值的例子
 * 这是判断基本类型的函数
 * @_type {Object} 私有的类型对象
 */
var getType = (function() {
  var _type = {},
    arr = ['String', 'Number', 'Array','Object','Function','Null','Undefined'];
  for (var i = 0, len = arr.length; i < len; i++) {
    var type = arr[i];
    (function(type) {
      _type['is' + type] = function(obj) {
        return Object.prototype.toString.call(obj) === '[object '+type+']';
      };
    })(type);
  }
  return _type;
})();
//test
console.log('I\'m str');
console.log(getType.isString('I\'m str'));
console.log(getType.isArray([]));
console.log(getType.isNumber(9));
console.log(getType.isObject({}));
console.log(getType.isFunction(function() {}));
console.log(getType.isNull(null));
console.log(getType.isUndefined(undefined));

/**
 * 高阶函数实现AOP
 * AOP —— 面向切面编程 —— 把跟核心业务逻辑无关的功能抽离出来， 再动态组织进业务逻辑模块。
 * 无关功能包括：日志统计、安全控制、异常处理等。
 * 好处：保证业务逻辑的纯净与高内聚，方便复用功能模块
 *
 * JS中实现AOP 指一个函数“动态织入”到另一个函数中，可以通过Function.prototype扩展
 *
 */
/**
 * Function.prototype.before
 * @param  {[type]} beforeFn [function]
 * @return {[type]}          [description]
 */
Function.prototype.before = function (beforeFn) {
  var _self = this;//保持原函数的引用
  return function() {//返回包含了原函数和新函数的“代理”函数
    beforeFn.apply(this, arguments);//执行新函数，修正this
    return _self.apply(this, arguments);//执行原函数
  };
};
/**
 * Function.prototype.after
 * @param  {[type]} afterFn [description]
 * @return {[type]}         [description]
 */
Function.prototype.after = function (afterFn) {
  var _self = this;
  return function() {
    var ret = _self.apply(this, arguments);
    afterFn.apply(this,arguments);
    return ret;
  };
};
//test
var func = function() {
  console.log(2);
};
func = func.before(function() {
  console.log(1);
}).after(function() {
  console.log(3);
});
func();


/**
 * 函数柯里化 暂无
 */


/**
 * 高阶函数的其他应用
 * 1。节流函数
 * 2.分时函数
 * 3.惰性加载函数
 */

/**
 * 节流函数
 * @param  {Function} fn       [要延迟的函数]
 * @param  {[type]}   interval [延迟的时间间隔]
 * @return {[type]}            [description]
 */
var throttle = function(fn, interval) {
  var _self = fn,
    timer,
    firstTime = true;

  return function() {
    var args = arguments,
      _me = this;

    if (firstTime) {
      _self.apply(_me, args);
      firstTime = false;
      return;
    }
    if (timer) {
      return;
    }
    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;

      _self.apply(_me, args);
    }, interval || 500);
  };
};
//test
window.onresize = throttle(function() {
  console.info(1);
}, 2000);

/**
 * 分时函数
 * @param  {[type]}   ary   [Array]
 * @param  {Function} fn    [Function]
 * @param  {[type]}   count [Number]
 * @return {[type]}         [description]
 */
var timeChunk = function(ary, fn, count) {
  var len = ary.length,
    obj,
    t;

  var start = function() {
    for (var i = 0; i < Math.min(count || 1, len); i++) {
      obj = ary.shift();
      fn(obj);
    }
  };

  return function() {
    t = setInterval(function() {
      if (len === 0) {
        return clearInterval(t);
      }
      start();
    }, 3000);
  };
};
//test
var nodeAry = [];
for (var i = 0; i < 1000; i++) {
  nodeAry.push(i);
}
var renderList = timeChunk(nodeAry, function(n) {
  var div = document.createElement('div');
  div.innerHTML = n;
  document.body.appendChild(div);
}, 8);

renderList();

/**
 * 惰性加载函数
 * @param {[type]} elem    [description]
 * @param {[type]} type    [description]
 * @param {[type]} handler [description]
 */
var addEvent = function(elem, type, handler) {
  if (window.addEventListener) {
    addEvent = function(elem, type, handler) {
      elem.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    addEvent = function(elem, type, handler) {
      elem.attachEvent('on'+type, handler);
    };
  }

  addEvent(elem, type, handler);
};
//test
addEvent(document.getElementById('btn'), 'click', function() {
  alert('btn click');
});
