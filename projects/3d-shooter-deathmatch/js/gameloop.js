const GAME_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds
let startTime = Date.now();

// Function to reset the map after GAME_DURATION
function resetMap() {
    // Clear the existing scene
    while(scene.children.length > 0) {
        scene.remove(scene.children[0]);  // Remove each object from the scene
    }

    // Regenerate the map
    generateRandomMap(scene);
    console.log("Map reset!");
}

// Update the game state: Check timer, update physics, controls
function updateGame() {
    // Check if game duration has passed
    if (Date.now() - startTime >= GAME_DURATION) {
        resetMap();         // Reset the map
        startTime = Date.now();  // Reset the start time
    }

    // Update game physics and controls
    updatePhysics();  // Handles player movement, collision, etc.
    updateControls(); // Update any controls (e.g., WASD or camera movement)
}

// Main game loop: Handles rendering and game logic updates
function gameLoop() {
    requestAnimationFrame(gameLoop);  // Schedule next frame

    // Update game state each frame
    updateGame();

    // Render the scene using the camera
    renderer.render(scene, camera);
}

// Start the game loop
gameLoop();
