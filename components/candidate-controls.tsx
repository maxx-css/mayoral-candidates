'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CandidateControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  candidateName: string;
}

export default function CandidateControls({
  onPrevious,
  onNext,
  candidateName,
}: CandidateControlsProps) {
  return (
    <div className='flex items-center gap-4 bg-gray-800 bg-opacity-70 p-2 rounded-full'>
      <Button
        variant='ghost'
        size='icon'
        onClick={onPrevious}
        className='text-white hover:bg-gray-700 rounded-full'
      >
        <ChevronLeft className='h-6 w-6' />
        <span className='sr-only'>Previous candidate</span>
      </Button>

      <div className='px-4 font-medium'>{candidateName}</div>

      <Button
        variant='ghost'
        size='icon'
        onClick={onNext}
        className='text-white hover:bg-gray-700 rounded-full'
      >
        <ChevronRight className='h-6 w-6' />
        <span className='sr-only'>Next candidate</span>
      </Button>
    </div>
  );
}
