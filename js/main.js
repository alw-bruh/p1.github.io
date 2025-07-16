function animate() {
    requestAnimationFrame(animate)
     c.save() // simpan state awal canvas

   
   
    c.scale(zoom, zoom)

    c.fillStyle = 'rgb(189, 225, 255)'
    c.fillRect(0, 0, canvas.width, canvas.height,  canvas.width / zoom, canvas.height / zoom)
    bg.update()
    gd.update(0, bg.sizes[0].height)
    


    y += velocity
    velocity += gravity



    cameraOffset.x = x - reoffsetx / 2 + players.sizes.width

    if (y <= bg.sizes[0].height) {
        cameraOffset.y = y - reoffsety / 2 
    }
    if (x >= 0 - players.sizes.width && x + players.sizes.width <= gd.sizes[1].width + players.sizes.width) {
        if (velocity >= 0) {
            if (y + players.sizes.height > bg.sizes[0].height && y < bg.sizes[0].height) {
                y = bg.sizes[0].height - players.sizes.height
                velocity = 0
                isJumping = false
            }
            if (y + players.sizes.height > bg.sizes[0].height) {
                if (x + players.sizes.width > gd.sizes[1].width) {
                    x = gd.sizes[1].width
                }
                if (x - players.sizes.width < 0) {
                    x = 0 - players.sizes.width
                }
            }
        }
    }
    let inportal = false
    for (let i = 0; i < portals.length; i++) {
        const range = portals[i]



        if (
            x + players.sizes.width > range.xStart &&
            x < range.xEnd &&
            y + players.sizes.height > range.yStart &&
            y < range.yEnd
        ) {

            console.log("portal")

            inportal = true
            show()
            document.getElementById('yesbtn').onclick = function () {
            }
            if (!isJumping) {
                switch (i) {
                    case 0:
                        console.log("🌀 Portal pertama");
                        document.getElementById("info").textContent = "Insta"
                        document.getElementById('links').href = 'https://www.instagram.com/alwilus/'
                        document.getElementById('link').classList.remove('declineButton')
                        enterbtn()
                        break;
                    case 1:
                        console.log("🌀 Portal kedua");
                        document.getElementById("info").textContent = "Behance"
                        document.getElementById('links').href = 'https://www.behance.net/artalw'
                        document.getElementById('link').classList.remove('declineButton')
                        enterbtn()
                        break;
                    default:
                        console.log("🌀 Portal lainnya");
                        document.getElementById("info").textContent = "Locked"
                        document.getElementById('links').href = ''
                        document.getElementById('link').classList.add('declineButton')
                        Lockedbtn()

                }

            }
        }
        if (!inportal) {
            document.getElementById('upbtn').classList.remove('big-button')
            close()
        }
        note.updateFloating(range.xStart, range.yStart - 20)
    }
    for (const range of solidRanges) {
        //platform
        if (
            x + players.sizes.width - 8 > range.startX &&
            x + 8 < range.endX
        ) {
            if (velocity > 0) {
                if (
                    y + players.sizes.height >= range.y &&
                    y + players.sizes.height <= range.y + range.height + 4
                ) {
                    y = range.y - players.sizes.height
                    velocity = 0
                    isJumping = false
                }
            }
        }
    }
    if (y + players.sizes.height > bg.sizes[0].height + canvas.height) {
        respawn()
    }
    // true = kanan, false = kiri

    // Gerakan horizontal
    if (keys['a'] || held.left) {
        x -= speed
        direction = false // arah terakhir menghadap kiri
        players.walkLeft()
    } else if (keys['d'] || held.right) {
        x += speed
        direction = true // arah terakhir menghadap kanan
        players.walkRight()
    } else if (!isJumping) {
        // Idle hanya jika tidak lompat
        if (direction) {
            players.setAction('idler') // idle kanan
        } else {
            players.setAction('idlel') // idle kiri
        }
    }

    // Lompat
    if (held.up && !isJumping) {
        velocity = -10
        isJumping = true

    }

    // Saat player dalam keadaan lompat
    if (isJumping) {
        if (direction) {
            players.setAction('jumpr')
        } else {
            players.setAction('jumpl')
        }
    }
    console.log(y)

    players.update()
    ftree.update()
    c.restore() 
}



animate()
