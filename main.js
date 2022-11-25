import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const products = ["BUYER'S REMORSE", 'THE ILLUSION OF FULFILMENT', "UNRELENTING EXISTENTIAL DREAD", "ANOTHER THING YOU CAN'T TAKE TO THE GRAVE", 'ABSOLUTELY NOTHING']
let productIndex = 0

setInterval(() => {
  if (productIndex === products.length) productIndex = 0

  document.getElementById("productTitle").innerText = products[productIndex]
  productIndex += 1

}, 3300)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);

renderer.render( scene, camera );

const moonTexture = new THREE.TextureLoader().load("moon wrap.png")
const moon3dTexture = new THREE.TextureLoader().load("normal.jpg")
const moonGeometry = new THREE.SphereGeometry(55, 100, 100);
const moonMaterial = new THREE.MeshBasicMaterial({ color: "gray", map: moonTexture });
const moon = new THREE.Mesh( moonGeometry, moonMaterial)
moon.position.z = -100

scene.add(moon)

const moonCenter = new THREE.Object3D();
moonCenter.position.z = -100
moonCenter.rotation.x = 1.5
scene.add(moonCenter)


const boxSize = 14
const BoxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize, 1, 1, 1)

// material
const BoxMaterial = new THREE.MeshStandardMaterial({ color: "white", wireframe: true })

let cubeRotation = 2;
let frontCube = null;
const numOfCubes = 15;

function addMoonCubes() {
  frontCube = new THREE.Object3D();
  frontCube.rotation.z = cubeRotation * Math.PI / numOfCubes;
  moonCenter.add(frontCube)
  cubeRotation += 2

  const mesh = new THREE.Mesh(BoxGeometry, BoxMaterial)
  mesh.position.y = 68
  // mesh.rotation.z = 1
  mesh.rotation.x = 0.5
  frontCube.add(mesh)

  function animate() {
    requestAnimationFrame(animate);
    // mesh.rotation.x = 0.6
    // mesh.rotation.z += 0.05
    if (mesh.rotation.z < 0.1) {
      mesh.rotation.z += 0.07
    } else {
      mesh.rotation.z -= 0.07
    }
    if (mesh.rotation.x < 0.5) {
      mesh.rotation.x += 0.07
    } else {
      mesh.rotation.x -= 0.07
    }
  }

  animate()

}


Array(numOfCubes).fill().forEach(addMoonCubes)




function addStar() {
  const geometry = new THREE.SphereGeometry(0.20);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh( geometry, material )

  const [x, y] = new Array(2).fill().map(() => THREE.MathUtils.randFloatSpread(160) );

  star.position.set(x, y, -70);
  scene.add(star)

}

Array(300).fill().forEach(addStar)


const pointLight = new THREE.PointLight(0xffffff)
// pointLight.position.set(0, frontCube.position.y + 5, 20)

scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

function animate() {
  requestAnimationFrame( animate );

  // controls.update();

  // frontCube.rotation.x = 0.4
  // frontCube.rotation.y += 0.05
  // if (frontCube.rotation.z < 0.1) {
  //   frontCube.rotation.z += 0.05
  // } else {
  //   frontCube.rotation.z -= 0.05
  // }
  // cube.rotation.z += 0.01

  moon.rotation.y += 0.005
  moon.rotation.z += 0.005

  moonCenter.rotation.z += 0.005

  renderer.render(scene, camera)
}

animate()