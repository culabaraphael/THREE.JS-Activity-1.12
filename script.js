import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Scene
const scene = new THREE.Scene();

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#webgl'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;
scene.add(camera);

// Resize Handling
window.addEventListener('resize', () => {
  // Update sizes
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/1.png'); // Replace with your texture path

// Font Loader
const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  // Text Geometry
  const textGeometry = new TextGeometry('ITE18 Application Development and Emerging Technologies', {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  // Center the geometry
  textGeometry.center();

  // Material
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  // Text Mesh
  const textMesh = new THREE.Mesh(textGeometry, material);
  scene.add(textMesh);

  // Donut Geometry and Instances
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);

    // Random Position
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    // Random Rotation
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    // Random Scale
    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});

// Animation
const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update
  renderer.render(scene, camera);

  // Call animate recursively
  requestAnimationFrame(animate);
};
animate();
