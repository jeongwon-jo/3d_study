import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { bufferAttribute } from "three/tsl";

// antialias: 박스 끝 우글우글거리는 현상을 완화
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
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

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

// ======= 회색 벽
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// PI = 180도 -> -90도 회전
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
	color: 0x00ffff,
	side: THREE.FrontSide,
});
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSideMesh.position.z = 4;
frontSideMesh.position.y = 0.5;
frontSideMesh.castShadow = true;
frontSideMesh.receiveShadow = true;
scene.add(frontSideMesh);

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({
	color: 0x00ff00,
	side: THREE.BackSide,
});
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSideMesh.position.set(2, 0.5, 4);
backSideMesh.position.y = 0.51;
// backSideMesh.castShadow = true;
backSideMesh.receiveShadow = true;
scene.add(backSideMesh);

// doubleSide: frontSide와는 달리 박스 내부도 볼 수 있음
const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
	color: 0x00ff00,
	side: THREE.DoubleSide,
});
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSideMesh.position.set(4, 0.5, 4);
doubleSideMesh.position.y = 0.51;
// doubleSideMesh.castShadow = true;
doubleSideMesh.receiveShadow = true;
scene.add(doubleSideMesh);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
torusKnotMaterial.roughness = 0.5;
torusKnotMaterial.metalness = 1;
const torusKnotStatdardMesh = new THREE.Mesh(
	torusKnotGeometry,
	torusKnotMaterial,
);
torusKnotStatdardMesh.castShadow = true;
torusKnotStatdardMesh.receiveShadow = true;
torusKnotStatdardMesh.position.set(-4, 1, 0);
scene.add(torusKnotStatdardMesh);

const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
	color: 0xff0000,
});
torusKnotLambertMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotLambertMaterial.emissiveIntensity = 0.2;
const torusKnotLambertMesh = new THREE.Mesh(
	torusKnotGeometry,
	torusKnotLambertMaterial,
);
torusKnotLambertMesh.castShadow = true;
torusKnotLambertMesh.receiveShadow = true;
torusKnotLambertMesh.position.set(-2, 1, 0);
scene.add(torusKnotLambertMesh);

const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = new THREE.Color(0xf0ff0f);
torusKnotPhongMaterial.shininess = 100;
const torusKnotPhongMesh = new THREE.Mesh(
	torusKnotGeometry,
	torusKnotPhongMaterial,
);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
torusKnotPhongMesh.position.set(0, 1, 0);
scene.add(torusKnotPhongMesh);

const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const torusKnotBasicMesh = new THREE.Mesh(
	torusKnotGeometry,
	torusKnotBasicMaterial,
);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
torusKnotBasicMesh.position.set(2, 1, 0);
scene.add(torusKnotBasicMesh);

const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({ color: 0xffffff });
torusKnotDepthMaterial.opacity = 0.5;
const torusKnotDepthMesh = new THREE.Mesh(
	torusKnotGeometry,
	torusKnotDepthMaterial,
);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
torusKnotDepthMesh.position.set(4, 1, 0);
scene.add(torusKnotDepthMesh);

const textureLoader = new THREE.TextureLoader();
// textureLoader.load("/threejs.webp", (texture) => {
//   const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1)
//   // texture이라는 이미지를 넣음 (color대신에)
//   const textureBoxMaterial = new THREE.MeshStandardMaterial({ map: texture })
//   const textureMesh = new THREE.Mesh(textureBoxGeometry, textureBoxMaterial)
//   textureMesh.castShadow = true
//   textureMesh.receiveShadow = true
//   textureMesh.position.set(0, 0.5, 2)
//   scene.add(textureMesh)
// })

// 비동기로 이미지를 불러오는 방법
const texture = await textureLoader.loadAsync("threejs.webp");
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
// texture이라는 이미지를 넣음 (color대신에)
const textureBoxMaterial = new THREE.MeshStandardMaterial({ map: texture });
const textureMesh = new THREE.Mesh(textureBoxGeometry, textureBoxMaterial);
textureMesh.castShadow = true;
textureMesh.receiveShadow = true;
textureMesh.position.set(0, 0.5, 2);
scene.add(textureMesh);

// OrbitControls: 마우스를 이용해 카메라를 컨트롤할 수 있게 함
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.render(scene, camera);
});

const render = () => {
	renderer.render(scene, camera);
	requestAnimationFrame(render);

	// 애니메이션
	textureMesh.rotation.y += 0.01;
};

render();
