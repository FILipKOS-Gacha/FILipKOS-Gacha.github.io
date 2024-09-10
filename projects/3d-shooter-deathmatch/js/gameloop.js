const GAME_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds
let startTime = Date.now();

function resetMap() {
    scene.clear();
    generateMap(scene);
}

function updateGame() {
    if (Date.now() - startTime >= GAME_DURATION) {
        resetMap();
        startTime = Date.now();
    }
    updatePhysics();
    updateControls();
}

function gameLoop() {
    requestAnimationFrame(gameLoop);
    updateGame();
    renderer.render(scene, camera);
}

gameLoop();