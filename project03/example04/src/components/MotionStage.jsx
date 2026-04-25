import { useBox } from '@react-three/cannon'
import { Html, useGLTF, useTexture } from '@react-three/drei'
import { motion } from "framer-motion-3d"
import { useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { stage1 } from '../utils/atom'
import Picture from './Picture'

useGLTF.preload('/assets/models/popup.glb')

export function MotionStage({position}) {
  const { nodes, materials } = useGLTF('/assets/models/popup.glb')
  const texture = useTexture("/assets/images/github.jpeg")
  const stage = useRecoilValue(stage1)

  const [ref] = useBox(() => ({
    args: [1,1,0.3],
    position,
    type: "Static"
  }), useRef(null))

  const x = position[0];
  const y = position[1];
  const z = position[2];

  return (
    <group>
      <motion.mesh animate={!stage ? {opacity: [0.3, 0.5], y: [0.05, 0.5, 0.05], transition: {duration: 2, ease: "easeInOut", delay: 0.3, repeat: Infinity}} : {y:0.05, transition: {duration: 2, ease: "easeInOut"}}} position={[x,y-0.5,z + 1]} scale={0.5} rotation-x={-Math.PI /2}>
        <circleGeometry args={[1,32]} />
        <meshBasicMaterial color={"white"} transparent opacity={0.3}/>
      </motion.mesh>
      <mesh position={[x,y-0.5,z + 1]} scale={0.5} rotation-x={-Math.PI /2}>
        <circleGeometry args={[1,32]} />
        <meshBasicMaterial color={"white"} transparent opacity={0.8}/>
      </mesh>
      <group ref={ref} scale={0.3}>
        <mesh geometry={nodes.body.geometry} material={materials.Material} position={[0.004, 0.15, 0.065]} scale={[1.957, -1.036, 0.135]} />
        <Picture nodes={nodes} texture={texture} />
        {stage && (
          <Html center>
            <div className='information enter'>
              <img src="/assets/images/enter.png" alt="enter" />
              <p>Enter</p>
            </div>
          </Html>
        )}
      </group>
    </group>
    
  )
}

