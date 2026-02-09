import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { bufferAttribute } from "three/tsl";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

// antialias: 박스 끝 우글우글거리는 현상을 완화
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 렌더러의 사이즈를 윈도우 가로, 세로크기에 맞춤
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight, // aspect: 가로세로 비율
	0.1,
	100,
);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

// ======= 회색 벽
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// PI = 180도 -> -90도 회전
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
scene.add(boxMesh);

// ============= directionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.top = 0.5;
directionalLight.shadow.camera.bottom = -0.5;
directionalLight.shadow.camera.left = -0.5;
directionalLight.shadow.camera.right = 0.5;

directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
	directionalLight,
	1,
);
scene.add(directionalLightHelper);

// OrbitControls: 마우스를 이용해 카메라를 컨트롤할 수 있게 함
// const orbitControls = new OrbitControls(camera, renderer.domElement)
// // enableDamping : 부드럽게
// orbitControls.enableDamping = true;
// // 기본 0.05, 더 작아질수록 부드럽게
// orbitControls.dampingFactor = 0.03;
// orbitControls.enableZoom = true;
// // enablePan: 마우스 오른쪽으로 이동할 수 있는지 없는지
// orbitControls.enablePan = true
// orbitControls.enableRotate = true;
// orbitControls.autoRotate = false;
// orbitControls.autoRotateSpeed = 2

// // PolarAngle : 수직 앵글
// // 최대값 90도
// orbitControls.maxPolarAngle = Math.PI / 2;
// // 최소값 45도
// orbitControls.minPolarAngle = Math.PI / 4;
// // AzimuthAngle : 수평 앵글
// orbitControls.maxAzimuthAngle = Math.PI / 2;
// orbitControls.minAzimuthAngle = -Math.PI / 2;

// const flyControls = new FlyControls(camera, renderer.domElement)
// flyControls.movementSpeed = 3;
// flyControls.rollSpeed = Math.PI / 10
// flyControls.autoForward = false;

camera.position.set(0, 1, 5);

// const firstPersonControls = new FirstPersonControls(camera, renderer.domElement)
// firstPersonControls.lookSpeed = 0.1
// firstPersonControls.movementSpeed = 1
// firstPersonControls.lookVertical = true;

// const pointerLockControls = new PointerLockControls(camera, renderer.domElement)
// window.addEventListener('click', () => {
//   pointerLockControls.lock()
// })

const trackballControls = new TrackballControls(camera, renderer.domElement);
trackballControls.rotateSpeed = 2;
trackballControls.zoomSpeed = 1.5;
trackballControls.panSpeed = 0.5;
trackballControls.noRotate = false;
trackballControls.noZoom = false;
trackballControls.noPan = false;
trackballControls.staticMoving = false;
trackballControls.dynamicDampingFactor = 0.05;

const target = new THREE.Mesh(
	new THREE.SphereGeometry(0.5),
	new THREE.MeshStandardMaterial({ color: 0x0000ff }),
);
target.position.set(4, 0.5, 0);
scene.add(target);
trackballControls.target = target.position;

window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.render(scene, camera);
});

const clock = new THREE.Clock();
const render = () => {
	renderer.render(scene, camera);
	requestAnimationFrame(render);
	// orbitControls.update();
	// flyControls.update(clock.getDelta())
	// firstPersonControls.update(clock.getDelta())
	trackballControls.update();
};

render();
