import { Debug, Physics } from "@react-three/cannon";
import { StatsGl } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRecoilValue } from "recoil";
import Car from "./Car";
import DrawCallCounter from "./components/DrawCallCounter";
import { Ground } from "./Ground";
import { isStartScene } from "./utils/atom";

function Scene() {
  const isStart = useRecoilValue(isStartScene)
  // useEffect(()=>{ console.log(isStart)},[isStart])

  // Pretendard.json 최적화를 위한 소스 콘솔에서 데이터를 확인하고 json을 수정한다
  // useEffect(() => {
  //   const fontData = fontjson
  //   const targetText = "How to Play↑←↓→";
  //   const modifiedGlyphs = {};

  //   for(let i=0;i<targetText.length;i++) {
  //     const char = targetText[i]
  //     const charKey = char in fontData.glyphs ? char : char.toUpperCase()

  //     if(charKey in fontData.glyphs) {
  //       modifiedGlyphs[charKey] = fontData.glyphs[charKey]
  //     }
  //   }

  //   const modifiedFontData = {
  //     ...fontData,
  //     glyphs: modifiedGlyphs
  //   }

  //   console.log(JSON.stringify(modifiedFontData))

  // } , [])
  return (
    <>
      <Canvas camera={{ fov:45, position:[1.5, 2, 4]}}>
        <ambientLight/>
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            {isStart && <Car/>}
            <Ground />
          </Debug>
        </Physics>
        <DrawCallCounter />
        <StatsGl className="work" />
      </Canvas>
    </>
  );
}

export default Scene;
