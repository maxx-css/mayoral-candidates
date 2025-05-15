'use client';

import { useState } from 'react';
import type { Candidate } from '@/lib/candidate-data';

interface CandidateAvatarProps {
  candidate: Candidate;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export default function CandidateAvatar({
  candidate,
  size = 'md',
  showName = false,
}: CandidateAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl',
  };

  return (
    <div className='flex flex-col items-center'>
      <div
        className={`rounded-full flex items-center justify-center overflow-hidden ${sizeClasses[size]}`}
        style={{ backgroundColor: candidate.color }}
      >
        {candidate.avatar && !imageError ? (
          <img
            src={candidate.avatar || '/placeholder.svg'}
            alt={candidate.name}
            className='w-full h-full object-cover'
            onError={() => setImageError(true)}
          />
        ) : (
          <span className='font-bold text-white'>
            {candidate.name.charAt(0)}
          </span>
        )}
      </div>

      {showName && (
        <span className='mt-2 text-sm font-medium'>{candidate.name}</span>
      )}
    </div>
  );
}
