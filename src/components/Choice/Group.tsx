import { GroupProps, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import Box from "./Box";

export default function Group({ name, callback }: { name: string, callback: () => void }) {
  const ref = useRef<GroupProps>();
  const [clicked, setClick] = useState<boolean>(false);

  const aspect = window.innerWidth / window.innerHeight;
  const width = 10;
  const height = width / aspect;

  useFrame(() => {
    if (ref.current && clicked) {
      if (ref.current.getObjectByName) {
        const group = ref.current.getObjectByName(name);
        if (group) {
          callback();
          group.position.y += 0.05;
          if (group.position.y > height) {
            group.position.y = -height;
          }
        }
      }
    }
  });

  return (
    <group
      ref={ref as any}
      name={name}
      onClick={() => {
        setClick(true);
      }}
      >
      <Box position={[-1.2, 0, 0]} type={"left"} clicked={clicked} />
      <Box position={[1.2, 0, 0]} type={"right"} clicked={clicked   } />
    </group>
  );
};