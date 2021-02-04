const ACCELERATION = 0.9
const FRICTION = -0.1

class Player {

    constructor(username, id, pos, orientation, color) {

        this.username = username
        this.id = id

        this.orientation = orientation
        if(this.orientation == "horizontal") {
            this.w = 400
            this.h = 25
        } else {
            this.w = 25
            this.h = 800
        }

        this.pos = {x: pos.x, y: pos.y}
        this.vel = {x: 0, y: 0}
        this.acc = {x: 0, y: 0}

        this.color = color

    }

    checkCollision(b) {
        let x = this.pos.x
        let y = this.pos.y
        let w = this.w
        let h = this.h

        let bX = b.pos.x;
        let bY = b.pos.y;
        let bW = b.w;
        let bH = b.h; 

        return x < bX+bW && x+w > bX && y < bY+bH && y+h > bY
    }

    update()  {

    }

}


module.exports = Player