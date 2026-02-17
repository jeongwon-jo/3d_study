import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion } from "framer-motion-3d";
import { Html } from "@react-three/drei";
import { CityName } from "./CityName";

const Weather = (props) => {
    const { position, rotation, weather, cityName } = props;
    const glb = useLoader(GLTFLoader, '/models/weather.glb')
    const ref = useRef(null)
    const [isHover, setIsHover] = useState(false)

    const weatherModel = useMemo(() => {
        const clonedModel = glb.nodes[weather] || glb.nodes.cloud
        return clonedModel.clone()
    }, [glb.nodes, weather])

    useFrame((_,delta)=>{
        ref.current.rotation.y += delta;
    })

    return(
        <group position={position} rotation={rotation}>
            <motion.mesh  ref={ref}
                onPointerEnter={() => setIsHover(true)} 
                onPointerOut={() => setIsHover(false)} 
                whileHover={{scale:1.5, transition:{duration:0.5}}}
            >
                <primitive object={weatherModel} />
            </motion.mesh>
            {isHover ? <CityName name={cityName} /> : null}
            
        </group>
       
    )
}

export default Weather;