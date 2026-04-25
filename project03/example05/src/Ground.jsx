import { usePlane } from "@react-three/cannon";
import AllTree from "./components/AllTree";
import { Ball } from './components/Ball';
import Banner from "./components/Banner";
import HowToPlay from './components/HowToPlay';
import { MotionStage } from "./components/MotionStage";
import { MotionStage2 } from "./components/MotionStage2";
import { Road } from "./components/Road";
import { RoadSign } from "./components/RoadSign";

// 나무 있을때 Calls 74 
// 나무 없을때 Calls 59
// 나무 하나 60
// 나무 전부 68
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
      <AllTree />

      <Ball position={[0,0.2,-2]}/>

      <HowToPlay/>

      <RoadSign position={[0,0.5,3]}/>

      <Banner position={[0, 1,-6]}/>

      <MotionStage position={[3, 0.55,4]}/>
      <MotionStage2 position={[-4, 0.55,5.5]}/>

      <Road position={[-8.8,-0.06,1]} scale={0.04} rotation-y={Math.PI/2}/>
      <Road position={[-8.8,-0.06,-10]} scale={0.04} rotation-y={Math.PI/2}/>
    </group>
  )
}