'use client';

import { useState, useEffect } from 'react';
import CandidateInfo from './candidate-info';
import CandidateStats from './candidate-stats';
import CandidateControls from './candidate-controls';
import { candidates } from '@/lib/candidate-data';
import { useCanvasContext } from '@/lib/canvas-context';

export default function CandidateSelector() {
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0);
  const selectedCandidate = candidates[selectedCandidateIndex];
  const { setViewMode, setSelectedCandidates } = useCanvasContext()

  useEffect(() => {
    setViewMode('selector');
    setSelectedCandidates([selectedCandidate])

    return () => {
      //No need to clean up, next component will set its own view so do I need to include this function?
    }
  }, [selectedCandidate, setViewMode, setSelectedCandidates])

  const handlePrevious = () => {
    setSelectedCandidateIndex((prev) =>
      prev === 0 ? candidates.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedCandidateIndex((prev) => (prev + 1) % candidates.length);
  };

  return (
    <div className='w-full h-screen flex flex-col md:flex-row bg-gray-900 text-white'>
      {/* 3D Viewer Section */}
      <div className='w-full md:w-2/3 h-1/2 md:h-screen relative'>
        <div className='w-full h-full'>
          {/*Global canvas will render here*/}
        </div>

        {/* Selection Controls Overlay */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10'>
          <CandidateControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            candidateName={selectedCandidate.name}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className='w-full md:w-1/3 h-1/2 md:h-screen overflow-y-auto bg-gray-800 p-6'>
        <h1 className='text-3xl font-bold mb-6 text-center text-purple-400'>
          NYC Mayoral Candidates
        </h1>

        <CandidateInfo candidate={selectedCandidate} />
        <CandidateStats stats={selectedCandidate.stats} />
      </div>
    </div>
  );
}
