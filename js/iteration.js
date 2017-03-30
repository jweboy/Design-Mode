/**
 * 内部迭代器
 * 定义好迭代规则,外部只需一次初始调用
 * 外部无需关心内部迭代器的实现
 * @param  {[type]}   ary      [要迭代的数组]
 * @param  {Function} callback [回调函数]
 */
let each = (ary, callback) => {
	let fn;
	for(var i = 0, len = ary.length; i < len; i++) {
		fn = callback.call(ary[i], i, ary[i]); // 把下标与元素传递到回调函数里
		if(fn === false) {
			break; // 根据条件终止循环
		}
	}
}
each([1,2,3,4], function(i, n) {
	if(n > 3) {
		return false;
	}
	console.log(i, n);
});

/**
 * 外部迭代器
 * 显式请求迭代下一个元素
 */
let iterator = (obj) => {
	let current = 0;

	return {
		next: () => (current + 1),
		isDone: () => (current >= obj.length),
		getCurrItem: () => (obj[current])
	}
}

