import { useRef, useState } from "react";
import { Mesh } from "three";

import { useFrame } from "@react-three/fiber";

export default function Box({ position, clicked, type }: { position: [x: number, y: number, z: number], type: "left" | "right", clicked: boolean }) {
  const ref = useRef<Mesh>();

  const [hovered, setHover] = useState<boolean>(false);
  const [choice, setChoice] = useState<boolean>(false);
  const color = type === "right" ? "hotpink" : "skyblue";

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z += 0.01;
      if (choice) {
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;
      }
    }
  });

  return (
    <mesh
     ref={ref as any}
     scale={hovered && !clicked ? 1.2 : 1}
     position={position}
     onClick={() => {
      if (!clicked) setChoice(true);
    }}
     onPointerOver={() => setHover(true)}
     onPointerOut={() => setHover(false)}
     >
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={hovered && !clicked ? color : clicked && choice ? color : "orange"} />
    </mesh>
  )
}