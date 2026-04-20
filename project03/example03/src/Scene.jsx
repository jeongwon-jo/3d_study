import { Debug, Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import Car from "./Car";
import { Ground } from "./Ground";

function Scene() {

  return (
    <>
      <Canvas camera={{ fov:45, position:[1.5, 2, 4]}}>
        <ambientLight/>
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            <Car/>
            <Ground rotation={[-Math.PI/2,0,0]}/>
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
