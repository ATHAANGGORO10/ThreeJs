const puppeteer = require('puppeteer');

(async () => {
    // Inisialisasi browser headless
    const browser = await puppeteer.launch();

    // Buka halaman baru
    const page = await browser.newPage();

    // Navigasi ke halaman data: URL kosong
    await page.goto('data:text/html, <html><body></body></html>');

    // Sisipkan kode animasi kubus di halaman
    await page.evaluate(() => {
        // Tempatkan seluruh kode animasi kubus di sini

        // Contoh kode animasi kubus
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(400, 400);
        document.body.appendChild(renderer.domElement);

        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        var animate = function () {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();
    });

    // Tunggu beberapa saat untuk menampilkan animasi
    await page.waitForTimeout(5000);

    // Tangkap screenshot dari halaman
    await page.screenshot({ path: 'cube_animation.png' });

    // Tutup browser
    await browser.close();
})();
