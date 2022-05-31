import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import Scene from "~/components/applicationComponents/Scene";
import Cam from "~/components/modelComponents/Cam";
import { Line } from "@react-three/drei";
import { getLinePoints } from "~/components/modelComponents/Cam/skeleton";

function CamGroup() {
  let [phi, setPhi] = React.useState(0);
  useFrame(() => {
    setPhi((phi + 0.01) % (2 * Math.PI));
  });

  const r1 = 0.2;
  const r2 = 0.1;
  const l = 0.4;

  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <Line
        points={getLinePoints(phi, r1, r2, l)}
        color="blue"
        lineWidth={3}
        dashed={false}
      />
      <Cam />
    </group>
  );
}

export default function CamFollowerScene() {
  return (
    <Scene>
      <CamGroup />
    </Scene>
  );
}
