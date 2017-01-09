/*
* 单例模式
* 核心：1.确保只有一个实例；
*       2.该实例提供全局访问
*/
/************1.命名空间*************/
var namespce = {
  get:function () {
    console.log('get');
  },
  set:function () {
    console.log('set');
  }
}
console.dir(namespce);
//动态创建命名空间简单实例
var app = {};
app.namespce = function(name) {
  //string 的 split 方法将其转为数组
  var parts = name.split('.');
  var current = app;
  for (var i in parts) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
}
app.namespce('event');
app.namespce('dom.style');
app.namespce('get');
app.namespce('set');
console.dir(app);

/************2.闭包封装私有变量*************/
//闭包封装私有变量
var user = (function() {
  var _name = 'test',
      _age = 23;

  return {
    getUserInfo:function() {
      return _name + '-' + _age;
    }
  }
})();
console.dir(user.getUserInfo());

/************3.惰性单例*************/
var getSingle = function(fn, test) {
  var res;
  return function() {
    return res || (res = fn.apply(this, arguments));
  }
}
var createLoginLayer = function() {
  var div = document.createElement('div');
  div.innerHTML = '我是登录浮窗';
  document.body.appendChild(div);
  return div;
}
var createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById('loginBtn').onclick = function() {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block'
}
