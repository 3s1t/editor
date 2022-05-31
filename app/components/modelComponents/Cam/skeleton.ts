import * as THREE from "three";

export const l = 3;
export const r1 = 3;
export const r2 = 2;

// derived
export function getPhiD(r1: number, r2: number, l: number): number {
  return (r1 - r2) / l;
}
export function getPhiB(r1: number, r2: number, l: number): number {
  return Math.atan(
    (l + (r2 * (r1 - r2)) / l) / (r2 * Math.sqrt(1 - (r1 - r2) ** 2 / l ** 2))
  );
}

function getH(phi: number, r1: number, r2: number, l: number): number {
  const phiD = getPhiD(r1, r2, l);
  const phiB = getPhiB(r1, r2, l);

  let phiEffective = phi;

  if (phi >= Math.PI / 2 && phi <= (3 * Math.PI) / 2) {
    const angleToVertical = phi - Math.PI / 2;
    phiEffective = phi - 2 * angleToVertical;
  }

  if (phiEffective <= phiD) {
    return r1;
  } else if (phiEffective <= phiB) {
    return r1 * (1 / Math.cos(phiEffective - Math.asin((r1 - r2) / l)));
  } else if (phiEffective <= Math.PI / 2) {
    const tanPhi = Math.tan(phiEffective);
    const numerator =
      l + Math.sqrt(r2 ** 2 + (1 / tanPhi ** 2) * (r2 ** 2 - l ** 2));
    const x = numerator / (tanPhi + 1 / tanPhi);
    const y = numerator / (1 + 1 / tanPhi ** 2);
    return Math.sqrt(x ** 2 + y ** 2);
  } else {
    return r1;
  }
}

export function getLinePoints(
  phi: number,
  r1: number,
  r2: number,
  l: number
): [THREE.Vector3, THREE.Vector3] {
  const h = getH(phi, r1, r2, l);
  return [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(h * Math.cos(phi), h * Math.sin(phi), 0),
  ];
}
