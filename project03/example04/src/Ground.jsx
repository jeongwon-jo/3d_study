import { usePlane } from "@react-three/cannon";
import { Ball } from './components/Ball';
import Banner from "./components/Banner";
import HowToPlay from './components/HowToPlay';
import { RoadSign } from "./components/RoadSign";
import { Tree } from './components/Tree';

export function Ground() {
  const [meshRef] = usePlane(
    () => ({ args: [15, 15], mass: 1, type: 'Static', rotation: [-Math.PI/2,0,0]}),
  )

  return (
    <group>
      <mesh ref={meshRef} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="white" opacity={0} transparent/>
      </mesh>

      {/* 나무 */}
      <Tree position={[1,0.5,-1]}/>
      <Tree position={[-1,0.5,-1]}/>
      <Tree position={[3,0.5,-1]}/>
      <Tree position={[-3,0.5,-1]}/>

      <Ball position={[0,0.2,-2]}/>

      <HowToPlay/>
      <RoadSign position={[0,0.5,3]} />

      <Banner position={[0,1,-6]} />
    </group>
  )
}