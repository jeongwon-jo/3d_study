import { Text3D } from "@react-three/drei"

const HowToPlay = () => {
  const fontUrl = "/assets/fonts/Pretendard.json"

  const fontStyle = {
    font:fontUrl,
    size:0.15,
    letterSpacing:0.01,
    height:0.02,
    lineHeight:1,
    fontSize: 1
  }

  return (
    <group position={[0.5,0,0.7]} rotation={[-Math.PI/2 , 0, 0]}>
      {/* <Text characters="abcdefghijklmnopqrstuwxyz0123456789!" font={fontUrl} color={"white"}>
        Hello World
      </Text> */}
      <Text3D {...fontStyle}>
        How To Play
        <meshNormalMaterial />
      </Text3D>
      <group position={[0.3,-0.5,0]}>
        <Text3D
          position={[0.2, 0.1, 0]}
          {...fontStyle}
          >
          ↑
          <meshNormalMaterial/>
      </Text3D>
      <Text3D
          position={[0,-0.1,0]}
          {...fontStyle}
          >
          ←↓→
          <meshNormalMaterial/>
      </Text3D>
      </group>
    </group>
  )
}

export default HowToPlay