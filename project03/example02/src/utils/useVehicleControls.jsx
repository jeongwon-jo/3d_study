import { useEffect, useState } from "react";

const useVehicleControls = (vehicleApi, chassiApi) => {
  const [controls, setControls] = useState({})

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({
        ...controls, [e.key] : true,
      }))
    }
    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls, [e.key] : false,
      }))
    }

    window.addEventListener('keydown', keyDownPressHandler);
    window.addEventListener('keyup', keyUpPressHandler)

    return () => {
      window.removeEventListener('keydown', keyDownPressHandler);
      window.removeEventListener('keyup', keyUpPressHandler)
    }
  }, [])

  useEffect(() => {
    // console.log(vehicleApi);

    if(controls.ArrowUp) {
      // 2,3 이 뒷바퀴 / 0,1 이 앞바퀴
      vehicleApi.applyEngineForce(120, 2)
      vehicleApi.applyEngineForce(120, 3)
    } else if (controls.ArrowDown) {
      vehicleApi.applyEngineForce(-120, 2)
      vehicleApi.applyEngineForce(-120, 3)
    } else {
      vehicleApi.applyEngineForce(0, 2)
      vehicleApi.applyEngineForce(0, 3)
    }

    if(controls.ArrowLeft) {
      vehicleApi.setSteeringValue(-0.1, 0)
      vehicleApi.setSteeringValue(-0.1, 1)
      vehicleApi.setSteeringValue(0.35, 2)
      vehicleApi.setSteeringValue(0.35, 3)
    } else if(controls.ArrowRight) {
      vehicleApi.setSteeringValue(0.1, 0)
      vehicleApi.setSteeringValue(0.1, 1)
      vehicleApi.setSteeringValue(-0.35, 2)
      vehicleApi.setSteeringValue(-0.35, 3)
    } else {
        for(let i =0; i<4;i++) {
          vehicleApi.setSteeringValue(0, i)
        }
    }
  }, 
  [controls, vehicleApi, chassiApi])
  return controls
}

export default useVehicleControls;