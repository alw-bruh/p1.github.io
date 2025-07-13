const express = require('express')
const app = express()
const os = require('os')
const path = require('path')

const port = 3000

// ⬅ Tambahkan ini
app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => {
  const interfaces = os.networkInterfaces()
  let localIP = 'localhost'
  for (let name in interfaces) {
    for (let iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        localIP = iface.address
      }
    }
  }

  console.log(`Server running at:`)
  console.log(`→ http://localhost:${port}`)
  console.log(`→ http://${localIP}:${port}  (akses dari HP yang terhubung ke hotspot)`)
})
