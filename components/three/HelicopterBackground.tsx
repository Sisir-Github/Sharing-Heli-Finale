"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type SceneProps = {
  isMobile: boolean;
};

function HelicopterModel({ isMobile }: SceneProps) {
  const helicopterRef = useRef<THREE.Group>(null);
  const mainRotorRef = useRef<THREE.Group>(null);
  const tailRotorRef = useRef<THREE.Group>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const handleVisibility = () => {
      pausedRef.current = document.hidden;
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useFrame((state, delta) => {
    if (pausedRef.current) {
      return;
    }

    const speedFactor = isMobile ? 0.7 : 1;
    const t = state.clock.getElapsedTime();

    if (mainRotorRef.current) {
      mainRotorRef.current.rotation.y += delta * 20 * speedFactor;
    }

    if (tailRotorRef.current) {
      tailRotorRef.current.rotation.x += delta * 30 * speedFactor;
    }

    if (helicopterRef.current) {
      helicopterRef.current.position.x = Math.sin(t * 0.22) * (isMobile ? 0.35 : 0.75);
      helicopterRef.current.position.y = 0.15 + Math.sin(t * 0.9) * 0.06;
      helicopterRef.current.position.z = Math.cos(t * 0.18) * (isMobile ? 0.2 : 0.4);
      helicopterRef.current.rotation.z = Math.sin(t * 0.5) * 0.04;
      helicopterRef.current.rotation.y = -0.22 + Math.sin(t * 0.2) * 0.06;
    }
  });

  return (
    <group ref={helicopterRef} position={[0, 0.1, 0]}>
      <mesh castShadow>
        <capsuleGeometry args={[0.23, 1.2, 6, 14]} />
        <meshStandardMaterial color="#243651" metalness={0.5} roughness={0.3} />
      </mesh>

      <mesh position={[-0.48, 0.05, 0]} castShadow>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color="#2f476d" metalness={0.35} roughness={0.25} transparent opacity={0.92} />
      </mesh>

      <mesh position={[0.95, 0.1, 0]} castShadow>
        <boxGeometry args={[1.9, 0.08, 0.08]} />
        <meshStandardMaterial color="#6f88b1" metalness={0.3} roughness={0.4} />
      </mesh>

      <mesh position={[1.85, 0.1, 0]} castShadow>
        <boxGeometry args={[0.34, 0.22, 0.22]} />
        <meshStandardMaterial color="#1a263a" metalness={0.4} roughness={0.35} />
      </mesh>

      <mesh position={[0.1, -0.34, 0.18]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.25, 10]} />
        <meshStandardMaterial color="#8da2c4" metalness={0.2} roughness={0.5} />
      </mesh>

      <mesh position={[0.1, -0.34, -0.18]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1.25, 10]} />
        <meshStandardMaterial color="#8da2c4" metalness={0.2} roughness={0.5} />
      </mesh>

      <mesh position={[-0.35, -0.36, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.44, 10]} />
        <meshStandardMaterial color="#8da2c4" metalness={0.2} roughness={0.5} />
      </mesh>

      <mesh position={[0.55, -0.36, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.44, 10]} />
        <meshStandardMaterial color="#8da2c4" metalness={0.2} roughness={0.5} />
      </mesh>

      <group ref={mainRotorRef} position={[0.1, 0.44, 0]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
          <meshStandardMaterial color="#d1dceb" metalness={0.7} roughness={0.2} />
        </mesh>
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle) => (
          <mesh key={angle} rotation={[0, angle, 0]} position={[0, 0, 0.66]}>
            <boxGeometry args={[0.06, 0.01, 1.32]} />
            <meshStandardMaterial color="#edf2fb" metalness={0.25} roughness={0.45} />
          </mesh>
        ))}
      </group>

      <group ref={tailRotorRef} position={[2.03, 0.1, 0]}>
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle) => (
          <mesh key={angle} rotation={[angle, 0, 0]} position={[0, 0, 0.12]}>
            <boxGeometry args={[0.02, 0.2, 0.02]} />
            <meshStandardMaterial color="#f4f7ff" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function AtmosphericLight({ isMobile }: SceneProps) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const sway = isMobile ? 0.06 : 0.14;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(t * 0.13) * sway, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.15 + Math.sin(t * 0.2) * 0.03, 0.04);
    camera.lookAt(0, 0.06, 0);
  });

  return (
    <>
      <ambientLight intensity={0.58} />
      <directionalLight position={[2.5, 3.5, 2]} intensity={1.15} color="#9ac2ff" />
      <pointLight position={[-2.2, 0.8, 2.3]} intensity={1.2} color="#f8d98e" />
      <mesh position={[0, -1.25, -0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial color="#90b8ff" transparent opacity={0.12} />
      </mesh>
    </>
  );
}

function HelicopterScene({ isMobile }: SceneProps) {
  const fogColor = useMemo(() => new THREE.Color("#0b172b"), []);

  return (
    <>
      <color attach="background" args={["#050b16"]} />
      <fog attach="fog" args={[fogColor, 3, 15]} />
      <AtmosphericLight isMobile={isMobile} />
      <group position={[0, -0.1, 0]}>
        <HelicopterModel isMobile={isMobile} />
      </group>
    </>
  );
}

function StaticFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 20% 30%, rgba(120,179,255,0.28), transparent 36%), radial-gradient(circle at 80% 18%, rgba(232,195,106,0.24), transparent 34%), linear-gradient(180deg, #071022 0%, #0a172b 60%, #0d1825 100%)"
      }}
      aria-hidden
    />
  );
}

export function HelicopterBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setIsMobile(mobileQuery.matches);
      setReducedMotion(reducedMotionQuery.matches);
    };

    update();
    mobileQuery.addEventListener("change", update);
    reducedMotionQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      reducedMotionQuery.removeEventListener("change", update);
    };
  }, []);

  if (reducedMotion) {
    return <StaticFallback />;
  }

  return (
    <Canvas
      className="absolute inset-0"
      dpr={isMobile ? [1, 1.2] : [1, 1.75]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance"
      }}
      camera={{
        position: [-2.4, 1.1, 4.5],
        fov: 45
      }}
      shadows={false}
    >
      <HelicopterScene isMobile={isMobile} />
    </Canvas>
  );
}
