"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Color, Group, MathUtils, Mesh, PCFSoftShadowMap, Vector3 } from "three";
import type { ReactNode } from "react";
import { Component } from "react";

import { useScrollVelocity } from "@/lib/hooks/useScrollVelocity";
import { HELICOPTER_MODEL_URL, useHelicopterModel } from "@/lib/three/helicopterModel";

type DeviceProfile = {
  isMobile: boolean;
  lowEnd: boolean;
  reducedMotion: boolean;
};

type SceneContentProps = {
  profile: DeviceProfile;
};

type ModelErrorBoundaryProps = {
  fallback: ReactNode;
  children: ReactNode;
  onError?: () => void;
};

type ModelErrorBoundaryState = {
  hasError: boolean;
};

class ModelErrorBoundary extends Component<ModelErrorBoundaryProps, ModelErrorBoundaryState> {
  state: ModelErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("helicopter_scene_model_error", error);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function StaticFallback({ reason }: { reason?: "missing" | "error" }) {
  const showHint = process.env.NODE_ENV !== "production" && reason;
  const message =
    reason === "missing"
      ? `3D model missing at ${HELICOPTER_MODEL_URL}. Add public/models/helicopter.glb.`
      : `Failed to load ${HELICOPTER_MODEL_URL}. Check GLB integrity and model paths.`;

  return (
    <>
      <div className="helicopter-static-fallback absolute inset-0" aria-hidden />
      {showHint ? (
        <div className="pointer-events-none absolute bottom-4 left-4 z-10 max-w-[36rem] rounded-md border border-white/20 bg-black/55 px-3 py-2 text-xs text-white/90 backdrop-blur">
          {message}
        </div>
      ) : null}
    </>
  );
}

function setRotorOpacity(meshes: Mesh[], targetOpacity: number) {
  meshes.forEach((mesh) => {
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    materials.forEach((material) => {
      if (!("opacity" in material)) {
        return;
      }

      const nextOpacity = MathUtils.lerp(material.opacity, targetOpacity, 0.2);
      material.transparent = true;
      material.depthWrite = nextOpacity > 0.65;
      material.opacity = nextOpacity;
      material.needsUpdate = true;
    });
  });
}

function HelicopterRig({ profile }: SceneContentProps) {
  const groupRef = useRef<Group>(null);

  const {
    scene,
    mainRotor,
    tailRotor,
    mainRotorAxis,
    tailRotorAxis,
    mainRotorMeshes,
    tailRotorMeshes
  } = useHelicopterModel();

  const { velocityRef, normalizedVelocityRef, isScrollingRef } = useScrollVelocity();

  const mainRotorSpeedRef = useRef(profile.isMobile ? 42 : 52);
  const tailRotorSpeedRef = useRef(profile.isMobile ? 80 : 105);
  const driftRef = useRef({ x: 0, y: 0 });

  const cameraBase = useMemo(
    () => (profile.isMobile ? new Vector3(-2.2, 1.3, 4.8) : new Vector3(-2.8, 1.35, 5.5)),
    [profile.isMobile]
  );

  useFrame((state, delta) => {
    const mainIdleSpeed = profile.isMobile ? 42 : 52;
    const tailIdleSpeed = profile.isMobile ? 80 : 105;
    const scrollBoost = normalizedVelocityRef.current * (profile.lowEnd ? 20 : 34);

    const targetMainSpeed = mainIdleSpeed + scrollBoost;
    const targetTailSpeed = tailIdleSpeed + scrollBoost * 1.5;

    const acceleration = isScrollingRef.current ? 7 : 2.8;
    mainRotorSpeedRef.current = MathUtils.damp(mainRotorSpeedRef.current, targetMainSpeed, acceleration, delta);
    tailRotorSpeedRef.current = MathUtils.damp(tailRotorSpeedRef.current, targetTailSpeed, acceleration, delta);

    if (mainRotor) {
      mainRotor.rotation[mainRotorAxis] += mainRotorSpeedRef.current * delta;
    }

    if (tailRotor) {
      tailRotor.rotation[tailRotorAxis] += tailRotorSpeedRef.current * delta;
    }

    // Simulate rotor motion blur by easing blade opacity at higher RPM.
    const mainOpacity = MathUtils.clamp(0.95 - mainRotorSpeedRef.current / 110, 0.28, 0.88);
    const tailOpacity = MathUtils.clamp(0.95 - tailRotorSpeedRef.current / 140, 0.2, 0.9);
    setRotorOpacity(mainRotorMeshes, mainOpacity);
    setRotorOpacity(tailRotorMeshes, tailOpacity);

    const scrollXTarget = MathUtils.clamp(velocityRef.current / 2200, -0.45, 0.45);
    const scrollYTarget = MathUtils.clamp(normalizedVelocityRef.current * 0.14, 0, 0.14);

    driftRef.current.x = MathUtils.damp(driftRef.current.x, scrollXTarget, 2.8, delta);
    driftRef.current.y = MathUtils.damp(driftRef.current.y, scrollYTarget, 2.8, delta);

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    if (groupRef.current) {
      groupRef.current.position.x = MathUtils.damp(
        groupRef.current.position.x,
        driftRef.current.x + pointerX * 0.2,
        2.4,
        delta
      );
      groupRef.current.position.y = MathUtils.damp(
        groupRef.current.position.y,
        0.12 + driftRef.current.y + pointerY * 0.08,
        2.3,
        delta
      );
      groupRef.current.position.z = MathUtils.damp(
        groupRef.current.position.z,
        Math.cos(state.clock.elapsedTime * 0.15) * 0.16,
        2,
        delta
      );

      groupRef.current.rotation.y = MathUtils.damp(
        groupRef.current.rotation.y,
        -0.18 + pointerX * 0.08 + driftRef.current.x * 0.06,
        2,
        delta
      );
      groupRef.current.rotation.z = MathUtils.damp(groupRef.current.rotation.z, pointerX * 0.025, 2.2, delta);
    }

    state.camera.position.x = MathUtils.damp(
      state.camera.position.x,
      cameraBase.x + driftRef.current.x * 0.34 + pointerX * 0.2,
      1.8,
      delta
    );
    state.camera.position.y = MathUtils.damp(
      state.camera.position.y,
      cameraBase.y + driftRef.current.y * 0.22 + pointerY * 0.08,
      1.8,
      delta
    );
    state.camera.position.z = MathUtils.damp(
      state.camera.position.z,
      cameraBase.z + Math.sin(state.clock.elapsedTime * 0.1) * 0.12,
      1.5,
      delta
    );
    state.camera.lookAt(0, 0.2, 0);
  });

  return (
    <>
      <color attach="background" args={["#050910"]} />
      <fog attach="fog" args={[new Color("#0a1422"), 6, 20]} />

      <ambientLight intensity={0.35} />
      <hemisphereLight intensity={0.55} color="#b5cce6" groundColor="#131a26" />

      <directionalLight
        position={[4.5, 5.2, 4.2]}
        intensity={1.2}
        color="#dbe8f5"
        castShadow={!profile.lowEnd}
        shadow-mapSize-width={profile.lowEnd ? 512 : 1024}
        shadow-mapSize-height={profile.lowEnd ? 512 : 1024}
        shadow-bias={-0.00022}
      />

      <directionalLight position={[-5.5, 1.4, 3]} intensity={0.5} color="#7fa7d6" />
      <pointLight position={[0, 2.5, -3.5]} intensity={0.35} color="#84a8d2" />

      {!profile.lowEnd ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]} receiveShadow>
          <planeGeometry args={[36, 36]} />
          <shadowMaterial color="#0a121d" opacity={0.2} />
        </mesh>
      ) : null}

      <mesh position={[0, -0.75, -3.4]}>
        <planeGeometry args={[14, 5]} />
        <meshBasicMaterial color="#8aa6cb" transparent opacity={0.06} />
      </mesh>

      <group ref={groupRef} position={[0, 0.12, 0]}>
        <primitive object={scene} />
      </group>
    </>
  );
}

