let parent = document.getElementById('app');
let mapData;
if (localStorage.getItem('mapData')) {
    mapData = JSON.parse(localStorage.getItem('mapData'));
} else {
    mapData = Array(900).fill(0);
}
let isLeftDown = false;
let isRightDown = false;
for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 30; j++) {
        let child = document.createElement('div');
        child.className = 'child';
        child.addEventListener('mousemove', () => {
            if (isLeftDown && !mapData[100 * i + j]) {
                mapData[30 * i + j] = 1;
                child.innerHTML = '❌';
            }
        });
        if (mapData[30 * i + j]) {
            child.innerHTML = '❌';
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
