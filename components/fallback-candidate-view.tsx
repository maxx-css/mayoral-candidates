'use client';
import type { Candidate } from '@/lib/candidate-data';

interface FallbackCandidateViewProps {
  candidate: Candidate;
  height?: string;
}

export default function FallbackCandidateView({
  candidate,
  height = 'h-full',
}: FallbackCandidateViewProps) {
  return (
    <div
      className={`${height} flex items-center justify-center bg-gray-800 rounded-lg`}
    >
      <div className='text-center'>
        <div
          className='w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-bold mb-2'
          style={{ backgroundColor: candidate.color }}
        >
          {candidate.name.charAt(0)}
        </div>
        <div className='text-sm text-gray-400'>3D view not available</div>
      </div>
    </div>
  );
}
