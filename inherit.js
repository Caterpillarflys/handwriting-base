function myInHerit () {

    // 原型继承
    function prototypeInHerit () {
        let son = function () {};
        let father = function  ()  {
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
    
        console.log( (new son()).hobby()); // father 1
        console.log( (new son()).hobby2()); // 111， 如果father有return，那么这里会报错
    };
    prototypeInHerit();


    // 构造函数继承
    function nweFnInHerit () {
        let father = function(name) {
            this.name = name;
            this.age = 18;
        }

        let son = function(name) {

            // 继承正常方法属性
            father.call(this, name);
        };

        console.log( new son().age ); // 18
        console.log( new son('son1').name ); // son1
    };
    nweFnInHerit();


    // 组合继承
    function combinationInHerit () {
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

        console.log( new son().name ); // father
        console.log( new son().hobby() ); // 111
    };
    combinationInHerit();

    // 组合派生式继承
    function combinedParasitism () {
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
        son.prototype = Object.create(father.prototype);
        son.prototype.constructor = son;

        console.log( new son().name ); // father
        console.log( new son().hobby() ); // 111
    };
    combinedParasitism();


    // class继承
    function classInherit () {
        class father {
            constructor(name) {
                this.name = name;
            }

            speak() {
                console.log(111);
            }
        }

        class son extends father {
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

};