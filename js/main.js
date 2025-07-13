function animate() {
    requestAnimationFrame(animate)
    if (!players.loaded) return
    c.fillStyle = 'rgb(189, 225, 255)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    bg.update()
    gd.update(0, bg.sizes[0].height)
    platform.update()

    y += velocity
    velocity += gravity

    if (held.right) x += speed
    if (held.left) x -= speed
    if (held.up && !isJumping) {
        velocity = -10
        isJumping = true
    }

    cameraOffset.x = x - canvas.width / 2

    if (y < 0) {
        cameraOffset.y = y - 0
    } else {
        cameraOffset.y = 0 // atau batas maksimal
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

        portal1.update(range.xStart, range.yStart)

        if (
            x + players.sizes.width > range.xStart &&
            x < range.xEnd &&
            y + players.sizes.height > range.yStart &&
            y < range.yEnd
        ) {
            portal2.update(range.xStart, range.yStart)
            console.log("portal")

            inportal = true
            if (!isJumping) {
                switch (i) {
                    case 0:
                        console.log("🌀 Portal pertama");
                        document.getElementById("info").textContent = "ig"
                        document.getElementById('link').href = 'https://www.instagram.com/alwilus/'
                        break;
                    case 1:
                        console.log("🌀 Portal kedua");
                         document.getElementById("info").textContent = "behance"
                          document.getElementById('link').href = 'https://www.behance.net/artalw'
                        break;
                    default:
                        console.log("🌀 Portal lainnya");
                         document.getElementById("info").textContent = "locked"
                           document.getElementById('link').href = ''
                }
                show()
                document.getElementById('yesbtn').onclick = function () {
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

    if (y - players.sizes.height > canvas.height) {
        y = 0
        x = canvas.width / 2

    } console.log(y)
    if (keys['a']) {
        x -= speed
    }
    if (keys['d']) {
        x += speed
    }


    players.update()
}


animate()
