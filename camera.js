const videoElement = document.getElementById('videoElement');
const startButton = document.getElementById('startButton');

// Fungsi untuk mengambil akses kamera belakang
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        videoElement.srcObject = stream;
    } catch (error) {
        console.error('Gagal mengakses kamera belakang:', error);
    }
}

// Event listener untuk tombol mulai kamera
startButton.addEventListener('click', startCamera);

// Panggil fungsi startCamera saat halaman dimuat
window.onload = startCamera;
