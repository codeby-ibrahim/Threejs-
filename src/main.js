
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#101827')

// Sphere geometry
const geometry = new THREE.SphereGeometry(15, 16, 32)

// Sphere surface
const material = new THREE.MeshBasicMaterial({
  color: '#12618a',
  transparent: true,
  opacity: 0.9
})

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Triangular wireframe
const wireGeometry = new THREE.WireframeGeometry(geometry)

const wireMaterial = new THREE.LineBasicMaterial({
  color: '#8be0ff',
  transparent: true,
  opacity: 0.8
})

const wireframe = new THREE.LineSegments(
  wireGeometry,
  wireMaterial
)

sphere.add(wireframe)

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.set(0, 0, 48)

// Renderer
const canvas = document.querySelector('#webgl')

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Mouse controls
const controls = new OrbitControls(camera, renderer.domElement)

controls.enableDamping = true
controls.dampingFactor = 0.05
controls.enablePan = false
controls.minDistance = 20
controls.maxDistance = 100

// Animation
const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)

  const delta = clock.getDelta()

  sphere.rotation.y += delta * 0.15
  sphere.rotation.x += delta * 0.06

  controls.update()
  renderer.render(scene, camera)
}

animate()

// Responsive design
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
