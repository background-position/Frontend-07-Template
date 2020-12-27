//function renderMap() {}
class Map {
    constructor(n) {
        this.isLeftDown = false;
        this.isRightDown = false;
        this.n = n;
        this.mapData = new Array(n * n).fill(0);
        this.parent = document.getElementById('app');
        this.init();
    }
    init() {
        document.addEventListener('mousedown', ({ button }) => {
            button === 0 ? (this.isLeftDown = true) : (this.isRightDown = true);
        });
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                let child = document.createElement('div');
                child.addEventListener('mousemove', () => {
                    if (this.isLeftDown) {
                        this.setColor(i, j, 'red');
                    }
                });
                child.className = 'child';
                this.parent.appendChild(child);
            }
        }
    }
    setColor(y, x, color) {
        this.mapData[y * 100 + x] = 1;
        this.parent.children[y * 100 + x].style.background = color;
    }
    checkHasValue(y, x) {
        return this.mapData[y * 100 + x] === 0;
    }
    findPath(start, end) {
        if (this.checkHasValue(start) && this.checkHasValue(end)) {
            alert('当前的格子已经被禁用');
            return;
        }
        let table = {};
        let queue = [start];
        const insert = (x, y, pre) => {
            //获取周围的点
            if (x < 0 || x >= 100 || y < 0 || y >= 100) {
                //超出边界
                return;
            }
            if (!this.checkHasValue(x, y)) {
                return;
            }
            //记录当前的点
            table[y * 100 + x] = pre;
            this.setColor(x, y, 'yellow');
            queue.push([x, y]);
        };
        //当数组中还有点的时候
        while (queue.length) {
            // 插入周围的点
            //不停的获取当前里面的点
            //  1,4
            let [x, y] = queue.shift();
            if (x === end[0] && y === end[1]) {
                console.log('找到了');
                while (x !== start[0] || y !== start[1]) {
                    [x, y] = table[y * 100 + x];
                    console.log(x, y);
                    this.setColor(x, y, 'pink');
                }
                return;
            }

            insert(x, y - 1, [x, y]);

            insert(x, y + 1, [x, y]);
            insert(x - 1, y, [x, y]);

            insert(x + 1, y, [x, y]);
            insert(x - 1, y - 1, [x, y]);
            insert(x + 1, y + 1, [x, y]);
            insert(x + 1, y - 1, [x, y]);
            insert(x - 1, y + 1, [x, y]);
        }
    }
}
let p = new Map(100);
function saveMap(data) {
    localStorage.setItem('map_data', data);
}
