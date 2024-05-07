function myThis () {

    // fn.call(obj, a, b, c, ...)

    Function.prototype.myCall = function (obj, ...args) {

        // obj参数容错处理
        // if (!obj) {
        //     obj = typeof window === 'undefined' ? global : window;
        // }

        // obj参数容错处理
        // if (typeof obj !== 'object') {
        //     obj = Object(obj);
        // }

        // 使用 Symbol 防止属性名冲突
        // const fnSymbol = Symbol();

        // 核心实现
        obj['fn'] = this;

        let result = obj['fn'](...args);

        delete obj['fn'];

        return result;
    }

    // fn.apply(obj, [a, b, c, ...])
    Function.prototype.myApply = function (obj, list) {

        // obj、list参数容错处理，对list的类型判断非空判断

        // 核心实现
        obj['fn'] = this;

        // 这里修正一个点,apply是会展开list的,这内部和call一模一样
        let result = obj['fn'](...list);
        delete obj['fn'];

        return result;
    }

    // fn.bind(obj, a, b, c, ...)()
    Function.prototype.myBind = function (obj, ...args) {


        // 核心实现
        return (callArgs) => this.myApply(obj, args.concat(callArgs));

        // 相当于call或apply套一层函数
        // return () => {
        //     obj['fn'] = this;
        //     let result = obj['fn'](args);
        //     delete obj['fn'];
        //     return result;
        // }
    }


    // 测试
    function showThis() {
        console.log(this);
    }
    
    let obj1 = { name: 'obj1' };

    showThis(); // 输出：Window
    showThis.myCall(obj1); // 输出：{ name: 'obj1' }
    showThis.myApply(obj1, []); // 输出：{ name: 'obj2' }
    showThis.myBind(obj1)(); // 输出：{ name: 'obj1' }


    // 一、
    console.log(this); // Window, 此处是{title: '测试this', action: ƒ}

    // 二、
    var obj2 = {
        name: 'obj',
        logName: () => {
            console.log(this);
        }
    };
    obj2.logName(); // 全局作用域Window， 此处是{title: '测试this', action: ƒ}

    // 三、
    var obj3 = {
        name: 'obj',
        logName: function() {
            console.log(this.name);
        }
    };
    obj3.logName(); // obj, 对象作用域

    // 四、
    function Person(name) {
        this.name = name;
    }
    var person = new Person('Alice');
    console.log(person.name); // Alice

    // 五、
    function sayName() {
        console.log(this.name);
    }
    var person = { name: 'Charlie' };
    var boundSayName = sayName.bind(person);
    boundSayName();// Charlie
    // 即使你使用window.boundSayName()的方式调用它，由于boundSayName已经被绑定到person对象，this仍然会指向person，而不是window。

    // 六、
    function Timer() {
        this.seconds = 0;
        setTimeout(function() {
          this.seconds++;
          console.log(this.seconds);
        }, 1000);
    }
    var timer = new Timer(); // NaN
    // setTimeout的回调函数默认this全局对象

    // 七、
    const obj4 = {
        a: 10,
        b: function() {
          return function() {
            return this.a;
          };
        }
    };
    const innerFunc = obj4.b(); 
    innerFunc(); // undefined

    const obj22 = {
        a: 10,
        b: function() {
          return () => {
            return this.a;
          };
        }
    };
    const innerFunc2 = obj22.b(); 
    innerFunc2(); //10

    // 八、
    const obj444 = {
        a: 20,
        b: () => {
          return this.a;
        },
        c: function() {
          return this.a;
        }
    };
    
    obj444.b() // undefined
    obj444.c() // 20

    // 九、
    function MyConstructor() {
        this.a = 10;
        setTimeout(function() {
          this.a = 20;
        }, 1000);
      }
      const instance = new MyConstructor();
      instance.a // 10


    // 十、
    function myFunc() {
        return this.a + this.b;
      }
    const obj1111 = { a: 10, b: 20 };
    const obj2222 = { a: 1, b: 2 };
    const boundFunc = myFunc.bind(obj1111);
    boundFunc.call(obj2222) // 30
    // .bind() 方法会创建一个新的函数，这个函数的 this 永远绑定为.bind() 方法传入的第一个参数
    // ，即使之后使用 .call() 或 .apply() 方法也无法改变 this 的指向

    // 十一、
    var obj555 = {
        name: 'obj',
        getName: function() {
          return this.name;
        }
    };
    var getName = obj555.getName;
    var obj222 = { name: 'obj2', getName };
    console.log(obj555.getName(), getName(), obj222.getName());
    // obj undefined obj2

    // 十二、
    function Foo() {
        this.user = 'foo';
        return { user: 'bar' };
    }
    var instance2 = new Foo();
    console.log(instance2.user); // bar
    // 返回一个对象，则返回这个对象;没有返回对象（或返回非对象类型的值），则返回 this

    // 十三、
    var name = 'aaa';
    var obj1232131 = {
        name: 'obj',
        arrowGetName: () => this.name,
        regularGetName: function() {
            return this.name;
        }
    };
    console.log(obj1232131.arrowGetName(), obj1232131.regularGetName()); // aaa（window环境打印aaa，node环境打印undefined） obj

    // 十四、
    function sayName() {
        console.log(this.name);
    }
    var person1 = { name: 'John' };
    var person2 = { name: 'Jane' };
    var sayNameJohn = sayName.bind(person1);
    sayNameJohn(); // John
    sayNameJohn.bind(person2)(); // John
    // 当你使用 bind 方法时，它会创建一个新的包装函数，
    // 这个包装函数会将你绑定的 this 值和参数传递给原始函数。
    // 这个过程是不可逆的，因为包装函数中的 this 已经固定下来了。
    // 如果非要改变，可以修改改变绑定的对象的属性达到改变this
    // let obj = { value: 'initial' };

    // function showValue() {
        // console.log(this.value);
    // }

    // let boundShowValue = showValue.bind(obj);

    // // 调用绑定的函数
    // boundShowValue(); // 输出: initial

    // // 改变对象的属性
    // obj.value = 'changed';

    // // 再次调用绑定的函数
    // boundShowValue(); // 输出: changed

    // 十五、
    var length = 2
    function outer() {
        var length = 5;
        var objobj = {
            length: 0,
            method: function(fn) {
                fn();
                arguments[0]();
            }
        };
        objobj.method(function() {
            console.log(this.length); // 打印两次，2、1
        });
        // fn直接调用this指向window。arguments[0]是对fn的引用，指向arguments对象，有一个length属性，是传递给函数的参数个数，是1
    }
    outer();

    // 十六、
    class MyClass {
        constructor() {
          this.name = 'MyClass';
          this.sayName2 = this.sayName2.bind(this);
        }
        sayName2() {
          console.log(this.name); // MyClass
        }
      }
    const obj = new MyClass();
    const { sayName2 } = obj;
    sayName2();

    // 十七、
    Function.prototype.bind = function(context) {
        var self = this;
        return function() {
            return self.apply(context, arguments);
        };
    };
    function foo() {
        console.log(this.bar);
    }
    var obj333 = { bar: 'bar' };
    var boundFoo = foo.bind(obj333);
    boundFoo(); // bar
    foo.bind({ bar: 'baz' })(); // bar

};
