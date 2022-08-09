import { useState } from "react";;
import { BufferGeometry, Material, Mesh } from "three";

import { Text } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import Group from "./components/Choice/Group";

export type meshRef = React.MutableRefObject<Mesh<BufferGeometry, Material | Material[]> | undefined>;

function App() {
  const aspect = window.innerWidth / window.innerHeight;
  const width = 10;
  const height = width / aspect;

  const [choice, setChoice] = useState<boolean>(false);

  return (
    <div className="game">
      <Canvas
        camera={{ left: width / -2, right: width / 2, top: height / 2, bottom: height / -2, near: 1, far: 100 }}
        onCreated={(state) => {
          state.camera.lookAt(0, 0, 0);
        }}
        >
        <ambientLight intensity={0.55} position={[10, 20, 0]} />
        <directionalLight intensity={0.55} position={[10, 20, 0]} />
        {
          choice
          ? (<Text scale={[5, 5, 5]} position={[0, 0, 1]} font={"https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/TmoneyRoundWindRegular.woff"} color={"gray"}>다시 고를려면 새로고침해주세요.</Text>)
          : (<></>)
        }
        <Group name="first" callback={() => setChoice(true)} />
      </Canvas>
    </div>
  );
};

export default App;