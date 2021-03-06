const { futimesSync } = require("fs");

const express = require("express")
const path = require("path")
const app = require("express")()
const http = require("http").Server(app)
const io = require("socket.io")(http)

app.use(express.static(__dirname + '/static'));



let Player = require("./player")
let Game = require("./game")

let game = new Game()

let playerParams = {
    0: {
        pos: {
            x: 0,
            y: 25
        },
        color: "tomato",
        side: "top",
    },
    1: {
        pos: {
            x: 0,
            y: 800-25*2
        },
        color: "dodgerblue",
        side: "bottom",
    },
    2: {
        pos: {
            x: 25,
            y: 0
        },
        color: "mediumseagreen",
        side: "left"
    },
    3: {
        pos: {
            x: 800-25*2,
            y: 0
        },
        color: "orange",
        side: "right"
    }
}



io.sockets.on("connection", function(socket) {

    socket.spectator = false

    if(game.players.length >= 4) {
        socket.spectator = true
    }

    socket.playerId = Math.random()
    if(socket.spectator == false) {
        game.players.push(new Player("", socket.playerId, playerParams[game.players.length].pos, playerParams[game.players.length].side, playerParams[game.players.length].color))
    }

    socket.on("join", function(username) {
        for(let player of game.players) {
            if(player.id == socket.playerId) {
                player.username = username
                break
            }
        }
        console.log(username+" joined")
    })

    socket.on("mouseMove", function(mousePos) {
        for(let player of game.players) {
            if(player.id == socket.playerId) {
                if(player.side == "bottom" || player.side == "top") {
                    player.pos.x = mousePos.x-player.w/2
                } else {
                    player.pos.y = mousePos.y-player.h/2
                }
            }
        }
    })

    socket.on("reset", function(a) {
        game.ball.reset()
    })

    socket.on("disconnect", function(username) {
        for(let i = 0; i < game.players.length; i++) {
            if(game.players[i].id == socket.playerId) {
                console.log(game.players[i].username+" left")
                game.players.splice(i, 1)
                break
            }
        }
        for(let i = 0; i < game.players.length; i++) {
            game.players[i] = new Player(game.players[i].username, game.players[i].id, playerParams[i].pos, playerParams[i].side, playerParams[i].color)
        }
    }) 
}) 

setInterval(function() {
    game.update()
    io.emit("update", game)
}, 1000/60);

//process.env.PORT
http.listen(process.env.PORT, function() {
    console.log("server running")
})