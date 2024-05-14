// Inisialisasi scene, camera, dan renderer
var scene = new THREE.Scene();
var aspectRatio = window.innerWidth / 250; // Aspek rasio untuk renderer dengan tinggi 250

var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ alpha: true, preserveDrawingBuffer: true }); // Atur alpha menjadi true untuk background transparan
renderer.setSize(window.innerWidth, 250); // Ubah ukuran renderer menjadi width 100% dan tinggi 250
document.body.appendChild(renderer.domElement);

// Tambahkan cube sebagai dasar headphone
var geometry = new THREE.BoxGeometry(3, 3, 3); // Mengubah ukuran objek menjadi 3x3x3
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 }); // Atur material menjadi transparan
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0); // Menempatkan kubus di tengah-tengah (x: 0, y: 0, z: 0)
scene.add(cube);

// Atur posisi kamera
camera.position.z = 5;

// Fungsi untuk zoom in
function zoomIn() {
    camera.position.z -= 0.1; // Ubah nilai z menjadi lebih kecil untuk zoom in
}

// Fungsi untuk zoom out
function zoomOut() {
    camera.position.z += 0.1; // Ubah nilai z menjadi lebih besar untuk zoom out
}

// Variabel global untuk menyimpan status rotasi
var isRotating = false;
var previousMousePosition = {
    x: 0,
    y: 0
};

// Tangkap event saat mouse ditekan
renderer.domElement.addEventListener('mousedown', function(event) {
    isRotating = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

// Tangkap event saat mouse bergerak
renderer.domElement.addEventListener('mousemove', function(event) {
    if (isRotating) {
        var deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        // Perhitungan rotasi berdasarkan pergerakan mouse
        cube.rotation.y += deltaMove.x * 0.01;
        cube.rotation.x += deltaMove.y * 0.01;

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
});

// Tangkap event saat mouse dilepas
renderer.domElement.addEventListener('mouseup', function() {
    isRotating = false;
});

// Fungsi animasi untuk rendering 3D model
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Panggil fungsi animasi
animate();

// Fungsi untuk menyesuaikan ukuran bingkai renderer saat jendela diubah ukurannya
function onWindowResize() {
    camera.aspect = window.innerWidth / 250; // Aspek rasio dengan tinggi 250
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, 250); // Ubah ukuran renderer menjadi width 100% dan tinggi 250
}

window.addEventListener('resize', onWindowResize, false);

// Tangkap event saat mouse masuk ke dalam elemen renderer
renderer.domElement.addEventListener('mouseenter', function() {
    document.addEventListener('wheel', zoomHandler); // Aktifkan event scroll untuk zoom in dan zoom out
});

// Tangkap event saat mouse meninggalkan elemen renderer
renderer.domElement.addEventListener('mouseleave', function() {
    document.removeEventListener('wheel', zoomHandler); // Nonaktifkan event scroll untuk zoom in dan zoom out
});

// Fungsi untuk menangani event scroll (zoom in dan zoom out)
function zoomHandler(event) {
    if (event.deltaY < 0) {
        zoomIn(); // Zoom in saat scroll ke atas
    } else if (event.deltaY > 0) {
        zoomOut(); // Zoom out saat scroll ke bawah
    }
}
