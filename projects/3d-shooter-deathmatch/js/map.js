function createCheckerboardTexture(size = 64, tileSize = 8) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    for (let y = 0; y < size; y += tileSize) {
        for (let x = 0; x < size; x += tileSize) {
            ctx.fillStyle = (x / tileSize + y / tileSize) % 2 === 0 ? '#ff00ff' : '#000000';
            ctx.fillRect(x, y, tileSize, tileSize);
        }
    }

    return new THREE.CanvasTexture(canvas);
}

function generateMap(scene) {
    const mapWidth = 100;
    const mapHeight = 100;

    const checkerboardTexture = createCheckerboardTexture();

    const geometry = new THREE.PlaneGeometry(mapWidth, mapHeight);
    const material = new THREE.MeshBasicMaterial({ map: checkerboardTexture, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    const wallMaterial = new THREE.MeshBasicMaterial({ map: checkerboardTexture });
    const wallThickness = 1;

    const bottomWall = new THREE.Mesh(new THREE.PlaneGeometry(mapWidth, wallThickness), wallMaterial);
    bottomWall.position.y = -mapHeight / 2;
    bottomWall.rotation.x = Math.PI / 2;
    scene.add(bottomWall);

    const topWall = new THREE.Mesh(new THREE.PlaneGeometry(mapWidth, wallThickness), wallMaterial);
    topWall.position.y = mapHeight / 2;
    topWall.rotation.x = Math.PI / 2;
    scene.add(topWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(wallThickness, mapHeight), wallMaterial);
    leftWall.position.x = -mapWidth / 2;
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(wallThickness, mapHeight), wallMaterial);
    rightWall.position.x = mapWidth / 2;
    rightWall.rotation.y = Math.PI / 2;
    scene.add(rightWall);
}