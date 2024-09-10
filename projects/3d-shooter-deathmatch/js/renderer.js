// Retrieve the canvas element
const canvas = document.getElementById('gameCanvas');

// Create the WebGL renderer with anti-aliasing enabled
const renderer = new THREE.WebGLRenderer({ 
    canvas, 
    antialias: true  // Enable anti-aliasing for smoother edges
});

// Set the size of the renderer to the full window
function setupRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Handle high-DPI screens
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
    document.body.appendChild(renderer.domElement); // Add the renderer's canvas to the document
}

// Handle window resizing
function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high-DPI
}

// Listen for window resize events
window.addEventListener('resize', onWindowResize, false);

// Import post-processing components if using modules (not needed for script tags)
const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
composer.addPass(bloomPass);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    // Update and render the scene with post-processing effects
    composer.render();
}

// Initialize renderer and start animation loop
setupRenderer();
animate();