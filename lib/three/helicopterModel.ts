import { useGLTF } from "@react-three/drei";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { Box3, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, Vector3 } from "three";
import { useMemo } from "react";
import type { GLTF } from "three-stdlib";

const HELICOPTER_MODEL_PATH = "/models/helicopter.glb";

const MAIN_ROTOR_HINTS = ["mainrotor", "main_rotor", "rotor_main", "m_rotor", "rotor"];
const TAIL_ROTOR_HINTS = ["tailrotor", "tail_rotor", "rotor_tail", "t_rotor"];

type RotorAxis = "x" | "y" | "z";

type HelicopterModelData = {
  scene: Object3D;
  mainRotor: Object3D | null;
  tailRotor: Object3D | null;
  mainRotorAxis: RotorAxis;
  tailRotorAxis: RotorAxis;
  mainRotorMeshes: Mesh[];
  tailRotorMeshes: Mesh[];
};

function findNodeByHints(root: Object3D, hints: string[], excludeHints: string[] = []) {
  let found: Object3D | null = null;

  root.traverse((object) => {
    if (found) {
      return;
    }

    const name = object.name.toLowerCase();
    const hasHint = hints.some((hint) => name.includes(hint));
    const excluded = excludeHints.some((hint) => name.includes(hint));

    if (hasHint && !excluded) {
      found = object;
    }
  });

  return found;
}

function inferRotorAxis(object: Object3D | null, fallback: RotorAxis): RotorAxis {
  if (!object) {
    return fallback;
  }

  const box = new Box3().setFromObject(object);
  const size = box.getSize(new Vector3());

  const min = Math.min(size.x, size.y, size.z);
  if (min === size.x) {
    return "x";
  }
  if (min === size.y) {
    return "y";
  }
  return "z";
}

function collectMeshes(node: Object3D | null) {
  const meshes: Mesh[] = [];

  if (!node) {
    return meshes;
  }

  node.traverse((object) => {
    if ((object as Mesh).isMesh) {
      meshes.push(object as Mesh);
    }
  });

  return meshes;
}

function tunePbrMaterials(root: Object3D) {
  root.traverse((object) => {
    if (!(object as Mesh).isMesh) {
      return;
    }

    const mesh = object as Mesh;
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    materials.forEach((material) => {
      if (material instanceof MeshStandardMaterial || material instanceof MeshPhysicalMaterial) {
        material.envMapIntensity = Math.max(material.envMapIntensity || 1, 1.2);
        material.needsUpdate = true;
      }
    });
  });
}

export function preloadHelicopterModel() {
  useGLTF.preload(HELICOPTER_MODEL_PATH);
}

export function useHelicopterModel(): HelicopterModelData {
  const gltf = useGLTF(HELICOPTER_MODEL_PATH) as GLTF;

  return useMemo(() => {
    const scene = clone(gltf.scene) as Object3D;

    tunePbrMaterials(scene);

    const mainRotor = findNodeByHints(scene, MAIN_ROTOR_HINTS, ["tail"]);
    const tailRotor = findNodeByHints(scene, TAIL_ROTOR_HINTS);

    return {
      scene,
      mainRotor,
      tailRotor,
      mainRotorAxis: inferRotorAxis(mainRotor, "y"),
      tailRotorAxis: inferRotorAxis(tailRotor, "x"),
      mainRotorMeshes: collectMeshes(mainRotor),
      tailRotorMeshes: collectMeshes(tailRotor)
    };
  }, [gltf.scene]);
}

export const HELICOPTER_MODEL_URL = HELICOPTER_MODEL_PATH;
