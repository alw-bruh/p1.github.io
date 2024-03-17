// Mendapatkan elemen video dari HTML
const videoElement = document.getElementById('video');

// Fungsi untuk mengaktifkan kamera
async function activateCamera() {
  try {
    // Mengambil izin untuk menggunakan kamera
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    // Menyetel stream kamera ke elemen video
    videoElement.srcObject = stream;

    // Memulai streaming video
    videoElement.play();
  } catch (error) {
    console.error('Gagal mengaktifkan kamera:', error);
  }
}

// Panggil fungsi untuk mengaktifkan kamera
activateCamera();
