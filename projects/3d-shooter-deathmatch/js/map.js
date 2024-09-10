// Create a checkerboard texture with customizable scale
function createCheckerboardTexture(size = 64, tileSize = 8, scaleX = 1, scaleY = 1) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Generate checkerboard pattern
    for (let y = 0; y < size; y += tileSize) {
        for (let x = 0; x < size; x += tileSize) {
            ctx.fillStyle = (x / tileSize + y / tileSize) % 2 === 0 ? '#ff00ff' : '#000000';
            ctx.fillRect(x, y, tileSize, tileSize);
        }
    }

    // Create texture and set it to repeat and scale
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(scaleX, scaleY);  // Apply dynamic texture scaling
    return texture;
}

// Helper function to create walls or structures
function createWall(scene, width, height, position, rotation, material) {
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
    wall.position.set(position.x, position.y, position.z);
    wall.rotation.set(rotation.x, rotation.y, rotation.z);
    wall.geometry.computeBoundingBox();  // Set up bounding box for collision detection
    scene.add(wall);
    return wall;
}

// Random map generator
function generateRandomMap(scene) {
    const mapWidth = 100;
    const mapHeight = 100;
    const wallThickness = 1;

    // Create a checkerboard texture for the floor and walls
    const checkerboardTexture = createCheckerboardTexture(64, 8, mapWidth / 10, mapHeight / 10); // Dynamic scaling

    // Create floor
    const floorGeometry = new THREE.PlaneGeometry(mapWidth, mapHeight);
    const floorMaterial = new THREE.MeshBasicMaterial({ map: checkerboardTexture, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Create wall material with texture scaling
    const wallMaterial = new THREE.MeshBasicMaterial({ map: checkerboardTexture });

    // Create boundary walls (top, bottom, left, right)
    createWall(scene, mapWidth, wallThickness, { x: 0, y: 0, z: -mapHeight / 2 }, { x: 0, y: 0, z: 0 }, wallMaterial);
    createWall(scene, mapWidth, wallThickness, { x: 0, y: 0, z: mapHeight / 2 }, { x: 0, y: 0, z: 0 }, wallMaterial);
    createWall(scene, wallThickness, mapHeight, { x: -mapWidth / 2, y: 0, z: 0 }, { x: 0, y: Math.PI / 2, z: 0 }, wallMaterial);
    createWall(scene, wallThickness, mapHeight, { x: mapWidth / 2, y: 0, z: 0 }, { x: 0, y: Math.PI / 2, z: 0 }, wallMaterial);

    // Randomized inner walls or obstacles
    const numObstacles = 10;  // Example number of random obstacles
    for (let i = 0; i < numObstacles; i++) {
        const randomWidth = Math.random() * 10 + 5;  // Random width between 5 and 15
        const randomHeight = Math.random() * 10 + 5; // Random height between 5 and 15
        const randomX = (Math.random() - 0.5) * mapWidth;  // Random X position within map boundaries
        const randomZ = (Math.random() - 0.5) * mapHeight; // Random Z position within map boundaries
        const rotation = Math.random() > 0.5 ? Math.PI / 2 : 0;  // Randomize rotation

        createWall(scene, randomWidth, randomHeight, { x: randomX, y: 0, z: randomZ }, { x: 0, y: rotation, z: 0 }, wallMaterial);
    }
}

// Handle collisions with walls
function checkCollisions(player, scene) {
    const playerBox = new THREE.Box3().setFromObject(player);  // Create bounding box for the player
    scene.traverse((object) => {
        if (object.geometry && object.geometry.boundingBox) {
            const wallBox = object.geometry.boundingBox.clone();
            wallBox.applyMatrix4(object.matrixWorld);  // Apply world transformations

            if (playerBox.intersectsBox(wallBox)) {
                handleCollision(player, object);
            }
        }
    });
}

// Simple collision response (e.g., stop movement)
function handleCollision(player, wall) {
    console.log('Collision with wall at', wall.position);
    // Implement logic for stopping movement or bounce-back (e.g., reverse velocity, etc.)
}

// Update player position and check for collisions
function updatePhysics(player, scene) {
    // Update player position here based on velocity or input

    // Check for collisions
    checkCollisions(player, scene);
}

// Game loop with physics and rendering updates
function gameLoop(player, scene, renderer, camera) {
    requestAnimationFrame(() => gameLoop(player, scene, renderer, camera));

    updatePhysics(player, scene);
    renderer.render(scene, camera);
}

// Initialize the game
function initGame(scene, renderer, camera) {
    generateRandomMap(scene);

    const player = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    player.position.set(0, 1, 0);  // Start player in the center of the map
    scene.add(player);

    gameLoop(player, scene, renderer, camera);
}
