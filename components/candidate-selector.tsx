'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei';
import CandidateScene from './candidate-scene';
import CandidateInfo from './candidate-info';
import CandidateStats from './candidate-stats';
import CandidateControls from './candidate-controls';
import { candidates } from '@/lib/candidate-data';
import { useMobile } from '@/hooks/use-mobile';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';


export default function CandidateSelector() {
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const { isMobile } = useMobile();
  const selectedCandidate = candidates[selectedCandidateIndex];

  const handlePrevious = () => {
    setSelectedCandidateIndex((prev) =>
      prev === 0 ? candidates.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedCandidateIndex((prev) => (prev + 1) % candidates.length);
  };

  return (
    <div className='w-full min-h-screen flex flex-col bg-gray-900 text-white'>
      {/* 3D Viewer Section - Full height on mobile */}
      <div
        className={`w-full ${
          isMobile ? 'h-[60vh]' : 'md:w-2/3 h-1/2 md:h-screen'
        } relative`}
      >
        <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <CandidateScene candidate={selectedCandidate} />
            <Environment preset='city' />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2}
              // Increase dampingFactor for smoother mobile experience
              dampingFactor={0.2}
              // Enable touch events
              enableDamping
              touches={{
                ONE: THREE.TOUCH.ROTATE,
                TWO: THREE.TOUCH.DOLLY_PAN,
              }}
            />
          </Suspense>
        </Canvas>

        {/* Selection Controls Overlay */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10'>
          <CandidateControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            candidateName={selectedCandidate.name}
          />
        </div>
      </div>

      {/* Mobile Toggle for Info Section */}
      {isMobile && (
        <Button
          variant='ghost'
          onClick={() => setShowInfo(!showInfo)}
          className='w-full py-2 flex items-center justify-center bg-gray-800 border-t border-gray-700'
        >
          {showInfo ? (
            <>
              <ChevronDown className='h-5 w-5 mr-2' /> Hide Candidate Info
            </>
          ) : (
            <>
              <ChevronUp className='h-5 w-5 mr-2' /> Show Candidate Info
            </>
          )}
        </Button>
      )}

      {/* Info Section - Conditionally shown on mobile */}
      <div
        className={`w-full ${
          isMobile
            ? showInfo
              ? 'block'
              : 'hidden'
            : 'md:w-1/3 h-1/2 md:h-screen'
        } overflow-y-auto bg-gray-800 p-4 md:p-6`}
      >
        <h1 className='text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-purple-400'>
          NYC Mayoral Candidates
        </h1>

        <CandidateInfo candidate={selectedCandidate} />
        <CandidateStats stats={selectedCandidate.stats} />
      </div>
    </div>
  );
}
