const canvas = document.getElementById('gameCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const controls = new THREE.PointerLockControls(camera, canvas);
scene.add(camera);

// Function call to generate the map
generateMap(scene);

function animate() {
    requestAnimationFrame(animate);
    updateControls(); // Ensure controls are updated
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Load physics and game loop scripts
const physicsScript = document.createElement('script');
physicsScript.src = 'js/physics.js';
document.body.appendChild(physicsScript);

const gameLoopScript = document.createElement('script');
gameLoopScript.src = 'js/gameLoop.js';
document.body.appendChild(gameLoopScript);

animate();