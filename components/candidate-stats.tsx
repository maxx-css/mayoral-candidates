interface StatProps {
  name: string;
  value: number;
  color: string;
}

interface CandidateStatsProps {
  stats: StatProps[];
}

export default function CandidateStats({ stats }: CandidateStatsProps) {
  return (
    <div className='bg-gray-700 rounded-lg p-4'>
      <h3 className='text-xl font-bold mb-4 text-purple-300'>
        Candidate Stats
      </h3>

      <div className='space-y-4'>
        {stats.map((stat, index) => (
          <div key={index}>
            <div className='flex justify-between mb-1'>
              <span className='text-sm font-medium text-gray-300'>
                {stat.name}
              </span>
              <span className='text-sm font-medium text-gray-300'>
                {stat.value}/10
              </span>
            </div>
            <div className='w-full bg-gray-600 rounded-full h-2.5'>
              <div
                className='h-2.5 rounded-full'
                style={{
                  width: `${stat.value * 10}%`,
                  backgroundColor: stat.color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
