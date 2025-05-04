import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info, Users, BarChart3, MapPin } from 'lucide-react';
import WelcomeModal from '@/components/welcome-modal';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <WelcomeModal />
      <header className='border-b bg-gray-900'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='flex items-center space-x-2'>
            <MapPin className='h-6 w-6 text-purple-500' />
            <span className='font-bold text-xl text-white'>NYC Votes 3D</span>
          </div>
          <nav className='hidden md:flex space-x-6'>
            <Link
              href='#features'
              className='text-gray-300 hover:text-white transition'
            >
              Features
            </Link>
            <Link
              href='#how-it-works'
              className='text-gray-300 hover:text-white transition'
            >
              How It Works
            </Link>
            <Link
              href='#candidates'
              className='text-gray-300 hover:text-white transition'
            >
              Candidates
            </Link>
          </nav>
          <Link href='/explore'>
            <Button variant='outline' className='hidden sm:flex'>
              Explore Candidates
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </Link>
        </div>
      </header>

      <main className='flex-grow bg-gray-900 text-white'>
        {/* Hero Section */}
        <section className='relative'>
          {/* NYC Skyline Background */}
          <div className='absolute inset-0 z-0 opacity-20'>
            <Image
              src='/placeholder.svg?height=600&width=1600'
              alt='NYC Skyline'
              fill
              className='object-cover'
              priority
            />
          </div>

          <div className='container mx-auto px-4 py-20 md:py-32 relative z-10'>
            <div className='max-w-3xl mx-auto text-center'>
              <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
                Meet Your <span className='text-purple-400'>NYC Mayoral</span>{' '}
                Candidates in 3D
              </h1>
              <p className='text-xl md:text-2xl text-gray-300 mb-8'>
                An interactive experience to help you learn about the people
                shaping New York City&apos;s future
              </p>
              <div className='flex flex-col sm:flex-row justify-center gap-4'>
                <Link href='/explore'>
                  <Button
                    size='lg'
                    className='w-full sm:w-auto bg-purple-600 hover:bg-purple-700'
                  >
                    Enter 3D Experience
                    <ArrowRight className='ml-2 h-5 w-5' />
                  </Button>
                </Link>
                <Link href='#candidates'>
                  <Button
                    size='lg'
                    variant='outline'
                    className='w-full sm:w-auto'
                  >
                    View Candidates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className='bg-gray-800 py-16'>
          <div className='container mx-auto px-4'>
            <div className='bg-gray-900 rounded-xl overflow-hidden shadow-2xl'>
              <div className='relative h-[300px] md:h-[500px]'>
                <Image
                  src='/placeholder.svg?height=500&width=1200'
                  alt='3D Candidate Explorer Preview'
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent'></div>
                <div className='absolute bottom-0 left-0 right-0 p-6 text-center'>
                  <p className='text-lg font-medium mb-4'>
                    Preview of the 3D Candidate Explorer
                  </p>
                  <Link href='/explore'>
                    <Button className='bg-purple-600 hover:bg-purple-700'>
                      Try It Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id='features' className='py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
              Why Explore in 3D?
            </h2>

            <div className='grid md:grid-cols-3 gap-10'>
              <div className='bg-gray-800 rounded-lg p-6 text-center'>
                <div className='bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Info className='h-8 w-8 text-purple-300' />
                </div>
                <h3 className='text-xl font-bold mb-3'>Detailed Profiles</h3>
                <p className='text-gray-300'>
                  Get comprehensive information about each candidate&apos;s
                  background, experience, and key policy positions.
                </p>
              </div>

              <div className='bg-gray-800 rounded-lg p-6 text-center'>
                <div className='bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <BarChart3 className='h-8 w-8 text-purple-300' />
                </div>
                <h3 className='text-xl font-bold mb-3'>Compare Stats</h3>
                <p className='text-gray-300'>
                  Visualize and compare where candidates stand on important
                  issues like housing, education, and public safety.
                </p>
              </div>

              <div className='bg-gray-800 rounded-lg p-6 text-center'>
                <div className='bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Users className='h-8 w-8 text-purple-300' />
                </div>
                <h3 className='text-xl font-bold mb-3'>
                  Interactive Experience
                </h3>
                <p className='text-gray-300'>
                  Engage with a fun, game-like interface that makes learning
                  about local politics more accessible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id='how-it-works' className='py-20 bg-gray-800'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
              How It Works
            </h2>

            <div className='grid md:grid-cols-3 gap-8'>
              <div className='flex flex-col items-center text-center'>
                <div className='bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4'>
                  1
                </div>
                <h3 className='text-xl font-bold mb-2'>Select a Candidate</h3>
                <p className='text-gray-300'>
                  Browse through the 3D models of NYC mayoral candidates in our
                  interactive viewer.
                </p>
              </div>

              <div className='flex flex-col items-center text-center'>
                <div className='bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4'>
                  2
                </div>
                <h3 className='text-xl font-bold mb-2'>
                  Explore Their Profile
                </h3>
                <p className='text-gray-300'>
                  View detailed information about their background, experience,
                  and stance on key issues.
                </p>
              </div>

              <div className='flex flex-col items-center text-center'>
                <div className='bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4'>
                  3
                </div>
                <h3 className='text-xl font-bold mb-2'>Compare and Decide</h3>
                <p className='text-gray-300'>
                  Toggle between candidates to compare their positions and make
                  an informed decision.
                </p>
              </div>
            </div>

            <div className='text-center mt-16'>
              <Link href='/explore'>
                <Button size='lg' className='bg-purple-600 hover:bg-purple-700'>
                  Start Exploring
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Candidates Preview Section */}
        <section id='candidates' className='py-20'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
              Meet the Candidates
            </h2>

            <div className='grid grid-cols-2 md:grid-cols-5 gap-6'>
              {[
                {
                  name: 'Alexandra Rivera',
                  party: 'Progressive Party',
                  color: '#4C1D95',
                },
                {
                  name: 'Michael Johnson',
                  party: 'Moderate Alliance',
                  color: '#065F46',
                },
                {
                  name: 'Sophia Rodriguez',
                  party: 'Community First',
                  color: '#B91C1C',
                },
                {
                  name: 'David Chen',
                  party: 'Innovation Coalition',
                  color: '#0369A1',
                },
                {
                  name: 'Olivia Washington',
                  party: 'Unity Movement',
                  color: '#B45309',
                },
              ].map((candidate, index) => (
                <div
                  key={index}
                  className='bg-gray-800 rounded-lg overflow-hidden'
                >
                  <div
                    className='h-4'
                    style={{ backgroundColor: candidate.color }}
                  ></div>
                  <div className='p-4 text-center'>
                    <div className='w-20 h-20 rounded-full bg-gray-700 mx-auto mb-3 flex items-center justify-center text-2xl'>
                      {candidate.name.charAt(0)}
                    </div>
                    <h3 className='font-bold mb-1'>{candidate.name}</h3>
                    <p className='text-sm text-gray-400'>{candidate.party}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='text-center mt-12'>
              <p className='text-gray-300 mb-6'>
                Explore detailed profiles, policy positions, and compare
                candidates in our interactive 3D experience.
              </p>
              <Link href='/explore'>
                <Button size='lg' className='bg-purple-600 hover:bg-purple-700'>
                  View Full Profiles
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='py-20 bg-purple-900'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Ready to explore NYC&apos;s future?
            </h2>
            <p className='text-xl text-purple-200 mb-8 max-w-2xl mx-auto'>
              Dive into our interactive 3D experience and discover the
              candidates who want to lead New York City.
            </p>
            <Link href='/explore'>
              <Button
                size='lg'
                className='bg-white text-purple-900 hover:bg-gray-100'
              >
                Enter the 3D Experience
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className='bg-gray-900 border-t border-gray-800 py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex items-center space-x-2 mb-4 md:mb-0'>
              <MapPin className='h-5 w-5 text-purple-500' />
              <span className='font-bold text-white'>NYC Votes 3D</span>
            </div>
            <div className='text-sm text-gray-400'>
              © {new Date().getFullYear()} NYC Votes 3D. This is an educational
              tool and is not affiliated with any official election board.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
