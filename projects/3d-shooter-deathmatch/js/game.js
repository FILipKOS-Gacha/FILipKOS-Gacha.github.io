// Initialize canvas and renderer
const canvas = document.getElementById('gameCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));  // Cap for high-DPI screens

// Initialize scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 5);  // Example initial position (slightly above ground)

// Pointer lock controls for first-person view
const controls = new THREE.PointerLockControls(camera, canvas);
scene.add(camera);

// Load the map generation function and add to scene
generateMap(scene);

// Game animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls (you can call controls.update() if using control libraries that need it)
    updateControls(); 

    // Render the scene
    renderer.render(scene, camera);
}

// Handle window resizing for camera and renderer
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix(); // Keep projection matrix synced with window size
    renderer.setSize(width, height);
}

// Event listener for window resize
window.addEventListener('resize', onWindowResize, false);

// Lazy-load physics and game loop scripts
function loadScripts() {
    const physicsScript = document.createElement('script');
    physicsScript.src = 'js/physics.js';
    physicsScript.onload = () => console.log('Physics script loaded!');
    document.body.appendChild(physicsScript);

    const gameLoopScript = document.createElement('script');
    gameLoopScript.src = 'js/gameLoop.js';
    gameLoopScript.onload = () => console.log('Game loop script loaded!');
    document.body.appendChild(gameLoopScript);
}

// Call this after page load to load external scripts
loadScripts();

// Start the animation loop
animate();
