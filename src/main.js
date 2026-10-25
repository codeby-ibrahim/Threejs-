
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x444444)

// Lathe points
const points = []

for (let i = 0; i < 10; i++) {
  points.push(
    new THREE.Vector2(
      Math.sin(i * 0.2) * 10 + 5,
      (i - 5) * 2
    )
  )
}

// Geometry
const geometry = new THREE.LatheGeometry(points, 12)

// Material — Yellow Shape
const material = new THREE.MeshBasicMaterial({
  color: 0x1684b5,
  side: THREE.DoubleSide,
  wireframe: false
})

// Lathe mesh
const lathe = new THREE.Mesh(geometry, material)
scene.add(lathe)

// Wireframe
const wireMaterial = new THREE.LineBasicMaterial({
  color: 0xb9dce8
})

let wireframe = new THREE.LineSegments(
  new THREE.WireframeGeometry(geometry),
  wireMaterial
)

lathe.add(wireframe)

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

camera.position.set(0, 5, 45)
camera.lookAt(0, 0, 0)

// Renderer
const canvas = document.querySelector('#webgl')

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement)

controls.enableDamping = true
controls.dampingFactor = 0.05
controls.enablePan = false

// GUI
const gui = new GUI({ title: 'Controls' })

const settings = {
  segments: 12,
  phiStart: 0,
  phiLength: Math.PI * 2
}

// Update geometry
function updateGeometry() {
  const newGeometry = new THREE.LatheGeometry(
    points,
    settings.segments,
    settings.phiStart,
    settings.phiLength
  )

  // Remove and dispose old wireframe
  lathe.remove(wireframe)
  wireframe.geometry.dispose()

  // Replace old lathe geometry
  lathe.geometry.dispose()
  lathe.geometry = newGeometry

  // Create new wireframe
  wireframe = new THREE.LineSegments(
    new THREE.WireframeGeometry(newGeometry),
    wireMaterial
  )

  lathe.add(wireframe)
}

// GUI controls
const folder = gui.addFolder('THREE.LatheGeometry')

folder.add(settings, 'segments', 3, 64, 1)
  .onChange(updateGeometry)

folder.add(settings, 'phiStart', 0, Math.PI * 2, 0.01)
  .onChange(updateGeometry)

folder.add(settings, 'phiLength', 0.1, Math.PI * 2, 0.01)
  .onChange(updateGeometry)

folder.open()

// Animation
const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)

  const delta = clock.getDelta()

  lathe.rotation.y += delta * 0.3

  controls.update()
  renderer.render(scene, camera)
}

animate()

// Responsive resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
