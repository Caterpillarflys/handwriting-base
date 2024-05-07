// this指向
// fn.call(obj, a, b, c, ...)
Function.prototype.myCall = function(obj, ...rest) {
    obj['fn'] = this;
    let result = obj['fn'](...rest);
    delete obj['fn'];

    return result;
}

// fn.apply(obj, array)
Function.prototype.myApply = function(obj, arr) {
    obj['fn'] = this;
    let result = obj['fn'](...arr)

    delete obj['fn'];

    return result;
}

// fn.bind(obj, ...rest)
Function.prototype.myBind = function(obj, ...rest) {

    return (params) => {
        return this.myApply(obj, rest.concat(params));
    }
}

function test(rest, rest2, rest3,) {
    console.log(this.a, rest,rest2,rest3);
}
let obj = {
    a: 111
}
// test.myCall(obj, 222, 333) //111 222
// test.myApply(obj, [222,333])// 111 222
// test.myBind(obj, 222, 333)(444); //111 222 333 444


// a instanceof A
function myInstanceOf (left, right) {
    let proto = left.__proto__;
    while(proto!==null) {
        if(proto === right.prototype) {
            return true
        }
    }
    return false;
}
function A () {}
let a = new A()
// console.log(myInstanceOf(a, A)); // true


// prototype inhert
function father () {
    this.a = 111;
}
function son () {}
son.prototype = new father()
son.prototype.constructor = son;
// console.log(new son().a) // 111


// newFn inhert
function father2 () {
    this.a = 222
}
function son2 () {
    father2.call(this)
}
// console.log(new son2().a) // 222


// merge inhert
function father3 () {
    this.a = 333
}
function son3() {
    father3.call(this)
}
son3.prototype = new father3()
son3.prototype.constructor = son3;
// console.log(new son3().a) //333


// merge parasitize inhert
function father4 () {
    this.a = 444
}
function son4() {
    father4.call(this)
}
son4.prototype = Object.create(father4.prototype)
son4.prototype.constructor = son4;
// console.log(new son4().a) //444

// class inhert
class father5 {
    constructor() {
        this.a = 555
    }
}
class son5 extends father5 {
    constructor(name) {
        super(name)
    }

    consoleA () {
        return this.a
    }
}
// console.log(new son5().consoleA()) // 555






// 函数柯里化
// 把一个包含多个参数的函数，拆分成多个只有一个参数的函数，用于创建高度可配置的代码，以及在函数式编程中进行函数组合和重用。

// ex1：
function add (a, b, c) {
    return a + b + c;
}

function addCurry (a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        }
    }
}

// ex2: 实现累加函数
// curryFn(1)(2)(3); // 6
// curryFn(1, 2)(3); // 6
// curryFn(1, 2, 3); // 6

// 思路： 可以多次调用，首先外层函数的参数就是一个函数, 其次由于要多次调用，返回值是一个函数
function curryFn (add) {
    return function curried(...args) {
        if (args.length >= add.length) {
            return add.apply(this, args);
        }
        return function (...args2) {
            return curried.apply(this, args.concat(args2))
        }
    }
}