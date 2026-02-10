import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
export const GLBModel = () => {
	const { scene, animations } = useGLTF("/dancer.glb");
  // console.log(gltf);
  const ref = useRef(null)
  const [currentAnimation, setCurrentAnimation] = useState("wave")
  const {actions} = useAnimations(animations, ref);
  
  useEffect(() => {
		scene.traverse((obj) => {
			if (obj.isMesh) {
				obj.castShadow = true;
				obj.receiveShadow = true;
			}
		});
  }, [actions, scene]);
  
  useEffect(() => {
		if (!actions || !actions[currentAnimation]) return;

    const action = actions[currentAnimation];
    console.log(action);
    
		action.reset().fadeIn(0.5).play();

		return () => {
			action.fadeOut(0.5);
		};
	}, [actions, currentAnimation]);


	// primitive: 오브젝트의 geometry
  return (
    <primitive
      onClick={() => {
        setCurrentAnimation(prev => {
          if (prev === "wave") return "windmill";
          return "wave"
        })
      }}
			onPointerUp={() => {
				console.log("업!");
			}}
			onPointerDown={() => {
				console.log("다운!");
			}}
			scale={0.01}
			ref={ref}
			position-y={0.8}
			object={scene}
		/>
	);
}