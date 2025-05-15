'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import type { Group } from 'three';
import type { Candidate } from '@/lib/candidate-data';

interface CandidateModelProps {
  candidate: Candidate;
}

export default function CandidateModel({ candidate }: CandidateModelProps) {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Simple box shape */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial color={candidate.color} />
      </mesh>

      {/* Candidate name */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color='white'
        anchorX='center'
        anchorY='middle'
      >
        {candidate.name}
      </Text>
    </group>
  );
}
