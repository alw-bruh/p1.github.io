const held = {
  up: false,
  left: false,
  right: false
}
document.addEventListener('keydown', (e) => {

  keys[e.key.toLowerCase()] = true

  // Tombol lompat (`w`) hanya di-trigger sekali
  if (e.key.toLowerCase() === 'w' && !isJumping) {
    velocity = -10
    isJumping = true
  }
})

// Deteksi tombol dilepas
document.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false
})  


function handlePress(e) {
  const id = e.target.id
  if (id === 'upbtn') held.up = true
  if (id === 'leftbtn') held.left = true
  if (id === 'rightbtn') held.right = true
  if (id === 'downbtn') held.down = true
}

// Deteksi tombol dilepas (mouse & touch)
function handleRelease(e) {
  const id = e.target.id
  if (id === 'upbtn') held.up = false
  if (id === 'leftbtn') held.left = false
  if (id === 'rightbtn') held.right = false
  if (id === 'downbtn') held.down = false
}

// Mouse support
document.addEventListener('mousedown', handlePress)
document.addEventListener('mouseup', handleRelease)
document.addEventListener('mouseleave', () => {
  held.up = held.down = held.left = held.right = false
})

// Touch support
document.addEventListener('touchstart', handlePress)
document.addEventListener('touchend', handleRelease)