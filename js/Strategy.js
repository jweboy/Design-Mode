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
// 'use strict';
var strategies = {
  'S' : function (salary) {
    return salary * 4;
  },
  'A' :function (salary) {
    return salary * 3;
  },
  'B' : function (salary) {
    return salary * 2;
  }
};
var calculateBonus = function (level, salary) {
  return strategies[level](salary);
};
console.log(calculateBonus('S', 2000));
console.log(calculateBonus('A', 2000));
console.log(calculateBonus('B', 2000));
