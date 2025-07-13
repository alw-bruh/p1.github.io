

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

let x = 0
let y = 0
let velocity = 0
let gravity = 0.5
let bounce = 0.2
let isJumping = false

const boxHeight = 32
const boxwidth = 32
const speed = 5
let cameraOffset = {
  x: 0,
  y: 0
}

class Sprite {
  constructor({ position, imagesrc1, imagesrc2 }) {
    this.position = position

    // Buat array gambar
    this.images = [new Image(), new Image()]
    this.sources = [imagesrc1, imagesrc2]
    this.loaded = [false, false]
    this.sizes = [{ width: 0, height: 0 }, { width: 0, height: 0 }]

    // Inisialisasi dan handle onload masing-masing
    this.images.forEach((img, index) => {
      img.src = this.sources[index]
      img.onload = () => {
        this.loaded[index] = true
        this.sizes[index].width = img.width
        this.sizes[index].height = img.height
      }
    })
  }

  draw() {
    this.images.forEach((img, i) => {
      if (this.loaded[i]) {
        c.drawImage(
          img,
          this.position.x - cameraOffset.x,
          this.position.y - cameraOffset.y,
          this.sizes[i].width,
          this.sizes[i].height
        )
      }
    })
  }

  update() {
    this.draw()
  }
}


class player {
  constructor({ position, imagesrc }) {
    this.position = position
    this.image = new Image()
    this.image.src = imagesrc
    this.sizes = [{ width: 0, height: 0 }, { width: 0, height: 0 }]
  }
  draw() {
    if (!this.image) return
    c.drawImage(this.image, x - cameraOffset.x, y - cameraOffset.y, boxwidth, boxHeight)
  }
  update() {
    this.draw()
  }
}
// State tombol ditekan
const keys = {}
let ground 
const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imagesrc1: './asset/map1.png',
 

})

background.images[0].onload = () => {
  const bgHeight = background.sizes[0].height
  
  // Buat ground setelah tinggi background diketahui
  ground = new Sprite({
    position: {
      x: 0,
      y: bgHeight // Posisi ground tepat di bawah background
    },
    imagesrc1: './asset/map1.png',
  })
    animate()
}

let players = new player({
  position: {
    x: 0,
    y: 0
  },
  imagesrc: './asset/player.png',
})
function animate() {
  requestAnimationFrame(animate)

  // Hapus frame lama


  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)
 
  background.update()
   if (ground) ground.update()
 

  // Gambar kotak  



  players.update(x - cameraOffset.x, y - cameraOffset.y, boxwidth, boxHeight)

  // Gerak horizontal
  if (keys['a']) {
    x -= speed

  }
  if (keys['d']) {
    x += speed

  }
  cameraOffset.x = x - canvas.width / 2 + boxwidth / 2

  // Gravity dan lompatan
  y += velocity
  velocity += gravity



  // Collision bawah
  if (x >= 0 - boxwidth && x + boxwidth <= background.sizes[0].width + boxwidth) {
  if (y + boxHeight > background.sizes[0].height) {
    y = background.sizes[0].height - boxHeight
    velocity = 0
    isJumping = false
  }
}
console.log(x)
if (y - boxHeight > canvas.height) {
  y = 0
  x = boxwidth + 10
  
}



}

// Deteksi tombol ditekan
document.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true

  // Tombol lompat (`w`) hanya di-trigger sekali
  if (e.key.toLowerCase() === 'w' && !isJumping) {
    velocity = -12
    isJumping = true
  }
})

// Deteksi tombol dilepas
document.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false
})

animate()

