
import { useGLTF } from '@react-three/drei'
import { motion } from "framer-motion-3d"

useGLTF.preload('/assets/models/road.glb')

export function Road(props) {
  const { nodes, materials } = useGLTF('/assets/models/road.glb')
  return (
    <motion.group {...props} initial={{scale: 0}} animate={{scale: 0.04}} transition={{delay: 1.2}}>
      <mesh geometry={nodes.Box002_RoadRim_0.geometry} material={materials.RoadRim} />
      <mesh geometry={nodes.Box002_RoadRim_0_1.geometry} material={materials['RoadRim.001']} />
      <mesh geometry={nodes.Box002_RoadRim_0_2.geometry} material={materials['RoadRim.002']} />
      <mesh geometry={nodes.Box002_RoadRim_0_3.geometry} material={materials.RoadBase} />
      <mesh geometry={nodes.Box002_RoadRim_0_4.geometry} material={materials['RoadRim.005']} />
      <mesh geometry={nodes.Box002_RoadRim_0_5.geometry} material={materials['RoadRim.004']} />
      <mesh geometry={nodes.Box002_RoadRim_0_6.geometry} material={materials['RoadRim.003']} />
      <mesh geometry={nodes.Box002_RoadRim_0_7.geometry} material={materials['RoadBase.001']} />
    </motion.group>
  )
}


