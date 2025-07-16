
let x = canvas.width / 2
let y = 0
let velocity = 0.2
let gravity = 0.5
const speed = 5
let isJumping = false

class Player {
    constructor({ position, imagesrc }) {
        this.position = position
        this.image = new Image()
        this.image.src = imagesrc
        this.sizes = { width: 0, height: 0 }
        this.frameX  // frame horizontal (0 - 3)
        this.maxFrame = 8
        this.frameTimer = 0
        this.frameInterval = 10 // Semakin kecil, semakin cepat animasi

        this.image.onload = () => {
            this.loaded = true
            this.sizes.width = this.image.width / this.maxFrame
            this.sizes.height = this.image.height
        }
    }
    draw() {
        if (!this.loaded) return

        c.drawImage(
            this.image,
            this.frameX * this.sizes.width, 0,            // Ambil frame dari X
            this.sizes.width, this.sizes.height,          // Ukuran 1 frame
            x - cameraOffset.x, y - cameraOffset.y,       // Posisi player
            this.sizes.width, this.sizes.height           // Ukuran tampil
        )
    }

    update() {
        this.draw()
        // Ubah frame animasi berjalan
    }
    moveright() {
        this.frameTimer++
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0
            this.frameX++
            if (this.frameX > 2) this.frameX = 0 // Loop di frame 1 dan 2
        }
  
    }  
    jumpl() {
        this.frameX = 6
    }

    moveleft() {
        this.frameTimer++
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0
            this.frameX++
            if (this.frameX > 5) this.frameX = 3 // Loop di frame 1 dan 2
        }

    }
    setAction(action) {
        if (this.currentAction !== action) {
            this.currentAction = action
            switch (action) {
                case 'idler':
                    this.frameX = 1
                    break
                case 'idlel':
                    this.frameX = 4
                    break
                case 'left':
                    this.frameX = 3
                    break
                case 'right':
                    this.frameX = 1
                    break
                case 'jumpr':
                    this.frameX = 6
                    break
                case 'jumpl':
                    this.frameX = 7
                    break

            }
        }
    }
    walkLeft() {
        this.setAction('left')
        this.moveleft()
    }
    walkRight() {
        this.setAction('right')
        this.moveright()
    }

}
const players = new Player({
    position: { x: 0, y: 0 },
    imagesrc: './asset/players.png'

})
  let direction = false // true = kanan, false = kiri



