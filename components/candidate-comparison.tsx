'use client';
import { Award, Briefcase, Target, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import PersistentCanvas from './persistent-canvas';
import type { Candidate } from '@/lib/candidate-data';

interface CandidateComparisonProps {
  candidate1: Candidate;
  candidate2: Candidate;
}

export default function CandidateComparison({
  candidate1,
  candidate2,
}: CandidateComparisonProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className='relative overflow-hidden rounded-xl bg-gray-800 shadow-xl'>
      {/* Background gradient */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          background: `linear-gradient(to right, ${candidate1.color}, #111827 50%, ${candidate2.color})`,
        }}
      ></div>

      {/* Header */}
      <div className='relative z-10 border-b border-gray-700 p-4 flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Candidate Comparison</h2>
        <Button
          variant='outline'
          size='sm'
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

      <div className='relative z-10 grid grid-cols-2 divide-x divide-gray-700'>
        {/* Candidate 1 */}
        <div className='p-6'>
          <div className='flex flex-col items-center mb-6'>
            <h3 className='text-xl font-bold'>{candidate1.name}</h3>
            <div className='flex items-center mt-1 mb-3'>
              <span
                className='inline-block w-3 h-3 rounded-full mr-2'
                style={{ backgroundColor: candidate1.color }}
              ></span>
              <span>{candidate1.party}</span>
            </div>

            {/* 3D Model */}
            <div className='w-full h-[200px] mb-4 relative rounded-lg overflow-hidden border border-gray-700'>
              <PersistentCanvas candidate={candidate1} />

              {/* Platform color indicator */}
              <div
                className='absolute bottom-0 left-0 right-0 h-1'
                style={{ backgroundColor: candidate1.color }}
              ></div>
            </div>
          </div>

          {!isFullscreen && (
            <div className='space-y-6'>
              {/* Background */}
              <div>
                <h4 className='text-md font-semibold mb-2 flex items-center'>
                  <Briefcase className='w-4 h-4 mr-2 text-gray-400' />
                  Background
                </h4>
                <p className='text-sm text-gray-300'>{candidate1.background}</p>
              </div>

              {/* Key Policies */}
              <div>
                <h4 className='text-md font-semibold mb-2 flex items-center'>
                  <Target className='w-4 h-4 mr-2 text-gray-400' />
                  Key Policies
                </h4>
                <ul className='space-y-2'>
                  {candidate1.keyPolicies.map((policy, index) => (
                    <li key={index} className='flex items-start text-sm'>
                      <span
                        className='inline-block w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs mr-2'
                        style={{ backgroundColor: `${candidate1.color}40` }}
                      >
                        {index + 1}
                      </span>
                      <span>{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div>
                <h4 className='text-md font-semibold mb-2 flex items-center'>
                  <Award className='w-4 h-4 mr-2 text-gray-400' />
                  Stats
                </h4>
                <div className='space-y-3'>
                  {candidate1.stats.map((stat, index) => (
                    <div key={index}>
                      <div className='flex justify-between mb-1'>
                        <span className='text-sm font-medium text-gray-300'>
                          {stat.name}
                        </span>
                        <span className='text-sm font-medium text-gray-300'>
                          {stat.value}/10
                        </span>
                      </div>
                      <div className='w-full bg-gray-700 rounded-full h-2.5'>
                        <div
                          className='h-2.5 rounded-full'
                          style={{
                            backgroundColor: stat.color,
                            width: `${stat.value * 10}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Candidate 2 */}
        <div className='p-6'>
          <div className='flex flex-col items-center mb-6'>
            <h3 className='text-xl font-bold'>{candidate2.name}</h3>
            <div className='flex items-center mt-1 mb-3'>
              <span
                className='inline-block w-3 h-3 rounded-full mr-2'
                style={{ backgroundColor: candidate2.color }}
              ></span>
              <span>{candidate2.party}</span>
            </div>

            {/* 3D Model */}
            <div className='w-full h-[200px] mb-4 relative rounded-lg overflow-hidden border border-gray-700'>
              <PersistentCanvas candidate={candidate2} />

              {/* Platform color indicator */}
              <div
                className='absolute bottom-0 left-0 right-0 h-1'
                style={{ backgroundColor: candidate2.color }}
              ></div>
            </div>
          </div>

          {!isFullscreen && (
            <div className='space-y-6'>
              {/* Background */}
              <div>
                <h4 className='text-md font-semibold mb-2 flex items-center'>
                  <Briefcase className='w-4 h-4 mr-2 text-gray-400' />
                  Background
                </h4>
                <p className='text-sm text-gray-300'>{candidate2.background}</p>
              </div>

              {/* Key Policies */}
              <div>
                <h4 className='text-md font-semibold mb-2 flex items-center'>
                  <Target className='w-4 h-4 mr-2 text-gray-400' />
                  Key Policies
                </h4>
                <ul className='space-y-2'>
                  {candidate2.keyPolicies.map((policy, index) => (
                    <li key={index} className='flex items-start text-sm'>
                      <span
                        className='inline-block w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs mr-2'
                        style={{ backgroundColor: `${candidate2.color}40` }}
                      >
                        {index + 1}
                      </span>
                      <span>{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div>
                <h4 className='text-md font-semibold mb-2 flex items-center'>
                  <Award className='w-4 h-4 mr-2 text-gray-400' />
                  Stats
                </h4>
                <div className='space-y-3'>
                  {candidate2.stats.map((stat, index) => (
                    <div key={index}>
                      <div className='flex justify-between mb-1'>
                        <span className='text-sm font-medium text-gray-300'>
                          {stat.name}
                        </span>
                        <span className='text-sm font-medium text-gray-300'>
                          {stat.value}/10
                        </span>
                      </div>
                      <div className='w-full bg-gray-700 rounded-full h-2.5'>
                        <div
                          className='h-2.5 rounded-full'
                          style={{
                            backgroundColor: stat.color,
                            width: `${stat.value * 10}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
