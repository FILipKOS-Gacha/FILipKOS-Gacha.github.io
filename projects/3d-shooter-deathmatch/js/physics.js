// Player object with position, size, velocity, and speed
const player = {
    x: 0,        // Initial X position
    y: 0,        // Initial Y position
    size: 1,     // Player size (radius or square)
    speed: 0.1,  // Speed at which the player moves
    velocity: { x: 0, y: 0 } // Player velocity
};

// Wall definitions (static)
const wallThickness = 1;
const walls = [
    { x: -50, y: -50, width: 100, height: wallThickness }, // Bottom wall
    { x: -50, y: 50, width: 100, height: wallThickness },  // Top wall
    { x: -50, y: -50, width: wallThickness, height: 100 },  // Left wall
    { x: 50, y: -50, width: wallThickness, height: 100 }    // Right wall
];

// Handle keyboard input for movement
const keys = { w: false, a: false, s: false, d: false };
window.addEventListener('keydown', (e) => {
    if (e.key === 'w') keys.w = true;
    if (e.key === 'a') keys.a = true;
    if (e.key === 's') keys.s = true;
    if (e.key === 'd') keys.d = true;
});
window.addEventListener('keyup', (e) => {
    if (e.key === 'w') keys.w = false;
    if (e.key === 'a') keys.a = false;
    if (e.key === 's') keys.s = false;
    if (e.key === 'd') keys.d = false;
});

// Update player velocity based on input
function updateMovement() {
    player.velocity.x = 0; // Reset X velocity
    player.velocity.y = 0; // Reset Y velocity

    if (keys.w) player.velocity.y -= player.speed; // Move up
    if (keys.s) player.velocity.y += player.speed; // Move down
    if (keys.a) player.velocity.x -= player.speed; // Move left
    if (keys.d) player.velocity.x += player.speed; // Move right
}

// Collision detection logic
function checkCollisions() {
    for (const wall of walls) {
        if (
            player.x < wall.x + wall.width &&
            player.x + player.size > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.size > wall.y
        ) {
            console.log('Collision detected with wall:', wall);
            handleCollision(wall);
        }
    }
}

// Handle player collision with walls
function handleCollision(wall) {
    // Simple stop player movement at wall boundaries
    if (player.velocity.x > 0 && player.x + player.size > wall.x) {
        // Player is moving right, and hit the left side of the wall
        player.x = wall.x - player.size;
    }
    if (player.velocity.x < 0 && player.x < wall.x + wall.width) {
        // Player is moving left, and hit the right side of the wall
        player.x = wall.x + wall.width;
    }
    if (player.velocity.y > 0 && player.y + player.size > wall.y) {
        // Player is moving down, and hit the top side of the wall
        player.y = wall.y - player.size;
    }
    if (player.velocity.y < 0 && player.y < wall.y + wall.height) {
        // Player is moving up, and hit the bottom side of the wall
        player.y = wall.y + wall.height;
    }
}

// Update player's position and check collisions
function updatePhysics() {
    updateMovement();

    // Apply velocity to player position
    player.x += player.velocity.x;
    player.y += player.velocity.y;

    // Check collisions and handle response
    checkCollisions();
}

// Animation loop for rendering the game
function gameLoop() {
    updatePhysics();

    // Call next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
