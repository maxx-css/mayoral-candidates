'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MapPin, Vote } from 'lucide-react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500); // 5 seconds delay
    return () => clearTimeout(timer);
  }, []);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4'>
            <Vote className='h-6 w-6 text-purple-600' />
          </div>
          <DialogTitle className='text-center text-xl sm:text-2xl'>
            {' '}
            Welcome to the NYC Mayoral Candidate Arena
          </DialogTitle>
          <DialogDescription className='text-center pt-2'>
            Your interactive guide to New York City&apos;s majoral candidates
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-2 text-center sm:text-left'>
          <p>
            Explore mayoral candidates in an interactive 3D environment,
            inspired by &apos;choose your fighter&apos; game interfaces.
          </p>
          <p>
            Compare candidate positions on key issues, learn about their
            backgrounds, and make more informed decisions about NYC&apos;s
            future.
          </p>
          <div className='flex items-center justify-center gap-2 rounded-md bg-purple-50 p-3 text-purple-900'>
            <MapPin className='h-5 w-5 text-purple-500' />
            <span className='text-sm font-medium'>
              Rotate, zoom, and interact with 3D candidate models to learn more
            </span>
          </div>
        </div>

        <DialogFooter className='sm:justify-center'>
          <Button
            onClick={() => setIsOpen(false)}
            className='w-full sm:w-auto bg-purple-600 hover:bg-purple-700'
          >
            Explore Candidates
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
