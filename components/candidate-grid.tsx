// components/candidate-grid.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { Candidate } from '@/lib/candidate-data';
import CandidateModel from './candidate-model';

interface CandidateGridProps {
  candidates: Candidate[];
}

export default function CandidateGrid({ candidates }: CandidateGridProps) {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {candidates.map((candidate, index) => {
        // Calculate grid position
        const cols = Math.min(3, candidates.length);
        const rows = Math.ceil(candidates.length / cols);

        const col = index % cols;
        const row = Math.floor(index / cols);

        // Position candidates in a grid
        const xSpacing = 2.5;
        const zSpacing = 2.5;

        const xOffset = ((cols - 1) * xSpacing) / 2;
        const zOffset = ((rows - 1) * zSpacing) / 2;

        const x = col * xSpacing - xOffset;
        const z = row * zSpacing - zOffset;

        return (
          <CandidateModel
            key={candidate.id}
            candidate={candidate}
            position={[x, 0, z]}
          />
        );
      })}
    </group>
  );
}
