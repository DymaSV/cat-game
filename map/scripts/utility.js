function i2xy(index, mapWidth){
    let x = index % mapWidth;
    let y = Math.floor(index/mapWidth);
    return [x,y];
}

function xy2i(x, y, mapWidth){
    return y*mapWidth + x;
}
