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
async function path(map, start, end) {
    let queue = [start];
    async function insert(x, y) {
        if (x < 0 || x >= 100 || y < 0 || y >= 100) {
            //遇到边界
            return;
        }
        if (map[x * 100 + y]) {
            return;
        }
        await sleep();
        parent.children[x * 100 + y].style.backgroundColor = 'green';
        map[x * 100 + y] = 2;
        queue.push([x, y]);
    }
    while (queue.length) {
        //取出当前队列的元素
        let [x, y] = queue.shift();
        console.log(x, y);
        if (x === end[0] && y === end[1]) {
            //当前到达终点
            parent.children[x * 100 + y].style.backgroundColor = 'pink';
            return true;
        }
        //对所有的点进行周围遍历
        await insert(x - 1, y);
        await insert(x + 1, y);
        await insert(x, y - 1);
        await insert(x, y + 1);
    }
}

function sleep(t = 100) {
    return new Promise((resolve) => {
        setTimeout(resolve, t);
    });
}
