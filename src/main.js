
import './style.css'
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()
const timer = new THREE.Timer();

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)

// Material
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000
})

// Mesh
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)

camera.position.z = 3

// Renderer
const canvas = document.querySelector('#webgl')
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(window.innerWidth, window.innerHeight)

// Animation
function animate() {
  requestAnimationFrame(animate)
  timer.update();
  const delta = timer.getDelta();
  cube.rotation.x += delta * 0.12;
  cube.rotation.y += delta * 0.12;

  renderer.render(scene, camera)
}
animate()
