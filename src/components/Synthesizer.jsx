import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Center, Text3D } from '@react-three/drei';
import * as THREE from 'three';

export default function Synthesizer({ scrollProgress }) {
  const groupRef = useRef(null);
  const particlesRef = useRef(null);
  const glassCardRef1 = useRef(null);
  const glassCardRef2 = useRef(null);
  const glassCardRef3 = useRef(null);

  const { viewport, pointer } = useThree();

  // Create Flowing Code Particles
  const particleCount = 1200;
  const { positions, velocities, initialPos, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const init = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color('#10b981'), // Emerald
      new THREE.Color('#06b6d4'), // Cyan
      new THREE.Color('#f59e0b'), // Gold
      new THREE.Color('#38bdf8'), // Sky Blue
    ];

    for (let i = 0; i < particleCount; i++) {
      // Flow source (Left side / Code Source)
      const x = -5 - Math.random() * 5;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 4;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;

      // Drift velocity towards right
      vel[i * 3] = 0.05 + Math.random() * 0.08;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      // Assign random palette color
      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      cols[i * 3] = col.r;
      cols[i * 3 + 1] = col.g;
      cols[i * 3 + 2] = col.b;
    }

    return { positions: pos, velocities: vel, initialPos: init, colors: cols };
  }, []);

  // Update loop for particles and 3D glass cards
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Particle Physics (Flow + Turbulence + Mouse Repulsion)
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array;
      const raycaster = state.raycaster;
      const mouse3D = new THREE.Vector3(pointer.x * viewport.width / 2, pointer.y * viewport.height / 2, 0);

      for (let i = 0; i < particleCount; i++) {
        // Move towards right
        posArray[i * 3] += velocities[i * 3];
        // Add sine wave vertical drift
        posArray[i * 3 + 1] += Math.sin(t + i) * 0.005 + velocities[i * 3 + 1];
        posArray[i * 3 + 2] += Math.cos(t * 0.5 + i) * 0.005 + velocities[i * 3 + 2];

        // Recycle particles once they exit right side
        if (posArray[i * 3] > 6) {
          posArray[i * 3] = initialPos[i * 3];
          posArray[i * 3 + 1] = initialPos[i * 3 + 1];
          posArray[i * 3 + 2] = initialPos[i * 3 + 2];
        }

        // Mouse interaction force calculation
        const px = posArray[i * 3];
        const py = posArray[i * 3 + 1];
        const pz = posArray[i * 3 + 2];

        const dx = px - mouse3D.x;
        const dy = py - mouse3D.y;
        const dz = pz - mouse3D.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 2.0) {
          // Repulsion force
          const force = (2.0 - dist) * 0.15;
          posArray[i * 3] += (dx / dist) * force;
          posArray[i * 3 + 1] += (dy / dist) * force;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 2. Parallax card tilting based on mousepointer coordinates
    const targetX = pointer.x * 0.15;
    const targetY = pointer.y * 0.15;
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.08);
    }

    // 3. Scroll-bound Camera / Mesh coordinate mapping
    const progress = scrollProgress.current;

    // Transition stages based on scroll progress [0 to 1]
    if (glassCardRef1.current && glassCardRef2.current && glassCardRef3.current) {
      // Step 1: Input Code Card (Hero section, floats gracefully in center-left)
      glassCardRef1.current.position.y = Math.sin(t * 0.8) * 0.15;
      glassCardRef1.current.position.x = -2.5 - progress * 4; // Drifts left as we scroll
      glassCardRef1.current.rotation.z = Math.sin(t * 0.4) * 0.05;

      // Step 2: AI Processor mesh (Mid section features)
      glassCardRef2.current.position.x = THREE.MathUtils.lerp(5, 0, progress); // Enters center on scroll
      glassCardRef2.current.position.y = Math.cos(t * 0.6) * 0.1 + (progress - 0.5) * 1.5;
      glassCardRef2.current.rotation.y = t * 0.1 + progress * Math.PI;

      // Step 3: Immersive Output sheet (Bottom customers section)
      glassCardRef3.current.position.x = THREE.MathUtils.lerp(-8, 3, progress);
      glassCardRef3.current.position.y = Math.sin(t * 0.5) * 0.1 - (1 - progress) * 2;
      glassCardRef3.current.rotation.x = THREE.MathUtils.lerp(0.2, 0.4, progress);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 🔮 Background Atmospheric Glowing Mesh */}
      <mesh position={[0, 0, -6]}>
        <planeGeometry args={[30, 20]} />
        <meshBasicMaterial color="#022c22" opacity={0.3} transparent />
      </mesh>

      {/* 🚀 Interactive Code Stardust Stream */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* 📄 GLASS CARD 1: Raw Code Input */}
      <mesh ref={glassCardRef1} position={[-2.5, 0, 0.5]} rotation={[0.1, 0.2, -0.05]}>
        <boxGeometry args={[2.4, 3.4, 0.05]} />
        <MeshTransmissionMaterial
          backside
          transmission={0.9}
          roughness={0.12}
          thickness={1.2}
          chromaticAberration={0.06}
          anisotropy={0.3}
          distortion={0.15}
          distortionScale={0.2}
          temporalDistortion={0.1}
          clearcoat={1}
          color="#a7f3d0"
        />
        {/* Wireframe border overlay for ultimate tech aesthetic */}
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(2.4, 3.4, 0.05)]} />
          <lineBasicMaterial attach="material" color="#10b981" linewidth={2} transparent opacity={0.6} />
        </lineSegments>
      </mesh>

      {/* 📄 GLASS CARD 2: The Neural AI Synthesis Grid */}
      <mesh ref={glassCardRef2} position={[5, 1, -1]} rotation={[0.4, 0.5, 0]}>
        <torusKnotGeometry args={[1.0, 0.25, 160, 16]} />
        <MeshTransmissionMaterial
          backside
          transmission={0.95}
          roughness={0.05}
          thickness={0.8}
          chromaticAberration={0.12}
          anisotropy={0.5}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.2}
          clearcoat={1}
          color="#bae6fd"
        />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.TorusKnotGeometry(1.0, 0.25, 160, 16)]} />
          <lineBasicMaterial attach="material" color="#06b6d4" linewidth={1} transparent opacity={0.4} />
        </lineSegments>
      </mesh>

      {/* 📄 GLASS CARD 3: structured compiled Documentation Sheets */}
      <mesh ref={glassCardRef3} position={[3, -1, 0.8]} rotation={[0.2, -0.3, 0.1]}>
        <boxGeometry args={[3.2, 2.2, 0.04]} />
        <MeshTransmissionMaterial
          backside
          transmission={0.92}
          roughness={0.08}
          thickness={1.5}
          chromaticAberration={0.08}
          anisotropy={0.2}
          distortion={0.05}
          clearcoat={1}
          color="#fef08a"
        />
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(3.2, 2.2, 0.04)]} />
          <lineBasicMaterial attach="material" color="#f59e0b" linewidth={2} transparent opacity={0.6} />
        </lineSegments>
      </mesh>
    </group>
  );
}
