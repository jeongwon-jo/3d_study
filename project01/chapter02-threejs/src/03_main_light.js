import "./style.css"
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import { bufferAttribute } from "three/tsl";

// antialias: 박스 끝 우글우글거리는 현상을 완화
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
// 렌더러의 사이즈를 윈도우 가로, 세로크기에 맞춤
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth/window.innerHeight, // aspect: 가로세로 비율
  0.1,
  100
)
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

// const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
// directionalLight.castShadow = true;
// directionalLight.position.set(3,4,5)
// directionalLight.lookAt(0,0,0)
// scene.add(directionalLight) 

// ======= 회색 벽
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({color: 0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// PI = 180도 -> -90도 회전
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.castShadow = true
boxMesh.receiveShadow = true
boxMesh.position.y = 0.5
scene.add(boxMesh)

// ============= ambientLight : 모든곳에서 동일한 빛을 쏴줌
// const ambientLight = new THREE.AmbientLight(0xffffff, 5)
// scene.add(ambientLight)

// ============= directionalLight
// const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
// directionalLight.castShadow = true;
// directionalLight.position.set(3, 4, 5)
// directionalLight.lookAt(0,0,0)
// scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,1)
// scene.add(directionalLightHelper)

// ============= hemisphereLight (위, 아래가 다른색상의 빛을 발산)
// const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5)
// hemisphereLight.position.set(0, 1, 0)
// hemisphereLight.lookAt(0, 0, 0)
// scene.add(hemisphereLight)
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1)
// scene.add(hemisphereLightHelper)

// ============= pointLight
// const pointLight = new THREE.PointLight(0xffffff, 5, 5, 4)
// pointLight.castShadow = true;
// pointLight.position.set(1,1,1)
// scene.add(pointLight)
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper)

// ============= rectAreaLight: 그림자를 만들지 못함
// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2)
// rectAreaLight.position.set(0, 1, 2)
// scene.add(rectAreaLight)

// ============= spotLight
const targetObj = new THREE.Object3D();
scene.add(targetObj)
const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4, 1, 1)
spotLight.castShadow = true;
spotLight.position.set(0, 3, 0)
spotLight.target = targetObj;
spotLight.target.position.set(1,0,2)
scene.add(spotLight)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)


// OrbitControls: 마우스를 이용해 카메라를 컨트롤할 수 있게 함
const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.update();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
})

const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render);
}

render();
