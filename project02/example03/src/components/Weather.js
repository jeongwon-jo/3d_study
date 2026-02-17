// weather model by (Rob Li) - https://sketchfab.com/3d-models/weather-3d-icon-visualisation-baked-cfb4c4a6af7344f985f8b0296c67988b

import { useLoader, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap"


const Weather = (props) => {
    const { position, weather, rotationY } = props;
    const glb = useLoader(GLTFLoader, '/models/weather.glb')

    const ref = useRef(null)

    const handlePointerOver = () => {
        gsap.to(ref.current.scale, {
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 0.5,
        ease: "power2.out"
        })
    }

    const handlePointerOut = () => {
        gsap.to(ref.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: "power2.out"
        })
    }
    
    useFrame((_, delta) => {
        ref.current.rotation.y += delta
    })
    const weatherModel = useMemo(() => {
        const clonedModel = glb.nodes[weather] || glb.nodes.cloud
        return clonedModel.clone()
    }, [weather])

    return(
        <mesh ref={ref} position={position} rotation-y={rotationY} onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}>
            <primitive object={weatherModel} />
        </mesh>
    )
}

export default Weather;