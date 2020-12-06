// 15*15
let initValue = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
class creatCheckerboard {
    constructor(num) {
        this.num = num || 15;
        this.transverseList = [];
        this.verticalList = [];
        this.cbliqueRighList = [];
        this.cbliqueLeftList = [];
        this.checkerboard = initValue;
        console.log(this.checkerboard);
        this.parent = document.getElementById('app');
        this.color = 1;
    }
    show() {
        //创建棋盘
        this.parent.innerHTML = '';
        this.checkerboard.forEach((item, indexX) => {
            item.forEach((itemChild, indexY) => {
                let child = document.createElement('div');
                child.className = 'child';
                child.innerHTML =
                    itemChild === 1 ? '×' : itemChild === 2 ? '√' : '';
                child.style.color = itemChild === 1 ? 'red' : '#ffffff';
                child.addEventListener('click', () => {
                    if (this.checkerboard[indexX][indexY]) {
                        return;
                    }
                    this.setNewCheckerboard(indexX, indexY, this.color);
                });
                this.parent.appendChild(child);
            });
        });
    }
    setNewCheckerboard(x, y, color) {
        this.checkerboard[x][y] = color;
        this.checkIsSuccess(x, y, this.color, this.checkerboard);
        console.log(this.willWin(this.color));
        this.color = 3 - color;
        this.show();
    }
    checkIsSuccess(x, y, color, checkerboard) {
        let newcheckerboard = clone(checkerboard);
        if (
            this.checkTransverse(x, y, color, newcheckerboard) ||
            this.checkVertical(x, y, color, newcheckerboard) ||
            this.checkCbliqueRight(x, y, color, newcheckerboard) ||
            this.checkCbliqueLeft(x, y, color, newcheckerboard)
        ) {
            alert(`${color == 1 ? '×获胜' : '√获胜'}`);
        } else {
        }
    }
    checkTransverse(x, y, color, newcheckerboard) {
        let startLeft;
        let endRight;
        if (y <= 4) {
            startLeft = 0;
            endRight = y + 4;
        } else if (y > this.num - 5) {
            startLeft = y - 4;
            endRight = this.num - 1;
        } else {
            startLeft = y - 4;
            endRight = y + 4;
        }
        console.log(startLeft, endRight);
        let res = [];
        for (let i = startLeft; i <= endRight; i++) {
            res.push(newcheckerboard[x][i]);
        }
        this.transverseList = res;
        return this.checkIshas(res, color);
    }
    checkVertical(x, y, color, newcheckerboard) {
        let startTop;
        let endBottom;
        if (x <= 4) {
            startTop = 0;
            endBottom = x + 4;
        } else if (x > this.num - 5) {
            startTop = x - 4;
            endBottom = this.num - 1;
        } else {
            startTop = x - 4;
            endBottom = x + 4;
        }
        console.log(startTop, endBottom);
        let res = [];
        for (let i = startTop; i <= endBottom; i++) {
            res.push(newcheckerboard[i][y]);
        }
        this.verticalList = res;
        return this.checkIshas(res, color);
    }
    checkCbliqueLeft(x, y, color, newcheckerboard) {
        let startXTop = x;
        let startYTop = y;
        let endY = y;
        let endX = x;
        while (startXTop > 0 && startYTop > 0) {
            startXTop = startXTop - 1;
            startYTop = startYTop - 1;
        }
        while (endX < this.num - 1 && endY < this.num - 1) {
            endX = endX + 1;
            endY = endY + 1;
        }
        let flag = endX - startXTop + 1;
        let res = [];
        while (flag) {
            res.push(newcheckerboard[startXTop][startYTop]);
            startXTop = startXTop + 1;
            startYTop = startYTop + 1;
            flag = flag - 1;
        }
        this.cbliqueLeftList = res;
        return this.checkIshas(res, color);
    }
    checkCbliqueRight(x, y, color, newcheckerboard) {
        let startXTop = x;
        let startYTop = y;
        while (startXTop > 0 && startYTop < this.num - 1) {
            startXTop = startXTop - 1;
            startYTop = startYTop + 1;
        }
        let flag = startYTop - startXTop + 1;
        let res = [];
        while (flag) {
            res.push(newcheckerboard[startXTop][startYTop]);
            startXTop = startXTop + 1;
            startYTop = startYTop - 1;
            flag = flag - 1;
        }
        this.cbliqueRighList = res;
        return this.checkIshas(res, color);
    }
    willWin(color) {
        //  let transverseList=clone(this.transverseList)
        let transverseList = this.transverseList.map((e) => {
            return !e ? color : e;
        });
        if (this.checkIshas(transverseList, color)) {
            return true;
        }
        let verticalList = this.verticalList.forEach((e) => {
            return !e ? color : e;
        });
        if (this.checkIshas(verticalList, color)) {
            return true;
        }
        let cbliqueLeftList = this.cbliqueLeftList.forEach((e) => {
            return !e ? color : e;
        });
        if (this.checkIshas(cbliqueLeftList, color)) {
            return true;
        }
        let cbliqueRighList = this.cbliqueRighList.forEach((e) => {
            return !e ? color : e;
        });
        if (this.checkIshas(cbliqueRighList, color)) {
            return true;
        }
        return false;
    }
    checkIshas(arr, color) {
        let index = 0;
        let count = 0;
        while (index < arr.length) {
            if (arr[index] === color) {
                count = count + 1;
                if (count === 5) {
                    return true;
                }
            } else {
                count = 0;
            }
            index = index + 1;
        }
        return false;
    }
}
let p = new creatCheckerboard(15);
p.show();
function clone(arr) {
    return JSON.parse(JSON.stringify(arr));
}
