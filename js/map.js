const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = window.innerHeight
canvas.width = window.innerWidth
let cameraOffset = {
    x: 0,
    y: 0
}


class Sprite {
    constructor({ position, imagesrc1, imagesrc2, imagesrc3, portal, text, }) {
        this.position = position
        this.floatOffset = 0
        this.floatSpeed = 0.020
        // Buat array gambar
        this.images = [new Image(), new Image(), new Image(), new Image(), new Image()]
        this.sources = [imagesrc1, imagesrc2, imagesrc3, portal, text]
        this.loaded = [false, false, false, false, false]
        this.sizes = [
            { width: 0, height: 0 },
            { width: 0, height: 0 },
            { width: 0, height: 0 },
            { width: 0, height: 0 },
            { width: 0, height: 0 }
        ]

        // Load image
        this.images.forEach((img, index) => {
            if (this.sources[index]) {
                img.src = this.sources[index]
                img.onload = () => {
                    this.loaded[index] = true
                    this.sizes[index].width = img.width
                    this.sizes[index].height = img.height
                }
            }
        })
    }

    draw() {
        this.images.forEach((img, i) => {
            if (this.loaded[i]) {
                c.save()
                c.drawImage(
                    img,
                    this.position.x - cameraOffset.x,
                    this.position.y - cameraOffset.y,
                    this.sizes[i].width,
                    this.sizes[i].height
                )
                c.restore()
            }
        })
    }


    update(x = this.position.x, y = this.position.y) {
        this.position.x = x
        this.position.y = y
        this.draw()
    }
    updateFloating(baseX, baseY) {
        this.floatOffset += this.floatSpeed
        const floatY = Math.sin(this.floatOffset) * 5
        this.update(baseX, baseY + floatY)
    }
}

const bg = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imagesrc1: './asset/background.png',

}
)
const gd = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imagesrc2: './asset/gnd.png',

}
)
const platform = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imagesrc3: './asset/plat.png',

}
)
const ftree = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imagesrc1: './asset/foreground.png',

})
const portal1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    portal: './asset/gateclose.png',

}
)
const portal2 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    portal: './asset/gateopen.png',

}
)
const note = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    portal: './asset/notif.png',

}
)





