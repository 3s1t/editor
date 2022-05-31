import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { folder, Leva, useControls } from "leva";

const Scene: React.FC = ({ children }) => {
  const [{ backgroundColor }] = useControls(() => ({
    Settings: folder({
      backgroundColor: "#aaaaaa",
    }),
  }));

  return (
    <div className="w-full h-full">
      <Leva collapsed />

      <Canvas>
        <color attach="background" args={[backgroundColor]} />
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <axesHelper args={[10]} />
        <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={20} />
        {children}
      </Canvas>
    </div>
  );
};

export default Scene;
