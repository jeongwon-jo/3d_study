import { Canvas } from "@react-three/fiber"
import * as THREE from "three"
import {Box, OrbitControls, ScrollControls} from "@react-three/drei"
import { Dancer } from "./Dancer";
import { Loader } from "./Loader";
import { Suspense } from "react";
import { MovingDOM } from "./dom/MovingDOM";
import { useAppStore } from "../stores";
export const MainCanvas = () => {
	const isEntered = useAppStore((state) => state.isEntered);
  const aspectRatio = window.innerWidth / window.innerHeight;
	return (
		<Canvas
			id="canvas"
			gl={{ antialias: true }}
			shadows={true}
			camera={{
				fov: 30,
				aspect: aspectRatio,
				near: 0.01,
				far: 1000,
				position: [0, 6, 12],
			}}
			scene={{ background: new THREE.Color(0x000000) }}
		>
			<ScrollControls pages={isEntered ? 8 : 1} damping={0.25}>
				{/* 비동기로직이 다 되지않았을 때 Loader 보여줌 */}
				<Suspense fallback={null}>
					<MovingDOM />
					<Dancer />
				</Suspense>
			</ScrollControls>

			<Loader />
			{/* <OrbitControls /> */}
		</Canvas>
	);
}