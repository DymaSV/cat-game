function i2xy(index, mapWidth){
    let x = index % mapWidth;
    let y = Math.floor(index/mapWidth);
    return [x,y];
}

function xy2i(x, y, mapWidth){
    return y*mapWidth + x;
}

const DirectionEnum = {
    left: 0,
    right: 1,
    up: 2,
    down: 3,
    none: 4
};

const EnemyPositions = {
    left: [17, 18, 19, 20],
    right: [1, 2, 3, 4],
    up: [25, 26, 27, 28],
    down: [9, 10, 11, 12],
    none: [0]
};

const HeroPositions = {
    left: [12,13,14,15],
    right: [4,5,6,7],
    up: [8,9,10,11],
    down: [0,1,2,3],
    none: [17,18,19,20,21,22,22,22,22,22,22,22,22,23]
};

