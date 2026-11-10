
"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  Sphere,
  Torus,
} from "@react-three/drei";
import type { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Sculpture() {
  const sculptureRef = useRef<Group>(null);
  const scrollGroupRef = useRef<Group>(null);
  const { camera } = useThree();

  // Independent mouse interaction
  useFrame((state, delta) => {
    if (!sculptureRef.current) return;

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;
    const smoothness = 1 - Math.exp(-delta * 3);

    sculptureRef.current.rotation.y +=
      (pointerX * 0.13 - sculptureRef.current.rotation.y) *
      smoothness;

    sculptureRef.current.rotation.x +=
      (-pointerY * 0.09 - sculptureRef.current.rotation.x) *
      smoothness;
  });

  // Independent scroll animation
  useEffect(() => {
    const scrollGroup = scrollGroupRef.current;

    if (!scrollGroup) return;

    const initialRotationY = scrollGroup.rotation.y;
    const initialRotationX = scrollGroup.rotation.x;
    const initialCameraZ = camera.position.z;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(
      scrollGroup.rotation,
      {
        y: initialRotationY + Math.PI * 1.15,
        x: initialRotationX + 0.25,
        ease: "none",
      },
      0
    );

    timeline.to(
      camera.position,
      {
        z: 7.2,
        ease: "none",
      },
      0
    );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();

      scrollGroup.rotation.set(
        initialRotationX,
        initialRotationY,
        0
      );

      camera.position.z = initialCameraZ;
    };
  }, [camera]);

  return (
    <>
      {/* PREMIUM STUDIO LIGHTING */}
      <ambientLight intensity={0.35} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={1.3}
        castShadow
      />

      <pointLight
        position={[-4, 2, 3]}
        color="#C9A9DC"
        intensity={8}
      />

      <pointLight
        position={[4, 2, -2]}
        color="#E5D1B0"
        intensity={5}
      />

      <pointLight
        position={[0, -2, 4]}
        color="#F1E9DF"
        intensity={1.5}
      />

      {/* SOFT BACKLIGHT */}
      <pointLight
        position={[0, 3, -4]}
        color="#C9A9DC"
        intensity={4}
        distance={8}
        decay={2}
      />

      <Environment preset="studio" environmentIntensity={0.85} />

      {/* FLOATING SCULPTURE */}
      <Float
        speed={0.8}
        rotationIntensity={0.035}
        floatIntensity={0.16}
      >
        {/* GSAP CONTROLS THIS GROUP */}
        <group ref={scrollGroupRef}>
          {/* MOUSE INTERACTION CONTROLS THIS GROUP */}
          <group ref={sculptureRef}>

            {/* OUTER LAVENDER HALO */}
            <Torus
              args={[2.02, 0.014, 24, 192]}
              position={[0, 0, -0.65]}
            >
              <meshStandardMaterial
                color="#B994D1"
                metalness={0.75}
                roughness={0.24}
                envMapIntensity={1.5}
              />
            </Torus>

            {/* INTERLOCKING SCULPTURE */}
            <group rotation={[0.12, 0, -0.12]}>

              <Sphere args={[0.62, 128, 128]}>
                <meshPhysicalMaterial
                  color="#C9A8D9"
                  metalness={0.12}
                  roughness={0.2}
                  clearcoat={1}
                  clearcoatRoughness={0.08}
                  envMapIntensity={1.8}
                />
              </Sphere>

              <Torus
                args={[1.12, 0.105, 48, 192]}
                rotation={[1.22, 0.12, 0.05]}
              >
                <meshPhysicalMaterial
                  color="#D5D2DC"
                  metalness={1}
                  roughness={0.14}
                  clearcoat={1}
                  clearcoatRoughness={0.06}
                  envMapIntensity={2}
                />
              </Torus>

              <Torus
                args={[1.38, 0.085, 48, 192]}
                rotation={[0.25, 0.95, 0.45]}
              >
                <meshPhysicalMaterial
                  color="#B99A6A"
                  metalness={1}
                  roughness={0.16}
                  clearcoat={1}
                  envMapIntensity={2}
                />
              </Torus>

              <Torus
                args={[1.22, 0.09, 48, 192]}
                rotation={[1.1, 0.8, 1.05]}
              >
                <meshPhysicalMaterial
                  color="#BBA5CD"
                  metalness={0.95}
                  roughness={0.15}
                  clearcoat={1}
                  envMapIntensity={2}
                />
              </Torus>
            </group>

            {/* FLOATING PEARL DETAILS */}
            <Sphere
              args={[0.09, 48, 48]}
              position={[1.85, 0.15, 0.15]}
            >
              <meshPhysicalMaterial
                color="#D7C8E1"
                metalness={0.75}
                roughness={0.15}
                clearcoat={1}
              />
            </Sphere>

            <Sphere
              args={[0.085, 48, 48]}
              position={[-1.7, -0.7, 0.25]}
            >
              <meshPhysicalMaterial
                color="#C5A47B"
                metalness={0.8}
                roughness={0.17}
              />
            </Sphere>
          </group>
        </group>
      </Float>

      {/* PREMIUM PEDESTAL */}
      <mesh position={[0, -1.65, 0]} receiveShadow>
        <cylinderGeometry args={[1.28, 1.28, 0.16, 128]} />
        <meshStandardMaterial
          color="#29212F"
          metalness={0.45}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, -1.82, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.28, 1.42, 0.24, 128]} />
        <meshPhysicalMaterial
          color="#211A28"
          metalness={0.75}
          roughness={0.25}
          clearcoat={0.8}
        />
      </mesh>

      <mesh position={[0, -1.96, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.045, 128]} />
        <meshStandardMaterial
          color="#80618C"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* SOFT CONTACT SHADOW */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.65}
        scale={5}
        blur={2.8}
        far={4}
      />
    </>
  );
}

export default function CarryKartSculpture() {
  return (
    <div className="h-[480px] w-full sm:h-[560px]">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 38 }}
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <PresentationControls
          global
          rotation={[0, -0.2, 0]}
          polar={[-0.25, 0.25]}
          azimuth={[-0.5, 0.5]}
          snap
        >
          <Sculpture />
        </PresentationControls>
      </Canvas>
    </div>
  );
}
