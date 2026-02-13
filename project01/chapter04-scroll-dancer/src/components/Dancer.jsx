import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useAppStore } from "../stores";

let timeline;
export const Dancer = () => {
  const three = useThree()
  const isEntered = useAppStore((state) => state.isEntered);

  const dancerRef = useRef(null)
  const {scene, animations} = useGLTF("/models/dancer.glb")

  const {actions} = useAnimations(animations, dancerRef)

  const scroll = useScroll();

  useFrame(() => {
    if (!isEntered) return;
    // 스크롤으로 타임라인 제어
    timeline.seek(scroll.offset * timeline.duration())
  })

  useEffect(() => {
		if (!isEntered || !actions?.["wave"]) return;
		actions["wave"].reset().fadeIn(0.5).play();
	}, [isEntered, actions]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;

    gsap.fromTo(three.camera.position, {
      x: -5,
      y: 5,
      z:5,
    }, {
      x: 0,
      y: 6,
      z: 12,
      duration: 2.5,
    })

    gsap.fromTo(three.camera.rotation, {
      z: Math.PI
    }, {
      duration: 2.5,
      z: 0
    })
  }, [isEntered, three.camera.position, three.camera.rotation])

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;
    timeline = gsap.timeline();
    timeline
			.from(
				dancerRef.current.rotation,
				{
					duration: 4,
					y: -4 * Math.PI,
				},
				0.5,
			)
			.from(
				dancerRef.current.position,
				{
					duration: 4,
					x: 3,
				},
				"<",
				// "<" : 앞에 선행하는 애니메이션과 동일한 시간대에 실행해줘
    ).to(
      // 카메라가 좀더 가까워지게
      three.camera.position, {
        duration: 10,
        x: 2,
        z: 8,
      }, "<"
    ).to(
      three.camera.position, {
        duration: 10,
        x: 0,
        z: 6,
      }
    ).to(
      three.camera.position, {
        duration: 10,
        x: 0,
        z: 16
      }
    );
  }, [isEntered])
  if (isEntered) {
    return (
			<>
				<ambientLight intensity={2} />
				<primitive ref={dancerRef} object={scene} scale={0.05}></primitive>
			</>
		);
  }
		
}