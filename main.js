import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);

renderer.render( scene, camera );

const frontBoxGeometry = new THREE.BoxGeometry( 5.5, 5.5, 5.5)
const frontBoxMaterial = new THREE.MeshStandardMaterial({ color: "white" })
const frontCube = new THREE.Mesh(frontBoxGeometry, frontBoxMaterial )
frontCube.position.z = 4
frontCube.position.y = 2

scene.add(frontCube)

const moonTexture = new THREE.TextureLoader().load("moon.png")
const moonGeometry = new THREE.SphereGeometry(60 );
const moonMaterial = new THREE.MeshBasicMaterial({ color: "gray", map: moonTexture });
const moon = new THREE.Mesh( moonGeometry, moonMaterial)
moon.position.z = -100

scene.add(moon)

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
pointLight.position.set(0, frontCube.position.y + 5, 20)

scene.add(pointLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)

function animate() {
  requestAnimationFrame( animate );

  frontCube.rotation.x = 0.4
  frontCube.rotation.y += 0.01
  if (frontCube.rotation.z < 0.1) {
    frontCube.rotation.z += 0.02
  } else {
    frontCube.rotation.z -= 0.09
  }
  // cube.rotation.z += 0.01

  // moon.rotation.x = 0.1
  moon.rotation.y += 0.001
  moon.rotation.z += 0.001

  renderer.render(scene, camera)
}

animate()