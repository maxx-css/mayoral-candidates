'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, Html } from '@react-three/drei';
import type { Group } from 'three';
import type { Candidate } from '@/lib/candidate-data';

// Preload the model once
useGLTF.preload('/assets/max2.glb');

interface CandidateModelProps {
  candidate: Candidate;
  position?: [number,number,number];
}

export default function CandidateModel({ candidate, position = [0,0,0] }: CandidateModelProps) {
  const groupRef = useRef<Group>(null);

  // Load the model
  const { scene: originalScene } = useGLTF('/assets/max2.glb');

  // Clone the scene only once using useMemo
  const modelScene = useMemo(() => originalScene.clone(), [originalScene]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.y = 0;
      groupRef.current.rotation.y = 0;
    }

    // Cleanup function to properly dispose resources
    return () => {
      // We don't dispose modelScene here because it's memoized
      // and will be reused across renders
    };
  }, [candidate]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Platform */}
      <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial color={candidate.color} />
      </mesh>

      {/* Candidate model (using duck as placeholder) */}
      <primitive
        object={modelScene}
        position={[0, -0.5, 0]}
        scale={[0.8, 0.8, 0.8]}
        castShadow
      />

      {/* Candidate name floating above */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color='white'
        anchorX='center'
        anchorY='middle'
        font='/fonts/Geist_Bold.json'
      >
        {candidate.name}
      </Text>

      {/* Party affiliation tag */}
      <Html position={[0, 0.5, 0]} center>
        <div
          className='px-2 py-1 bg-opacity-80 rounded text-xs font-bold'
          style={{ backgroundColor: candidate.color, color: 'white' }}
        >
          {candidate.party}
        </div>
      </Html>
    </group>
  );
}