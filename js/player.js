
let x = canvas.width / 2
let y = 0
let velocity = 0.2
let gravity = 0.5
const speed = 5
let isJumping = false

class player {
    constructor({ position, imagesrc }) {
        this.position = position
        this.image = new Image()
        this.image.src = imagesrc
        this.sizes = { width: 0, height: 0 }

        this.image.onload = () => {
            this.loaded = true
            this.sizes.width = this.image.width
            this.sizes.height = this.image.height
        }
    }
    draw() {
        if (!this.image) return
        c.drawImage(this.image, x - cameraOffset.x, y - cameraOffset.y, this.sizes.width, this.sizes.height)
    }
    update() {
        this.draw()
    }
}
const keys = {}
const players = new player({
    position: {
        x: 0,
        y: 0
    },
    imagesrc: './asset/player.png'
})

