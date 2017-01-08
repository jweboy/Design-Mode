// 命名空间
var namespce = {
  get:function () {
    console.log('get');
  },
  set:function () {
    console.log('set');
  }
}
console.dir(namespce);
//动态创建命名空间
var app = {};
app.namespce = function(name) {
  //string 的 split 方法将其转为数组
  var parts = name.split('.');
  // console.info(parts);
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
console.dir(app);
//闭包封装私有变量
var user = (function() {
  console.log('enter');
  var _name = 'test',
      _age = 23;

  return {
    getUserInfo:function() {
      return _name + '-' + _age;
    }
  }
})();
console.dir(user.getUserInfo());
console.info('enterq1');
//惰性单例
var getSingle = function(fn) {
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
var createSingleLoginLayer = getSingle(createLoginLayer,1,2,3);
document.getElementById('loginBtn').onclick = function() {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block'
}
