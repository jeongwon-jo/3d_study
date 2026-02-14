import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {Canvas, useLoader} from "@react-three/fiber"

export function Earth(props) {
  const glb = useLoader(GLTFLoader, "/models/earth.glb")
  return (
    <mesh {...props}>
      <primitive object={glb.scene} />
    </mesh>
  )
}