import { useAnimations, useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
export const GLBModel = () => {
  const three = useThree();
  // console.log("state", three);
  
  const { scene, animations } = useGLTF("/dancer.glb");
  // console.log(gltf);
  const ref = useRef(null)

  const {actions} = useAnimations(animations, ref);
  console.log(actions);
  
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    actions["wave"].play();
  }, [actions, scene]);

  useFrame((state, delta) => {
    // console.log(state);
    // console.log(delta);
    ref.current.rotation.y += 0.02

  })

  // primitive: 오브젝트의 geometry
  return <primitive scale={0.01} ref={ref} position-y={0.8} object={scene} />;
}