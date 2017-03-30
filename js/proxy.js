/**
 * 图片延迟加载
 */
var myImage = (function() {
    var _imgNode = document.createElement('img');
    document.body.appendChild(_imgNode);

    return function(src) {
        _imgNode.src = src;
    };
})();

var proxyImage = (function() {
    var _img = new Image();

    _img.onload = function() {
        myImage(this.src);
    };

    return function(src) {
        myImage('../imgs/p1.png');
        setTimeout(function() {
            _img.src = src;
        }, 3000);
    };
})();
proxyImage('http://pics.sc.chinaz.com/files/pic/pic9/201508/apic14052.jpg');

/**
 * 上传文件队列简单示例
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
var synchronousFile = function(id) {
    console.log('开始同步文件,id为:'+id);
};

var proxySynchronousFile = (function() {
    var cache = [],
        timer;

    return function(id) {
        cache.push(id);
        console.log(cache);
        if (timer) {
            return;
        }
        timer = setTimeout(function() {
            synchronousFile(cache.join(','));
            clearTimeout(timer);
            timer = null;
            cache.length = 0;
        }, 2000);
    };
})();

function uploadFile(self) {
    return function() {
        if(self.checked === true) {
            proxySynchronousFile(self.id);
        }
    };
}

var checkboxAry = document.getElementsByName('check');
for (var i = 0, len = checkboxAry.length; i < len; i++) {
    checkboxAry[i].onclick = uploadFile(checkboxAry[i]);
}

// var cache = [];
// var miniConsole = {
//         log:function() {
//             var args = arguments;
//             cache.push(function() {
//                 miniConsole.log.apply(miniConsole,arguments);
//             });
//         }
// };
// miniConsole.log(1);
// miniConsole.log(2);
// miniConsole.log(32);

/**
 * 乘积计算缓存
 * @return {number} [计算得到的最终结果]
 */
var mult = function() {
    console.log('开始计算乘积');
    var num = 1;
    for (var i = 0, len = arguments.length; i < len; i++) {
        num = num * arguments[i];
    }
    return num;
};
var proxyMult = (function() {
    var cache = [];
    return function() {
        var args = Array.prototype.join.call(arguments,',');
        console.log(args);
        if(args in cache) {
            return cache[args];
        }
        cache[args] = mult.apply(this,arguments);
        return cache[args];
    };
})();
proxyMult(1,2,3);
proxyMult(1,2,3);
