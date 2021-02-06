let Ball = require("./ball")

class Game {

    constructor() {

        this.players = []

        this.ball = new Ball()

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
    }

}


module.exports = Game