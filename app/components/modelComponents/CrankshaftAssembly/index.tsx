import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line, Sphere } from "@react-three/drei";
import { useEngineStore } from "~/state";
import { useControls, folder } from "leva";

import { CRANKSHAFT_LENGTH, PISTON_ORDER, createVectors } from "./skeleton";

interface CrankshaftProps {}

export default function Crankshaft({}: CrankshaftProps) {
  const group = useRef<THREE.Group>(null!);
  const crankshaftAngle = useEngineStore((state) => state.crankshaftAngle);

  useFrame(() => {
    group.current.rotation.x = crankshaftAngle;
  });

  const [{ skeleton, crankRadius }] = useControls(() => ({
    Crankshaft: folder({
      skeleton: false,
      crankRadius: {
        value: 3,
        min: 1,
        max: 5,
        step: 1,
      },
    }),
  }));

  const vectors = createVectors(crankRadius);

  return (
    <group ref={group}>
      <Sphere args={[0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="rebeccapurple" />
      </Sphere>
      <Line
        points={[
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(CRANKSHAFT_LENGTH, 0, 0),
        ]}
        color="rebeccapurple"
        lineWidth={3}
        dashed={false}
      />
      {skeleton ? (
        <>
          <axesHelper args={[3]} />
          {PISTON_ORDER.map((pistonNumber) => {
            return (
              <group
                key={pistonNumber}
                position={vectors[`piston${pistonNumber}XOffset`]}
              >
                <Line
                  points={[
                    new THREE.Vector3(0, 0, 0),
                    vectors[`piston${pistonNumber}YZOffset`],
                  ]}
                  color="rebeccapurple"
                  lineWidth={3}
                  dashed={false}
                />
              </group>
            );
          })}
          <Html>
            <div>{Math.floor(crankshaftAngle / (2 * Math.PI))}</div>
          </Html>
        </>
      ) : null}
    </group>
  );
}
