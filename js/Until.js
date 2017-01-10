(function(root, factory) {
  return factory(root);
})(this, function(root) {
  root.$ = function(param) {
    return document.querySelectorAll(param);
  }
  root.on = function(param, type, fn) {
    return $(param)[type] = function() {
      fn();
    };
  }
});
