
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene()

// Timer
const timer = new THREE.Timer()

// Geometry
const geometry = new THREE.BoxGeometry(4, 4, 4)

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
  1000
)

camera.position.set(0, 20, 100)

// Renderer
const canvas = document.querySelector('#webgl')
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)

controls.enableDamping = true
controls.update()

// Animation
function animate() {
  requestAnimationFrame(animate)

  timer.update()
  const delta = timer.getDelta()

  // Cube rotation
  cube.rotation.x += delta * 0.12
  cube.rotation.y += delta * 0.12

  // Update controls
  controls.update()

  // Render scene
  renderer.render(scene, camera)
}

animate()

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})
