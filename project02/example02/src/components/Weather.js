import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Weather = (props) => {
    const {position, weather} = props;

    const glb = useLoader(GLTFLoader, '/models/weather.glb')
    // console.log(glb.nodes)

    // let weatherModel;
    // if(glb.nodes[weather]) {
    //     weatherModel = glb.nodes[weather].clone()
    // } else {
    //     // 없으면 흐림 날씨로 보여라
    //     weatherModel = glb.nodes.cloud.clone()
    // }

    // weather이 바뀔때만 재계산되도록 불필요한 계산을 막는 useMemo를 씀
    // const weatherModel = useMemo(() => {
    //     if(glb.nodes[weather]) {
    //         const cloneModel = glb.nodes[weather].clone()
    //         return cloneModel
    //     } else {
    //         const cloneModel = glb.nodes.cloud.clone()
    //         return cloneModel
    //     }
    // }, [glb.nodes, weather])

    const weatherModel = useMemo(() => {
        const cloneModel = glb.nodes[weather] || glb.nodes.cloud
        return cloneModel.clone()
    }, [glb.nodes, weather])

    return(
        <mesh position={position}>
            <primitive object={weatherModel} />
        </mesh>
    )
}

export default Weather;