export function HelicopterScene() {
  const [profile, setProfile] = useState<DeviceProfile>({
    isMobile: false,
    lowEnd: false,
    reducedMotion: false
  });
  const [modelState, setModelState] = useState<"checking" | "ready" | "missing" | "error">("checking");

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 820px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const detectProfile = () => {
      const hardwareThreads = navigator.hardwareConcurrency || 8;
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 8;
      const lowEnd = hardwareThreads <= 4 || deviceMemory <= 4;

      setProfile({
        isMobile: mobileQuery.matches,
        lowEnd,
        reducedMotion: reducedMotionQuery.matches
      });
    };

    detectProfile();

    mobileQuery.addEventListener("change", detectProfile);
    reducedMotionQuery.addEventListener("change", detectProfile);

    return () => {
      mobileQuery.removeEventListener("change", detectProfile);
      reducedMotionQuery.removeEventListener("change", detectProfile);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function checkModelAvailability() {
      const attempts: Array<() => Promise<Response>> = [
        () =>
          fetch(HELICOPTER_MODEL_URL, {
            method: "HEAD",
            cache: "no-store"
          }),
        () =>
          fetch(HELICOPTER_MODEL_URL, {
            method: "GET",
            cache: "no-store",
            headers: {
              Range: "bytes=0-1"
            }
          })
      ];

      for (const request of attempts) {
        try {
          const response = await request();

          if (response.ok || response.status === 206) {
            if (!cancelled) {
              setModelState("ready");
            }
            return;
          }
        } catch {
          // Try next probe method before marking as missing.
        }
      }

      if (!cancelled) {
        setModelState("missing");
      }
    }

    checkModelAvailability();

    return () => {
      cancelled = true;
    };
  }, []);

  if (profile.reducedMotion) {
    return <StaticFallback />;
  }

  if (modelState !== "ready") {
    const fallbackReason =
      modelState === "error" ? "error" : modelState === "missing" ? "missing" : undefined;
    return <StaticFallback reason={fallbackReason} />;
  }

  return (
    <Canvas
      className="pointer-events-none absolute inset-0"
      dpr={profile.lowEnd || profile.isMobile ? [1, 1.2] : [1, 1.5]}
      shadows={!profile.lowEnd}
      camera={{
        position: profile.isMobile ? [-2.2, 1.3, 4.8] : [-2.8, 1.35, 5.5],
        fov: profile.isMobile ? 46 : 42,
        near: 0.1,
        far: 80
      }}
      gl={{
        antialias: !profile.lowEnd,
        alpha: true,
        powerPreference: "high-performance"
      }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.06;
        gl.shadowMap.enabled = !profile.lowEnd;
        gl.shadowMap.type = PCFSoftShadowMap;
      }}
    >
      <ModelErrorBoundary
        fallback={null}
        onError={() => {
          setModelState("error");
        }}
      >
        <Suspense fallback={null}>
          <HelicopterRig profile={profile} />
        </Suspense>
      </ModelErrorBoundary>
    </Canvas>
  );
}
