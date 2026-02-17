import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion } from "framer-motion-3d";
import { CityName } from "./CityName";
import { useNavigate } from "react-router-dom";

const Weather = (props) => {
    const { position, cityName, rotation, weather } = props;
    const glb = useLoader(GLTFLoader, '/models/weather.glb')
    const ref = useRef(null)
    const [isHover, setHover] = useState(false)
    const navigate =useNavigate()

    const weatherModel = useMemo(() => {
        const clonedModel = glb.nodes[weather] || glb.nodes.cloud
        return clonedModel.clone()
    }, [weather])

    useFrame((_,delta)=>{
        ref.current.rotation.y += delta;
    })

    const formatCityName = (name) => {
        return name.replace(/\s/g, '').toLowerCase()
    }
    const onClick = () => {
        navigate(`/${formatCityName(cityName)}`)
    }

    return(
        <group
            position={position} 
            rotation={rotation}
            >
            <motion.mesh 
                ref={ref}
                onPointerEnter={()=> setHover(true)}
                onPointerOut={()=> setHover(false)}
                whileHover={{scale:1.5, transition:{duration:0.5}}} 
                onClick={onClick}
                >
                <primitive object={weatherModel} />
            </motion.mesh>
            {isHover && <CityName name={cityName}/>}
        </group>
    )
}

export default Weather;