import { Canvas } from "@react-three/fiber";
import Scene from "../components/Scene";
import React, { Suspense, useRef, useEffect } from "react";
import { Loader } from "@react-three/drei";
import gsap from "gsap"

function GSAPModal() {
  const meshRef = useRef()
  const materialRef = useRef()

  useEffect(() => {
    const mesh = meshRef.current;
    const material = materialRef.current;

    if(!mesh || !material) return;

    mesh.position.set(0,-1,0)
    material.opacity = 0.2

    const tl = gsap.timeline({delay: 1})
    tl.to(material, {
      opacity: 1,
      duration: 3,
       ease: "power2.out"
    })
    tl.to(mesh.position, {
      y: 1,
      duration: 3,
      ease: "elastic.out(1, 0.5)"
    })
    gsap.to(mesh.rotation, {
      y: "+=" + Math.PI * 2,
      duration: 4,
      ease: "none",
      repeat: -1
    })
    
  })

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 0.5, 8]} />
      <meshBasicMaterial
        ref={materialRef}
        color={"hotpink"}
        transparent
      />
    </mesh>
  )
}

// rotation={[Math.PI / 2, 0, 1]}

function Home() {
  return (
    <>
    <Canvas camera={{position: [0, 0, 5], fov: 45}}>
        <color attach="background" args={["rgb(67, 127, 240) 100%)"]} />
        <Suspense fallback={'loading'}>
          <Scene/>
          {/* <GSAPModal  /> */}
        </Suspense>
    </Canvas>
    <Loader />
    </>
  );
}

export default Home;