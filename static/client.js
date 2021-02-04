let socket = io.connect("https://multiplayer-pong123456789.herokuapp.com/")

let username = prompt("Enter your username")
socket.emit("join", username.trim())



let canvas = document.querySelector("canvas");

canvas.width = 800;
canvas.height = 800;

let g = canvas.getContext("2d");

function emitReset() {
    socket.emit("reset", {})
}


class Renderer {

    constructor() {

    }

    drawPlayer(x, y, w, h, username, color) {
        g.fillStyle = color
        g.fillRect(x, y, w, h)
        g.textAlign = "center"
        g.fillStyle = "white"
        g.fillText(username, x+w/2, y+15)
    }

    drawBall(x, y, r) {
        g.fillStyle = "white"
        g.beginPath();
        g.arc(x+r/2, y+r/2, r/2, 0, 2*Math.PI, false);
        g.fill();
    }

    draw()  {
        for(let player of clientGame.players) {
            this.drawPlayer(player.pos.x, player.pos.y, player.w, player.h, player.username, player.color)
        }
        this.drawBall(clientGame.ball.pos.x, clientGame.ball.pos.y, clientGame.ball.w)
    }

}


window.addEventListener('mousemove', mouseMoveHandler, false);

function mouseMoveHandler(e) {

    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    socket.emit("mouseMove", {x: mouseX, y: mouseY})

}

let clientGame = null
socket.on("update", function(game) {
    clientGame = game
})

let renderer = new Renderer()


function animate() {
    requestAnimationFrame(animate);
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.fillStyle = "#222"
    g.fillRect(0, 0, canvas.width, canvas.height)

    if(clientGame != null)  {
        renderer.draw()
    }
}

animate()
