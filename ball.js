class Ball {

    constructor() {

        this.pos = {x: 400, y: 400}

        this.w = 40
        this.h = 40

        this.angle = -Math.PI/2

        this.speed = 7.5

    }

    getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    changeDirection() {
        this.angle += Math.PI+this.getRandomNum(-Math.PI/6, Math.PI/6)
        //+this.getRandomNum(-Math.PI/4, Math.PI/4)
        if(this.speed < 60) {
            this.speed += 0.3
        }
        // this.pos.x += Math.cos(this.angle)*20
        // this.pos.y += Math.sin(this.angle)*20
    }

    update() {
        this.pos.x += Math.cos(this.angle)*this.speed
        this.pos.y += Math.sin(this.angle)*this.speed
    }

    reset() {
        this.pos = {x: 400, y: 400}

        this.w = 40
        this.h = 40

        this.angle = -Math.PI/2

        this.speed = 2
    }

}

module.exports = Ball