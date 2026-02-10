import { Canvas,  } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Color } from "three";
import { Meshes } from "./Meshes";
import { Lights } from "./Lights";
import * as THREE from "three"
import { Controls } from "./Controls";
import { GLBModel } from "./GLBModel";
import { Dancer } from "./Dancer";

export const MainCanvas = () => {
  return (
		// antialis : 우글거리는 현상 막기
		// gl : renderer에 대응
		<Canvas
			gl={{ antialis: true }}
      // shadows={"soft"}
      shadows={{enabled: true, type: THREE.PCFSoftShadowMap}}
			camera={{
				fov: 60,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 100,
				position: [5, 5, 5],
			}}
			scene={{ background: new Color(0x000000) }}
		>
      <Controls />
      <Lights />
      <Meshes />
      {/* <GLBModel /> */}
      <Dancer />
		</Canvas>
	);
}