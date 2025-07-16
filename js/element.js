function show() {
      const popup = document.getElementById('yesbtn');
    popup.classList.add('show');
    popup.style.top = `${canvas.height / 2 - players.sizes.height - 34 }px`;
    popup.style.left = "50%";
    }
    function close() {
        document.getElementById('yesbtn').classList.remove('show');
    }
function Lockedbtn() {
document.getElementById("links").textContent = ""
}
function enterbtn() {
    document.getElementById("links").textContent = "enter"

}
function respawn() {
    // Mulai dari bawah layar
    y = bg.sizes[0].height + 100
    x = canvas.width / 2
    velocity = -15  // Terbang naik dulu
    isJumping = true

    let flyTime = 0
    const flyDuration = 30 // frame (≈ 0.5 detik kalau 60fps)

    const flying = setInterval(() => {
        flyTime++

        if (flyTime >= flyDuration) {
            clearInterval(flying)
            // Setelah terbang, player akan turun dengan gravity normal
        }
    }, 16) // 16ms ≈ 60fps
}
 let zoom = 1
 const reoffsetx = canvas.width / zoom
 const reoffsety = canvas.height / zoom