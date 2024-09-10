// Game loop and timer
const GAME_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds
let startTime = Date.now();

function resetMap() {
    // Clear the existing scene and regenerate the map
    scene.clear();
    generateMap(scene); // Ensure you pass the scene to generateMap
}

function updateGame() {
    // Check if the game duration has elapsed and reset the map if needed
    if (Date.now() - startTime >= GAME_DURATION) {
        resetMap();
        startTime = Date.now(); // Reset the timer
    }
    // Update game elements
    updatePhysics();
    updateControls();
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    updateGame();
    renderer.render(scene, camera);
}

gameLoop();