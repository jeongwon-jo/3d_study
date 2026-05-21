import { Physics } from "@react-three/cannon";
import { Canvas, } from "@react-three/fiber";
import * as THREE from "three";
import { Color } from "three";
import { Controls } from "./Controls";
import { Lights } from "./Lights";
import { Meshes } from "./Meshes";

export const MainCanvas = () => {
  return (
		// antialis : 우글거리는 현상 막기
		// gl : renderer에 대응
		<Canvas
			gl={{ antialis: true }}
			// shadows={"soft"}
			shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}
			camera={{
				fov: 60,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 100,
				position: [5, 5, 5],
			}}
			scene={{ background: new Color(0x000000) }}
		>
			<Physics gravity={[0, -9, 0]} defaultContactMaterial={{
				restitution: 0.1,
				friction: 1,
			}}>
				<Lights />
				<Meshes />
			</Physics>
			<Controls />

			{/* <GLBModel /> */}
			{/* <PostProcessor /> */}
			{/* <Dancer /> */}
		</Canvas>
	);
}