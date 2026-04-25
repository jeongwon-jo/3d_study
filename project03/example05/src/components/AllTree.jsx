import { Merged, useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { Tree } from './Tree';

const AllTree = () => {
  const { nodes, materials } = useGLTF('/assets/models/tree.glb')
  const meshes = useMemo(() => ({TreeMesh: nodes.tree}), [nodes])  

  return (
    <Merged meshes={meshes}>
      {(model) => (
        <>
          <Tree model={model} material={materials['Material.003']} position={[1,0.5,-1]}/>
          <Tree model={model} material={materials['Material.003']} position={[-1,0.5,-1]}/>
          <Tree model={model} material={materials['Material.003']} position={[3,0.5,-1]}/>
          <Tree model={model} material={materials['Material.003']} position={[-3,0.5,-1]}/>
          <Tree model={model} material={materials['Material.003']} position={[-6, 0.5,  0]} />
          <Tree model={model} material={materials['Material.003']} position={[-6, 0.5, -2]} />
          <Tree model={model} material={materials['Material.003']} position={[-6, 0.5, -4]} />
          <Tree model={model} material={materials['Material.003']} position={[-6, 0.5, -6]} />
          <Tree model={model} material={materials['Material.003']} position={[-6, 0.5, -8]} />
          <Tree model={model} material={materials['Material.003']} position={[-6, 0.5, -10]}/>
        </>
      )}
    </Merged>
  )
}

export default AllTree;