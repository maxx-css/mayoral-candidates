export interface Candidate {
  id: number;
  name: string;
  party: string;
  color: string;
  avatar?: string;
  background: string;
  keyPolicies: string[];
  stats: {
    name: string;
    value: number;
    color: string;
  }[];
  jobTitle: string;
  location: string;
}
export const candidates: Candidate[] = [
  {
    id: 1,
    name: 'Alexandra Rivera',
    party: 'Progressive Party',
    color: '#4C1D95', // purple
    background:
      'Former City Council member with 8 years of experience. Background in urban planning and community organizing.',
    keyPolicies: [
      'Affordable housing expansion',
      'Public transportation improvements',
      'Climate action plan',
      'Police reform',
    ],
    stats: [
      { name: 'Economic Policy', value: 7, color: '#8B5CF6' },
      { name: 'Public Safety', value: 6, color: '#8B5CF6' },
      { name: 'Housing', value: 9, color: '#8B5CF6' },
      { name: 'Education', value: 8, color: '#8B5CF6' },
      { name: 'Environment', value: 9, color: '#8B5CF6' },
    ],
    jobTitle: 'Job Title',
    location: 'NYC',
  },
  {
    id: 2,
    name: 'Michael Johnson',
    party: 'Moderate Alliance',
    color: '#065F46', // green
    background:
      'Business executive with experience in public-private partnerships. Served as Deputy Mayor for Economic Development.',
    keyPolicies: [
      'Small business support',
      'Balanced budget initiative',
      'Education reform',
      'Infrastructure investment',
    ],
    stats: [
      { name: 'Economic Policy', value: 9, color: '#10B981' },
      { name: 'Public Safety', value: 7, color: '#10B981' },
      { name: 'Housing', value: 6, color: '#10B981' },
      { name: 'Education', value: 7, color: '#10B981' },
      { name: 'Environment', value: 5, color: '#10B981' },
    ],
    jobTitle: 'Job Title',
    location: 'NYC',
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    party: 'Community First',
    color: '#B91C1C', // red
    background:
      'Community activist and nonprofit director. Focused on grassroots organizing and neighborhood development.',
    keyPolicies: [
      'Community-led policing',
      'Participatory budgeting',
      'Tenant protections',
      'Youth programs expansion',
    ],
    stats: [
      { name: 'Economic Policy', value: 6, color: '#EF4444' },
      { name: 'Public Safety', value: 8, color: '#EF4444' },
      { name: 'Housing', value: 8, color: '#EF4444' },
      { name: 'Education', value: 9, color: '#EF4444' },
      { name: 'Environment', value: 7, color: '#EF4444' },
    ],
    jobTitle: 'Job Title',
    location: 'NYC',
  },
  {
    id: 4,
    name: 'David Chen',
    party: 'Innovation Coalition',
    color: '#0369A1', // blue
    background:
      'Tech entrepreneur and civic technology advocate. Founded multiple startups focused on urban solutions.',
    keyPolicies: [
      'Smart city initiatives',
      'Digital equity programs',
      'Transit modernization',
      'Government transparency',
    ],
    stats: [
      { name: 'Economic Policy', value: 8, color: '#3B82F6' },
      { name: 'Public Safety', value: 6, color: '#3B82F6' },
      { name: 'Housing', value: 7, color: '#3B82F6' },
      { name: 'Education', value: 8, color: '#3B82F6' },
      { name: 'Environment', value: 8, color: '#3B82F6' },
    ],
    jobTitle: 'Job Title',
    location: 'NYC',
  },
  {
    id: 5,
    name: 'Olivia Washington',
    party: 'Unity Movement',
    color: '#B45309', // amber
    background:
      'Civil rights attorney and former judge. Extensive experience in public service and legal advocacy.',
    keyPolicies: [
      'Criminal justice reform',
      'Equity in city services',
      'Affordable healthcare access',
      'Worker protections',
    ],
    stats: [
      { name: 'Economic Policy', value: 7, color: '#F59E0B' },
      { name: 'Public Safety', value: 9, color: '#F59E0B' },
      { name: 'Housing', value: 7, color: '#F59E0B' },
      { name: 'Education', value: 8, color: '#F59E0B' },
      { name: 'Environment', value: 6, color: '#F59E0B' },
    ],
    jobTitle: 'Job Title',
    location: 'NYC',
  },
  {
    id: 6,
    name: 'James Wilson',
    party: 'Fiscal Responsibility',
    color: '#1E40AF', // dark blue
    background:
      'Former CFO of a major corporation with expertise in financial management and economic development.',
    keyPolicies: [
      'Tax reform',
      'Debt reduction',
      'Public-private partnerships',
      'Government efficiency',
    ],
    stats: [
      { name: 'Economic Policy', value: 10, color: '#3B82F6' },
      { name: 'Public Safety', value: 7, color: '#3B82F6' },
      { name: 'Housing', value: 5, color: '#3B82F6' },
      { name: 'Education', value: 6, color: '#3B82F6' },
      { name: 'Environment', value: 4, color: '#3B82F6' },
    ],
    jobTitle: 'Job Title',
    location: 'NYC',
  },
  {
    id: 7,
    name: 'Maria Garcia',
    party: 'Education First',
    color: '#9D174D', // pink
    background:
      'Former school principal and education policy advisor with 20 years of experience in public education.',
    keyPolicies: [
      'School funding increase',
      'Teacher support programs',
      'After-school initiatives',
      'College readiness',
    ],
    stats: [
      { name: 'Economic Policy', value: 6, color: '#EC4899' },
      { name: 'Public Safety', value: 7, color: '#EC4899' },
      { name: 'Housing', value: 6, color: '#EC4899' },
      { name: 'Education', value: 10, color: '#EC4899' },
      { name: 'Environment', value: 5, color: '#EC4899' },
    ],
    jobTitle: 'Job Title',
    location: 'NYC',
  },
  {
    id: 8,
    name: 'Robert Kim',
    party: 'Public Safety Coalition',
    color: '#78350F', // brown
    background:
      'Former police commissioner with extensive experience in law enforcement and community relations.',
    keyPolicies: [
      'Crime reduction initiatives',
      'Police department reform',
      'Community safety programs',
      'Emergency response improvement',
    ],
    stats: [
      { name: 'Economic Policy', value: 5, color: '#92400E' },
      { name: 'Public Safety', value: 10, color: '#92400E' },
      { name: 'Housing', value: 4, color: '#92400E' },
      { name: 'Education', value: 6, color: '#92400E' },
      { name: 'Environment', value: 3, color: '#92400E' },
    ],
    jobTitle: 'Job Title',
    location: 'NYC',
  },
];
