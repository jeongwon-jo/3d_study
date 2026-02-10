import "./style.css"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// antialias: 박스 끝 우글우글거리는 현상을 완화
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 렌더러의 사이즈를 윈도우 가로, 세로크기에 맞춤
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth/window.innerHeight, // aspect: 가로세로 비율
  0.1,
  1000
)
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

// ======= 회색 벽
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({color: 0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// PI = 180도 -> -90도 회전
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
floor.name = "FLOOR"
scene.add(floor)

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 })
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.castShadow = true
boxMesh.receiveShadow = true
boxMesh.position.y = 0.5
// scene.add(boxMesh)

// ============= directionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 5)
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5)
directionalLight.lookAt(0, 0, 0)
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

scene.add(directionalLight);

window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.render(scene, camera);
});

const gltfLoader = new GLTFLoader()
const gltf = await gltfLoader.loadAsync("/dancer.glb");

const character = gltf.scene;
const animationClips = gltf.animations
character.position.y = 0.8;
character.scale.set(0.01, 0.01, 0.01);
character.castShadow = true;
character.receiveShadow = true;
character.traverse((obj) => {
  if (obj.isMesh) { 
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
})

scene.add(character);

const mixer = new THREE.AnimationMixer(character)
const action = mixer.clipAction(animationClips[3]);
action.setLoop(THREE.LoopPingPong)
action.play()

// OrbitControls: 마우스를 이용해 카메라를 컨트롤할 수 있게 함
const orbitControls = new OrbitControls(camera, renderer.domElement)
// enableDamping : 부드럽게
orbitControls.enableDamping = true;
// 기본 0.05, 더 작아질수록 부드럽게
orbitControls.dampingFactor = 0.03;

const newPosition = new THREE.Vector3(0,1,0)
const rayCaster = new THREE.Raycaster()

renderer.domElement.addEventListener("pointerdown", (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -((e.clientY / window.innerHeight) * 2 - 1);

  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera)
  const intersects = rayCaster.intersectObjects(scene.children)
  // console.log(intersects)

  const intersectFloor = intersects.find(i => i.object.name === "FLOOR")
  console.log(intersectFloor);
  newPosition.copy(intersectFloor.point)
  newPosition.y = 1;
})

// PolarAngle : 수직 앵글
// 최대값 90도
orbitControls.maxPolarAngle = Math.PI / 2;
// 최소값 45도
orbitControls.minPolarAngle = Math.PI / 4;
// AzimuthAngle : 수평 앵글
orbitControls.maxAzimuthAngle = Math.PI / 2;
orbitControls.minAzimuthAngle = -Math.PI / 2;

const clock = new THREE.Clock()
const targetVector = new THREE.Vector3()

const render = () => {
  character.lookAt(newPosition)
  targetVector.subVectors(newPosition, character.position).normalize().multiplyScalar(0.01)

  if (
		Math.abs(character.position.x - newPosition.x) >= 1 ||
		Math.abs(character.position.z - newPosition.z) >= 1
  ) {
    character.position.x += targetVector.x;
    character.position.z += targetVector.z;
    action.stop()
  } else {
    action.play()
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  orbitControls.update();
  if (mixer) {
    mixer.update(clock.getDelta());
  }
}

render();
