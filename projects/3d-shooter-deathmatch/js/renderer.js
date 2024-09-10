// This file can be expanded based on your custom renderer logic
// For now, it's just setting up basic rendering using THREE.js

function setupRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

setupRenderer();
