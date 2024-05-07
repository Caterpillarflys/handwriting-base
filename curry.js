// 函数柯里化（Currying）是函数式编程中的一个概念，它指的是将一个接受多个参数的函数转换成一系列使用一个参数的函数。柯里化的函数通常会返回一个新的函数，
// 这个新的函数会接受下一个参数，这个过程会一直进行下去，直到所有参数都被处理完毕。


// 函数柯里化的意义：

// 参数复用：柯里化可以帮助我们固定一些参数，生成一个新的函数，这样在多次调用中可以避免重复传递相同的参数。

// 提前返回：柯里化的函数可以在接收到足够的参数之前先返回一个新的函数，等待剩余的参数。这种方式可以用于延迟计算或者运行。

// 延迟计算/运行：柯里化可以创建一个延迟执行的函数，直到收集齐所有需要的参数之后，才执行原函数的逻辑。

// 动态生成函数：通过柯里化，可以根据不同的需求动态地生成不同的函数。

// 更好的函数组合和流程控制：柯里化有助于函数的组合，可以将小的、可复用的函数组合成复杂的函数。



// 在JavaScript中，柯里化可以手动实现，也可以使用第三方库如Lodash的_.curry方法来实现。下面是一个简单的柯里化函数的手动实现示例：

function curry(fn) {
    return function curried(...args) {
        // 如果提供的参数数量足够，则直接调用原函数
        if (args.length >= fn.length) {
            // fn.length是固定的，就是sum的参数个数，这里固定是3
            // args是每次调用curried的参数，curriedSum(1)(2)(3)调用时，atgs都是1，curriedSum(1, 2)(3)调用时，第一次是2，第二次是1，
            // curriedSum(1, 2, 3)调用时是3

            // 这里绑定this是必要的，因为不绑定this为调用者，this可能会指向错误的上下文
            // 例如: 函数中使用了this，这是需要绑定this为obj，否则返回值就会错误
            //   const obj = {
            //     value: 100,
            //     add(a, b, c) {
            //       return this.value + a + b + c;
            //     }
            //   };

            //   const curriedAdd = curry(obj.add);
            return fn.apply(this, args);
        } else {
            // 否则返回一个新的函数，等待剩余参数
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    };
}

// 使用示例
function sum(a, b, c) {
    return a + b + c;
}

const curriedSum = curry(sum);

// console.log(curriedSum(1)(2)(3)); // 输出 6
// console.log(curriedSum(1, 2)(3)); // 输出 6
// console.log(curriedSum(1, 2, 3)); // 输出 6

// 在上面的代码中，curry函数接受一个函数fn作为参数，并返回一个新的函数curried。这个新的函数会检查已经接收到的参数数量是否足够，
// 如果不足够，它会返回另一个函数来接收更多的参数。这个过程会一直持续，直到收集到足够的参数，然后原始函数fn会被调用。

// 柯里化的函数非常适合于创建高度可配置的代码，以及在函数式编程中进行函数组合和重用。





// 举个简单的例子，假设有一个三参数的函数 add：
function add(a, b, c) {
    return a + b + c;
}

// 我们可以将其柯里化为：
function curryAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

let addOne = curryAdd(1); // 固定第一个参数为1
let addOneAndTwo = addOne(2); // 进一步固定第二个参数为2
// console.log(addOneAndTwo(3)); // 输出6，此时只需要传入最后一个参数















// HTML测试代码
function fnCurry () {
    console.log(curriedSum(1)(2)(3)); // 输出 6
    console.log(curriedSum(1, 2)(3)); // 输出 6
    console.log(curriedSum(1, 2, 3)); // 输出 6
}
