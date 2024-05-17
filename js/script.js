import * as THREE from '../node_modules/three/build/three.module.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();

const cursor = { x: 0, y: 0 };


/**
 * Parameters
 * 1st: Field of View degree
 * 2nd: Aspect Ratio
 */
const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight);
camera.position.z = 5;
scene.add(camera);

// Geometry
const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 200, 30);

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("https://bruno-simon.com/prismic/matcaps/3.png");

const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.y = 0.5
scene.add(mesh);

renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

window.addEventListener('mousemove', (_e) => {
  cursor.x = _e.clientX / window.innerWidth - 0.5;
  cursor.y = _e.clientY / window.innerHeight - 0.5;
});

const animate = () => {
  window.requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  const cameraX = cursor.x - 1;
  const cameraY = - cursor.y;

  camera.position.x += (cameraX - camera.position.x) / 10;
  camera.position.y += (cameraY - camera.position.y) / 10;

  renderer.render(scene, camera);
};
animate();

document.body.appendChild(renderer.domElement);