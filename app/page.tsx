import Link from 'next/link';
import { MapPin } from 'lucide-react';
import WelcomeModal from '@/components/welcome-modal';
import CandidateSelectionGrid from '@/components/candidate-selection-grid';

export default function Home() {
  return (
    <div className='relative'>
      <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
        <WelcomeModal />

        {/* Navigation Bar */}
        <header className='border-b bg-gray-900'>
          <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              <MapPin className='h-6 w-6 text-purple-500' />
              <span className='font-bold text-xl text-white'>NYC Votes 3D</span>
            </div>
            <nav className='hidden md:flex space-x-6'>
              <Link
                href='#'
                className='text-gray-300 hover:text-white transition'
              >
                About
              </Link>
              <Link
                href='#'
                className='text-gray-300 hover:text-white transition'
              >
                Candidates
              </Link>
              <Link
                href='#'
                className='text-gray-300 hover:text-white transition'
              >
                Voting Info
              </Link>
            </nav>
          </div>
        </header>

        <main className='flex-grow container mx-auto px-4 py-12'>
          {/* Choose Your Candidate Section */}
          <div className='mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
              Choose Your Candidate
            </h2>
            <CandidateSelectionGrid />
          </div>
        </main>

        <footer className='bg-gray-900 border-t border-gray-800 py-8'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
              <div className='flex items-center space-x-2 mb-4 md:mb-0'>
                <MapPin className='h-5 w-5 text-purple-500' />
                <span className='font-bold text-white'>NYC Votes 3D</span>
              </div>
              <div className='text-sm text-gray-400'>
                © {new Date().getFullYear()} NYC Votes 3D. This is an
                educational tool and is not affiliated with any official
                election board.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
