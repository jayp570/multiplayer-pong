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
                this.ball.changeDirection()
                break
            }
        }
    }

}


module.exports = Game