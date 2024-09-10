// Handle player controls
const controls = new THREE.PointerLockControls(camera, canvas);

document.addEventListener('click', () => {
    controls.lock();
});

function updateControls() {
    controls.update();
}

window.addEventListener('resize', updateControls);
