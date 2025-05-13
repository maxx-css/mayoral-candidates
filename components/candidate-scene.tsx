'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text, Html } from '@react-three/drei';
import type { Group } from 'three';
import type { Candidate } from '@/lib/candidate-data';

interface CandidateSceneProps {
  candidate: Candidate;
}

export default function CandidateScene({ candidate }: CandidateSceneProps) {
  const groupRef = useRef<Group>(null);

  // Use a duck model as placeholder for candidate avatars
  const { scene } = useGLTF('/assets/max2.glb');

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.y = 0;
      groupRef.current.rotation.y = 0;
    }
  }, [candidate]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Platform */}
      <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial color={candidate.color} />
      </mesh>

      {/* Candidate model (using duck as placeholder) */}
      <primitive
        object={scene.clone()}
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
useGLTF.preload('/assets/max2.glb');