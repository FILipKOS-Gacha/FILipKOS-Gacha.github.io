// Retrieve the canvas element
const canvas = document.getElementById('gameCanvas');

// Create the WebGL renderer with anti-aliasing enabled
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true  // Enable anti-aliasing for smoother edges
});
renderer.shadowMap.enabled = true; // Enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows

// Set up the size of the renderer based on the current window
function setupRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap for performance on high-DPI
    document.body.appendChild(renderer.domElement);
}

// Lazy load assets to improve performance and reduce initial load time
function loadAssets() {
    // Example: loading textures or models lazily
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('path/to/texture.jpg', () => {
        // Perform further actions after the texture is loaded
        // Update the scene here
    });
}

// Handle window resizing efficiently
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    composer.setSize(width, height); // Update post-processing composer size
    bloomPass.setSize(width, height); // Update bloom effect size
}

// Listen for window resize events
window.addEventListener('resize', onWindowResize, false);

// Set up post-processing pipeline
const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

// Tune bloom pass for better performance
const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.2, // Reduced intensity for performance
    0.35, // Tweaked radius for more subtle bloom
    0.75  // Threshold adjusted for better contrast
);
composer.addPass(bloomPass);

// Optimize animation loop: Avoid unnecessary renders
function animate() {
    requestAnimationFrame(animate);
    
    // Update scene objects here (e.g., animations or physics)
    
    composer.render();
}

// Memory management: Cleanup resources to avoid memory leaks
function cleanup() {
    renderer.dispose();
    composer.dispose();
    scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) object.material.dispose();
    });
}

// Call cleanup when navigating away or closing the game
window.addEventListener('beforeunload', cleanup);

// Initialize renderer, assets, and start the animation loop
setupRenderer();
loadAssets();
animate();
