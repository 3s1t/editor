import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";

import Crankshaft from "~/components/modelComponents/CrankshaftAssembly";
import PistonAssembly from "~/components/modelComponents/PistonAssembly";
import { useEngineStore } from "~/state";
import { revolutionsPerMinuteToRadiansPerSecond } from "~/helpers";
import Cam from "../Cam";

interface EngineProps {
  navigate?: (to: string) => void;
}

export default function Engine({ navigate }: EngineProps) {
  const setElapsedTime = useEngineStore((state) => state.setElapsedTime);

  const crankshaftAngle = useEngineStore((state) => state.crankshaftAngle);
  const setCrankshaftAngle = useEngineStore(
    (state) => state.setCrankshaftAngle
  );

  const [{ crankshaftSpeed, on }] = useControls(() => ({
    Engine: folder({
      on: true,
      crankshaftSpeed: {
        value: 20,
        min: 10,
        max: 100,
        step: 5,
      },
    }),
  }));

  useFrame(({ clock }, delta) => {
    const newElapsedTime = clock.getElapsedTime();
    setElapsedTime(newElapsedTime);

    if (!on) return;

    const crankshaftAngleDelta =
      revolutionsPerMinuteToRadiansPerSecond(crankshaftSpeed) * delta;
    setCrankshaftAngle(crankshaftAngle + crankshaftAngleDelta);
  });

  return (
    <group position={[1, 1, 1]}>
      <Crankshaft />
      <group position={[0, 0, 0]}>
        <PistonAssembly navigate={navigate} />
      </group>
      <group position={[3, 0, 0]}>
        <PistonAssembly inverted navigate={navigate} />
      </group>
      <group position={[6, 0, 0]}>
        <PistonAssembly inverted navigate={navigate} />
      </group>
      <group position={[9, 0, 0]}>
        <PistonAssembly navigate={navigate} />
      </group>
    </group>
  );
}
