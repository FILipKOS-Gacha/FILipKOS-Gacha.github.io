const canvas = document.getElementById('gameCanvas');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new THREE.PointerLockControls(camera, canvas);

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const moveSpeed = 10; // Movement speed
let mouseSensitivity = 0.1; // Default mouse sensitivity

// Jumping and gravity settings
let isJumping = false;
const gravity = 9.8;
const jumpSpeed = 5;
const groundLevel = 0; // Y-position representing ground level

// Variables for tracking keyboard input
const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
};

// Smoothing for camera rotation
let smoothFactor = 0.08;
let targetRotationX = 0;
let targetRotationY = 0;

// Set up PointerLockControls
document.addEventListener('click', () => {
    controls.lock();
});

// Create a bounding box for the player (sphere or character)
const playerBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
const playerSize = new THREE.Vector3(1, 2, 1); // Example player size (1x2x1 box)

// Function to check for collisions between the player and walls/objects
function checkCollisions(scene) {
    playerBox.setFromCenterAndSize(camera.position, playerSize);

    // Traverse all objects in the scene to check for collisions
    scene.traverse((object) => {
        if (object.geometry && object.geometry.boundingBox) {
            const objectBox = object.geometry.boundingBox.clone();
            objectBox.applyMatrix4(object.matrixWorld); // Transform bounding box into world space

            if (playerBox.intersectsBox(objectBox)) {
                // Collision detected, stop player movement in the collision direction
                handleCollision(object);
            }
        }
    });
}

// Basic collision response: stop player from moving through objects
function handleCollision(object) {
    console.log('Collision detected with', object);

    // For simplicity, just reset the player's position (you could also reverse velocity)
    // You can refine this by stopping movement only in the direction of the collision
    velocity.set(0, 0, 0); // Stop movement on collision
}

// Update controls based on input and smooth camera
function updateControls(delta, scene) {
    controls.update();

    const moveDistance = moveSpeed * delta; // Distance to move in this frame based on time delta

    // Reset direction for this frame
    direction.set(0, 0, 0);

    // Set direction based on input keys
    if (keys.forward) direction.z = -1;
    if (keys.backward) direction.z = 1;
    if (keys.left) direction.x = -1;
    if (keys.right) direction.x = 1;

    // Normalize the direction vector so diagonal movement isn't faster
    direction.normalize();

    // Apply movement based on direction
    velocity.addScaledVector(direction, moveDistance);

    // Apply gravity
    if (!isJumping) {
        if (camera.position.y > groundLevel) {
            velocity.y -= gravity * delta;  // Gravity pulling the player down
        } else {
            velocity.y = 0;
            camera.position.y = groundLevel; // Reset to ground level
        }
    }

    // Handle jumping
    if (keys.jump && camera.position.y === groundLevel) {
        velocity.y = jumpSpeed;  // Apply upward force
        isJumping = true;        // Set jumping to true
    }

    // Apply velocity to the camera position
    camera.position.add(velocity);

    // Stop jump when the player reaches the ground
    if (camera.position.y <= groundLevel) {
        isJumping = false;  // Player is on the ground again
    }

    // Check for collisions after updating position
    checkCollisions(scene);

    // Reset velocity after movement is applied (except for gravity)
    velocity.set(0, velocity.y, 0); // Preserve vertical velocity (gravity)
}

// Smooth mouse look with linear interpolation
function smoothMouseLook() {
    targetRotationX = controls.getObject().rotation.y;
    targetRotationY = controls.getObject().rotation.x;

    controls.getObject().rotation.y += (targetRotationX - controls.getObject().rotation.y) * smoothFactor;
    controls.getObject().rotation.x += (targetRotationY - controls.getObject().rotation.x) * smoothFactor;
}

// Handle keyboard input for movement
function handleKeyDown(event) {
    switch (event.code) {
        case 'KeyW': keys.forward = true; break;
        case 'KeyS': keys.backward = true; break;
        case 'KeyA': keys.left = true; break;
        case 'KeyD': keys.right = true; break;
        case 'Space': keys.jump = true; break;
    }
}

function handleKeyUp(event) {
    switch (event.code) {
        case 'KeyW': keys.forward = false; break;
        case 'KeyS': keys.backward = false; break;
        case 'KeyA': keys.left = false; break;
        case 'KeyD': keys.right = false; break;
        case 'Space': keys.jump = false; break;
    }
}

// Update mouse sensitivity dynamically
function updateMouseSensitivity(sensitivity) {
    mouseSensitivity = sensitivity;
    controls.lookSpeed = mouseSensitivity;  // Update look speed based on sensitivity
}

// Adjust camera aspect ratio and controls on window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    controls.update();
}

// Event listeners for keyboard and window resize
window.addEventListener('resize', onWindowResize);
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Main game loop
function gameLoop(scene) {
    const delta = clock.getDelta(); // Time between frames for smooth movement

    // Update controls, collisions, and physics based on delta
    updateControls(delta, scene);

    // Smooth camera rotation for a better experience
    smoothMouseLook();

    // Render the scene
    renderer.render(scene, camera);

    // Request the next frame
    requestAnimationFrame(() => gameLoop(scene));
}

// Start the game loop with the scene
gameLoop(scene);
