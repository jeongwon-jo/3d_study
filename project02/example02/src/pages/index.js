import { Canvas } from "@react-three/fiber";
import Scene from "../components/Scene";
import Lights from "../components/Lights"
import { lazy, Suspense } from "react";

// Suspense React 18
// API GrapQl 사용할때 많이 사용
// 3D 사용할때 많이 사용 (uesLoader으로 3D를 부르기 때문)

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1]}/>
      <meshBasicMaterial color={"white"} />
    </mesh>
  )
}

// const Scene = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import("../components/Scene"));
//     }, 5000);
//   });
// });

function Home() {
  return (
    <Canvas camera={{position: [0, 0, 5], fov: 45}}>
        <color attach="background" args={["rgb(67, 127, 240) 100%)"]} />
        <Suspense fallback={<Sphere />}>
          <Lights/>
          <Scene/>
        </Suspense>
    </Canvas>
  );
}

export default Home;