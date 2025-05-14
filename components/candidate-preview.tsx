'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Briefcase,
  MapPin,
  Target,
  Scale,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useCanvasContext } from '@/lib/canvas-context';
import type { Candidate } from '@/lib/candidate-data';
import CanvasContainer from './canvas-container';

interface CandidatePreviewProps {
  candidate: Candidate;
  isInComparison: boolean;
  onAddToComparison: () => void;
}

export default function CandidatePreview({
  candidate,
  isInComparison,
  onAddToComparison,
}: CandidatePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { setViewMode, setSelectedCandidates } = useCanvasContext();

  //Update global canvas when this component mounts
  useEffect(() => {
    setViewMode('preview');
    setSelectedCandidates([candidate]);
    return () => {
      //No need to clean up, next component will set its own view
    };
  }, [candidate, setViewMode, setSelectedCandidates]);

  return (
    <div className='relative overflow-hidden rounded-xl bg-gray-800 shadow-xl'>
      {/* Background gradient based on candidate color */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          background: `radial-gradient(circle at center, ${candidate.color}, #111827 70%)`,
        }}
      ></div>

      <div
        className={`relative z-10 grid ${
          isFullscreen ? 'grid-cols-1' : 'grid-cols-3'
        } gap-4 p-6`}
      >
        {/* Left column - Name, party and background */}
        {!isFullscreen && (
          <div className='flex flex-col items-start justify-start space-y-4 pr-4 border-r border-gray-700'>
            <h2 className='text-2xl md:text-3xl font-bold'>{candidate.name}</h2>

            <div className='flex items-center mb-2'>
              <span
                className='inline-block w-3 h-3 rounded-full mr-2'
                style={{ backgroundColor: candidate.color }}
              ></span>
              <span className='text-lg'>{candidate.party}</span>
            </div>

            <div className='flex items-center text-gray-300 mb-1'>
              <Briefcase className='w-4 h-4 mr-2 flex-shrink-0' />
              <span>Former City Council Member</span>
            </div>

            <div className='flex items-center text-gray-300 mb-3'>
              <MapPin className='w-4 h-4 mr-2 flex-shrink-0' />
              <span>New York City, NY</span>
            </div>

            <div className='mt-2'>
              <h3 className='text-md font-semibold mb-2 text-gray-200'>
                Background
              </h3>
              <p className='text-sm text-gray-300 leading-relaxed'>
                {candidate.background}
              </p>
            </div>
          </div>
        )}

        {/* Center column - 3D Candidate model */}
        <div
          className={`flex flex-col ${
            isFullscreen ? 'h-[500px]' : 'h-[350px]'
          }`}
        >
          <div className='flex justify-between items-center mb-2'>
            {isFullscreen && (
              <h2 className='text-2xl font-bold'>
                {candidate.name} - {candidate.party}
              </h2>
            )}
            <Button
              variant='outline'
              size='sm'
              className='ml-auto'
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className='h-4 w-4 mr-1' />
                  Exit Fullscreen
                </>
              ) : (
                <>
                  <Maximize2 className='h-4 w-4 mr-1' />
                  Fullscreen
                </>
              )}
            </Button>
          </div>

          <CanvasContainer className='w-full h-[200px] mb-4 relative rounded-lg overflow-hidden border border-gray-700' id='preview'/>

          {!isFullscreen && (
            <Button
              variant={isInComparison ? 'default' : 'outline'}
              onClick={onAddToComparison}
              className={`mt-3 ${
                isInComparison ? 'bg-purple-600 hover:bg-purple-700' : ''
              }`}
            >
              <Scale className='mr-2 h-4 w-4' />
              {isInComparison ? 'Remove from Comparison' : 'Add to Comparison'}
            </Button>
          )}
        </div>

        {/* Right column - Key policies and stats */}
        {!isFullscreen && (
          <div className='flex flex-col items-start justify-start space-y-6 pl-4 border-l border-gray-700'>
            <div>
              <h3 className='text-lg font-semibold mb-3 flex items-center'>
                <Target className='w-5 h-5 mr-2 text-gray-400' />
                Key Policies
              </h3>
              <ul className='space-y-2'>
                {candidate.keyPolicies.map((policy, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className='flex items-start'
                  >
                    <span
                      className='inline-block w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-sm mr-2'
                      style={{ backgroundColor: `${candidate.color}40` }}
                    >
                      {index + 1}
                    </span>
                    <span className='text-sm'>{policy}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-3 flex items-center'>
                <Award className='w-5 h-5 mr-2 text-gray-400' />
                Top Stats
              </h3>
              <div className='space-y-3 w-full'>
                {candidate.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '100%' }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className='flex justify-between mb-1'>
                      <span className='text-sm font-medium text-gray-300'>
                        {stat.name}
                      </span>
                      <span className='text-sm font-medium text-gray-300'>
                        {stat.value}/10
                      </span>
                    </div>
                    <div className='w-full bg-gray-700 rounded-full h-2.5'>
                      <motion.div
                        className='h-2.5 rounded-full'
                        style={{ backgroundColor: stat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value * 10}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
