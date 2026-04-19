import { useFrame, useLoader } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useBodyClass } from "../utils/hook";
import { CityName } from "./CityName";

const Weather = (props) => {
    const { position, cityName, rotation, weather } = props;
    const glb = useLoader(GLTFLoader, '/models/weather.glb')
    const ref = useRef(null)
    const [isHover, setHover] = useState(false)

    const weatherModel = useMemo(() => {
        const clonedModel = glb.nodes[weather] || glb.nodes.cloud
        return clonedModel.clone()
    }, [weather])

    useFrame((_,delta)=>{
        ref.current.rotation.y += delta;
    })
    
    const navigate =  useNavigate()

    const formatCityName = (name) => {
        return name.replace(/\s/g, '').toLowerCase();
    };

    const onClick = () => {
        navigate(`/${formatCityName(cityName)}`)
    }

    useBodyClass(isHover, "pointer")

    return(
        <group
            position={position} 
            rotation={rotation}
            >
            <motion.mesh 
                ref={ref}
                onPointerEnter={()=> setHover(true)}
                onPointerOut={()=> setHover(false)}
                onClick={onClick}
                whileHover={{scale:1.3, transition:{duration:0.3}}} 
                >
                <primitive object={weatherModel} />
            </motion.mesh>
            {isHover && <CityName name={cityName}/>}
        </group>
    )
}

export default Weather;