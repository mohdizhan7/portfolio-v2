/* eslint-disable react/no-unknown-property */
'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer, Text } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// ─── Types ────────────────────────────────────────────────────────────────────

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

// ─── Band (physics rope + card) ───────────────────────────────────────────────

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const band  = useRef<THREE.Mesh>(null!);
  const fixed = useRef<any>(null!);
  const j1    = useRef<any>(null!);
  const j2    = useRef<any>(null!);
  const j3    = useRef<any>(null!);
  const card  = useRef<any>(null!);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const { nodes, materials } = useGLTF('/card.glb') as any;
  const texture = useTexture('/lanyard.png');

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1,    j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2,    j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const d = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + d * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      (band.current.geometry as any).setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      // Y-rotation is locked via enabledRotations — zero it each frame as belt-and-braces
      card.current.setAngvel({ x: ang.x, y: 0, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody ref={j1} position={[0.5, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[1, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j3} position={[1.5, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          enabledRotations={[true, false, true]}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.05}
            position={[0, -1.05, 0]}
            rotation={[0.05, 0, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              (e.target as Element & { releasePointerCapture(id: number): void })
                .releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={e => {
              (e.target as Element & { setPointerCapture(id: number): void })
                .setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <group position={[0, 0.05, 0]}>
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  color="#0d0d12"
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.4}
                />
              </mesh>
              <mesh
                geometry={nodes.clip.geometry}
                material={materials.metal}
                material-roughness={0.3}
              />
              <mesh geometry={nodes.clamp.geometry} material={materials.metal} />

              {/* ── Card text overlay ───────────────────────────────── */}
              {/* Name — upper portion of card face */}
              <Text
                position={[0, 0.58, 0.015]}
                fontSize={0.085}
                maxWidth={0.62}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="/fonts/DM-Sans-700.ttf"
                material-toneMapped={false}
              >
                Mohammed Izhan
              </Text>

              {/* Thin divider */}
              <Text
                position={[0, 0.47, 0.015]}
                fontSize={0.022}
                maxWidth={0.55}
                color="#333340"
                anchorX="center"
                anchorY="middle"
                font="/fonts/DM-Sans-400.ttf"
                material-toneMapped={false}
              >
                ─────────────────
              </Text>

              {/* Role — below divider */}
              <Text
                position={[0, 0.36, 0.015]}
                fontSize={0.052}
                maxWidth={0.62}
                color="#888899"
                anchorX="center"
                anchorY="middle"
                font="/fonts/DM-Sans-400.ttf"
                letterSpacing={0.04}
                material-toneMapped={false}
              >
                Project Manager
              </Text>
            </group>
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

// ─── Lanyard (canvas wrapper) ─────────────────────────────────────────────────

export default function Lanyard({
  position = [0, 0, 24],
  gravity  = [0, -40, 0],
  fov      = 18,
  transparent = true,
}: LanyardProps) {
  // Start false (matches SSR), set real value after mount
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={1.2} />
        <Physics
          gravity={gravity}
          timeStep={isMobile ? 1 / 30 : 1 / 60}
        >
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2}  color="white" position={[0, -1, 5]}   rotation={[0, 0, Math.PI / 3]}          scale={[100, 0.1, 1]} />
          <Lightformer intensity={3}  color="white" position={[-1, -1, 1]}  rotation={[0, 0, Math.PI / 3]}          scale={[100, 0.1, 1]} />
          <Lightformer intensity={3}  color="white" position={[1, 1, 1]}    rotation={[0, 0, Math.PI / 3]}          scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
