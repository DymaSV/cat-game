class Collision{
    detectCollision (obj1, obj2) {
        if (obj1.x < obj2.x + obj2.collisionWidth &&
            obj1.x + obj1.collisionWidth > obj2.x &&
            obj1.y < obj2.y + obj2.collisionHeight &&
            obj1.y + obj1.collisionHeight > obj2.y) {
            return true;
        }
        return false;
    }
}
