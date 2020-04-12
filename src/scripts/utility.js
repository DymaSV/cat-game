export function i2xy(index, mapWidth){
    let x = index % mapWidth;
    let y = Math.floor(index/mapWidth);
    return [x,y];
}

export function xy2i(x, y, mapWidth){
    return y*mapWidth + x;
}

export const DirectionEnum = {
    left: 0,
    right: 1,
    up: 2,
    down: 3,
    none: 4
}