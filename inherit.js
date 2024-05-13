function myInHerit() {

    // 原型继承
    function prototypeInHerit() {
        let son = function () { };
        let father = function () {
            this.hobby = () => {
                console.log('father 1');
            }

            // return {
            //     hobby: () => {
            //         console.log('father 1');
            //     }
            // };

            // 这里有个坑
            // 当你执行new father()时，你实际上得到的是father函数返回的那个对象，而不是一个带有father原型链上方法的新对象。如果father中return新对象，
            // 那就继承不了挂在father的prototype的hobby2方法
            // 因此，hobby2方法并没有被继承，因为它是直接添加到father.prototype上的，而不是返回的对象的原型上。

            // 这就是为什么console.log( (new son()).hobby2());会报错的原因。hobby2方法不在son实例的原型链上。
        }

        father.prototype.hobby2 = () => {
            console.log(111);
        }

        son.prototype = new father();
        son.prototype.constructor = son;

        console.log((new son()).hobby()); // father 1
        console.log((new son()).hobby2()); // 111， 如果father有return，那么这里会报错
    };
    prototypeInHerit();


    // 构造函数继承
    function nweFnInHerit() {
        let father = function (name) {
            this.name = name;
            this.age = 18;
        }

        let son = function (name) {

            // 继承正常方法属性
            father.call(this, name);
        };

        console.log(new son().age); // 18
        console.log(new son('son1').name); // son1
    };
    nweFnInHerit();


    // 组合继承
    function combinationInHerit() {
        function son() {
            father.call(this);
        };
        function father() {
            this.name = 'father';
        };
        father.prototype.hobby = () => {
            console.log(111);
        }

        son.prototype = new father();
        son.prototype.constructor = son;

        console.log(new son().name); // father
        console.log(new son().hobby()); // 111
    };
    combinationInHerit();

    // 组合派生式继承
    function combinedParasitism() {
        function son() {
            father.call(this);
        };
        function father() {
            this.name = 'father';
        };
        father.prototype.hobby = () => {
            console.log(111);
        }

        // 区别
        son.prototype = Object.create(father.prototype); // 创建一个父类原型的副本
        son.prototype.constructor = son;

        console.log(new son().name); // father
        console.log(new son().hobby()); // 111
    };
    combinedParasitism();


    // class继承
    function classInherit() {
        class father {
            constructor(name) {
                this.name = name;
            }

            speak() {
                console.log(111);
            }
        }

        class son extends father {
            // 必须在 constructor 调用 super, 因为子类自己的 this 对象，必须先通过 父类的构造函数完成。super负责初始化继承自父类的部分
            constructor(name) {
                super(name);
            }

            speak() {
                console.log(222, this.name);
            }

            speak() {
                console.log(333, this.name);
            }
        }

        let newSon = new son('Rex');
        newSon.speak(); // 333, Rex
    };
    classInherit();




    // 手写JS的new原理：new关键字用于创建一个新对象，它会将构造函数与新对象关联起来，并将新对象作为this关键字传递给构造函数，最后返回这个新对象。
    // Object.create的原理：Object.create方法创建一个新对象，新对象的原型链指向传入的参数对象。核心原理就是原型继承

    // 手写Object.create
    // 定义一个函数 myObjectCreate，接收一个参数 p
    function myObjectCreate(p) {

        // // 如果参数 p 是 null，则抛出一个类型错误异常
        // if (p == null) throw TypeError();

        // // 获取参数 p 的类型
        // var t = typeof p;

        // // 如果 p 的类型既不是 'object' 也不是 'function'，则抛出一个类型错误异常
        // if (t !== 'object' && t !== 'function') throw TypeError();

        // 定义一个空函数 F
        function F() { };

        // 将函数 F 的原型指向参数 p
        F.prototype = p;

        // 创建一个 F 的实例，这个实例的原型链上会有参数 p
        return new F();
    }

    // 手写一个new
    function myNew(fn, ...args) {

        // 需要前置判断fn是否是函数，不是函数就抛出错误； 判断有无args

        // 创建一个空对象，并将其原型指向构造函数的原型
        const obj = Object.create(fn.prototype);

        // 将构造函数的作用域赋给新对象（获取构造函数返回结果）
        const result = fn.apply(obj, args);

        // 如果构造函数返回一个对象，则返回该对象；否则，返回新创建的对象
        // 这是因为在 JavaScript 中，如果构造函数显式返回一个对象（使用return返回一个对象），那么这个对象将作为 new 操作的结果返回。
        return (typeof result === 'object' && result !== null) ? result : obj;
    }

//     在JavaScript中，函数的返回值取决于函数体内的return语句。如果函数没有return语句，或者return后面没有任何表达式，则函数返回undefined。

    // 根据您提供的代码，我们可以分别分析这三个函数：

    // function a() {}
    // 这个函数a没有return语句，所以它的返回值是undefined。

    // function b() { this.ccc = 111 }
    // 这个函数b同样没有return语句，它在函数体内给this对象添加了一个属性ccc并赋值为111。如果这个函数作为构造函数使用（即通过new b()来调用），那么它会返回一个新对象，这个新对象将拥有一个名为ccc的属性，值为111。如果函数不是作为构造函数调用，那么this的值取决于调用上下文，但函数的返回值仍然是undefined。

    // function c() { return { ccc: 222 } }
    // 这个函数c有一个return语句，它返回一个对象字面量{ ccc: 222 }。所以这个函数的返回值是一个对象，这个对象有一个属性ccc，其值为222。




    let a = {}; // a是一个普通对象，其[[Prototype]]是Object.prototype

    let b = Object.create(a); // b的[[Prototype]]是a，因此b有两层[[Prototype]]

    let c = Object.create(b); // c的[[Prototype]]是b，因此c有三层[[Prototype]]


    // 为什么Object.create(a.__proto__)只有一层[[Prototype]]
    // 由于a是一个普通对象，a.__proto__实际上就是Object.prototype，这是大多数对象的默认原型。

    // 因此，Object.create(a.__proto__)创建的新对象直接继承自Object.prototype，它只有一层[[Prototype]]。







    
};