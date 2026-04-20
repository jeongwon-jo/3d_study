import { useBox } from "@react-three/cannon"
import { useGLTF } from '@react-three/drei'
useGLTF.preload('/assets/models/tree.glb')

export function Tree(props) {
  const { nodes, materials } = useGLTF('/assets/models/tree.glb')

  const [ref] = useBox(() => ({
    args: [0.3,1,0.3],
    type: "Static",
    ...props
  }))

  return (
    <group ref={ref}>
      <mesh scale={0.2} geometry={nodes.tree.geometry} material={materials['Material.003']} position={[0, 0, 0]} rotation={[-1.555, 0, 0]} />
    </group>
  )
}


