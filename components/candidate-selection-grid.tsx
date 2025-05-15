'use client';

import { useState, useRef } from 'react';
import { candidates } from '@/lib/candidate-data';
import { motion } from 'framer-motion';
import CandidatePreview from './candidate-preview';
import CandidateComparison from './candidate-comparison';
import { Button } from '@/components/ui/button';
import { X, Scale } from 'lucide-react';

type Candidate = {
  id: number;
  name: string;
  party: string;
  color: string;
  background: string;
  keyPolicies: string[];
  stats: { name: string; value: number; color: string }[];
  jobTitle: string;
  location: string;
};

export default function CandidateSelectionGrid() {
  const defaultCandidate: Candidate = {
    id: 0,
    name: 'Max',
    party: 'Lib',
    color: '#4C1D95',
    background: 'So Cool',
    keyPolicies: ['policy1', 'policy2'],
    stats: [{ name: 'hot', value: 1, color: '#885CF6' }],
    jobTitle: 'Badass',
    location: 'NYC',
  };

  const [selectedCandidate, setSelectedCandidate] = useState(
    candidates[0] ?? defaultCandidate
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [comparisonCandidates, setComparisonCandidates] = useState<number[]>(
    []
  );
  const [isComparing, setIsComparing] = useState(false);

  //Keep track of the previous candidate to prevent unnecessary re-renders
  const prevCandidateRef = useRef(selectedCandidate.id);

  const handleSelectedCandidate = (candidate: (typeof candidates)[0]) => {
    //Only update if its a different candidate to prevent unnecessary re-renders
    if (candidate.id !== prevCandidateRef.current) {
      prevCandidateRef.current = candidate.id;
      setSelectedCandidate(candidate);
    }
  };

  const handleAddToComparison = (candidateId: number) => {
    if (comparisonCandidates.includes(candidateId)) {
      //Remove if already in comparison
      setComparisonCandidates(
        comparisonCandidates.filter((id) => id !== candidateId)
      );
    } else {
      //Add to comparison (limit to 2 candidates)
      const newComparisonList = [...comparisonCandidates, candidateId].slice(
        -2
      );
      setComparisonCandidates(newComparisonList);
      // Automatically enable comparison view when 2 candidates are selected
      if (newComparisonList.length === 2) {
        setIsComparing(true);
      }
    }
  };

  const clearComparison = () => {
    setComparisonCandidates([])
    setIsComparing(false)
  }

  const toggleComparisonView = () => {
    if (comparisonCandidates.length === 2){
      setIsComparing(!isComparing)
    }else if (comparisonCandidates.length === 1){
      //If only one candidate is selected for comparison, add the currently selected candidate
      if (!comparisonCandidates.includes(selectedCandidate.id)){
        setComparisonCandidates([...comparisonCandidates, selectedCandidate.id])
        setIsComparing(true)
      }
    }
  }

  return (
    <div className='space-y-12'>
      {/*Comparison Bar*/}
      {comparisonCandidates.length > 0 && (
        <div className='bg-grey-800 rounded-lg p-3 flex items-center justify-between'>
          <div className='flex items-center'>
            <Scale className='h-5 w-5 mr-2 text-purple-400' />
            <span className='font-medium'>
              {comparisonCandidates.length === 1
                ? '1 Candidate selected for comparison'
                : '2 Candidates selected for comparison'}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            {comparisonCandidates.length === 2 && (
              <Button
                variant={isComparing ? 'default' : 'outline'}
                className={
                  isComparing ? 'bg-purple-600 hover:bg-purple-700' : ''
                }
                size='sm'
                onClick={toggleComparisonView}
              >
                {isComparing ? 'Exit Comparison' : 'Compare Now'}
              </Button>
            )}
            <Button variant='outline' size='sm' onClick={clearComparison}>
              <X className='h-4 w-4 mr-1' />
              Clear
            </Button>
          </div>
        </div>
      )}
      {/*Preview Area*/}
      <div>
        {isComparing && comparisonCandidates.length === 2 ? (
          <CandidateComparison
            candidate1={
              candidates.find((c) => c.id === comparisonCandidates[0])!
            }
            candidate2={
              candidates.find((c) => c.id === comparisonCandidates[1])!
            }
          />
        ) : (
          <CandidatePreview
            key='single-preview'
            candidate={selectedCandidate}
            isInComparison={comparisonCandidates.includes(selectedCandidate.id)}
            onAddToComparison={() =>
              handleAddToComparison(selectedCandidate.id)
            }
          />
        )}
      </div>
      {/*Character selection grid*/}
      <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3 md:gap-4 max-w-5xl mx-auto'>
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            className={`relative cursor-pointer transition-all duration-200 transform ${
              selectedCandidate.id === candidate.id
                ? 'scale-105 z-10'
                : hoveredIndex === index
                ? 'scale-102 z-5'
                : ''
            }`}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            onClick={() => handleSelectedCandidate(candidate)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/*Character Tile*/}
            <div
              className={`aspect-square overflow-hidden rounded-md ${
                selectedCandidate.id === candidate.id
                  ? 'ring-4 ring-white'
                  : 'ring-2 ring-gray-700'
              }`}
              style={{ backgroundColor: candidate.color }}
            >
              {/*Portrait*/}
              <div className='h-full w-full relative flex items-center justify-center'>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80'></div>
                <div className='w-3/4 h-3/4 rounded-full bg-gray-800 flex items-center justify-center text-3xl font-bold relative z-10'>
                  {candidate.name.charAt(0)}
                </div>
              </div>
              {/*Name Label*/}
              <div className='absolute bottom-0 left-0 right-0 text-center p-1 text-white text-xs font-bold uppercase tracking-wider z-20'>
                {candidate.name.split('')[0]}
              </div>
            </div>
            {/*Selection Indicator*/}
            {selectedCandidate.id === candidate.id && (
              <motion.div
                className='absolute -inset-1 rounded-lg border-2 border-white'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layoutId='selectedBorder'
              />
            )}
          </motion.div>
        ))}
      </div>
      {/*Random Tile*/}
      <motion.div
        className='relative cursor-pointer w-full max-w-[120px] mx-auto mt-4'
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        onClick={() => {
          const randomIndex = Math.floor(Math.random() * candidates.length);
          handleSelectedCandidate(candidates[randomIndex]);
        }}
      >
        <div className='aspect-square overflow-hidden rounded-md bg-gray-700 flex items-center justify-center'>
          <div className='text-4xl font-bold'>?</div>
        </div>
        <div className='absolute bottom-0 left-0 right-0 text-center p-1 text-white text-xs font-bold uppercase tracking-wider'>
          Random
        </div>
      </motion.div>
    </div>
  );
}
