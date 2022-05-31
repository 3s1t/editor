import React, { useRef } from "react";
import * as THREE from "three";
import { Cylinder, Html, Line } from "@react-three/drei";
import { useEngineStore } from "~/state";
import { Vector3 } from "three";
import { useControls, folder } from "leva";
import Cam from "~/components/modelComponents/Cam";

interface PistonAssemblyProps {
  inverted?: boolean;
  navigate?: (to: string) => void;
}

/**
 * Origin - Center of piston
 */
export default function PistonAssembly({
  inverted = false,
  navigate,
}: PistonAssemblyProps) {
  const [{ crankRadius, pistonRodLength, pistonOffset, skeleton }] =
    useControls(() => ({
      Crankshaft: folder({
        crankRadius: {
          value: 3,
          min: 1,
          max: 5,
          step: 1,
        },
      }),
      Piston: folder({
        pistonRodLength: {
          value: 5,
          min: 1,
          max: 5,
          step: 1,
        },
        pistonOffset: {
          value: 1,
          min: 0.5,
          max: 2,
          step: 0.2,
        },
        skeleton: false,
      }),
    }));

  const crankshaftAngle = useEngineStore((state) => state.crankshaftAngle);

  const origin = new Vector3(0, 0, 0);

  const crankPinZ =
    -crankRadius * Math.cos(crankshaftAngle) * (inverted ? -1 : 1);

  const originToCrankPin = new THREE.Vector3(
    0,
    crankRadius * Math.sin(crankshaftAngle) * (inverted ? -1 : 1),
    crankPinZ
  );

  const crankPinToPistonPin = new THREE.Vector3(
    0,
    pistonRodLength *
      Math.sqrt(
        1 -
          (crankRadius / pistonRodLength) ** 2 * Math.cos(crankshaftAngle) ** 2
      ),
    -crankPinZ
  );

  const originToPistonPin = new THREE.Vector3(
    0,
    originToCrankPin.y + crankPinToPistonPin.y,
    0
  );

  const pistonPinToPiston = new THREE.Vector3(0, pistonOffset, 0);

  const pistonPosition = new THREE.Vector3()
    .add(originToCrankPin)
    .add(crankPinToPistonPin)
    .add(pistonPinToPiston);

  return (
    <group>
      {/* skeleton */}
      {skeleton && (
        <>
          <axesHelper args={[1.5]} />
        </>
      )}

      {/* piston */}
      <group onClick={() => navigate && navigate("piston")}>
        <group position={pistonPosition}>
          {skeleton && (
            <>
              <axesHelper args={[1.5]} />
            </>
          )}
          <Cylinder args={[1, 1, 1, 32]}>
            <meshStandardMaterial color="green" />
          </Cylinder>
        </group>
        <Line
          points={[originToCrankPin, originToPistonPin]}
          color="green"
          lineWidth={3}
          dashed={false}
        />
      </group>

      {/* piston */}
      <Line
        points={[origin, originToCrankPin]}
        color="rebeccapurple"
        lineWidth={3}
        dashed={false}
      />

      {/* cams */}
      <group
        position={[0, 10, 1]}
        rotation={[crankshaftAngle * 2, Math.PI / 2, 0]}
        onClick={() => navigate && navigate("cam-follower")}
      >
        <Cam />
      </group>
      <group
        position={[0, 10, -1]}
        rotation={[(crankshaftAngle + Math.PI / 2) * 2, Math.PI / 2, 0]}
        onClick={() => navigate && navigate("cam-follower")}
      >
        {skeleton && (
          <>
            <Html>{Math.floor((crankshaftAngle * 2) / (2 * Math.PI))}</Html>
          </>
        )}
        <Cam />
      </group>
    </group>
  );
}
