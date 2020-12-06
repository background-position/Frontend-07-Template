let pattern = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

class checkerboard {
    constructor() {
        this.color = 1;
        this.pattern = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        this.app = document.getElementById('app');
    }
    isSuccess(y, x, color, pattern) {
        let flag = true;
        //横排
        for (let i = 0; i < 3; i++) {
            if (pattern[y][i] !== color) {
                flag = false;
            }
        }
        if (flag) {
            return flag;
        }
        //竖排
        flag = true;
        for (let i = 0; i < 3; i++) {
            if (pattern[i][x] !== color) {
                flag = false;
            }
        }
        if (flag) {
            return flag;
        }
        flag = true;
        //左下
        for (let i = 0; i < 3; i++) {
            if (pattern[i][i] !== color) {
                flag = false;
            }
        }
        if (flag) {
            return flag;
        }
        //右下
        for (let i = 0; i < 3; i++) {
            if (pattern[i][2 - i] !== color) {
                flag = false;
            }
        }
        if (flag) {
            return flag;
        }
    }
    show() {
        for (let y = 0; y < this.pattern.length; y++) {
            for (let x = 0; x < this.pattern[y].length; x++) {
                let child = document.createElement('div');
                child.className = 'child';
                this.pattern[y][x] === 1
                    ? (child.innerHTML = '√')
                    : this.pattern[y][x] === 2
                    ? (child.innerHTML = '×')
                    : (child.innerHTML = '');
                child.addEventListener('click', () => {
                    if (this.pattern[y][x]) {
                        return;
                    }
                    this.pattern[y][x] = this.color;
                    this.color === 1
                        ? (child.innerHTML = '√')
                        : (child.innerHTML = '×');
                    let flag = this.isSuccess(y, x, this.color, this.pattern);
                    if (flag) {
                        alert('获胜');
                    }
                    if (this.willWin(this.color, this.pattern)) {
                        alert('将会获胜');
                    }
                    let res = this.bestChoice(this.color, this.pattern);
                    console.log(res.result);
                    console.log(`res`, res);
                    this.color = 3 - this.color;
                });
                this.app.appendChild(child);
            }
        }
    }
    willWin(color, pattern) {
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                if (pattern[i][j]) {
                    continue;
                }
                let newPattern = clone(pattern);
                //深拷贝数据，防止当前数据被破坏，且保证每次进行深拷贝以后只和原数据相差一个值，防止重复计算
                newPattern[i][j] = color;
                if (this.isSuccess(i, j, color, newPattern)) {
                    //返回当前胜利的点
                    return [i, j];
                }
            }
        }
        return null;
    }
    bestChoice(color, pattern) {
        // 1 获胜  0 和局  -1 输掉比赛
        let p;
        if ((p = this.willWin(color, pattern))) {
            return {
                point: p,
                result: 1,
            };
        }
        //最低极限
        let result = -2;
        let point = null;
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                if (pattern[i][j]) {
                    continue;
                }
                let newPattern = clone(pattern);
                //落下我们自己的点
                newPattern[i][j] = color;
                //落下对方的点
                let r = this.bestChoice(3 - color, newPattern);
                if (-r > result) {
                    result = -r;
                    point = [j, i];
                }
            }
        }
        return {
            point,
            result: point ? result : 0,
        };
    }
}
function clone(target) {
    return JSON.parse(JSON.stringify(target));
}
let C = new checkerboard();
C.show();
