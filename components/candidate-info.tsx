import type { Candidate } from '@/lib/candidate-data';

interface CandidateInfoProps {
  candidate: Candidate;
}

export default function CandidateInfo({ candidate }: CandidateInfoProps) {
  return (
    <div className='mb-8 bg-gray-700 rounded-lg p-4'>
      <div className='flex items-center mb-4'>
        <div className='w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-2xl overflow-hidden'>
          {candidate.avatar ? (
            <img
              src={candidate.avatar || '/placeholder.svg'}
              alt={candidate.name}
              className='w-full h-full object-cover'
            />
          ) : (
            candidate.name.charAt(0)
          )}
        </div>
        <div className='ml-4'>
          <h2 className='text-2xl font-bold'>{candidate.name}</h2>
          <div className='flex items-center'>
            <span
              className='inline-block w-3 h-3 rounded-full mr-2'
              style={{ backgroundColor: candidate.color }}
            ></span>
            <span>{candidate.party}</span>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold text-purple-300'>Background</h3>
          <p className='text-gray-300'>{candidate.background}</p>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-purple-300'>
            Key Policies
          </h3>
          <ul className='list-disc list-inside text-gray-300'>
            {candidate.keyPolicies.map((policy, index) => (
              <li key={index}>{policy}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
