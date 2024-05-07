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
    // Object.create的原理：Object.create方法创建一个新对象，新对象的原型链指向传入的参数对象。

    // 手写Object.create
    function myObjectCreate(p) {

        if (p == null) throw TypeError();

        var t = typeof p;

        if (t !== 'object' && t !== 'function') throw TypeError();

        // - 返回了一个对象；
        // - 这个对象的原型，指向了这个函数 Function 的 prototype
        function F() { };

        F.prototype = p;

        return new F();
    }

    // 手写一个new
    function myNew(fn, ...args) {

        // 创建一个空对象，并将其原型指向构造函数的原型
        const obj = Object.create(fn.prototype);

        // 将构造函数的作用域赋给新对象
        const result = fn.apply(obj, args);

        // 如果构造函数返回一个对象，则返回该对象；否则，返回新创建的对象
        return (typeof result === 'object' && result !== null) ? result : obj;
    }

    // 定义一个父类
    function Animal(name) {
        this.name = name;
    }

    // 定义一个子类
    function Dog(name, breed) {
        Animal.call(this, name);
        this.breed = breed;
    }

    // 使用手写的Object.create创建一个新对象，并将其原型指向Animal.prototype
    const myDog = myObjectCreate(Animal.prototype);
    console.log(myDog); // {}

    // 使用手写的new创建一个Dog实例
    const myNewDog = myNew(Dog, "Max", "Labrador");
    console.log(myNewDog); // Dog { name: 'Max', breed: 'Labrador' }
    console.log(myNewDog instanceof Dog); // true
    console.log(myNewDog instanceof Animal); // true

};