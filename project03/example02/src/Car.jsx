import { useCompoundBody, useRaycastVehicle } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import { Vector3 } from "three";
import DummyCarBody from "./dummy/DummyCarBody";
import DummyWheel from "./dummy/DummyWheel";
import useFollowCam from "./utils/useFollowCam";
import useVehicleControls from "./utils/useVehicleControls";
import useWheels from "./utils/useWheels";
const Car = () => {
  const worldPosition = useMemo(() => new Vector3(), [])
  const {pivot} = useFollowCam()

  const chassisBodyValue =  useControls("chassisBody", {
    width: {value: 0.16, min: 0, max:1},
    height: {value: 0.12, min: 0, max:1},
    front: {value: 0.17 * 2, min: 0, max:1}
  })

  const position = [0, 0.5, 0]
  let width, height, front, mass, wheelRadius;

  width = 0.16;
  height = 0.12;
  front = 0.17;
  mass= 150;
  wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2]

  const [wheels, wheelInfos] = useWheels({width, height, front, radius: wheelRadius})

  const [chassisBody, chassisApi] =useCompoundBody(() => ({
    // args: chassisBodyArgs,
    position,
    mass,
    rotation: [0,Math.PI,0] ,
    shapes: [
      {
        args: chassisBodyArgs,
        position: [0,0,0],
        type: "Box"
      },
      {
        args: [width, height, front],
        position: [0,height,0],
        type: "Box"
      }
    ]
  }), useRef(null))

  const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody,
    wheelInfos,
    wheels
  }))

  useVehicleControls(vehicleApi, chassisApi)

  const makeFollowCam = () => {
    chassisBody?.current.getWorldPosition(worldPosition)
    // console.log("wp" , worldPosition);
    pivot.position.lerp(worldPosition, 0.9)
  }

  useFrame(() => {
    makeFollowCam()
  })

  return (
    <group ref={vehicle}>
        {/* 차체 */}
        <group ref={chassisBody}>
          {/* 차체 바디 */}
          <DummyCarBody width={chassisBodyValue.width} height={chassisBodyValue.height} front={chassisBodyValue.front} />
        </group>
        {/* 바퀴 */}
        <DummyWheel wheelRef={wheels[0]} radius={wheelRadius} />
        <DummyWheel wheelRef={wheels[1]} radius={wheelRadius} />
        <DummyWheel wheelRef={wheels[2]} radius={wheelRadius} />
        <DummyWheel wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  )
}

export default Car;