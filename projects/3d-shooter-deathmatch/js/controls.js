const canvas = document.getElementById('gameCanvas');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new THREE.PointerLockControls(camera, canvas);

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const moveSpeed = 10; // Movement speed
let mouseSensitivity = 0.1; // Default mouse sensitivity

// Variables for tracking keyboard input
const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
};

// Set up PointerLockControls
document.addEventListener('click', () => {
    controls.lock();
});

// Update controls based on input
function updateControls() {
    controls.update();
    
    // Movement
    const delta = clock.getDelta();
    const moveDistance = moveSpeed * delta;

    if (keys.forward) direction.z = -1;
    if (keys.backward) direction.z = 1;
    if (keys.left) direction.x = -1;
    if (keys.right) direction.x = 1;

    direction.normalize();
    velocity.addScaledVector(direction, moveDistance);
    camera.position.add(velocity);
    velocity.set(0, 0, 0); // Reset velocity

    direction.set(0, 0, 0); // Reset direction
}

// Handle keyboard input
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

function updateMouseSensitivity(sensitivity) {
    mouseSensitivity = sensitivity;
}

window.addEventListener('resize', updateControls);
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Call updateControls in your main game loop
