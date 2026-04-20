import { Debug, Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import Car from "./Car";
import { Ground } from "./Ground";
import { isStartScene } from "./utils/atom";

function Scene() {
  const isStart = useRecoilValue(isStartScene)

  useEffect(() => {
    console.log(isStart);
    
  }, [isStart])
  return (
    <>
      <Canvas camera={{ fov:45, position:[1.5, 2, 4]}}>
        <ambientLight/>
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            {isStart && <Car/>}
            <Ground />
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
