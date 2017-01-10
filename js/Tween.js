/*
 *运动小算法 最初来自flash
 *参数含义
 * t 运动消耗的时间
 * b 物体的原始位置
 * c 物体的目标位置
 * d 动画持续的时间
*/
var tween = {
	linear:function(t, b, c, d) {
		return c*t/d + b;
	},
	easeIn:function (t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	strongEaseIn:function(t, b, c, d) {
		return c * (t /= d) * t * t * t *t +b;
	},
	strongEaseOut:function(t, b, c, d) {
		return c * ( ( t = t /d -1) * t * t * t *t + 1) + b;
	},
	sineaseIn:function(t, b, c, d) {
		return c * (t /= d) * t * t +b;
	},
	sineaseOut:function(t, b, c, d) {
		return c * ( ( t = t / d -1)* t * t + 1) + b;
	}
};
