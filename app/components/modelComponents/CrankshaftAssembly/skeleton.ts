import * as THREE from "three";

export const PISTON_SPACING = 3;
export const PISTON_PIVOT_OFFSET = 3;
export const PISTON_ORDER = [1, 2, 3, 4];

// derived
export const CRANKSHAFT_LENGTH = PISTON_SPACING * 3;

// vector calculations
function calculatePistonXOffset(pistonNumber: number): number {
  return (pistonNumber - 1) * PISTON_SPACING;
}

function calculatePistonYOffset(pistonNumber: number): number {
  return 0;
}

function calculatePistonZOffset(
  pistonNumber: number,
  crankRadius: number
): number {
  return pistonNumber == 1 || pistonNumber == 4 ? -crankRadius : crankRadius;
}

export function createVectors(crankRadius: number) {
  const vectors: { [vectorName: string]: THREE.Vector3 } = {};

  PISTON_ORDER.forEach((pistonNumber) => {
    vectors[`piston${pistonNumber}XOffset`] = new THREE.Vector3(
      calculatePistonXOffset(pistonNumber),
      0,
      0
    );
    vectors[`piston${pistonNumber}YZOffset`] = new THREE.Vector3(
      0,
      calculatePistonYOffset(pistonNumber),
      calculatePistonZOffset(pistonNumber, crankRadius)
    );
  });

  return vectors;
}
