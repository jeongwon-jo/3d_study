// #### Threejs의 기본 구성요소 Geometry

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
camera.position.y = 1;
camera.position.z = 5;

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3,4,5)
directionalLight.lookAt(0,0,0)
scene.add(directionalLight) 

// ======= 회색 벽
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({color: 0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// PI = 180도 -> -90도 회전
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor)

// ===== 빨간 네모 박스
// 가로세로높이가 1 1 1 인 box를 만들어줌
const geometry = new THREE.BoxGeometry(1,1,1);
// MeshStandardMaterial : 빛이 있어야 보이게됨 
const material = new THREE.MeshStandardMaterial({color:0xff0000});
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.receiveShadow = true;
mesh.position.y = 0.5
scene.add(mesh);

// ====== 노랑 캡슐모양
const capsuleGeometry = new THREE.CapsuleGeometry(1,2,20,30);
const capsuleMaterial = new THREE.MeshStandardMaterial({color: 0xffff00})
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial)
capsuleMesh.position.set(3,1.75, 0)
capsuleMesh.castShadow = true
capsuleMesh.receiveShadow = true;
scene.add(capsuleMesh)

// ====== 초록 실린더 모양 (원기둥)
const cylinderGeometry = new THREE.CylinderGeometry(1,1,2)
const cylinderMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00})
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinderMesh.position.set(-3,1,0)
cylinderMesh.castShadow = true;
cylinderMesh.receiveShadow = true;
scene.add(cylinderMesh)

// ====== 파랑 토러스 모양 (반지모양)
const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100)
const torusMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff})
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)
torusMesh.position.set(0, 0.5, 1)
torusMesh.castShadow = true;
torusMesh.receiveShadow = true;
scene.add(torusMesh)

// ===== 별 모양
const starShape = new THREE.Shape()
starShape.moveTo(0,1)
starShape.lineTo(0.2,0.2);
starShape.lineTo(1,0.2);
starShape.lineTo(0.4, -0.1);
starShape.lineTo(0.6,-1)
starShape.lineTo(0,-0.5)
starShape.lineTo(-0.6, -1)
starShape.lineTo(-0.4, -0.1)
starShape.lineTo(-1, 0.2)
starShape.lineTo(-0.2,0.2)

const shapeGeometry = new THREE.ShapeGeometry(starShape)
const shapeMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff})
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial)
shapeMesh.position.set(0,1,2)
scene.add(shapeMesh)

// 별 입체로 만들기
const extrudeSettings = {
  steps: 1,
  depth: 0.1,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.3,
  bevelSegments: 100,
}

const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings)
const extrudeMaterial = new THREE.MeshStandardMaterial({color: 0x0ddaaf})
const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial)
extrudeMesh.position.set(2,1.3,2)
extrudeMesh.castShadow = true;
extrudeMesh.receiveShadow = true;
scene.add(extrudeMesh)

// 구모양의 스피어
const sphereGeometry = new THREE.SphereGeometry(1,32,32)
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x98daaf})
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphereMesh.position.set(0,1,-3)
// scene.add(sphereMesh)

const numPoints = 1000
const positions = new Float32Array(numPoints * 3);

for(let i=0;i<numPoints;i++) {
  const x = (Math.random() - 0.5) * 1
  const y = (Math.random() - 0.5) * 1
  const z = (Math.random() - 0.5) * 1

  positions[i*3] = x;
  positions[i*3 + 1] = y;
  positions[i*3 + 2] = z;
;}

const bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3),
)

const pointsMaterial = new THREE.PointsMaterial({color: 0xffff00, size: 0.05})
const point = new THREE.Points(sphereGeometry, pointsMaterial)
point.position.set(0,0,-5)
scene.add(point)


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
