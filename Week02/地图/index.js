let parent = document.getElementById('app');
let mapData;
if (localStorage.getItem('mapData')) {
    mapData = JSON.parse(localStorage.getItem('mapData'));
} else {
    mapData = Array(10000).fill(0);
}
let isLeftDown = false;
let isRightDown = false;
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        let child = document.createElement('div');
        child.className = 'child';
        child.addEventListener('mousemove', () => {
            if (isLeftDown && !mapData[100 * i + j]) {
                mapData[100 * i + j] = 1;
                child.style.backgroundColor = 'red';
            }
        });
        if (mapData[100 * i + j]) {
            child.style.backgroundColor = 'red';
        }
        parent.appendChild(child);
    }
}
document.addEventListener('mousedown', ({ button }) => {
    button === 0 ? (isLeftDown = true) : (isRightDown = true);
});
document.addEventListener('mouseup', () => {
    isLeftDown = false;
    isRightDown = false;
});
function saveMapData() {
    localStorage.setItem('mapData', JSON.stringify(mapData));
}
async function findPath(map, start, end, pre) {
    let table = Object.create(mapData);
    let queue = [start];
    async function insert(x, y, pre) {
        if (x < 0 || x >= 100 || y < 0 || y >= 100) {
            //遇到边界
            return;
        }
        if (map[y * 100 + x]) {
            return;
        }
        await sleep();
        table[y * 100 + x] = pre;
        changeChildColor(x, y, 'green');
        //   parent.children[y * 100 + x].style.backgroundColor = 'green';
        map[y * 100 + x] = 2;
        queue.push([x, y]);
    }
    while (queue.length) {
        //取出当前队列的元素
        let [x, y] = queue.shift();
        console.log(x, y);
        if (x === end[0] && y === end[1]) {
            //当前到达终点
            changeChildColor(x, y, 'yellow');
            //   parent.children[y * 100 + x].style.backgroundColor = 'yellow';
            let path = [];
            while (x !== start[0] && y !== start[1]) {
                path.push(mapData[y * 100 + x]);
                [x, y] = table[y * 100 + x];
                changeChildColor(x, y, 'pink');
                //   parent.children[y * 100 + x].style.backgroundColor = 'pink';
            }
            return path;
        } else {
            //对所有的点进行周围遍历
            await insert(x - 1, y, [x, y]);
            await insert(x + 1, y, [x, y]);
            await insert(x, y - 1, [x, y]);
            await insert(x, y + 1, [x, y]);
            await insert(x - 1, y - 1, [x, y]);
            await insert(x - 1, y + 1, [x, y]);
            await insert(x + 1, y + 1, [x, y]);
            await insert(x - 1, y - 1, [x, y]);
        }
    }
}

function sleep(t = 100) {
    return new Promise((resolve) => {
        setTimeout(resolve, t);
    });
}
function run() {
    // let res = window.prompt('请输入要到达的位置');
    // let end = res.split(',');
    // console.log(end);
    findPath(mapData, [4, 0], [19, 25]);
    //   changeChildColor(4, 4, 'red');
}
function changeChildColor(x, y, clolor) {
    parent.children[y * 100 + x].style.backgroundColor = clolor;
}
