## DP

> 动态规划是指将问题分解成子问题来进行求解,子问题的解缓存起来,从而实现简单问题到复杂问题的求解

-   将一个大的问题拆分成一个个子问题，我们把它称之为子结构
-   每个最优解，也就是最优值均由[这些小规模子问题]推到而来
-   更重要的就是利用历史记录，来避免我们重复的计算

### 斐波那契数列

有这样一个数列 1，2，3，5，8，13，.......n
求 n  
n= arr[n-2]+arr[n-1]

```js
function f(n) {
    if (n == 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    return f(n - 1) + f(n - 2);
}
```

上面这个方法会重复的计算 ，因为本次的 n-2 相当于下一次的 n-1

```js
let Mycache = {
    1: 1,
    2: 2,
};
console.time('-------');
function f(n) {
    if (Mycache[n]) {
        return Mycache[n];
    } else {
        Mycache[n] = f(n - 1) + f(n - 2);
        return f(n - 1) + f(n - 2);
    }
}
console.timeEnd('---------');
```
