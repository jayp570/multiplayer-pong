let Ball = require("./ball")

class Game {

    constructor() {

        this.players = []

        this.ball = new Ball()

    }

    hasPlayer(side) {
        for(let player of this.players) {
            if(player.side == side) {
                return true
            }
        }
        return null
    }

    update() {

        for(let player of this.players)  {
            player.update()
        }

        if(this.players.length != 0) {
            this.ball.update()
        }


        for(let player of this.players) {
            if(player.checkCollision(this.ball)) {
                switch(player.side) {
                    case "left": this.ball.pos.x = player.pos.x+player.w; break;
                    case "right": this.ball.pos.x = player.pos.x-this.ball.h; break;
                    case "top": this.ball.pos.y = player.pos.y+player.h; break;
                    case "bottom": this.ball.pos.y = player.pos.y-this.ball.h; break;
                    default: break;
                }
                this.ball.changeDirection()
                break
            }
        }

        if(this.ball.pos.x < 0) {
            if(this.hasPlayer("left")) {
                this.ball.reset()
            } else {
                this.ball.pos.x = 0
                this.ball.changeDirection()
            }
        }
        if(this.ball.pos.x > 800-this.ball.h) {
            if(this.hasPlayer("right")) {
                this.ball.reset()
            } else {
                this.ball.pos.x = 800-this.ball.w
                this.ball.changeDirection()
            }
        }
        if(this.ball.pos.y < 0) {
            if(this.hasPlayer("top")) {
                this.ball.reset()
            } else {
                this.ball.pos.y = 0
            this.ball.changeDirection()
            }
        }
        if(this.ball.pos.y > 800-this.ball.h) {
            if(this.hasPlayer("bottom")) {
                this.ball.reset()
            } else {
                this.ball.pos.y = 800-this.ball.h
                this.ball.changeDirection()
            }
        }
        
    }

}


module.exports = Game