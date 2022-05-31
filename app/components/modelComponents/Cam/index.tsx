import * as THREE from "three";
import React from "react";
import { Circle, Line } from "@react-three/drei";

import { getLinePoints } from "./skeleton";

interface CamProps {}

export default function Cam({}: CamProps) {
  const r1 = 0.2;
  const r2 = 0.1;
  const l = 0.4;

  return (
    <group>
      <Circle args={[r1, 64]} position={new THREE.Vector3(0, 0, 0)} />
      <Circle args={[r2, 64]} position={new THREE.Vector3(0, l, 0)} />
    </group>
  );
}
