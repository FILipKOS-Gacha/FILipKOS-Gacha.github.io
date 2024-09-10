const playerSize = 1; // Example size of the player
const wallThickness = 1; // Example wall thickness

function checkCollisions() {
    const player = { x: 0, y: 0 }; // Replace with actual player position

    const walls = [
        { x: -50, y: -50, width: 100, height: wallThickness }, // Bottom wall
        { x: -50, y: 50, width: 100, height: wallThickness },  // Top wall
        { x: -50, y: -50, width: wallThickness, height: 100 },  // Left wall
        { x: 50, y: -50, width: wallThickness, height: 100 }    // Right wall
    ];

    for (const wall of walls) {
        if (
            player.x < wall.x + wall.width &&
            player.x + playerSize > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + playerSize > wall.y
        ) {
            console.log('Collision detected with wall!');
        }
    }
}

function updatePhysics() {
    checkCollisions();
}

setInterval(updatePhysics, 1000 / 60); // 60 FPS